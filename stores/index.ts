import {createWrapper, Context} from "next-redux-wrapper";
import {applyMiddleware, createStore, Store} from "redux";
import createSagaMiddleware, {Task} from "redux-saga";

import rootReducer, {RootState} from "./reducers";
import rootSaga from "./sagas";

// ref: https://github.com/kirill-konshin/next-redux-wrapper

export interface SagaStore extends Store {
  sagaTask?: Task;
}

export const makeStore = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware)) as SagaStore;

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true})

export * as queryStore from "./query"