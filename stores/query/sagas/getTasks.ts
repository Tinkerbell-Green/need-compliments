
import {DocumentData} from "firebase/firestore";
import {call, getContext, put} from "redux-saga/effects";
import {actionCreators, ActionInstance, ActionType} from "../actions";
import {SagaStatus} from "../types";
import {getQuerySagaKey} from "../utils";
import {GetDocumentsReturn, Repository} from "utils/firebase";

export function* getTasks(action: ActionInstance<ActionType.GET_TASKS>) {
  const payload = action.payload
  const queryActionType = ActionType.GET_TASKS

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
    const response: GetDocumentsReturn<DocumentData> = yield call(
      [repository, repository.getDocuments],
      {
        path: "tasks",
        queryConstraints: payload.queryConstraints
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
