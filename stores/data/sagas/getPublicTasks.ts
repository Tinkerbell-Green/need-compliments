import {call, put, select} from "redux-saga/effects";
import {dataActionCreators, DataActionInstance, DataActionType} from "../actions";
import {State} from "../reducers";
import {DataSagaStatus} from "../types"; 
import {GetTasksInput, tasksService} from "api";
import {RootState} from "stores/reducers";

export function* getPublicTasks(action: DataActionInstance<DataActionType.GET_PUBLIC_TASKS>) {
  const payload = action.payload  
  const sagaKey = payload.key
  const sagaDataActionType = DataActionType.GET_PUBLIC_TASKS

  yield put(
    dataActionCreators[DataActionType.SET_DATA_STATUS]({
      type: sagaDataActionType,
      key: sagaKey,
      status: DataSagaStatus.LOADING
    })
  );

  try {
    const input: GetTasksInput = {
      readPermission: "everyone",
      start: payload.startTime.getTime(),
      end: payload.endTime.getTime(),
      combined: true
    }
    if(payload.page) input.page = payload.page;

    const response: Awaited<ReturnType<typeof tasksService.getTasks>>  = yield call(
      tasksService.getTasks,
      input
    );

    const incomingTasks: NonNullable<State[typeof sagaDataActionType][string]["data"]>["tasks"] = response.data.tasks
    const existingTasks: NonNullable<State[typeof sagaDataActionType][string]["data"]>["tasks"] = yield select((state: RootState)=> state.data[sagaDataActionType][sagaKey]["data"]?.tasks || [])
    
    const filteredPrevExistingTasks = (existingTasks || []).filter(existingItem => {
      const duplicateIncomingIndex = incomingTasks.findIndex(incomingItem => incomingItem._id === existingItem._id)
      return (duplicateIncomingIndex === -1)
    })

    const newTasks = payload.merge ? [...filteredPrevExistingTasks, ...incomingTasks] : incomingTasks

    yield put(
      dataActionCreators[DataActionType.SET_DATA_DATA]({
        type: sagaDataActionType,
        key: sagaKey,
        data: {
          ...response.data,
          tasks: newTasks
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
