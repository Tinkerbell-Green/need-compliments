import {call, getContext, put} from "redux-saga/effects";
import {dataActionCreators, DataActionInstance, DataActionType} from "../actions";
import {DataSagaStatus, ComplimentDocument} from "../types";
import {TaskDocument} from "stores/data/types";
import {Repository, CreateDocumentData, GetDocumentData, UpdateDocumentData} from "utils/firebase";

export function* createComplimentOnTask(action: DataActionInstance<DataActionType.CREATE_COMPLIMENT_ON_TASK>) {
  const payload = action.payload  
  const sagaKey = payload.key
  const sagaDataActionType = DataActionType.CREATE_COMPLIMENT_ON_TASK

  const repository: Repository = yield getContext("repository");

  yield put(
    dataActionCreators[DataActionType.SET_DATA_STATUS]({
      type: sagaDataActionType,
      key: sagaKey,
      status: DataSagaStatus.LOADING
    })
  );

  try {
    // get task 
    const getTaskResponse: GetDocumentData<TaskDocument> = yield call(
      [repository, repository.getDocument],
      {
        path: "tasks",
        pathSegments: [payload.data.task]
      }
    );

    const taskDocument = getTaskResponse.data()
    if (!taskDocument){
      throw Error ("there is no task of this id")
    }

    // create compliement
    const complimentDocument = {
      ...payload.data,
      author: payload.author,
      updatedAt: new Date().getTime(),
      createdAt: new Date().getTime(),
    }

    const createComplimentResponse: CreateDocumentData<ComplimentDocument> = yield call(
      [repository, repository.createDocument],
      {
        path: "compliments",
        data: complimentDocument
      }
    );

    // update task
    const updateTaskResponse: UpdateDocumentData = yield call(
      [repository, repository.updateDocument],
      {
        path: "tasks",
        pathSegments: [payload.data.task],
        data: {
          ...taskDocument,
          compliments: [...taskDocument.compliments, createComplimentResponse.id]
        },
      }
    );

    yield put(
      dataActionCreators[DataActionType.SET_DATA_DATA]({
        type: sagaDataActionType,
        key: sagaKey,
        data: {
          id: createComplimentResponse.id,
          ...complimentDocument
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
