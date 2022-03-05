import {produce} from "immer";
import {Action, handleActions} from "redux-actions";
import {QueryActionType} from "./actions";
import {ActionPayload, ActionType} from "./actions";
import {QueryState, TaskData} from "./types";
import {CreateDocumentData, DeleteDocumentData, GetDocumentData} from "utils/firebase";
import {putValueInNestedObject} from "utils/others/putValueInNestedObject";

export type State = {
  [ActionType.CREATE_TASK]: Record<string, 
    QueryState & {
      response: CreateDocumentData<TaskData> | undefined
    }
  >,
  [ActionType.DELETE_TASK]: Record<string, 
    QueryState & {
      response: DeleteDocumentData | undefined
    }
  >,
  [ActionType.GET_TASK]: Record<string, 
    QueryState & {
      response: GetDocumentData<TaskData> | undefined
    }
  >,
}

const initialState: State = {
  [ActionType.CREATE_TASK]: {},
  [ActionType.DELETE_TASK]: {},
  [ActionType.GET_TASK]: {},
};

export const queryReducer = handleActions<State, any>(
  {
    [ActionType.REPLACE]: (previousState, action: Action<ActionPayload[ActionType.REPLACE]> ) => {
      return produce(previousState, (newState) => {
        if (action.payload === undefined) {
          return;
        } else {
          const path: (string | number)[] = action.payload.path;

          try {
            putValueInNestedObject(newState, path, action.payload.replacement);
          } catch {
            return;
          }
        }
      });
    },
    [ActionType.SET_QUERY_STATUS]: (previousState, action: Action<ActionPayload[ActionType.SET_QUERY_STATUS]>) => {
      return ({
        ...previousState,
        [action.type]: {
          ...previousState[action.type as QueryActionType],
          [action.payload.key]: {
            ...previousState[action.type as QueryActionType][action.payload.key],
            status: action.payload.status
          }
        }
      })
    },
    [ActionType.SET_QUERY_RESPONSE]: (previousState, action: Action<ActionPayload[ActionType.SET_QUERY_RESPONSE]>) => {
      return ({
        ...previousState,
        [action.type]: {
          ...previousState[action.type as QueryActionType],
          [action.payload.key]: {
            ...previousState[action.type as QueryActionType][action.payload.key],
            response: action.payload.response
          }
        }
      })
    },
  },
  initialState,
);