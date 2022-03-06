import {QueryConstraint, where} from "firebase/firestore";
import {call, getContext, put, select} from "redux-saga/effects";
import {actionCreators, ActionInstance, ActionType} from "../actions";
import {State} from "../reducers";
import {DataSagaStatus, TaskDocument} from "../types";
import {RootState} from "stores/reducers";

import {Repository} from "utils/firebase";
import {GetDocumentsData} from "utils/firebase/repository/index";

export function* getTasksByDays(action: ActionInstance<ActionType.GET_TASKS_BY_DAYS>) {
  const payload = action.payload  
  const sagaKey = payload.key
  const sagaActionType = ActionType.GET_TASKS_BY_DAYS

  const repository: Repository = yield getContext("repository");

  yield put(
    actionCreators[ActionType.SET_DATA_STATUS]({
      type: sagaActionType,
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

    const incomingData: State[typeof sagaActionType][string]["data"] = response.docs.map(item => ({
      id: item.id,
      ...item.data()
    }))

    const existingData: State[typeof sagaActionType][string]["data"] = yield select((state: RootState)=> state.data[sagaActionType][sagaKey]["data"])
    const filteredPrevData = (existingData || []).filter(existingItem => {
      const duplicateIncomingIndex = incomingData.findIndex(incomingItem => incomingItem.id === existingItem.id)
      return (duplicateIncomingIndex === -1)
    })

    yield put(
      actionCreators[ActionType.SET_DATA_DATA]({
        type: sagaActionType,
        key: sagaKey,
        data: [...filteredPrevData, ...incomingData]
      })
    ); 

    yield put(
      actionCreators[ActionType.SET_DATA_STATUS]({
        type: sagaActionType,
        key: sagaKey,
        status: DataSagaStatus.SUCCEEDED
      })
    );
  } catch (error) {
    console.error(error);

    yield put(
      actionCreators[ActionType.SET_DATA_STATUS]({
        type: sagaActionType,
        key: sagaKey,
        status: DataSagaStatus.FAILED
      })
    );
  }
}
