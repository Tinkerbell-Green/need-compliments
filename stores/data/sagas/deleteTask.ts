
import {call, getContext, put} from "redux-saga/effects";
import {actionCreators, ActionInstance,  ActionType} from "../../query/actions";
import {SagaStatus} from "../types";
import {getQuerySagaKey} from "../utils";
import {Repository} from "utils/firebase";
import {DeleteDocumentReturn} from "utils/firebase";

export function* deleteTask(action: ActionInstance<ActionType.DELETE_TASK>) {
  const payload = action.payload
  const queryActionType = ActionType.DELETE_TASK

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
    const response: DeleteDocumentReturn = yield call(
      [repository, repository.deleteDocument],
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
    console.log(error);

    yield put(
      actionCreators[ActionType.SET_QUERY_STATUS]({
        type: queryActionType,
        key: queryKey,
        status: SagaStatus.FAILED
      })
    );
  }
}
