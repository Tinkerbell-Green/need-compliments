import {takeEvery} from "redux-saga/effects";
import {ActionType} from "../actions"
import {getLoggedInUserData} from "./getLoggedInUserData"
import {getTasksByDays} from "./getTasksByDays"

export function* dataSaga() {
  yield takeEvery(ActionType.GET_LOGGED_IN_USER_DATA, getLoggedInUserData)
  yield takeEvery(ActionType.GET_TASKS_BY_DAYS, getTasksByDays)
}