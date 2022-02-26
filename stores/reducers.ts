import {combineReducers} from "redux";

import {queryReducer} from "./query";

const rootReducer = combineReducers({
  query: queryReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>; // https://velog.io/@velopert/use-typescript-and-redux-like-a-pro
