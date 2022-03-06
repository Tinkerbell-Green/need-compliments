import {QueryConstraint, where} from "firebase/firestore";
import {call, getContext, put, select} from "redux-saga/effects";
import {dataActionCreators, DataActionInstance, DataActionType} from "../actions";
import {State} from "../reducers";
import {DataSagaStatus, TaskDocument} from "../types"; 
import {RootState} from "stores/reducers";
import {Repository, GetDocumentsData} from "utils/firebase";

export function* getTasksByDays(action: DataActionInstance<DataActionType.GET_TASKS_BY_DAYS>) {
  const payload = action.payload  
  const sagaKey = payload.key
  const sagaDataActionType = DataActionType.GET_TASKS_BY_DAYS

  const repository: Repository = yield getContext("repository");

  yield put(
    dataActionCreators[DataActionType.SET_DATA_STATUS]({
      type: sagaDataActionType,
      key: sagaKey,
      status: DataSagaStatus.LOADING
    })
  );

  try {
    const queryConstraints: QueryConstraint[] = []
    queryConstraints.push(where("author", "==", payload.author))

    const startDayTime = payload.startDay.getTime()
    const endDayTime = payload.endDay.getTime()
    queryConstraints.push(where("doneAt", ">=", startDayTime))
    queryConstraints.push(where("doneAt", "<=", endDayTime))

    const response: GetDocumentsData<TaskDocument> = yield call(
      [repository, repository.getDocuments],
      {
        path: "tasks",
        queryConstraints,
      }
    );

    const incomingData: State[typeof sagaDataActionType][string]["data"] = response.docs.map(item => ({
      id: item.id,
      ...item.data()
    }))

    const existingData: State[typeof sagaDataActionType][string]["data"] = yield select((state: RootState)=> state.data[sagaDataActionType][sagaKey]["data"])
    const filteredPrevData = (existingData || []).filter(existingItem => {
      const duplicateIncomingIndex = incomingData.findIndex(incomingItem => incomingItem.id === existingItem.id)
      return (duplicateIncomingIndex === -1)
    })

    yield put(
      dataActionCreators[DataActionType.SET_DATA_DATA]({
        type: sagaDataActionType,
        key: sagaKey,
        data: [...filteredPrevData, ...incomingData]
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
