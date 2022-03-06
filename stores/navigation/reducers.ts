import {Action, handleActions} from "redux-actions";
import {ActionPayload, ActionType} from "./actions";

export type State = {
  loggedInUserId: string | undefined
  pageAuthorId: string | undefined
}

const initialState: State = {
  loggedInUserId: undefined,
  pageAuthorId: undefined,
}

export const navigationReducer = handleActions<State, any>(
  {
    [ActionType.SET_USER_ID]: (previousState, action: Action<ActionPayload[ActionType.SET_USER_ID]>) => {
      const key = action.payload.key

      return ({
        ...previousState,
        [key]: action.payload.userId
      })
    },
  },
  initialState,
);