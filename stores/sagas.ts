import {all, fork} from "redux-saga/effects";

import {querySaga} from "./query";


export default function* rootSaga() {
  yield all([
    fork(querySaga),
  ]);
}