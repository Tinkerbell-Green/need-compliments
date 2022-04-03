import {call, getContext, put} from "redux-saga/effects";
import {dataActionCreators, DataActionInstance, DataActionType} from "../actions";
import {DataSagaStatus, ComplimentDocument} from "../types";
import {TaskDocument} from "stores/data/types";
import {Repository, CreateDocumentData, GetDocumentData, UpdateDocumentData} from "utils/firebase";

export function* createCompliment(action: DataActionInstance<DataActionType.CREATE_COMPLIMENT>) {
  const payload = action.payload  
  const sagaKey = payload.key
  const sagaDataActionType = DataActionType.CREATE_COMPLIMENT

  const repository: Repository = yield getContext("repository");

  yield put(
    dataActionCreators[DataActionType.SET_DATA_STATUS]({
      type: sagaDataActionType,
      key: sagaKey,
      status: DataSagaStatus.LOADING
    })
  );

  try {
    // create compliment
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

    // get task
    const getTaskResponse: GetDocumentData<TaskDocument> = yield call(
      [repository, repository.getDocument],
      {
        path: "tasks",
        pathSegments: [payload.task]
      }
    );
    const prevTaskDocument = getTaskResponse.data()
    if (!prevTaskDocument){
      throw Error(`there is no task of id: ${payload.task}`)
    }

    // update task
    const newTaskDocument: TaskDocument = {
      ...prevTaskDocument,
      compliments: [...prevTaskDocument.compliments, createComplimentResponse.id],
      updatedAt: new Date().getTime(),
    }
    
    const updateTaskResponse: UpdateDocumentData = yield call(
      [repository, repository.updateDocument],
      {
        path: "tasks",
        pathSegments: [payload.task],
        data: newTaskDocument,
      }
    );

    yield put(
      dataActionCreators[DataActionType.SET_DATA_DATA]({
        type: sagaDataActionType,
        key: sagaKey,
        data: {
          id: createComplimentResponse.id,
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
