import {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators, ActionPayload, SagaActionType} from "./actions";
import {getDataSagaKey} from "./utils";
import {RootState} from "stores/reducers";

export const useDataSaga = <SagaActionTypeT extends SagaActionType>(
  actionType: SagaActionType
) => { 
  const dispatch = useDispatch() 

  const [key, setKey] = useState<string>();

  const state = useSelector((state: RootState) => key ? state["data"][actionType][key] as RootState["data"][SagaActionTypeT][string] : undefined)
  
  const fetch = useCallback((payload: ActionPayload[SagaActionTypeT])=>{
    dispatch(actionCreators[actionType](payload as any))
    setKey(getDataSagaKey({
      type: actionType,
      payload: payload as any,
    }));
  },[actionType, dispatch])  

  return ({
    key,
    fetch,
    state
  }) 
}