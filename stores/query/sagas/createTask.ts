
import {call, put} from "redux-saga/effects";
import * as actions from "../actions";
import {QueryName, QueryStatus, TaskData} from "../types";
import {repository} from "utils/firebase";
import {CreateDocumentReturn} from "utils/firebase";

export function* createTask(action: actions.CREATE_TASK_Instance) {
  const payload = action.payload

  yield put(
    actions.return__SET_QUERY_STATUS({
      name: QueryName.CREATE_TASK,
      status: QueryStatus.LOADING
    }),
  );

  try {
    const response: CreateDocumentReturn<TaskData> = yield call(
      repository.createDocument,
      {
        path: "tasks",
        data: payload.data
      }
    );

    console.log("response: ", response); // TODO: remove

    yield put(
      actions.return__SET_QUERY_RESPONSE({
        name: QueryName.CREATE_TASK,
        response,
      }),
    );

    yield put(
      actions.return__SET_QUERY_STATUS({
        name: QueryName.CREATE_TASK,
        status: QueryStatus.SUCCEEDED
      }),
    );
    
  } catch (error) {
    console.log(error);

    yield put(
      actions.return__SET_QUERY_STATUS({
        name: QueryName.CREATE_TASK,
        status: QueryStatus.FAILED
      }),
    );
  }
}
