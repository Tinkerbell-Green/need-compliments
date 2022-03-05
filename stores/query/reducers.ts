import {produce} from "immer";
import {Action, handleActions} from "redux-actions";
import {ActionPayload, ActionType} from "./actions";
import {QuerySagaState, TaskDocument} from "./types";
import {CreateDocumentData, DeleteDocumentData, GetDocumentData, GetDocumentsData, UpdateDocumentData} from "utils/firebase";
import {putValueInNestedObject} from "utils/others/putValueInNestedObject";

export type State = {
  [ActionType.CREATE_TASK]: Record<string, 
    QuerySagaState & {
      response: CreateDocumentData<TaskDocument> | undefined
    }
  >,
  [ActionType.UPDATE_TASK]: Record<string, 
    QuerySagaState & {
      response: UpdateDocumentData | undefined
    }
  >,
  [ActionType.DELETE_TASK]: Record<string, 
    QuerySagaState & {
      response: DeleteDocumentData | undefined
    }
  >,
  [ActionType.GET_TASK]: Record<string, 
    QuerySagaState & {
      response: GetDocumentData<TaskDocument> | undefined
    }
  >,
  [ActionType.GET_TASKS]: Record<string, 
    QuerySagaState & {
      response: GetDocumentsData<TaskDocument> | undefined
    }
  >,
}

const initialState: State = {
  [ActionType.CREATE_TASK]: {},
  [ActionType.UPDATE_TASK]: {},
  [ActionType.DELETE_TASK]: {},
  [ActionType.GET_TASK]: {},
  [ActionType.GET_TASKS]: {},
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
      const queryActionType = action.payload.type
      const queryActionKey =  action.payload.key

      return ({
        ...previousState,
        [queryActionType]: {
          ...previousState[queryActionType],
          [queryActionKey]: {
            ...previousState[queryActionType][queryActionKey],
            status: action.payload.status
          }
        }
      })
    },
    [ActionType.SET_QUERY_RESPONSE]: (previousState, action: Action<ActionPayload[ActionType.SET_QUERY_RESPONSE]>) => {
      const queryActionType = action.payload.type
      const queryActionKey =  action.payload.key

      return ({
        ...previousState,
        [queryActionType]: {
          ...previousState[queryActionType],
          [queryActionKey]: {
            ...previousState[queryActionType][queryActionKey],
            response: action.payload.response
          }
        }
      })
    },
  },
  initialState,
);