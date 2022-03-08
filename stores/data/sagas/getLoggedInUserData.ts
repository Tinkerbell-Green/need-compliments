import {call, getContext, put} from "redux-saga/effects";
import {dataActionCreators, DataActionInstance, DataActionType} from "../actions";
import {DataSagaStatus, UserData, UserDocument} from "../types";
import {GetDocumentData, Repository, SetDocumentData} from "utils/firebase";

export function* getLoggedInUserData(action: DataActionInstance<DataActionType.GET_LOGGED_IN_USER_DATA>) {
  const payload = action.payload  
  const sagaKey = payload.key
  const sagaDataActionType = DataActionType.GET_LOGGED_IN_USER_DATA

  const repository: Repository = yield getContext("repository");

  yield put(
    dataActionCreators[DataActionType.SET_DATA_STATUS]({
      type: sagaDataActionType,
      key: sagaKey,
      status: DataSagaStatus.LOADING
    })
  );

  try {
    const response: GetDocumentData<UserDocument> = yield call(
      [repository, repository.getDocument],
      {
        path: "users",
        pathSegments: [payload.id]
      }
    );

    if (response.exists()) { 
      const data: UserData = {
        id: payload.id,
        ...response.data()
      }

      yield put(
        dataActionCreators[DataActionType.SET_DATA_DATA]({
          type: sagaDataActionType,
          key: sagaKey,
          data
        })
      ); 
    } 
    else { // new user!
      const newDocument: UserDocument = {
        email: payload.email || "",
        name: payload.name || "",
        image: payload.image || "",
        followers: [],
        followings: [],
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      }

      const response: SetDocumentData = yield call(
        [repository, repository.setDocument],
        {
          path: "users",
          pathSegments: [payload.id],
          data: newDocument
        }
      );

      yield put(
        dataActionCreators[DataActionType.SET_DATA_DATA]({
          type: sagaDataActionType,
          key: sagaKey,
          data: {
            id: payload.id,
            ...newDocument
          }
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
