import {call, put} from "redux-saga/effects";
import {dataActionCreators, DataActionInstance, DataActionType} from "../actions";
import {DataSagaStatus} from "../types";
import {usersService} from "apis"

export function* getLoggedInUserData(action: DataActionInstance<DataActionType.GET_LOGGED_IN_USER_DATA>) {
  const payload = action.payload  
  const sagaKey = payload.key
  const sagaDataActionType = DataActionType.GET_LOGGED_IN_USER_DATA

  yield put(
    dataActionCreators[DataActionType.SET_DATA_STATUS]({
      type: sagaDataActionType,
      key: sagaKey,
      status: DataSagaStatus.LOADING
    })
  );

  try {
    try {
      const response: Awaited<ReturnType<typeof usersService.getUser>> = yield call(
        usersService.getUser,
        payload.input.userId
      );

      // there is user
      yield put(
        dataActionCreators[DataActionType.SET_DATA_DATA]({
          type: sagaDataActionType,
          key: sagaKey,
          data: response.data
        })
      ); 
    }
    catch {
      // there is no user for that id, so we have to create user
      const response: Awaited<ReturnType<typeof usersService.createUser>> = yield call(
        usersService.createUser,
        {
          ...payload.input,
        }
      );

      yield put(
        dataActionCreators[DataActionType.SET_DATA_DATA]({
          type: sagaDataActionType,
          key: sagaKey,
          data: response.data
        })
      );
    }

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