import {AxiosInstance} from "axios";
import {Optional} from "utility-types";
import {ComplimentData} from "./compliments";
import {GoalData} from "./goals";
import {apiAxios} from "api"

export class TasksService {
  axiosInstance: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance
  }

  createTask(input: CreateTaskInput) {
    return this.axiosInstance.post<CreateTaskData>("/tasks", input)
  }

  getTasks(input: GetTasksInput) {
    const filledInput = {
      ...input,
      page: input.page || 1,
    }

    const params = Object.entries(filledInput)
      .map(entry => entry.map(encodeURIComponent).join("="))
      .join("&");
    
    return this.axiosInstance.get<GetTasksData>(`/tasks?${params}`)
  }

  getTaskData(id: string) {
    return this.axiosInstance.get<GetTaskData>(`/tasks/${id}`)
  }

  getTasksByUserId(userId: string) {
    return this.axiosInstance.get<GetTasksByUserData>(`/users/${userId}/tasks`)
  }

  updateTask(id: string, input: UpdateTaskInput) {
    return this.axiosInstance.patch<UpdateTaskData>(`/tasks/${id}`, )
  }

  deleteTask(id: string) {
    return this.axiosInstance.delete(`/tasks/${id}`)
  }
}

export type TaskData = {
  _id: string
  author: string
  createdAt: number
  doneAt: number
  goal: string
  readPermission: "everyone" | "me" | "none"
  title: string
  updatedAt: number
}

type CreateTaskInput = Omit<TaskData, "_id" | "createdAt" | "updatedAt">
type CreateTaskData = TaskData

type GetTasksInput = {
  readPermission: TaskData["readPermission"]
  combined: boolean
  page?: number
}
type GetTasksData = {
  tasks: TaskData & {
    goalData?: GoalData
    compliments?: ComplimentData[]
  }[]
}

type GetTasksByUserData = {
  tasks: TaskData[]
}

type GetTaskData = TaskData

type UpdateTaskInput = Optional<Omit<TaskData, "_id" | "createdAt" | "updatedAt">>
type UpdateTaskData = TaskData

export const {
  getTasksByUserId,
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} = new TasksService(apiAxios)