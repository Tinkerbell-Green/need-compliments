
import {call, put, select} from "redux-saga/effects";
import {SagaStatus} from "../../../type";
import {RootState} from "../../reducers";
import * as actions from "../actions";
import {PostCommentData} from "./types";

export function* createTask(action: actions.CREATE_TASK_Instance) {
  const payload = action.payload

  // yield put(
  //   actions.return__REPLACE({
  //     keyList: ["postComment", "status"],
  //     replacement: SagaStatus.LOADING
  //   }),
  // );

  try {
    

    yield put(
      actions.return__REPLACE({
        keyList: ["postComment", "data"],
        replacement: response.data
      }),
    );

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
