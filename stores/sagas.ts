import {all, fork} from "redux-saga/effects";

import {dataSaga} from "./data";


export default function* rootSaga() {
  yield all([
    fork(dataSaga),
  ]);
}