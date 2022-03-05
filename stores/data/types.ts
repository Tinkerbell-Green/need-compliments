import {ActionType} from "./actions"
import {ComplimentDocument, GoalDocument, TaskDocument, UserDocument} from "stores/query/types"

export type TaskData = TaskDocument & {
  id: string
}

export type GoalData = GoalDocument & {
  id: string
}

export type ComplimentData = ComplimentDocument & {
  id: string
}

export type UserData = UserDocument & {
  id: string
}

export enum DataSagaStatus {
  LOADING = "loading",
  FAILED = "failed",
  SUCCEEDED = "succeeded"
}

export type DataSagaState = {
  authorId: string
  type: ActionType
  status: DataSagaStatus
  data: unknown
}

export const LOGGED_IN_USER_ID = "loggedIn"