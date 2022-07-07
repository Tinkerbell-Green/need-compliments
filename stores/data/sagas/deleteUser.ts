import {call, put} from "redux-saga/effects";
import {dataActionCreators, DataActionInstance, DataActionType} from "../actions";
import {DataSagaStatus} from "../types";
import {usersService} from "apis";

export function* deleteUser(
  action:DataActionInstance<DataActionType.DELETE_USER>){
  const payload = action.payload;
  const sagakey = payload.key;
  const sagaDataActionType = DataActionType.DELETE_USER;

  yield put(
    dataActionCreators[DataActionType.SET_DATA_STATUS]({
      type: sagaDataActionType,
      key: sagakey,
      status: DataSagaStatus.LOADING,
    })
  );

  try {
    const response: Awaited<ReturnType<typeof usersService.deleteUser>> = yield call(
      usersService.deleteUser,
      payload.id
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