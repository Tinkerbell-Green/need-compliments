import {ActionType} from "./actions"

export type TaskDocument = {
  title: string
  category: string
  compliments: string[]
  doneAt: string
  author: string
  createdAt: string
  updatedAt: string
}
export type TaskData = TaskDocument & {
  id: string
}

export type GoalDocument = {
  name: string
  color: string
  author: string
  createdAt: string
  updatedAt: string
}
export type GoalData = GoalDocument & {
  id: string
}

export type ComplimentDocument = {
  emoji: string
  message: string
  author: string
  createdAt: string
  updatedAt: string
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
  createdAt: string
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
  type: ActionType
  status: DataSagaStatus
  data: unknown
}

export const LOGGED_IN_USER_ID = "loggedIn"