import {AnyAction, Store} from "redux"
import {DataSagaActionType} from "./actions"
import {DataSagaStatus} from "./types"
import {RootState} from "stores/reducers"

type Options = {
  actionType: DataSagaActionType
  key: string
}

export const waitDuringLoading = async (store: Store<RootState, AnyAction>, {actionType, key}: Options) => {
  while (true){
    await (async () => new Promise(resolve => setTimeout(resolve, 100)))()

    const isLoading = store.getState().data[actionType][key].status === DataSagaStatus.LOADING
    if (!isLoading) break;
  }
} 