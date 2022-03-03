
import {call, getContext, put} from "redux-saga/effects";
import * as actions from "../actions";
import {QueryName, QueryStatus, TaskData} from "../types";
import {Repository, CreateDocumentArguments} from "utils/firebase";
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
    const args: CreateDocumentArguments<TaskData> = {
      path: "tasks",
      data: {
        ...payload.data,
        id: "fdfdfdfdfefed",
        updatedAt: new Date().toString(),
        createdAt: new Date().toString(),
        compliments: [],
      }
    }

    const repository: Repository = yield getContext("repository");
    const response: CreateDocumentReturn<TaskData> = yield call(
      [repository, repository.createDocument],
      args
    );

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
