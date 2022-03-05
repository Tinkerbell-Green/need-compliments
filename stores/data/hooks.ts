import {useCallback, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators, ActionPayload, ActionType, SagaActionType} from "./actions";
import {RootState} from "stores/reducers";

export const useDataSaga = <SagaActionTypeT extends SagaActionType>(
  actionType: SagaActionType,
  authorId?: string
) => { 
  const dispatch = useDispatch() 
  const hostingUserId = useSelector((state: RootState)=>state.navigation.hostingUserId)
  
  const decidedAuthorId = useMemo(()=>{
    return authorId || hostingUserId 
  },[authorId, hostingUserId])

  const state = useSelector((state: RootState) => decidedAuthorId ? state["data"][actionType][decidedAuthorId] as RootState["data"][SagaActionTypeT][string] : undefined)
  
  const run = useCallback((payload: ActionPayload[SagaActionTypeT])=>{
    if (actionType === ActionType.PRERARE_LOGGED_IN_USER_DATA) {
      dispatch(actionCreators[actionType](payload as any)) // TODO: check about any warning
    }
    else if (decidedAuthorId){
      dispatch(actionCreators[actionType]({
        ...payload,
        authorId: decidedAuthorId,
      }))
    }
  },[actionType, decidedAuthorId, dispatch])  

  return ({
    authorId: decidedAuthorId,
    run,
    state
  }) 
}