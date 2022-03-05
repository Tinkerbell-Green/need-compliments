import {ActionInstance, ActionPayload, QueryActionType} from "./actions";

export const getQueryKey = (
  action: ActionInstance<QueryActionType>
) => {
  // const filteredPayload: any = {}
  // Object.keys(payload).filter(prop => {
  //   if (prop !== "data") {
  //     filteredPayload[prop] = payload[prop as keyof typeof payload]
  //   }
  // })

  return `${action.type}-${JSON.stringify(action.payload)}`
}

