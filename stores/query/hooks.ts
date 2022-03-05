import {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators, ActionPayload, QueryActionType} from "./actions";
import {getQueryKey} from "./utils";
import {RootState} from "stores/reducers";

export const useQuery = <QueryActionTypeT extends QueryActionType>(
  actionType: QueryActionType
) => { 
  const dispatch = useDispatch() 

  const [key, setKey] = useState<string>();

  const state = useSelector((state: RootState) => key ? state.query[key] as RootState["query"][string] : undefined)
  
  const fetch = useCallback((payload: ActionPayload[QueryActionTypeT])=>{
    dispatch(actionCreators[actionType](payload as any))
    setKey(getQueryKey({
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