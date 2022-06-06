import {call, put, select} from "redux-saga/effects";
import {dataActionCreators, DataActionInstance, DataActionType} from "../actions";
import {State} from "../reducers";
import {DataSagaStatus} from "../types"; 
import {GoalData, goalsService} from "api";
import {RootState} from "stores/reducers";

export function* getGoals(action: DataActionInstance<DataActionType.GET_GOALS>) {
  const payload = action.payload  
  const sagaKey = payload.key
  const sagaDataActionType = DataActionType.GET_GOALS

  yield put(
    dataActionCreators[DataActionType.SET_DATA_STATUS]({
      type: sagaDataActionType,
      key: sagaKey,
      status: DataSagaStatus.LOADING
    })
  );

  try {
    const response: Awaited<ReturnType<typeof goalsService.getGoals>>  = yield call(
      goalsService.getGoals,
      payload.input
    );

    const goals: GoalData[] = response.data.goals
    const previousGoals: NonNullable<State[typeof sagaDataActionType][string]["data"]>["goals"] = yield select((state: RootState)=> state.data[sagaDataActionType][sagaKey]["data"]?.["goals"] || [])

    yield put(
      dataActionCreators[DataActionType.SET_DATA_DATA]({
        type: sagaDataActionType,
        key: sagaKey,
        data : {
          ...response.data,
          goals: [...previousGoals, ...goals]
        },
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
