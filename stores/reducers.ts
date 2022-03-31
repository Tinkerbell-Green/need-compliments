import {HYDRATE} from "next-redux-wrapper";
import {CombinedState, combineReducers} from "redux";
import {dataReducer, State as DataState} from "./data";
import {navigationReducer, State as NavigationState} from "./navigation";

const combinedReducer = combineReducers({
  data: dataReducer,
  navigation: navigationReducer,
});

export type RootState = {
  data: DataState;
  navigation: NavigationState;
}

const rootReducer = (state: RootState, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export default rootReducer;

// export type RootState = ReturnType<typeof rootReducer>; // https://velog.io/@velopert/use-typescript-and-redux-like-a-pro
