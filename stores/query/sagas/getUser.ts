
import {call, getContext, put} from "redux-saga/effects";
import {actionCreators, ActionInstance, ActionType} from "../actions";
import {SagaStatus, TaskDocument} from "../types";
import {getQuerySagaKey} from "../utils";
import {GetDocumentReturn, Repository} from "utils/firebase";

export function* getTask(action: ActionInstance<ActionType.GET_TASK>) {
  const payload = action.payload
  const queryActionType = ActionType.GET_TASK

  const queryKey = getQuerySagaKey(action)

  yield put(
    actionCreators[ActionType.SET_QUERY_STATUS]({
      type: queryActionType,
      key: queryKey,
      status: SagaStatus.LOADING
    })
  );

  try {
    const repository: Repository = yield getContext("repository");
    const response: GetDocumentReturn<TaskDocument> = yield call(
      [repository, repository.getDocument],
      {
        path: "tasks",
        pathSegments: payload.pathSegments
      }
    );

    yield put(
      actionCreators[ActionType.SET_QUERY_RESPONSE]({
        type: queryActionType,
        key: queryKey,
        response
      })
    ); 

    yield put(
      actionCreators[ActionType.SET_QUERY_STATUS]({
        type: queryActionType,
        key: queryKey,
        status: SagaStatus.SUCCEEDED
      })
    );
  } catch (error) {
    console.error(error);

    yield put(
      actionCreators[ActionType.SET_QUERY_STATUS]({
        type: queryActionType,
        key: queryKey,
        status: SagaStatus.FAILED
      })
    );
  }
}
