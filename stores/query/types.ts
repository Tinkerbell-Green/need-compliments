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

export type GoalDocument = {
  name: string
  color: string
  author: string
  createdAt: string
  updatedAt: string
}

export type ComplimentDocument = {
  emoji: string
  message: string
  author: string
  createdAt: string
  updatedAt: string
}

export type UserDocument = {
  email: string
  name: string
  image: string
  followers: string[]
  followings: string[]
  createdAt: string
}

export enum SagaStatus {
  LOADING = "loading",
  FAILED = "failed",
  SUCCEEDED = "succeeded"
}

export type QuerySagaState = {
  type: ActionType
  status: SagaStatus
  response: unknown
}
