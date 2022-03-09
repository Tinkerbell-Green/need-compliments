import {takeEvery} from "redux-saga/effects";
import {DataActionType} from "../actions"
import {createTask} from "./createTask";
import {deleteTask} from "./deleteTask"
import {getLoggedInUserData} from "./getLoggedInUserData"
import {getTasksByDays} from "./getTasksByDays"
import {updateTask} from "./updateTask";

export function* dataSaga() {
  yield takeEvery(DataActionType.GET_LOGGED_IN_USER_DATA, getLoggedInUserData)
  yield takeEvery(DataActionType.GET_TASKS_BY_DAYS, getTasksByDays)
  yield takeEvery(DataActionType.CREATE_TASK, createTask)
  yield takeEvery(DataActionType.UPDATE_TASK, updateTask)
  yield takeEvery(DataActionType.DELETE_TASK, deleteTask)
}