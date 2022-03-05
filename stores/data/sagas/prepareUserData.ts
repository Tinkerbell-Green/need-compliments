import {call, getContext, put} from "redux-saga/effects";
import {actionCreators, ActionInstance, ActionType} from "../actions";
import {DataSagaStatus} from "../types";
import {getDataSagaKey} from "../utils";
import {UserDocument} from "stores/query";
import {GetDocumentData, Repository} from "utils/firebase";

export function* prepareUserData(action: ActionInstance<ActionType.PRERARE_USER_DATA>) {
  const payload = action.payload
  const queryActionType = ActionType.PRERARE_USER_DATA

  const queryKey = getDataSagaKey(action)

  yield put(
    actionCreators[ActionType.SET_DATA_STATUS]({
      authorId: payload.authorId,
      type: queryActionType,
      status: DataSagaStatus.LOADING
    })
  );

  try {
    const repository: Repository = yield getContext("repository");
    const response: GetDocumentData<UserDocument> = yield call(
      [repository, repository.getDocument],
      {
        path: "users",
        pathSegments: [payload.authorId]
      }
    );

    yield put(
      actionCreators[ActionType.SET_DATA_DATA]({
        authorId: payload.authorId,
        type: queryActionType,
        data: response.data()
      })
    ); 

    yield put(
      actionCreators[ActionType.SET_DATA_STATUS]({
        authorId: payload.authorId,
        type: queryActionType,
        status: DataSagaStatus.SUCCEEDED
      })
    );
  } catch (error) {
    console.error(error);

    yield put(
      actionCreators[ActionType.SET_DATA_STATUS]({
        authorId: payload.authorId,
        type: queryActionType,
        status: DataSagaStatus.FAILED
      })
    );
  }
}
