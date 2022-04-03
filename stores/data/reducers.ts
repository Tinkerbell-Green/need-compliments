import {Action, handleActions} from "redux-actions";
import {DataActionPayload, DataActionType} from "./actions";
import {ComplimentData, DataSagaState, GoalData, TaskData, UserData} from "./types";

export type State = {
  [DataActionType.GET_LOGGED_IN_USER_DATA]: Record<string, DataSagaState & {data: UserData | null, payload:DataActionPayload[DataActionType.GET_LOGGED_IN_USER_DATA]}>,
  [DataActionType.UPDATE_USER]: Record<string, DataSagaState & {data: UserData | null, payload:DataActionPayload[DataActionType.UPDATE_USER]}>,
  [DataActionType.GET_TASKS_BY_DAYS]: Record<string, DataSagaState & {data: TaskData[] | null, payload:DataActionPayload[DataActionType.GET_TASKS_BY_DAYS]}>,
  [DataActionType.GET_PUBLIC_TASKS]: Record<string, DataSagaState & {data: TaskData[] | null, payload:DataActionPayload[DataActionType.GET_PUBLIC_TASKS]}>,
  [DataActionType.CREATE_TASK]: Record<string, DataSagaState & {data: TaskData | null, payload:DataActionPayload[DataActionType.CREATE_TASK]}>,
  [DataActionType.UPDATE_TASK]: Record<string, DataSagaState & {data: TaskData | null, payload:DataActionPayload[DataActionType.UPDATE_TASK]}>,
  [DataActionType.DELETE_TASK]: Record<string, DataSagaState & {data: null, payload:DataActionPayload[DataActionType.DELETE_TASK]}>,
  [DataActionType.GET_GOALS]: Record<string, DataSagaState & {data: GoalData[] | null, payload:DataActionPayload[DataActionType.GET_GOALS]}>,
  [DataActionType.GET_GOALS_BY_IDS]: Record<string, DataSagaState & {data: GoalData[] | null, payload:DataActionPayload[DataActionType.GET_GOALS]}>,
  [DataActionType.CREATE_GOAL]: Record<string, DataSagaState & {data: GoalData | null, payload:DataActionPayload[DataActionType.CREATE_GOAL]}>,
  [DataActionType.UPDATE_GOAL]: Record<string, DataSagaState & {data: GoalData | null, payload:DataActionPayload[DataActionType.UPDATE_GOAL]}>,
  [DataActionType.DELETE_GOAL]: Record<string, DataSagaState & {data: null, payload:DataActionPayload[DataActionType.DELETE_GOAL]}>,
  [DataActionType.DELETE_USER]: Record<string, DataSagaState & {data: null, payload:DataActionPayload[DataActionType.DELETE_USER]}>,
  [DataActionType.CREATE_COMPLIMENT_ON_TASK]: Record<string, DataSagaState & {data: ComplimentData | null, payload:DataActionPayload[DataActionType.CREATE_COMPLIMENT_ON_TASK]}>,
}

export const initialState: State = {
  [DataActionType.GET_LOGGED_IN_USER_DATA]: {},
  [DataActionType.UPDATE_USER]: {},
  [DataActionType.GET_TASKS_BY_DAYS]: {},
  [DataActionType.GET_PUBLIC_TASKS]: {},
  [DataActionType.CREATE_TASK]: {},
  [DataActionType.UPDATE_TASK]: {},
  [DataActionType.DELETE_TASK]: {},
  [DataActionType.GET_GOALS]: {},
  [DataActionType.GET_GOALS_BY_IDS]: {},
  [DataActionType.CREATE_GOAL]: {},
  [DataActionType.UPDATE_GOAL]: {},
  [DataActionType.DELETE_GOAL]: {},
  [DataActionType.DELETE_USER]: {},
  [DataActionType.CREATE_COMPLIMENT_ON_TASK]: {},
};

export const dataReducer = handleActions<State, any>(
  {
    [DataActionType.SET_DATA_STATUS]: (previousState, action: Action<DataActionPayload[DataActionType.SET_DATA_STATUS]>) => {
      const key =  action.payload.key
      const dataDataActionType = action.payload.type

      return ({
        ...previousState,
        [dataDataActionType]: {
          ...previousState[dataDataActionType],
          [key]: {
            ...previousState[dataDataActionType][key],
            status: action.payload.status
          }
        }
      })
    },
    [DataActionType.SET_DATA_DATA]: (previousState, action: Action<DataActionPayload[DataActionType.SET_DATA_DATA]>) => {
      const key =  action.payload.key
      const dataDataActionType = action.payload.type

      return ({
        ...previousState,
        [dataDataActionType]: {
          ...previousState[dataDataActionType],
          [key]: {
            ...previousState[dataDataActionType][key],
            data: action.payload.data
          }
        }
      })
    },
    [DataActionType.SET_DATA_PAYLOAD]: (previousState, action: Action<DataActionPayload[DataActionType.SET_DATA_PAYLOAD]>) => {
      const key =  action.payload.key
      const dataDataActionType = action.payload.type

      return ({
        ...previousState,
        [dataDataActionType]: {
          ...previousState[dataDataActionType],
          [key]: {
            ...previousState[dataDataActionType][key],
            payload: action.payload.payload
          }
        }
      })
    },
  },
  initialState,
);