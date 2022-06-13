import {DataActionType} from "./actions"

export enum DataSagaStatus {
  LOADING = "loading",
  FAILED = "failed",
  SUCCEEDED = "succeeded"
}

export type DataSagaState = {
  authorId: string
  userId: string
  type: DataActionType
  status: DataSagaStatus
  data: unknown
  payload: unknown
}

export type SnackbarType = "success" | "information"| "warning"|"error";

export const LOGGED_IN_USER_ID = "loggedIn"