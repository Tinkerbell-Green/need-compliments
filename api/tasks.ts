import {Optional} from "utility-types";
import {apiAxios} from "./axios"
import {ComplimentData} from "./compliments";
import {GoalData} from "./goals";

export class TasksService {
  createTask(input: CreateTaskInput) {
    return apiAxios.post<CreateTaskData>("/tasks", input)
  }

  getTasks(input: GetTasksInput) {
    const filledInput = {
      ...input,
      page: input.page || 1,
    }

    const params = Object.entries(filledInput)
      .map(entry => entry.map(encodeURIComponent).join("="))
      .join("&");
    
    return apiAxios.get<GetTasksData>(`/tasks?${params}`)
  }

  getTaskData(id: string) {
    return apiAxios.get<GetTaskData>(`/tasks/${id}`)
  }

  getTasksByUserId(userId: string) {
    return apiAxios.get<GetTasksByUserData>(`/users/${userId}/tasks`)
  }

  updateTask(id: string, input: UpdateTaskInput) {
    return apiAxios.patch<UpdateTaskData>(`/tasks/${id}`, input)
  }

  deleteTask(id: string) {
    return apiAxios.delete(`/tasks/${id}`)
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

export const tasksService = new TasksService()