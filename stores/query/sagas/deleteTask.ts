
import {call, getContext, put} from "redux-saga/effects";
import * as actions from "../actions";
import {QueryName, QueryStatus, TaskData} from "../types";
import {Repository, repository} from "utils/firebase";
import {DeleteDocumentReturn} from "utils/firebase";

export function* deleteTask(action: actions.DELETE_TASK_Instance) {
  const payload = action.payload

  yield put(
    actions.return__SET_QUERY_STATUS({
      name: QueryName.DELETE_TASK,
      status: QueryStatus.LOADING
    }),
  );

  try {
    const repository: Repository = yield getContext("repository");
    const response: DeleteDocumentReturn = yield call(
      [repository, repository.deleteDocument],
      {
        path: "tasks",
        pathSegments: payload.pathSegments
      }
    );

    yield put(
      actions.return__SET_QUERY_RESPONSE({
        name: QueryName.DELETE_TASK,
        response,
      }),
    );

    yield put(
      actions.return__SET_QUERY_STATUS({
        name: QueryName.DELETE_TASK,
        status: QueryStatus.SUCCEEDED
      }),
    );
    
  } catch (error) {
    console.log(error);

    yield put(
      actions.return__SET_QUERY_STATUS({
        name: QueryName.DELETE_TASK,
        status: QueryStatus.FAILED
      }),
    );
  }
}
