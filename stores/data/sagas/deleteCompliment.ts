import {QueryConstraint, where} from "firebase/firestore";
import {call, getContext, put} from "redux-saga/effects";
import {dataActionCreators, DataActionInstance, DataActionType} from "../actions";
import {DataSagaStatus, TaskDocument} from "stores/data/types"; 
import {Repository, DeleteDocumentData, GetDocumentsData, UpdateDocumentData} from "utils/firebase";

export function* deleteCompliment(action: DataActionInstance<DataActionType.DELETE_COMPLIMENT>) {
  const payload = action.payload  
  const sagaKey = payload.key
  const sagaDataActionType = DataActionType.DELETE_COMPLIMENT

  const repository: Repository = yield getContext("repository");

  yield put(
    dataActionCreators[DataActionType.SET_DATA_STATUS]({
      type: sagaDataActionType,
      key: sagaKey,
      status: DataSagaStatus.LOADING
    })
  );

  try {
    // delete compliment
    const deleteComplimentResponse: DeleteDocumentData = yield call(
      [repository, repository.deleteDocument],
      {
        path: "compliments",
        pathSegments: payload.pathSegments
      }
    );

    // get tasks (but it should be one)
    const complimentId = payload.pathSegments[0] || ""

    const queryConstraints: QueryConstraint[] = []
    queryConstraints.push(where("compliments", "array-contains", complimentId))

    const getTasksResponse: GetDocumentsData<TaskDocument> = yield call(
      [repository, repository.getDocuments],
      {
        path: "tasks",
        queryConstraints,
      }
    );

    // update task
    const prevTaskSnapshot = getTasksResponse.docs[0]
    if (!prevTaskSnapshot.id){
      throw Error (`there is no task which has compliment: ${complimentId}`)
    }
    
    const newTaskDocument: TaskDocument = {
      ...prevTaskSnapshot.data(),
      compliments: prevTaskSnapshot.data().compliments.filter(item => item !== complimentId),
      updatedAt: new Date().getTime(),
    }
      
    const updateTaskResponse: UpdateDocumentData = yield call(
      [repository, repository.updateDocument],
      {
        path: "tasks",
        pathSegments: [prevTaskSnapshot.id],
        data: newTaskDocument,
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