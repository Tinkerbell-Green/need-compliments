import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Optional} from "utility-types"
import {dataActionCreators, DataActionPayload, DataActionType, DataSagaActionType, dataSagaDefaultAuthor} from "./actions";
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

  const defaultFetchAuthor = useMemo(()=>{
    const defaultFetchAuthorType = dataSagaDefaultAuthor[actionType]

    if (defaultFetchAuthorType === "loggedInUser"){
      return loggedInUserId
    }
    else if (defaultFetchAuthorType === "pageAuthor"){
      return pageAuthorId
    }
    else {
      return ""
    }
  },[actionType, loggedInUserId, pageAuthorId])

  // key
  const key = useMemo(()=>{
    return [defaultFetchAuthor || "", ...(additionalKeys || [])].sort().join()
  },[additionalKeys, defaultFetchAuthor])

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

  const payloadRef = useRef(state?.payload)
  useEffect(()=>{
    payloadRef.current = state?.payload
  },[state?.payload])

  const fetch = useCallback((partialPayload: FetchPartialPayload)=>{
    const author = partialPayload.author !== undefined ? partialPayload.author : defaultFetchAuthor;
    
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
  },[actionType, defaultFetchAuthor, dispatch, key])

  const refetch = useCallback((partialPartialPayload?: Partial<FetchPartialPayload>)=>{
    if (!payloadRef.current) return;
    
    const partialPayload = {...(payloadRef.current || {}), ...(partialPartialPayload || {})}

    fetch(partialPayload as any)
  }, [fetch])

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