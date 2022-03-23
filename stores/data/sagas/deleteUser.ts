import {QueryConstraint, where} from "firebase/firestore";
import {call, getContext, put} from "redux-saga/effects";
import {dataActionCreators, DataActionInstance, DataActionType} from "../actions";
import {DataSagaStatus} from "../types";
import {GoalDocument} from "./../types";
import {TaskDocument} from "stores/data/types";
import {Repository, DeleteDocumentData, GetDocumentsData} from "utils/firebase";

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

  try {
    // delete tasks of user
    const queryConstraints: QueryConstraint[] = []
    const authorId = payload.pathSegments[0]
    queryConstraints.push(where("author", "==", authorId))
  
    const getTasksResponse: GetDocumentsData<TaskDocument> = yield call(
      [repository, repository.getDocuments],
      {
        path: "tasks",
        queryConstraints,
      }
    );
    yield call(
      [repository, repository.deleteDocuments],
      {
        refs: getTasksResponse.docs.map(item => item.ref)
      }
    )

    // delete goals of user
    const getGoalsResponse: GetDocumentsData<GoalDocument> = yield call(
      [repository, repository.getDocuments],
      {
        path: "goals",
        queryConstraints,
      }
    );
    yield call(
      [repository, repository.deleteDocuments],
      {
        refs: getGoalsResponse.docs.map(item => item.ref)
      }
    )
      
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