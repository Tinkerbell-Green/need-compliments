import {Action, handleActions} from "redux-actions";
import {ActionPayload, ActionType} from "./actions";
import {QuerySagaState, TaskData} from "./types";
import {CreateDocumentData} from "utils/firebase";

export type State = {
  [ActionType.PRERARE_USER_DATA]: Record<string, 
    QuerySagaState & {
      response: CreateDocumentData<TaskData> | undefined
    }
  >,
}

const initialState: State = {
  [ActionType.PRERARE_USER_DATA]: {},
};

export const dataReducer = handleActions<State, any>(
  {
    [ActionType.SET_DATA_STATUS]: (previousState, action: Action<ActionPayload[ActionType.SET_DATA_STATUS]>) => {
      const dataActionType = action.payload.type
      const dataActionKey =  action.payload.key

      return ({
        ...previousState,
        [dataActionType]: {
          ...previousState[dataActionType],
          [dataActionKey]: {
            ...previousState[dataActionType][dataActionKey],
            status: action.payload.status
          }
        }
      })
    },
    [ActionType.SET_DATA_DATA]: (previousState, action: Action<ActionPayload[ActionType.SET_DATA_DATA]>) => {
      const dataActionType = action.payload.type
      const dataActionKey =  action.payload.key

      return ({
        ...previousState,
        [dataActionType]: {
          ...previousState[dataActionType],
          [dataActionKey]: {
            ...previousState[dataActionType][dataActionKey],
            data: action.payload.data
          }
        }
      })
    },
  },
  initialState,
);