import {DataSagaStatus} from "./types";

export enum ActionType {
  SET_DATA_STATUS = "query/SET_DATA_STATUS",
  SET_DATA_DATA = "query/SET_DATA_DATA",
  // sagas
  GET_LOGGED_IN_USER_DATA = "data/GET_LOGGED_IN_USER_DATA",
}

export type SagaActionType = (
  ActionType.GET_LOGGED_IN_USER_DATA
)

export type ActionPayload = {
  [ActionType.SET_DATA_STATUS]: {
    type: SagaActionType,
    key: string,
    status: DataSagaStatus
  }
  [ActionType.SET_DATA_DATA]: {
    type: SagaActionType,
    key: string,
    data: any
  }
  // sagas
  [ActionType.GET_LOGGED_IN_USER_DATA]: DefaultSagaActionPayload & {
    id: string
    email: string | undefined
    name: string | undefined
    image: string | undefined
  }
}

export type DefaultSagaActionPayload = {
  keys: string[]
}

export const actionCreators = {
  [ActionType.SET_DATA_STATUS]: (payload: ActionPayload[ActionType.SET_DATA_STATUS]) => ({type: ActionType.SET_DATA_STATUS, payload}),
  [ActionType.SET_DATA_DATA]: (payload: ActionPayload[ActionType.SET_DATA_DATA]) => ({type: ActionType.SET_DATA_DATA, payload}),
  // 
  [ActionType.GET_LOGGED_IN_USER_DATA]: (payload: ActionPayload[ActionType.GET_LOGGED_IN_USER_DATA]) => ({type: ActionType.GET_LOGGED_IN_USER_DATA, payload}),
}

export type ActionInstance<ActionTypeT extends ActionType> = ReturnType<typeof actionCreators[ActionTypeT]>