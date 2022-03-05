import {takeEvery} from "redux-saga/effects";
import {ActionType} from "../actions"
import {prepareUserData} from "./prepareUserData"


export function* dataSaga() {
  yield takeEvery(ActionType.PRERARE_USER_DATA, prepareUserData)
}