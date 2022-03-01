import {takeEvery} from "redux-saga/effects";
import * as actions from "../actions"
import {createTask} from "./createTask";

export function* querySaga() {
  yield takeEvery(actions.CREATE_TASK, createTask);  
}