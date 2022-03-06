import {DataSagaStatus} from "./types";

export enum ActionType {
  SET_DATA_STATUS = "query/SET_DATA_STATUS",
  SET_DATA_DATA = "query/SET_DATA_DATA",
  // sagas
  GET_LOGGED_IN_USER_DATA = "data/GET_LOGGED_IN_USER_DATA",
  GET_TASKS_BY_DAYS = "data/GET_TASKS_BY_DAYS",
}

export type SagaActionType = (
  ActionType.GET_LOGGED_IN_USER_DATA |
  ActionType.GET_TASKS_BY_DAYS
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
  [ActionType.GET_TASKS_BY_DAYS]: DefaultSagaActionPayload & {
    startDay: Date
    endDay: Date
  }
}

export type DefaultSagaActionPayload = {
  key: string
  author: string
}

export const actionCreators = {
  [ActionType.SET_DATA_STATUS]: (payload: ActionPayload[ActionType.SET_DATA_STATUS]) => ({type: ActionType.SET_DATA_STATUS, payload}),
  [ActionType.SET_DATA_DATA]: (payload: ActionPayload[ActionType.SET_DATA_DATA]) => ({type: ActionType.SET_DATA_DATA, payload}),
  // sagas
  [ActionType.GET_LOGGED_IN_USER_DATA]: (payload: ActionPayload[ActionType.GET_LOGGED_IN_USER_DATA]) => ({type: ActionType.GET_LOGGED_IN_USER_DATA, payload}), 
  [ActionType.GET_TASKS_BY_DAYS]: (payload: ActionPayload[ActionType.GET_TASKS_BY_DAYS]) => ({type: ActionType.GET_TASKS_BY_DAYS, payload}),
}

export type ActionInstance<ActionTypeT extends ActionType> = ReturnType<typeof actionCreators[ActionTypeT]>