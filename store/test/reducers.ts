import { combineReducers } from "redux";

import { testReducer } from "./test";
// import {anotherReducer} from "./another";

const rootReducer = combineReducers({
    test: testReducer,
    // anothe: anotherReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;