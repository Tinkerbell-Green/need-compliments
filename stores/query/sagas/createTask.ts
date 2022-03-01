
import {call, put, select} from "redux-saga/effects";
import {RootState} from "../../reducers";
import * as actions from "../actions";
import {TaskData} from "../types";
import {AddDocumentReturn} from "./../../../utils/firebase/database/index";
import {database} from "utils/firebase";

export function* createTask(action: actions.CREATE_TASK_Instance) {
  const payload = action.payload

  // yield put(
  //   actions.return__REPLACE({
  //     keyList: ["postComment", "status"],
  //     replacement: SagaStatus.LOADING
  //   }),
  // );

  try {
    const response: AddDocumentReturn<TaskData> = yield call(
      database.addDocument,
      {
        path: "tasks",
        data: payload.data
      }
    );

    console.log("response: ", response); // TODO: remove

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
