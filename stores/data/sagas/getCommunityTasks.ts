import {QueryConstraint, where} from "firebase/firestore";
import {call, getContext, put, select} from "redux-saga/effects";
import {dataActionCreators, DataActionInstance, DataActionType} from "../actions";
import {State} from "../reducers";
import {DataSagaStatus, TaskDocument} from "../types"; 
import {GoalDocument} from "./../types";
import {RootState} from "stores/reducers";
import {Repository, GetDocumentsData} from "utils/firebase";

export function* getCommunityTasks(action: DataActionInstance<DataActionType.GET_COMMUNITY_TASKS>) {
  const payload = action.payload  
  const sagaKey = payload.key
  const sagaDataActionType = DataActionType.GET_COMMUNITY_TASKS

  const repository: Repository = yield getContext("repository");

  yield put(
    dataActionCreators[DataActionType.SET_DATA_STATUS]({
      type: sagaDataActionType,
      key: sagaKey,
      status: DataSagaStatus.LOADING
    })
  );

  try {
    // fetch get public goals
    const goalsQueryConstraints: QueryConstraint[] = []
    goalsQueryConstraints.push(where("privacy", "==", "everyone"))

    const goalsResponse: GetDocumentsData<GoalDocument> = yield call(
      [repository, repository.getDocuments],
      {
        path: "goals",
        queryConstraints: goalsQueryConstraints,
      }
    );
    const goalIds = goalsResponse.docs.map(item=>item.id)

    // fetch get tasks
    const tasksQueryConstraints: QueryConstraint[] = []
    tasksQueryConstraints.push(where("goal", "in", goalIds))

    const startTime = payload.startTime.getTime()
    const endTime = payload.endTime.getTime()
    tasksQueryConstraints.push(where("doneAt", ">=", startTime))
    tasksQueryConstraints.push(where("doneAt", "<=", endTime))

    const tasksResponse: GetDocumentsData<TaskDocument> = yield call(
      [repository, repository.getDocuments],
      {
        path: "tasks",
        queryConstraints: tasksQueryConstraints,
      }
    );

    const incomingData: State[typeof sagaDataActionType][string]["data"] = tasksResponse.docs.map(item => ({
      id: item.id,
      ...item.data()
    }))

    const existingData: State[typeof sagaDataActionType][string]["data"] = yield select((state: RootState)=> state.data[sagaDataActionType][sagaKey]["data"])
    const filteredPrevData = (existingData || []).filter(existingItem => {
      const duplicateIncomingIndex = incomingData.findIndex(incomingItem => incomingItem.id === existingItem.id)
      return (duplicateIncomingIndex === -1)
    })

    const newData = payload.merge ? [...filteredPrevData, ...incomingData] : incomingData

    yield put(
      dataActionCreators[DataActionType.SET_DATA_DATA]({
        type: sagaDataActionType,
        key: sagaKey,
        data: newData
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
