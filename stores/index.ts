import {createWrapper, Context} from "next-redux-wrapper";
import {applyMiddleware, createStore, Middleware, Store} from "redux";
import {createLogger} from "redux-logger"
import createSagaMiddleware, {Task} from "redux-saga";

import rootReducer, {RootState} from "./reducers";
import rootSaga from "./sagas";
import {repository} from "utils/firebase";

// ref: https://github.com/vercel/next.js/tree/canary/examples/with-redux-saga
// ref: https://github.com/kirill-konshin/next-redux-wrapper#usage-with-redux-saga
export interface SagaStore extends Store {
  sagaTask?: Task;
}

const bindMiddleware = (middlewares: Middleware<any, any, any>[]) => {
  if (process.env.NODE_ENV !== "production") {
    const {composeWithDevTools} = require("redux-devtools-extension")
    return composeWithDevTools(applyMiddleware(...middlewares))
  }
  return applyMiddleware(...middlewares)
}

const logger = createLogger();

export const makeStore = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      repository,
    }
  })
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware, logger])) as SagaStore

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true})


export * as queryStore from "./query"
export * as dataStore from "./data"
export * as navigationStore from "./navigation"