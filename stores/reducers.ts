import merge, {Options as MergeOptions} from "deepmerge"
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

const combineMerge: MergeOptions["arrayMerge"] = (previousArray, incomingArray, options) => {
  const resultArray: typeof previousArray = [...previousArray]

  incomingArray.forEach((incomingItem) => {
    const prevItemIndex = previousArray.findIndex(previousItem => previousItem.id)
    if (prevItemIndex !== -1){
      resultArray[prevItemIndex] = merge(resultArray[prevItemIndex], incomingItem, options)
    }
    else {
      resultArray.push(incomingItem)
    }
  })
  return resultArray
}

const rootReducer = (state = initialRootState, action: any) => {
  if (action.type === HYDRATE) {
    const incomingServerSideState = action.payload as RootState

    const nextState: RootState = {
      navigation: state.navigation,
      data: merge(state.data, incomingServerSideState.data, {arrayMerge: combineMerge})
    }
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export default rootReducer;