import {QueryConstraint, where} from "firebase/firestore";
import {call, getContext, put} from "redux-saga/effects";
import {dataActionCreators, DataActionInstance, DataActionType} from "../actions";
import {DataSagaStatus, TaskDocument} from "stores/data/types"; 
import {Repository, DeleteDocumentData, GetDocumentData, GetDocumentsData} from "utils/firebase";

export function* deleteGoal(action: DataActionInstance<DataActionType.DELETE_GOAL>) {
  const payload = action.payload  
  const sagaKey = payload.key
  const sagaDataActionType = DataActionType.DELETE_GOAL

  const repository: Repository = yield getContext("repository");

  yield put(
    dataActionCreators[DataActionType.SET_DATA_STATUS]({
      type: sagaDataActionType,
      key: sagaKey,
      status: DataSagaStatus.LOADING
    })
  );

  try {
    // delete tasks of the goal
    const queryConstraints: QueryConstraint[] = []
    const goalId = payload.pathSegments[0]
    queryConstraints.push(where("goal", "==", goalId))
  
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

    // delete goal itself
    const response: DeleteDocumentData = yield call(
      [repository, repository.deleteDocument],
      {
        path: "goals",
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
