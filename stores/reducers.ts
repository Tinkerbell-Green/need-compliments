import merge from "deepmerge"
import {HYDRATE} from "next-redux-wrapper";
import {combineReducers} from "redux";
import {dataReducer, State as DataState, initialState as dataInitialState} from "./data";
import {navigationReducer, State as NavigationState, initialState as navigationInitialState} from "./navigation";

const combinedReducer = combineReducers({
  data: dataReducer,
  navigation: navigationReducer,
});

export type RootState = {
  data: DataState;
  navigation: NavigationState;
}

const initialRootState: RootState = {
  data: dataInitialState,
  navigation: navigationInitialState
}

const rootReducer = (state = initialRootState, action: any) => {
  if (action.type === HYDRATE) {
    const incomingState = action.payload as RootState

    const nextState: RootState = merge(state, incomingState)

    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export default rootReducer;