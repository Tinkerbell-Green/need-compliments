import {Action, handleActions} from "redux-actions";
import {NavigationActionPayload, NavigationActionType} from "./actions";

export type State = {
  loggedInUserId: string | null
  pageAuthorId: string | null
  initialized: boolean
}

export const initialState: State = {
  loggedInUserId: null,
  pageAuthorId: null,
  initialized: false,
}

export const navigationReducer = handleActions<State, any>(
  {
    [NavigationActionType.SET_USER_ID]: (previousState, action: Action<NavigationActionPayload[NavigationActionType.SET_USER_ID]>) => {
      const key = action.payload.key

      return ({
        ...previousState,
        [key]: action.payload.userId
      })
    },
    [NavigationActionType.SET_INITIALIZED]: (previousState, action: Action<NavigationActionPayload[NavigationActionType.SET_INITIALIZED]>) => {
      return ({
        ...previousState,
        initialized: action.payload.initialized
      })
    },
  },
  initialState,
);