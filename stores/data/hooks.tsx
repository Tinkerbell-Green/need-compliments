import isEqual from "lodash.isequal"
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Optional} from "utility-types"
import {Authority, dataActionCreators, DataActionPayload, DataActionType, DataSagaActionType, dataSagaAuthority} from "./actions";
import {RootState} from "stores/reducers"

export const useDataSaga = <DataSagaActionTypeT extends DataSagaActionType>(
  actionType: DataSagaActionType,
  options: {
    additionalKeys?: (keyof DataActionPayload[DataSagaActionTypeT])[]
    onSucceed?: (data?: RootState["data"][DataSagaActionTypeT][string]["data"]) => void
    onFail?: () => void
  } = {}
) => { 
  const dispatch = useDispatch()
  const {additionalKeys, onSucceed, onFail} = options

  // pageAuthorId
  const pageAuthorId = useSelector((state:RootState)=>state.navigation.pageAuthorId)
  const loggedInUserId = useSelector((state:RootState)=>state.navigation.loggedInUserId)

  const authority = dataSagaAuthority[actionType]

  const keyUserId = useMemo(()=>{
    if (authority === Authority.AUTHOR){
      return loggedInUserId
    } else if (authority === Authority.VIEWER){
      return pageAuthorId
    } else {
      return pageAuthorId
    }
  },[authority, loggedInUserId, pageAuthorId])

  const defaultFetchAuthorId = useMemo(()=>{
    if (authority === Authority.AUTHOR){
      return loggedInUserId
    } else if (authority === Authority.VIEWER){
      return pageAuthorId
    } else {
      return pageAuthorId
    }
  },[authority, loggedInUserId, pageAuthorId])

  // key
  const key = useMemo(()=>{
    return [keyUserId || "", ...(additionalKeys || [])].sort().join()
  },[additionalKeys, keyUserId])

  const keyRef = useRef<typeof key>(key)
  useEffect(()=>{
    keyRef.current = key
  },[key])

  // state
  const state = useSelector((state: RootState) => {
    const value = state["data"][actionType][key]
    if (value) {
      return value as RootState["data"][DataSagaActionTypeT][string]
    } else {
      return undefined
    }
  })


  // fetch
  type FetchPartialPayload = Omit<Optional<DataActionPayload[DataSagaActionTypeT], "author">, "key">

  const fetch = useCallback((partialPayload: FetchPartialPayload)=>{
    const author = partialPayload.author || defaultFetchAuthorId
    
    if (author && key){
      dispatch(dataActionCreators[actionType]({
        ...partialPayload,
        author,
        key,
      } as any))

      dispatch(
        dataActionCreators[DataActionType.SET_DATA_PAYLOAD]({
          type: actionType,
          key,
          payload: partialPayload
        })
      )
    }
  },[actionType, defaultFetchAuthorId, dispatch, key])

  const refetch = useCallback((partialPartialPayload?: Partial<FetchPartialPayload>)=>{
    if (!state?.payload) return;
    
    const partialPayload = {...(state?.payload || {}), ...(partialPartialPayload || {})}

    fetch(partialPayload as any)
  }, [fetch, state?.payload])

  // onSucceed
  const onSucceedRef = useRef<typeof onSucceed>(onSucceed)
  useEffect(()=>{
    onSucceedRef.current = onSucceed
  },[onSucceed])

  useEffect(()=>{
    if (state?.status === "succeeded"){
      onSucceedRef.current?.(state.data)
    }
  },[state?.data, state?.status])

  // onFail
  const onFailRef = useRef<typeof onFail>(onFail)
  useEffect(()=>{
    onFailRef.current = onFail
  },[onFail])

  useEffect(()=>{
    if (state?.status === "failed"){
      onFailRef.current?.()
    }
  },[onFail, state?.status])

  return ({
    key: keyRef.current,
    fetch,
    refetch,
    state,
    data: state?.data as RootState["data"][DataSagaActionTypeT][string]["data"] | undefined,
    status: state?.status as RootState["data"][DataSagaActionTypeT][string]["status"] | undefined,
  }) 
}