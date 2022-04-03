import {call, getContext, put} from "redux-saga/effects";
import {dataActionCreators, DataActionInstance, DataActionType} from "../actions";
import {DataSagaStatus, GoalDocument} from "../types"; 
import {Repository, CreateDocumentData} from "utils/firebase";

export function* createGoal(action: DataActionInstance<DataActionType.CREATE_GOAL>) {
  const payload = action.payload  
  const sagaKey = payload.key
  const sagaDataActionType = DataActionType.CREATE_GOAL

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

    const response: CreateDocumentData<GoalDocument> = yield call(
      [repository, repository.createDocument],
      {
        path: "goals",
        data: document
      }
    );

    yield put(
      dataActionCreators[DataActionType.SET_DATA_DATA]({
        type: sagaDataActionType,
        key: sagaKey,
        data: {
          id: response.id,
          ...document
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
