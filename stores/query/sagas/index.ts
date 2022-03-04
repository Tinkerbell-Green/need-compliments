import {takeEvery} from "redux-saga/effects";
import * as actions from "../actions"
import {createTask} from "./createTask";
import {deleteTask} from "./deleteTask";
import {getTask} from "./getTask";

export function* querySaga() {
  yield takeEvery(actions.CREATE_TASK, createTask);  
  yield takeEvery(actions.DELETE_TASK, deleteTask);  
  yield takeEvery(actions.GET_TASK, getTask);  
}