
import {call, getContext, put} from "redux-saga/effects";
import {SagaStatus, TaskDocument} from "../types";
import {actionCreators, ActionInstance} from "../../query/actions";
import {getQuerySagaKey} from "./../utils";
import {ActionType} from "stores/query";
import {Repository, CreateDocumentArguments} from "utils/firebase";
import {CreateDocumentReturn} from "utils/firebase";

export function* createTask(action: ActionInstance<ActionType.CREATE_TASK>) {
  const payload = action.payload
  const queryActionType = ActionType.CREATE_TASK

  const queryKey = getQuerySagaKey(action)

  yield put(
    actionCreators[ActionType.SET_QUERY_STATUS]({
      type: queryActionType,
      key: queryKey,
      status: SagaStatus.LOADING
    })
  );

  try {
    const args: CreateDocumentArguments<TaskDocument> = {
      path: "tasks",
      data: {
        ...payload.data,
        updatedAt: new Date().toString(),
        createdAt: new Date().toString(),
        compliments: [],
      }
    }

    const repository: Repository = yield getContext("repository");
    const response: CreateDocumentReturn<TaskDocument> = yield call(
      [repository, repository.createDocument],
      args
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
