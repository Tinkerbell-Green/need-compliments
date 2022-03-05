import {DataSagaStatus} from "./types";
import * as  queryActions from "stores/query/actions"

export enum ActionType {
  SET_DATA_STATUS = "query/SET_DATA_STATUS",
  SET_DATA_DATA = "query/SET_DATA_DATA",
  // sagas
  PRERARE_USER_DATA = "data/PRERARE_USER_DATA",
}

export type SagaActionType = (
  ActionType.PRERARE_USER_DATA
)

export type ActionPayload = {
  [ActionType.SET_DATA_STATUS]: {
    type: SagaActionType,
    key: string
    status: DataSagaStatus
  }
  [ActionType.SET_DATA_DATA]: {
    type: SagaActionType,
    key: string
    data: any
  }
  [ActionType.PRERARE_USER_DATA]: {userId: string}
}

export const actionCreators = {
  [ActionType.SET_DATA_STATUS]: (payload: ActionPayload[ActionType.SET_DATA_STATUS]) => ({type: ActionType.SET_DATA_STATUS, payload}),
  [ActionType.SET_DATA_DATA]: (payload: ActionPayload[ActionType.SET_DATA_DATA]) => ({type: ActionType.SET_DATA_DATA, payload}),
  // 
  [ActionType.PRERARE_USER_DATA]: (payload: ActionPayload[ActionType.PRERARE_USER_DATA]) => ({type: ActionType.PRERARE_USER_DATA, payload}),
}

export type ActionInstance<ActionTypeT extends ActionType> = ReturnType<typeof actionCreators[ActionTypeT]>