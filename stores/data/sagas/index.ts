import {takeEvery} from "redux-saga/effects";
import {ActionType} from "../actions"
import {getLoggedInUserData} from "./getLoggedInUserData"

export function* dataSaga() {
  yield takeEvery(ActionType.GET_LOGGED_IN_USER_DATA, getLoggedInUserData)
}