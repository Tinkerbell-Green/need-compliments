import {QueryName, QueryStatus, TaskData} from "./types";
import {CreateDocumentArguments, DeleteDocumentArguments, GetDocumentArguments} from "utils/firebase";



export enum ActionType {
  REPLACE = "query/REPLACE",
  SET_QUERY_STATUS = "query/SET_QUERY_STATUS",
  SET_QUERY_RESPONSE = "query/SET_QUERY_RESPONSE",
  
  CREATE_TASK = "query/CREATE_TASK",
  DELETE_TASK = "query/DELETE_TASK",
  GET_TASK = "query/GET_TASK",
}

export type QueryActionType = (
  ActionType.CREATE_TASK |
  ActionType.DELETE_TASK |
  ActionType.GET_TASK
)

export type ActionPayload = {
  [ActionType.REPLACE]: {
    path: (string | number)[];
    replacement: unknown;
  }
  [ActionType.SET_QUERY_STATUS]: {
    type: ActionType,
    key: string
    status: QueryStatus
  }
  [ActionType.SET_QUERY_RESPONSE]: {
    type: ActionType,
    key: string
    response: any
  }
  [ActionType.CREATE_TASK]: Omit<CreateDocumentArguments<
    Omit<TaskData, "id" | "createdAt" | "updatedAt" | "compliments">>, "path"
  > & {}
  [ActionType.DELETE_TASK]: Omit<DeleteDocumentArguments, "path"> & {}
  [ActionType.GET_TASK]: Omit<GetDocumentArguments, "path"> & {}
}

export const actionCreators = {
  [ActionType.REPLACE]: (payload: ActionPayload[ActionType.REPLACE]) => ({type: ActionType.REPLACE, payload}),
  [ActionType.SET_QUERY_STATUS]: (payload: ActionPayload[ActionType.SET_QUERY_STATUS]) => ({type: ActionType.SET_QUERY_STATUS, payload}),
  [ActionType.SET_QUERY_RESPONSE]: (payload: ActionPayload[ActionType.SET_QUERY_RESPONSE]) => ({type: ActionType.SET_QUERY_RESPONSE, payload}),
  [ActionType.CREATE_TASK]: (payload: ActionPayload[ActionType.CREATE_TASK]) => ({type: ActionType.CREATE_TASK, payload}),
  [ActionType.DELETE_TASK]: (payload: ActionPayload[ActionType.DELETE_TASK]) => ({type: ActionType.DELETE_TASK, payload}),
  [ActionType.GET_TASK]: (payload: ActionPayload[ActionType.GET_TASK]) => ({type: ActionType.GET_TASK, payload}),
}

export type ActionInstance<ActionTypeT extends ActionType> = ReturnType<typeof actionCreators[ActionTypeT]>

// // export const REPLACE = "query/REPLACE";
// // type REPLACE_Payload = {
// //   path: (string | number)[];
// //   replacement: unknown;
// // }
// // export const return__REPLACE = (payload: REPLACE_Payload) => {
// //   return {
// //     type: REPLACE,
// //     payload: payload,
// //   };
// // };
// // export type REPLACE__Instance = ReturnType<typeof return__REPLACE>;

// // common
// export const SET_QUERY_STATUS = "query/SET_QUERY_STATUS";
// type SET_QUERY_STATUS__Payload = {
//   name: QueryName
//   status: QueryStatus
// };
// export const return__SET_QUERY_STATUS = (payload: SET_QUERY_STATUS__Payload) => {
//   return {
//     type: SET_QUERY_STATUS,
//     payload: payload,
//   };
// };
// export type SET_QUERY_STATUS_Instance = ReturnType<typeof return__SET_QUERY_STATUS>;

// export const SET_QUERY_RESPONSE = "query/SET_QUERY_RESPONSE";
// type SET_QUERY_RESPONSE__Payload = {
//   name: QueryName
//   response: any
// };
// export const return__SET_QUERY_RESPONSE = (payload: SET_QUERY_RESPONSE__Payload) => {
//   return {
//     type: SET_QUERY_RESPONSE,
//     payload: payload,
//   };
// };
// export type SET_QUERY_RESPONSE_Instance = ReturnType<typeof return__SET_QUERY_RESPONSE>;

// // tasks
// export const CREATE_TASK = "query/CREATE_TASK";
// type CREATE_TASK__Payload = Omit<CreateDocumentArguments<
//   Omit<TaskData, "id" | "createdAt" | "updatedAt" | "compliments">>, "path"
// > & {};
// export const return__CREATE_TASK = (payload: CREATE_TASK__Payload) => {
//   return {
//     type: CREATE_TASK,
//     payload: payload,
//   };
// };
// export type CREATE_TASK_Instance = ReturnType<typeof return__CREATE_TASK>;

// export const DELETE_TASK = "query/DELETE_TASK";
// type DELETE_TASK__Payload = Omit<DeleteDocumentArguments, "path"> & {
// };
// export const return__DELETE_TASK = (payload: DELETE_TASK__Payload) => {
//   return {
//     type: DELETE_TASK,
//     payload: payload,
//   };
// };
// export type DELETE_TASK_Instance = ReturnType<typeof return__DELETE_TASK>;

// export const GET_TASK = "query/GET_TASK";
// type GET_TASK__Payload = Omit<GetDocumentArguments, "path"> & {
// };
// export const return__GET_TASK = (payload: GET_TASK__Payload) => {
//   return {
//     type: GET_TASK,
//     payload: payload,
//   };
// };
// export type GET_TASK_Instance = ReturnType<typeof return__GET_TASK>;
