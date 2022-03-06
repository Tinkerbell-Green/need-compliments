import {DataSagaStatus} from "./types";

export enum DataActionType {
  SET_DATA_STATUS = "query/SET_DATA_STATUS",
  SET_DATA_DATA = "query/SET_DATA_DATA",
  // sagas
  GET_LOGGED_IN_USER_DATA = "data/GET_LOGGED_IN_USER_DATA",
  GET_TASKS_BY_DAYS = "data/GET_TASKS_BY_DAYS",
}

export type DataSagaActionType = (
  DataActionType.GET_LOGGED_IN_USER_DATA |
  DataActionType.GET_TASKS_BY_DAYS
)

export type DataActionPayload = {
  [DataActionType.SET_DATA_STATUS]: {
    type: DataSagaActionType,
    key: string,
    status: DataSagaStatus
  }
  [DataActionType.SET_DATA_DATA]: {
    type: DataSagaActionType,
    key: string,
    data: any
  }
  // sagas
  [DataActionType.GET_LOGGED_IN_USER_DATA]: SagaDataActionDefaultPayload & {
    id: string
    email: string | undefined
    name: string | undefined
    image: string | undefined
  }
  [DataActionType.GET_TASKS_BY_DAYS]: SagaDataActionDefaultPayload & {
    startDay: Date
    endDay: Date
  }
}

export type SagaDataActionDefaultPayload = {
  key: string
  author: string
}

export const dataActionCreators = {
  [DataActionType.SET_DATA_STATUS]: (payload: DataActionPayload[DataActionType.SET_DATA_STATUS]) => ({type: DataActionType.SET_DATA_STATUS, payload}),
  [DataActionType.SET_DATA_DATA]: (payload: DataActionPayload[DataActionType.SET_DATA_DATA]) => ({type: DataActionType.SET_DATA_DATA, payload}),
  // sagas
  [DataActionType.GET_LOGGED_IN_USER_DATA]: (payload: DataActionPayload[DataActionType.GET_LOGGED_IN_USER_DATA]) => ({type: DataActionType.GET_LOGGED_IN_USER_DATA, payload}), 
  [DataActionType.GET_TASKS_BY_DAYS]: (payload: DataActionPayload[DataActionType.GET_TASKS_BY_DAYS]) => ({type: DataActionType.GET_TASKS_BY_DAYS, payload}),
}

export type DataActionInstance<DataActionTypeT extends DataActionType> = ReturnType<typeof dataActionCreators[DataActionTypeT]>