import {SagaStatus, TaskDocument} from "./types";
import {CreateDocumentArguments, DeleteDocumentArguments, GetDocumentArguments, GetDocumentsArguments, UpdateDocumentArguments} from "utils/firebase";

export enum ActionType {
  REPLACE = "query/REPLACE",
  SET_QUERY_STATUS = "query/SET_QUERY_STATUS",
  SET_QUERY_RESPONSE = "query/SET_QUERY_RESPONSE",
  // tasks
  CREATE_TASK = "query/CREATE_TASK",
  UPDATE_TASK = "query/UPDATE_TASK",
  DELETE_TASK = "query/DELETE_TASK",
  GET_TASK = "query/GET_TASK",
  GET_TASKS = "query/GET_TASKS",
  // users
  GET_USER = "query/GET_TASK",
}

export type SagaActionType = (
  ActionType.CREATE_TASK |
  ActionType.UPDATE_TASK |
  ActionType.DELETE_TASK |
  ActionType.GET_TASK |
  ActionType.GET_TASKS | 

  ActionType.GET_USER
)

export type ActionPayload = {
  [ActionType.REPLACE]: {
    path: (string | number)[];
    replacement: unknown;
  }
  [ActionType.SET_QUERY_STATUS]: {
    type: SagaActionType,
    key: string
    status: SagaStatus
  }
  [ActionType.SET_QUERY_RESPONSE]: {
    type: SagaActionType,
    key: string
    response: any
  }
  // tasks
  [ActionType.CREATE_TASK]: Omit<CreateDocumentArguments<
    Omit<TaskDocument, "createdAt" | "updatedAt" | "compliments">>, "path"
  > & {}
  [ActionType.UPDATE_TASK]: Omit<UpdateDocumentArguments<TaskDocument>, "path"> & {}
  [ActionType.DELETE_TASK]: Omit<DeleteDocumentArguments, "path"> & {}
  [ActionType.GET_TASK]: Omit<GetDocumentArguments, "path"> & {}
  [ActionType.GET_TASKS]: Omit<GetDocumentsArguments, "path"> & {}
  // users
  [ActionType.GET_USER]: Omit<GetDocumentArguments, "path"> & {}
}

export const actionCreators = {
  [ActionType.REPLACE]: (payload: ActionPayload[ActionType.REPLACE]) => ({type: ActionType.REPLACE, payload}),
  [ActionType.SET_QUERY_STATUS]: (payload: ActionPayload[ActionType.SET_QUERY_STATUS]) => ({type: ActionType.SET_QUERY_STATUS, payload}),
  [ActionType.SET_QUERY_RESPONSE]: (payload: ActionPayload[ActionType.SET_QUERY_RESPONSE]) => ({type: ActionType.SET_QUERY_RESPONSE, payload}),
  // tasks
  [ActionType.CREATE_TASK]: (payload: ActionPayload[ActionType.CREATE_TASK]) => ({type: ActionType.CREATE_TASK, payload}),
  [ActionType.UPDATE_TASK]: (payload: ActionPayload[ActionType.UPDATE_TASK]) => ({type: ActionType.UPDATE_TASK, payload}),
  [ActionType.DELETE_TASK]: (payload: ActionPayload[ActionType.DELETE_TASK]) => ({type: ActionType.DELETE_TASK, payload}),
  [ActionType.GET_TASK]: (payload: ActionPayload[ActionType.GET_TASK]) => ({type: ActionType.GET_TASK, payload}),
  [ActionType.GET_TASKS]: (payload: ActionPayload[ActionType.GET_TASKS]) => ({type: ActionType.GET_TASKS, payload}),
  // users
  [ActionType.GET_USER]: (payload: ActionPayload[ActionType.GET_USER]) => ({type: ActionType.GET_USER, payload}),
}

export type ActionInstance<ActionTypeT extends ActionType> = ReturnType<typeof actionCreators[ActionTypeT]>