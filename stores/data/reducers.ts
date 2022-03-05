import {Action, handleActions} from "redux-actions";
import {ActionPayload, ActionType} from "./actions";
import {DataSagaState, UserData} from "./types";

export type State = {
  [ActionType.PRERARE_LOGGED_IN_USER_DATA]: Record<string, 
    DataSagaState & {
      data: UserData | undefined
    }
  >,
  [ActionType.PRERARE_USER_DATA]: Record<string, 
    DataSagaState & {
      data: UserData | undefined
    }
  >,
}

const initialState: State = {
  [ActionType.PRERARE_LOGGED_IN_USER_DATA]: {},
  [ActionType.PRERARE_USER_DATA]: {},
};

export const dataReducer = handleActions<State, any>(
  {
    [ActionType.SET_DATA_STATUS]: (previousState, action: Action<ActionPayload[ActionType.SET_DATA_STATUS]>) => {
      const authorId =  action.payload.authorId
      const dataActionType = action.payload.type

      return ({
        ...previousState,
        [dataActionType]: {
          ...previousState[dataActionType],
          [authorId]: {
            ...previousState[dataActionType][authorId],
            status: action.payload.status
          }
        }
      })
    },
    [ActionType.SET_DATA_DATA]: (previousState, action: Action<ActionPayload[ActionType.SET_DATA_DATA]>) => {
      const authorId =  action.payload.authorId
      const dataActionType = action.payload.type

      return ({
        ...previousState,
        [dataActionType]: {
          ...previousState[dataActionType],
          [authorId]: {
            ...previousState[dataActionType][authorId],
            data: action.payload.data
          }
        }
      })
    },
  },
  initialState,
);