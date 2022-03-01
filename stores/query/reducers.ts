import {produce} from "immer";
import {handleActions} from "redux-actions";
import * as actions from "./actions";
import {QueryName, QueryState, QueryStatus, TaskData} from "./types";
import {CreateDocumentReturn, DeleteDocumentReturn} from "utils/firebase";
import {putValueInNestedObject} from "utils/others/putValueInNestedObject";

export type State = Record<QueryName, QueryState> & { // TODO: not sure so it needs check
  [QueryName.CREATE_TASK]: QueryState & {
    response: CreateDocumentReturn<TaskData> | undefined
  },
  [QueryName.DELETE_TASK]: QueryState & {
    response: DeleteDocumentReturn | undefined
  }
}

const initialState: State = {
  [QueryName.CREATE_TASK]: {
    status: QueryStatus.IDLE,
    response: undefined 
  },
  [QueryName.DELETE_TASK]: {
    status: QueryStatus.IDLE,
    response: undefined 
  }
};

export const queryReducer = handleActions<State, any>(
  {
    [actions.REPLACE]: (previousState, action: actions.REPLACE__Instance) => {
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
    [actions.SET_QUERY_STATUS]: (previousState, action: actions.SET_QUERY_STATUS_Instance) => {
      return ({
        ...previousState,
        [action.payload.name]: {
          ...previousState[action.payload.name],
          status: action.payload.status
        }
      })
    },
    [actions.SET_QUERY_RESPONSE]: (previousState, action: actions.SET_QUERY_RESPONSE_Instance) => {
      return ({
        ...previousState,
        [action.payload.name]: {
          ...previousState[action.payload.name],
          response: action.payload.response
        }
      })
    }
  },
  initialState,
);