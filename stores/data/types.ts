import {DataActionType} from "./actions"
import {Theme} from "styles/theme"

export type TaskDocument = {
  title: string
  goal: string
  compliments: string[]
  author: string
  doneAt: number
  createdAt: number
  updatedAt: number
}
export type TaskData = TaskDocument & {
  id: string
}

export type GoalColor = keyof Theme["colors"]["goals"]
export type GoalDocument = {
  name: string
  color: GoalColor
  privacy: "everyone" | "me" | "hide"
  author: string
  createdAt: number
  updatedAt: number
}
export type GoalData = GoalDocument & {
  id: string
}

export type ComplimentDocument = {
  emoji: string
  message: string
  author: string
  createdAt: number
  updatedAt: number
}
export type ComplimentData = ComplimentDocument & {
  id: string
}

export type UserDocument = {
  email: string
  name: string
  image: string
  followers: string[]
  followings: string[]
  createdAt: number
  updatedAt: number
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
  userId: string
  type: DataActionType
  status: DataSagaStatus
  data: unknown
  payload: unknown
}

export type SnackbarType = "success" | "information"| "warning"|"error";

export const LOGGED_IN_USER_ID = "loggedIn"