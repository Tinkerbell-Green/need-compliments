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
  // const fetch = useMemo(()=>{
  //   if (pageAuthorId && key){
  //     return undefined
  //   }
  //   else {
  //     return (
  //       (payload: Omit<Optional<ActionPayload[SagaActionTypeT], "author">, "key">)=>{
  //         const author = payload.author || pageAuthorId
      
  //         dispatch(actionCreators[actionType]({
  //           ...payload,
  //           author,
  //           key,
  //         } as any))
  //       }
  //     )
  //   }
  // },[actionType, dispatch, key, pageAuthorId])

  // const fetchRef = useRef<typeof fetch | undefined>(undefined)
  // const [guaranteedFetch, setGuaranteedFetch] = useState<typeof fetch | undefined>(undefined)

  // // TODO:
  // useEffect(()=>{
  //   fetchRef.current = fetch
  // },[fetch])

  // useEffect(()=>{
  //   if (pageAuthorId && key){
  //     setGuaranteedFetch(fetchRef.current)
  //   } else {
  //     setGuaranteedFetch(undefined)
  //   }
  // },[key, pageAuthorId])


  // const [isFetchDelayed, setIsFetchDelayed] = useState(false)
  
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
  useEffect(()=>{
    console.log("isFetchReady: ", isFetchReady); // TODO: remove 
  },[isFetchReady])
  // const [delayedFetch, setDelayedFetch] = useState<(()=>ReturnType<typeof fetch>) | null>(null)
  // useEffect(()=>{
  //   console.log("delayedFetch: ", delayedFetch); // TODO: remove 
  // },[delayedFetch])
  const DELAY_TIME_UNIT = 300

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const wrappedFetch = (...args: Parameters<typeof fetch>)=>{
    if (isFetchReady){
      fetch(...args)
    } else {
      console.log("fetch is delayed")
      // setTimeout(()=>{
      //   wrappedFetch(...args)
      // }, DELAY_TIME_UNIT)
    }
  }

  // useEffect(()=>{
  //   if (isFetchReady && delayedFetch) {
  //     console.log("delayed fetch triggered")
  //     delayedFetch();
  //     setDelayedFetch(null)
  //   }
  // }, [delayedFetch, isFetchReady])

  const wrappedFetchRef = useRef<typeof wrappedFetch>(wrappedFetch)

  wrappedFetchRef.current = wrappedFetch
  // useEffect(()=>{
  //   wrappedFetchRef.current = wrappedFetch
  // },[wrappedFetch])

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
    fetch: wrappedFetchRef.current,
    state,
    data: state?.data,
    status: state?.status
  }) 
}