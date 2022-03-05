import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators, ActionPayload, ActionType, SagaActionType} from "./actions";
import {RootState} from "stores/reducers";

export const useDataSaga = <SagaActionTypeT extends SagaActionType>(
  actionType: SagaActionType,
  keys: (keyof ActionPayload[SagaActionTypeT])[]
) => { 
  const dispatch = useDispatch()

  const [memoizedKeys, setMemoizedKeys] = useState(keys)

  const key = generateKey(keys as string[])

  useEffect(()=>{
    const isEqual = [...keys].sort().join() === [...memoizedKeys].sort().join()
    if (!isEqual){
      setMemoizedKeys(keys)
    }
  },[keys, memoizedKeys])
  
  const state = useSelector((state: RootState) => {
    const value = state["data"][actionType][key]
    if (value) {
      return value as RootState["data"][SagaActionTypeT][string]
    } else {
      return undefined
    }
  })
  
  const fetch = useCallback((payload: Omit<ActionPayload[SagaActionTypeT], "keys">)=>{
    dispatch(actionCreators[actionType]({
      ...payload,
      keys: memoizedKeys,
    } as any)) // TODO: check about any warning
  },[actionType, dispatch, memoizedKeys])  

  return ({
    key,
    fetch,
    state,
    data: state?.data,
    status: state?.status
  }) 
}

export const generateKey = (keys: string[]) => keys.join("-")