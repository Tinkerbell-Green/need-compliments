
import {call, getContext, put} from "redux-saga/effects";
import * as actions from "../actions";
import {QueryName, QueryStatus, TaskData} from "../types";
import {actionCreators, ActionInstance} from "./../actions";
import {getQueryKey} from "./../utils";
import {ActionType} from "stores/query";
import {Repository, CreateDocumentArguments} from "utils/firebase";
import {CreateDocumentReturn} from "utils/firebase";

export function* createTask(action: ActionInstance<ActionType.CREATE_TASK>) {
  const payload = action.payload

  const queryKey = getQueryKey(action)

  yield put(
    actionCreators[ActionType.SET_QUERY_STATUS]({
      type: ActionType.CREATE_TASK,
      key: queryKey,
      status: QueryStatus.LOADING
    })
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
      actionCreators[ActionType.SET_QUERY_RESPONSE]({
        type: ActionType.CREATE_TASK,
        key: queryKey,
        response
      })
    ); 

    yield put(
      actionCreators[ActionType.SET_QUERY_STATUS]({
        type: ActionType.CREATE_TASK,
        key: queryKey,
        status: QueryStatus.SUCCEEDED
      })
    );  
  } catch (error) {
    console.error(error);

    yield put(
      actionCreators[ActionType.SET_QUERY_STATUS]({
        type: ActionType.CREATE_TASK,
        key: queryKey,
        status: QueryStatus.FAILED
      })
    );
  }
}
