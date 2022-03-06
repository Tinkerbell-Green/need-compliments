import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Optional} from "utility-types"
import {actionCreators, ActionPayload, SagaActionType} from "./actions";
import {RootState} from "stores/reducers";

export const useDataSaga = <SagaActionTypeT extends SagaActionType>(
  actionType: SagaActionType,
  options?: {
    additionalKeys?: (keyof ActionPayload[SagaActionTypeT])[]
  }
) => { 
  const dispatch = useDispatch()

  // pageAuthorId
  const pageAuthorId = useSelector((state:RootState)=>state.navigation.pageAuthorId)

  const pageAuthorIdRef = useRef<string | undefined>()
  useEffect(()=>{
    pageAuthorIdRef.current = pageAuthorId
  },[pageAuthorId])

  // key
  const key = useMemo(()=>{
    return [pageAuthorId || "", ...(options?.additionalKeys || [])].sort().join()
  },[options?.additionalKeys, pageAuthorId])

  const keyRef = useRef<typeof key>(key)
  useEffect(()=>{
    keyRef.current = key
  },[key])

  // fetch
  const fetch = useCallback((payload: Omit<Optional<ActionPayload[SagaActionTypeT], "author">, "key">)=>{
    const author = payload.author || pageAuthorIdRef.current
    
    if (author && key){
      dispatch(actionCreators[actionType]({
        ...payload,
        author,
        key,
      } as any))
    }
  },[actionType, dispatch, key])

  const isFetchReady = useMemo(()=>Boolean(pageAuthorId && key), [key, pageAuthorId])

  // state
  const state = useSelector((state: RootState) => {
    const value = state["data"][actionType][key]
    if (value) {
      return value as RootState["data"][SagaActionTypeT][string]
    } else {
      return undefined
    }
  })

  return ({
    key: keyRef.current,
    fetch: fetch,
    ready: isFetchReady,
    state,
    data: state?.data,
    status: state?.status
  }) 
}