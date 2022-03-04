
import {call, getContext, put} from "redux-saga/effects";
import * as actions from "../actions";
import {QueryName, QueryStatus} from "../types";
import {Repository} from "utils/firebase";
import {DeleteDocumentReturn} from "utils/firebase";

export function* getTask(action: actions.GET_TASK_Instance) {
  const payload = action.payload

  yield put(
    actions.return__SET_QUERY_STATUS({
      name: QueryName.GET_TASK,
      status: QueryStatus.LOADING
    }),
  );

  try {
    const repository: Repository = yield getContext("repository");
    const response: DeleteDocumentReturn = yield call(
      [repository, repository.getDocument],
      {
        path: "tasks",
        pathSegments: payload.pathSegments
      }
    );

    yield put(
      actions.return__SET_QUERY_RESPONSE({
        name: QueryName.GET_TASK,
        response,
      }),
    );

    yield put(
      actions.return__SET_QUERY_STATUS({
        name: QueryName.GET_TASK,
        status: QueryStatus.SUCCEEDED
      }),
    );
    
  } catch (error) {
    console.log(error);

    yield put(
      actions.return__SET_QUERY_STATUS({
        name: QueryName.GET_TASK,
        status: QueryStatus.FAILED
      }),
    );
  }
}
