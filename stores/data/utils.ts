import {ActionInstance, ActionPayload, SagaActionType} from "./actions";

export const getDataSagaKey = (
  action: ActionInstance<SagaActionType>
) => {
  return `${action.type}-${JSON.stringify(action.payload)}`
}

