export type TaskData = {
  id: string
  title: string
  category: string
  compliments: string[]
  doneAt: string
  author: string
  createdAt: string
  updatedAt: string
}

export type CategoryData = {
  id: string
  name: string
  color: string
  author: string
  createdAt: string
  updatedAt: string
}

export type ComplimentData = {
  id: string
  emoji: string
  message: string
  author: string
  createdAt: string
  updatedAt: string
}

export type UserData = {
  id: string
  name: string 
  followers: string[]
  followings: string[]
  createdAt: string
}

export enum QueryStatus {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
  SUCCEEDED = "succeeded"
}

export enum QueryName {
  CREATE_TASK = "createTask",
  DELETE_TASK = "deleteTask",
  GET_TASK = "getTask",
}

export type QueryState = {
  status: QueryStatus
  response: unknown
}
