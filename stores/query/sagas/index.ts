import {takeEvery} from "redux-saga/effects";
import {ActionType} from "../actions"
import {createTask} from "./createTask";
import {deleteTask} from "./deleteTask";
import {getTask} from "./getTask";
import {getTasks} from "./getTasks";
import {updateTask} from "./updateTask";

export function* querySaga() {
  yield takeEvery(ActionType.CREATE_TASK, createTask);  
  yield takeEvery(ActionType.UPDATE_TASK, updateTask);  
  yield takeEvery(ActionType.DELETE_TASK, deleteTask);  
  yield takeEvery(ActionType.GET_TASK, getTask);  
  yield takeEvery(ActionType.GET_TASK, getTasks);  
}