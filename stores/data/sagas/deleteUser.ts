import {call, getContext, put} from "redux-saga/effects";
import {dataActionCreators, DataActionInstance, DataActionType} from "../actions";
import {DataSagaStatus} from "../types";
import {Repository, DeleteDocumentData} from "utils/firebase";

export function* deleteUser(
  action:DataActionInstance<DataActionType.DELETE_USER>){
  const payload = action.payload;
  const sagakey = payload.key;
  const sagaDataActionType = DataActionType.DELETE_USER;

  const repository: Repository = yield getContext("repository");

  yield put(
    dataActionCreators[DataActionType.SET_DATA_STATUS]({
      type: sagaDataActionType,
      key: sagakey,
      status: DataSagaStatus.LOADING,
    })
  );

  try{
    const response: DeleteDocumentData = yield call(
      [repository, repository.deleteDocument],
      {
        path: "users",
        pathSegments: payload.pathSegments,
      }
    );

    yield put(
      dataActionCreators[DataActionType.SET_DATA_STATUS]({
        type: sagaDataActionType,
        key: sagakey,
        status: DataSagaStatus.SUCCEEDED,
      })
    );
  }catch(error){
    console.error(error);

    yield put(
      dataActionCreators[DataActionType.SET_DATA_STATUS]({
        type: sagaDataActionType,
        key: sagakey,
        status: DataSagaStatus.FAILED,
      })
    )
  }



}