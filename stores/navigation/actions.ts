
export enum NavigationActionType {
  SET_USER_ID = "navigation/SET_USER_ID",
}

export type NavigationActionPayload = {
  [NavigationActionType.SET_USER_ID]: {
    key: "loggedInUserId" | "pageAuthorId"
    userId: string
  }
}

export const navigationActionCreators = {[NavigationActionType.SET_USER_ID]: (payload: NavigationActionPayload[NavigationActionType.SET_USER_ID]) => ({type: NavigationActionType.SET_USER_ID, payload}),
}

export type NavigationActionInstance<NavigationActionTypeT extends NavigationActionType> = ReturnType<typeof navigationActionCreators[NavigationActionTypeT]>