import {call, getContext, put} from "redux-saga/effects";
import {dataActionCreators, DataActionInstance, DataActionType} from "../actions";
import {DataSagaStatus, TaskDocument} from "../types"; 
import {Repository, CreateDocumentData} from "utils/firebase";

export function* createTask(action: DataActionInstance<DataActionType.CREATE_TASK>) {
  const payload = action.payload  
  const sagaKey = payload.key
  const sagaDataActionType = DataActionType.CREATE_TASK

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
      createdAt: new Date().getTime(),
    }

    const response: CreateDocumentData<TaskDocument> = yield call(
      [repository, repository.createDocument],
      {
        path: "tasks",
        data: document
      }
    );

    yield put(
      dataActionCreators[DataActionType.SET_DATA_DATA]({
        type: sagaDataActionType,
        key: sagaKey,
        data: {
          id: response.id,
          ...document,
          compliments: []
        }
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
