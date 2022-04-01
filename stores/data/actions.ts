import {DataSagaStatus, GoalDocument, TaskDocument, UserDocument} from "./types";
import {CreateDocumentArguments, DeleteDocumentArguments, UpdateDocumentArguments} from "utils/firebase";

export enum DataActionType {
  SET_DATA_STATUS = "query/SET_DATA_STATUS",
  SET_DATA_DATA = "query/SET_DATA_DATA",
  SET_DATA_PAYLOAD = "query/SET_DATA_PAYLOAD",
  // sagas
  GET_LOGGED_IN_USER_DATA = "data/GET_LOGGED_IN_USER_DATA",
  UPDATE_USER = "data/UPDATE_USER",
  GET_TASKS_BY_DAYS = "data/GET_TASKS_BY_DAYS",
  GET_PUBLIC_TASKS = "data/GET_PUBLIC_TASKS",
  CREATE_TASK = "data/CREATE_TASK",
  UPDATE_TASK = "data/UPDATE_TASK",
  DELETE_TASK = "data/DELETE_TASK",
  GET_GOALS = "data/GET_GOALS",
  GET_GOALS_BY_IDS = "data/GET_GOALS_BY_IDS",
  CREATE_GOAL = "data/CREATE_GOAL",
  UPDATE_GOAL = "data/UPDATE_GOAL",
  DELETE_GOAL = "data/DELETE_GOAL",
  DELETE_USER = "data/DELETE_USER"
}

export type DataSagaActionType = (
  DataActionType.GET_LOGGED_IN_USER_DATA |
  DataActionType.UPDATE_USER |
  DataActionType.GET_TASKS_BY_DAYS |
  DataActionType.GET_PUBLIC_TASKS |
  DataActionType.CREATE_TASK |
  DataActionType.UPDATE_TASK |
  DataActionType.DELETE_TASK |
  DataActionType.GET_GOALS |
  DataActionType.GET_GOALS_BY_IDS |
  DataActionType.CREATE_GOAL |
  DataActionType.UPDATE_GOAL |
  DataActionType.DELETE_GOAL |
  DataActionType.DELETE_USER
)

// TODO: use autority check in each data saga
// example: check author of task is loggedUserId when delete task in deleteTask saga
export enum Authority {
  AUTHOR = "author",
  VIEWER = "viewer",
  UNKNOWN = "unknown"
}
export const dataSagaAuthority:Record<DataSagaActionType, Authority> = {
  [DataActionType.GET_LOGGED_IN_USER_DATA]: Authority.UNKNOWN,
  [DataActionType.UPDATE_USER]: Authority.AUTHOR,
  [DataActionType.GET_TASKS_BY_DAYS]: Authority.VIEWER,
  [DataActionType.GET_PUBLIC_TASKS]: Authority.VIEWER,
  [DataActionType.CREATE_TASK]: Authority.AUTHOR,
  [DataActionType.UPDATE_TASK]: Authority.AUTHOR,
  [DataActionType.DELETE_TASK]: Authority.AUTHOR,
  [DataActionType.GET_GOALS]: Authority.VIEWER,
  [DataActionType.GET_GOALS_BY_IDS]: Authority.VIEWER,
  [DataActionType.CREATE_GOAL]: Authority.AUTHOR,
  [DataActionType.UPDATE_GOAL]: Authority.AUTHOR,
  [DataActionType.DELETE_GOAL]: Authority.AUTHOR,
  [DataActionType.DELETE_USER]: Authority.AUTHOR,
}
export const dataSagaDefaultAuthor:Record<DataSagaActionType, "pageAuthor" | "loggedInUser" | "none" > = {
  [DataActionType.GET_LOGGED_IN_USER_DATA]: "none",
  [DataActionType.UPDATE_USER]: "loggedInUser",
  [DataActionType.GET_TASKS_BY_DAYS]: "pageAuthor",
  [DataActionType.GET_PUBLIC_TASKS]: "none",
  [DataActionType.CREATE_TASK]: "loggedInUser",
  [DataActionType.UPDATE_TASK]: "loggedInUser",
  [DataActionType.DELETE_TASK]: "loggedInUser",
  [DataActionType.GET_GOALS]: "pageAuthor",
  [DataActionType.GET_GOALS_BY_IDS]: "none",
  [DataActionType.CREATE_GOAL]: "loggedInUser",
  [DataActionType.UPDATE_GOAL]: "loggedInUser",
  [DataActionType.DELETE_GOAL]: "loggedInUser",
  [DataActionType.DELETE_USER]: "loggedInUser",
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
  [DataActionType.SET_DATA_PAYLOAD]: {
    type: DataSagaActionType,
    key: string,
    payload: any
  }
  // sagas
  [DataActionType.GET_LOGGED_IN_USER_DATA]: SagaDataActionDefaultPayload & {
    id: string
    email: string | undefined
    name: string | undefined
    image: string | undefined
  }
  [DataActionType.UPDATE_USER]: SagaDataActionDefaultPayload & 
    Omit<UpdateDocumentArguments<Omit<UserDocument, "createdAt" | "updatedAt" | "email">>, "path"> & {
    }
  [DataActionType.GET_TASKS_BY_DAYS]: SagaDataActionDefaultPayload & {
    startDay: Date
    endDay: Date
    merge?: Boolean
  }
  [DataActionType.GET_PUBLIC_TASKS]: Omit<SagaDataActionDefaultPayload, "author"> & {
    author: undefined,
    startTime: Date
    endTime: Date
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
  [DataActionType.GET_GOALS_BY_IDS]: SagaDataActionDefaultPayload & {
    ids: string[],
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
  [DataActionType.DELETE_USER]: SagaDataActionDefaultPayload & 
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
  [DataActionType.SET_DATA_PAYLOAD]: (payload: DataActionPayload[DataActionType.SET_DATA_PAYLOAD]) => ({type: DataActionType.SET_DATA_PAYLOAD, payload}),
  // sagas
  [DataActionType.GET_LOGGED_IN_USER_DATA]: (payload: DataActionPayload[DataActionType.GET_LOGGED_IN_USER_DATA]) => ({type: DataActionType.GET_LOGGED_IN_USER_DATA, payload}), 
  [DataActionType.UPDATE_USER]: (payload: DataActionPayload[DataActionType.UPDATE_USER]) => ({type: DataActionType.UPDATE_USER, payload}),
  [DataActionType.GET_TASKS_BY_DAYS]: (payload: DataActionPayload[DataActionType.GET_TASKS_BY_DAYS]) => ({type: DataActionType.GET_TASKS_BY_DAYS, payload}),
  [DataActionType.GET_PUBLIC_TASKS]: (payload: DataActionPayload[DataActionType.GET_PUBLIC_TASKS]) => ({type: DataActionType.GET_PUBLIC_TASKS, payload}),
  [DataActionType.CREATE_TASK]: (payload: DataActionPayload[DataActionType.CREATE_TASK]) => ({type: DataActionType.CREATE_TASK, payload}),
  [DataActionType.UPDATE_TASK]: (payload: DataActionPayload[DataActionType.UPDATE_TASK]) => ({type: DataActionType.UPDATE_TASK, payload}),
  [DataActionType.DELETE_TASK]: (payload: DataActionPayload[DataActionType.DELETE_TASK]) => ({type: DataActionType.DELETE_TASK, payload}),
  [DataActionType.GET_GOALS]: (payload: DataActionPayload[DataActionType.GET_GOALS]) => ({type: DataActionType.GET_GOALS, payload}),
  [DataActionType.GET_GOALS_BY_IDS]: (payload: DataActionPayload[DataActionType.GET_GOALS_BY_IDS]) => ({type: DataActionType.GET_GOALS_BY_IDS, payload}),
  [DataActionType.CREATE_GOAL]: (payload: DataActionPayload[DataActionType.CREATE_GOAL]) => ({type: DataActionType.CREATE_GOAL, payload}),
  [DataActionType.UPDATE_GOAL]: (payload: DataActionPayload[DataActionType.UPDATE_GOAL]) => ({type: DataActionType.UPDATE_GOAL, payload}),
  [DataActionType.DELETE_GOAL]: (payload: DataActionPayload[DataActionType.DELETE_GOAL]) => ({type: DataActionType.DELETE_GOAL, payload}),
  [DataActionType.DELETE_USER]: (payload: DataActionPayload[DataActionType.DELETE_USER]) => ({type: DataActionType.DELETE_USER, payload}),
}

export type DataActionInstance<DataActionTypeT extends DataActionType> = ReturnType<typeof dataActionCreators[DataActionTypeT]>