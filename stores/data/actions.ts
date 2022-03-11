import {DataSagaStatus, GoalDocument, TaskDocument} from "./types";
import {CreateDocumentArguments, DeleteDocumentArguments, UpdateDocumentArguments} from "utils/firebase";

export enum DataActionType {
  SET_DATA_STATUS = "query/SET_DATA_STATUS",
  SET_DATA_DATA = "query/SET_DATA_DATA",
  // sagas
  GET_LOGGED_IN_USER_DATA = "data/GET_LOGGED_IN_USER_DATA",
  GET_TASKS_BY_DAYS = "data/GET_TASKS_BY_DAYS",
  CREATE_TASK = "data/CREATE_TASK",
  UPDATE_TASK = "data/UPDATE_TASK",
  DELETE_TASK = "data/DELETE_TASK",
  GET_GOALS = "data/GET_GOALS",
  CREATE_GOAL = "data/CREATE_GOAL",
  UPDATE_GOAL = "data/UPDATE_GOAL",
  DELETE_GOAL = "data/DELETE_GOAL",
}

export type DataSagaActionType = (
  DataActionType.GET_LOGGED_IN_USER_DATA |
  DataActionType.GET_TASKS_BY_DAYS |
  DataActionType.CREATE_TASK |
  DataActionType.UPDATE_TASK |
  DataActionType.DELETE_TASK |
  DataActionType.GET_GOALS |
  DataActionType.CREATE_GOAL |
  DataActionType.UPDATE_GOAL |
  DataActionType.DELETE_GOAL
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
  [DataActionType.UPDATE_TASK]: Authority.AUTHOR,
  [DataActionType.DELETE_TASK]: Authority.AUTHOR,
  [DataActionType.GET_GOALS]: Authority.VIEWER,
  [DataActionType.CREATE_GOAL]: Authority.AUTHOR,
  [DataActionType.UPDATE_GOAL]: Authority.AUTHOR,
  [DataActionType.DELETE_GOAL]: Authority.AUTHOR,
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
  [DataActionType.UPDATE_TASK]: SagaDataActionDefaultPayload & 
    Omit<UpdateDocumentArguments<Omit<TaskDocument, "createdAt" | "updatedAt" | "author">>, "path"> & {
    }
  [DataActionType.DELETE_TASK]: SagaDataActionDefaultPayload & 
    Omit<DeleteDocumentArguments, "path"> & {
    }
  [DataActionType.GET_GOALS]: SagaDataActionDefaultPayload & {
    }
  [DataActionType.CREATE_GOAL]: SagaDataActionDefaultPayload & 
    Omit<CreateDocumentArguments<Omit<GoalDocument, "createdAt" | "updatedAt" | "author">>, "path"> & {
    }
  [DataActionType.UPDATE_GOAL]: SagaDataActionDefaultPayload & 
    Omit<UpdateDocumentArguments<Omit<GoalDocument, "createdAt" | "updatedAt" | "author">>, "path"> & {
    }
  [DataActionType.DELETE_GOAL]: SagaDataActionDefaultPayload & 
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
  [DataActionType.UPDATE_TASK]: (payload: DataActionPayload[DataActionType.UPDATE_TASK]) => ({type: DataActionType.UPDATE_TASK, payload}),
  [DataActionType.DELETE_TASK]: (payload: DataActionPayload[DataActionType.DELETE_TASK]) => ({type: DataActionType.DELETE_TASK, payload}),
  [DataActionType.GET_GOALS]: (payload: DataActionPayload[DataActionType.GET_GOALS]) => ({type: DataActionType.GET_GOALS, payload}),
  [DataActionType.CREATE_GOAL]: (payload: DataActionPayload[DataActionType.CREATE_GOAL]) => ({type: DataActionType.CREATE_GOAL, payload}),
  [DataActionType.UPDATE_GOAL]: (payload: DataActionPayload[DataActionType.UPDATE_GOAL]) => ({type: DataActionType.UPDATE_GOAL, payload}),
  [DataActionType.DELETE_GOAL]: (payload: DataActionPayload[DataActionType.DELETE_GOAL]) => ({type: DataActionType.DELETE_GOAL, payload}),
}

export type DataActionInstance<DataActionTypeT extends DataActionType> = ReturnType<typeof dataActionCreators[DataActionTypeT]>