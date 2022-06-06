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
    }

    const params = Object.entries(filledInput)
      .map(entry => entry.map(encodeURIComponent).join("="))
      .join("&");
    
    return apiAxios.get<GetTasksData>(`/tasks?${params}`)
  }

  getTaskData(id: string) {
    return apiAxios.get<GetTaskData>(`/tasks/${id}`)
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
  compliments: ComplimentData[]
  createdAt: number
  doneAt: number
  goal: string
  readPermission: "everyone" | "me" | "none"
  title: string
  updatedAt: number
}

export type CreateTaskInput = Omit<TaskData, "_id" | "createdAt" | "updatedAt" | "compliments">
export type CreateTaskData = {
  task: TaskData
}

export type GetTasksInput = {
  readPermission: TaskData["readPermission"]
  combined: boolean
  page?: number
  start?: number
  end?: number
  userId?: string
}
export type GetTasksData = {
  tasks: (
    TaskData & {
      goalData?: GoalData
    }
  )[]
}

export type GetTaskData = {
  tasks: TaskData
}

export type UpdateTaskInput = Optional<Omit<TaskData, "_id" | "createdAt" | "updatedAt">>
export type UpdateTaskData = {
  task: TaskData
}

export const tasksService = new TasksService()