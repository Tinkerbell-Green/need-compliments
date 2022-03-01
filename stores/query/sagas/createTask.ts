
import {call, put, select} from "redux-saga/effects";
import { database } from "utils/firebase";
import {SagaStatus} from "../../../type";
import {RootState} from "../../reducers";
import * as actions from "../actions";

export function* createTask(action: actions.CREATE_TASK_Instance) {
  const payload = action.payload

  // yield put(
  //   actions.return__REPLACE({
  //     keyList: ["postComment", "status"],
  //     replacement: SagaStatus.LOADING
  //   }),
  // );

  try {
    const response = yield call(
      database.setDocument,
      {
        path: "tasks";
        pathSegments: [""];
        data: DocumentType;
        options?: SetOptions | undefined;
      }
    );

    // yield put(
    //   actions.return__REPLACE({
    //     keyList: ["postComment", "data"],
    //     replacement: response.data
    //   }),
    // );

    // yield put(
    //   actions.return__REPLACE({
    //     keyList: ["postComment", "status"],
    //     replacement: SagaStatus.SUCCESS
    //   }),
    // );
    
  } catch (error) {
    console.log(error);

    // yield put(
    //   actions.return__REPLACE({
    //     keyList: ["postComment", "status"],
    //     replacement: SagaStatus.ERROR
    //   }),
    // );
  }
}
