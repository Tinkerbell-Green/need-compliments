import {call, getContext, put} from "redux-saga/effects";
import {dataActionCreators, DataActionInstance, DataActionType} from "../actions";
import {DataSagaStatus} from "../types"; 
import {Repository, UpdateDocumentData} from "utils/firebase";

export function* updateTask(action: DataActionInstance<DataActionType.UPDATE_TASK>) {
  const payload = action.payload  
  const sagaKey = payload.key
  const sagaDataActionType = DataActionType.UPDATE_TASK

  const repository: Repository = yield getContext("repository");

  yield put(
    dataActionCreators[DataActionType.SET_DATA_STATUS]({
      type: sagaDataActionType,
      key: sagaKey,
      status: DataSagaStatus.LOADING
    })
  );

  try {
    const document = {
      ...payload.data,
      author: payload.author,
      updatedAt: new Date().getTime(),
    }
    
    const response: UpdateDocumentData = yield call(
      [repository, repository.updateDocument],
      {
        path: "tasks",
        pathSegments: payload.pathSegments,
        data: document,
      }
    );
    
    yield put(
      dataActionCreators[DataActionType.SET_DATA_DATA]({
        type: sagaDataActionType,
        key: sagaKey,
        data: {
          id: payload.pathSegments[0],
          ...document
        },
      })
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
