import {DataSagaStatus, TaskDocument} from "./types";
import {CreateDocumentArguments, DeleteDocumentArguments} from "utils/firebase";

export enum DataActionType {
  SET_DATA_STATUS = "query/SET_DATA_STATUS",
  SET_DATA_DATA = "query/SET_DATA_DATA",
  // sagas
  GET_LOGGED_IN_USER_DATA = "data/GET_LOGGED_IN_USER_DATA",
  GET_TASKS_BY_DAYS = "data/GET_TASKS_BY_DAYS",
  CREATE_TASK = "data/CREATE_TASK",
  DELETE_TASK = "data/DELETE_TASK",
}

export type DataSagaActionType = (
  DataActionType.GET_LOGGED_IN_USER_DATA |
  DataActionType.GET_TASKS_BY_DAYS |
  DataActionType.CREATE_TASK |
  DataActionType.DELETE_TASK
)

export enum Authority {
  AUTHOR = "author",
  VIEWER = "viewer",
  UNKNOWN = "unknown"
}
export const dataSagaAuthority:Record<DataSagaActionType, Authority> = {
  [DataActionType.GET_LOGGED_IN_USER_DATA]: Authority.UNKNOWN,
  [DataActionType.GET_TASKS_BY_DAYS]: Authority.VIEWER,
  [DataActionType.CREATE_TASK]: Authority.AUTHOR,
  [DataActionType.DELETE_TASK]: Authority.AUTHOR,
}

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
    merge?: Boolean
  }
  [DataActionType.CREATE_TASK]: SagaDataActionDefaultPayload & 
    Omit<CreateDocumentArguments<Omit<TaskDocument, "createdAt" | "updatedAt" | "compliments" | "author">>, "path"> & {
    }
  [DataActionType.DELETE_TASK]: SagaDataActionDefaultPayload & 
    Omit<DeleteDocumentArguments, "path"> & {
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
  [DataActionType.CREATE_TASK]: (payload: DataActionPayload[DataActionType.CREATE_TASK]) => ({type: DataActionType.CREATE_TASK, payload}),
  [DataActionType.DELETE_TASK]: (payload: DataActionPayload[DataActionType.DELETE_TASK]) => ({type: DataActionType.DELETE_TASK, payload}),
}

export type DataActionInstance<DataActionTypeT extends DataActionType> = ReturnType<typeof dataActionCreators[DataActionTypeT]>