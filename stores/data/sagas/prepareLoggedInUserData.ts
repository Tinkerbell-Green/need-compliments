import {call, getContext, put} from "redux-saga/effects";
import {actionCreators, ActionInstance, ActionType} from "../actions";
import {DataSagaStatus, LOGGED_IN_USER_ID, UserData} from "../types";
import {SetDocumentData} from "./../../../utils/firebase/repository/index";
import {UserDocument} from "stores/query";
import {GetDocumentData, GetDocumentsData, Repository} from "utils/firebase";

export function* prepareLoggedInUserData(action: ActionInstance<ActionType.PRERARE_LOGGED_IN_USER_DATA>) {
  const payload = action.payload
  const sagaActionType = ActionType.PRERARE_LOGGED_IN_USER_DATA
  const repository: Repository = yield getContext("repository");

  yield put(
    actionCreators[ActionType.SET_DATA_STATUS]({
      authorId: LOGGED_IN_USER_ID,
      type: sagaActionType,
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

    if (response.exists()) { // there is user in server 
      const data: UserData = {
        id: payload.id,
        ...response.data()
      }
  

      // WIP: update data store
      yield put(
        actionCreators[ActionType.SET_DATA_DATA]({
          authorId: LOGGED_IN_USER_ID,
          type: sagaActionType,
          key: "",
          data
        })
      ); 
    } 
    else {
      const response: SetDocumentData = yield call(
        [repository, repository.setDocument],
        {
          path: "users",
          pathSegments: [payload.id],
          data: {
            email: payload.email || "",
            name: payload.name || "",
            image: payload.image || "",
            followers: [],
            followings: [],
            createdAt: new Date().toString(),
          }
        }
      );

      // WIP: update data store
    }

    yield put(
      actionCreators[ActionType.SET_DATA_STATUS]({
        authorId: LOGGED_IN_USER_ID,
        type: sagaActionType,
        status: DataSagaStatus.SUCCEEDED
      })
    );
  } catch (error) {
    console.error(error);

    yield put(
      actionCreators[ActionType.SET_DATA_STATUS]({
        authorId: LOGGED_IN_USER_ID,
        type: sagaActionType,
        status: DataSagaStatus.FAILED
      })
    );
  }
}
