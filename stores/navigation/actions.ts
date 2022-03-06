
export enum ActionType {
  SET_USER_ID = "navigation/SET_USER_ID",
}

export type ActionPayload = {
  [ActionType.SET_USER_ID]: {
    key: "loggedInUserId" | "pageAuthorId"
    userId: string
  }
}

export const actionCreators = {[ActionType.SET_USER_ID]: (payload: ActionPayload[ActionType.SET_USER_ID]) => ({type: ActionType.SET_USER_ID, payload}),
}

export type ActionInstance<ActionTypeT extends ActionType> = ReturnType<typeof actionCreators[ActionTypeT]>