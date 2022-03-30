
export enum NavigationActionType {
  SET_USER_ID = "navigation/SET_USER_ID",
  SET_INITIALIZED = "navigation/SET_INITIALIZED",
}

export type NavigationActionPayload = {
  [NavigationActionType.SET_USER_ID]: {
    key: "loggedInUserId" | "pageAuthorId" | "stranger"
    userId: string
  }
  [NavigationActionType.SET_INITIALIZED]: {
    initialized: boolean 
  }
}

export const navigationActionCreators = {
  [NavigationActionType.SET_USER_ID]: (payload: NavigationActionPayload[NavigationActionType.SET_USER_ID]) => ({type: NavigationActionType.SET_USER_ID, payload}),
  [NavigationActionType.SET_INITIALIZED]: (payload: NavigationActionPayload[NavigationActionType.SET_INITIALIZED]) => ({type: NavigationActionType.SET_INITIALIZED, payload}),
}

export type NavigationActionInstance<NavigationActionTypeT extends NavigationActionType> = ReturnType<typeof navigationActionCreators[NavigationActionTypeT]>