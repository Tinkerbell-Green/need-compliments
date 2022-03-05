
import {call, getContext, put} from "redux-saga/effects";
import {actionCreators, ActionInstance, ActionType} from "../../query/actions";
import {SagaStatus, TaskDocument} from "../types";
import {getQuerySagaKey} from "../utils";
import {Repository, UpdateDocumentArguments} from "utils/firebase";
import {UpdateDocumentReturn} from "utils/firebase";

export function* updateTask(action: ActionInstance<ActionType.UPDATE_TASK>) {
  const payload = action.payload
  const queryActionType = ActionType.UPDATE_TASK

  const queryKey = getQuerySagaKey(action)

  yield put(
    actionCreators[ActionType.SET_QUERY_STATUS]({
      type: queryActionType,
      key: queryKey,
      status: SagaStatus.LOADING
    })
  );

  try {
    const args: UpdateDocumentArguments<TaskDocument> = {
      path: "tasks",
      pathSegments: payload.pathSegments,
      data: {
        ...payload.data,
        updatedAt: new Date().toString(),
        compliments: [],
      }
    }

    const repository: Repository = yield getContext("repository");
    const response: UpdateDocumentReturn = yield call(
      [repository, repository.updateDocument],
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
