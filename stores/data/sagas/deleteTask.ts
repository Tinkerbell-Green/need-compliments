import {call, getContext, put} from "redux-saga/effects";
import {dataActionCreators, DataActionInstance, DataActionType} from "../actions";
import {DataSagaStatus} from "../types"; 
import {Repository, DeleteDocumentData} from "utils/firebase";

export function* deleteTask(action: DataActionInstance<DataActionType.DELETE_TASK>) {
  const payload = action.payload  
  const sagaKey = payload.key
  const sagaDataActionType = DataActionType.DELETE_TASK

  const repository: Repository = yield getContext("repository");

  yield put(
    dataActionCreators[DataActionType.SET_DATA_STATUS]({
      type: sagaDataActionType,
      key: sagaKey,
      status: DataSagaStatus.LOADING
    })
  );

  try {
    const response: DeleteDocumentData = yield call(
      [repository, repository.deleteDocument],
      {
        path: "tasks",
        pathSegments: payload.pathSegments
      }
    );

    yield put(
      dataActionCreators[DataActionType.SET_DATA_STATUS]({
        type: sagaDataActionType,
        key: sagaKey,
        status: DataSagaStatus.SUCCEEDED
      })
    );
  } catch (error) {
    console.error(error);

    yield put(
      dataActionCreators[DataActionType.SET_DATA_STATUS]({
        type: sagaDataActionType,
        key: sagaKey,
        status: DataSagaStatus.FAILED
      })
    );
  }
}
