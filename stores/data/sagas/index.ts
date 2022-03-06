import {takeEvery} from "redux-saga/effects";
import {DataActionType} from "../actions"
import {getLoggedInUserData} from "./getLoggedInUserData"
import {getTasksByDays} from "./getTasksByDays"

export function* dataSaga() {
  yield takeEvery(DataActionType.GET_LOGGED_IN_USER_DATA, getLoggedInUserData)
  yield takeEvery(DataActionType.GET_TASKS_BY_DAYS, getTasksByDays)
}