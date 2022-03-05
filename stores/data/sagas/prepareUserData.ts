import { UserDocument } from './../../query copy/types';

import {call, getContext, put} from "redux-saga/effects";
import {actionCreators, ActionInstance, ActionType} from "../actions";
import {DataSagaStatus} from "../types";
import {getDataSagaKey} from "../utils";
import {GetDocumentReturn, Repository} from "utils/firebase";

export function* prepareUserData(action: ActionInstance<ActionType.PRERARE_USER_DATA>) {
  const payload = action.payload
  const queryActionType = ActionType.PRERARE_USER_DATA

  const queryKey = getDataSagaKey(action)

  yield put(
    actionCreators[ActionType.SET_DATA_STATUS]({
      type: queryActionType,
      key: queryKey,
      status: DataSagaStatus.LOADING
    })
  );

  try {
    const repository: Repository = yield getContext("repository");
    const response: GetDocumentReturn<UserDocument> = yield call(
      [repository, repository.getDocument],
      {
        path: "tasks",
        pathSegments: [payload.userId]
      }
    );

    yield put(
      actionCreators[ActionType.SET_DATA_DATA]({
        type: queryActionType,
        key: queryKey,
        data: response.
      })
    ); 

    yield put(
      actionCreators[ActionType.SET_DATA_STATUS]({
        type: queryActionType,
        key: queryKey,
        status: DataSagaStatus.SUCCEEDED
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
