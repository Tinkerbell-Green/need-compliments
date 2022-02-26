import {produce} from "immer";
import {handleActions} from "redux-actions";
import * as actions from "./actions";
import {putValueInNestedObject} from "utils/others/putValueInNestedObject";

export type State = {
  count: number
}

const initialState = {
  count: 0,
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
  },
  initialState,
);