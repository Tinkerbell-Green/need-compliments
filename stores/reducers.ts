import {combineReducers} from "redux";
import {dataReducer} from "./data";
import {navigationReducer} from "./navigation";

const rootReducer = combineReducers({
  data: dataReducer,
  navigation: navigationReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>; // https://velog.io/@velopert/use-typescript-and-redux-like-a-pro
