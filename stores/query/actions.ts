import {QueryName, QueryStatus, TaskData} from "./types";
import {CreateDocumentArguments, DeleteDocumentArguments} from "utils/firebase";

export const REPLACE = "query/REPLACE";
type REPLACE_Payload = {
  path: (string | number)[];
  replacement: unknown;
}
export const return__REPLACE = (payload: REPLACE_Payload) => {
  return {
    type: REPLACE,
    payload: payload,
  };
};
export type REPLACE__Instance = ReturnType<typeof return__REPLACE>;

// common
export const SET_QUERY_STATUS = "query/SET_QUERY_STATUS";
type SET_QUERY_STATUS__Payload = {
  name: QueryName
  status: QueryStatus
};
export const return__SET_QUERY_STATUS = (payload: SET_QUERY_STATUS__Payload) => {
  return {
    type: SET_QUERY_STATUS,
    payload: payload,
  };
};
export type SET_QUERY_STATUS_Instance = ReturnType<typeof return__SET_QUERY_STATUS>;

export const SET_QUERY_RESPONSE = "query/SET_QUERY_RESPONSE";
type SET_QUERY_RESPONSE__Payload = {
  name: QueryName
  response: any
};
export const return__SET_QUERY_RESPONSE = (payload: SET_QUERY_RESPONSE__Payload) => {
  return {
    type: SET_QUERY_RESPONSE,
    payload: payload,
  };
};
export type SET_QUERY_RESPONSE_Instance = ReturnType<typeof return__SET_QUERY_RESPONSE>;

// tasks
export const CREATE_TASK = "query/CREATE_TASK";
type CREATE_TASK__Payload = Omit<CreateDocumentArguments<TaskData>, "path"> & {
};
export const return__CREATE_TASK = (payload: CREATE_TASK__Payload) => {
  return {
    type: CREATE_TASK,
    payload: payload,
  };
};
export type CREATE_TASK_Instance = ReturnType<typeof return__CREATE_TASK>;

export const DELETE_TASK = "query/DELETE_TASK";
type DELETE_TASK__Payload = Omit<DeleteDocumentArguments, "path"> & {
};
export const return__DELETE_TASK = (payload: DELETE_TASK__Payload) => {
  return {
    type: DELETE_TASK,
    payload: payload,
  };
};
export type DELETE_TASK_Instance = ReturnType<typeof return__DELETE_TASK>;
