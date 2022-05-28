import {AxiosInstance} from "axios";
import {apiAxios} from "./axios"

export class ComplimentsService {
  axiosInstance: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance
  }

  createCompliment(input: CreateComplimentInput) {
    return this.axiosInstance.post<CreateComplimentData>("/compliments", input)
  }

  getComplimentsByTaskId(taskId: string) {
    return this.axiosInstance.get<GetComplimentsByTaskIdData>(`/tasks/${taskId}/compliments`)
  }

  getComplimentsByTaskIds(taskIds: string[]) {
    const joinedTaskIds = taskIds.map(item => encodeURIComponent(item)).join(",") 

    return this.axiosInstance.get<GetComplimentsByTaskIdsData>(`/tasks/${joinedTaskIds}/compliments`)
  }

  deleteCompliment(id: string) {
    return this.axiosInstance.delete(`/compliments/${id}`)
  }
}

export type ComplimentType = "party-popper" | "thumbs-up" | "clapping-hands" | "red-heart"

export type ComplimentData = {
  _id: string
  author: string
  createdAt: number
  task: string
  type: ComplimentType
  updatedAt: number
}

type CreateComplimentInput = Omit<ComplimentData, "_id" | "createdAt" | "updatedAt">
type CreateComplimentData = ComplimentData

type GetComplimentsByTaskIdData = Record<string, ComplimentData[]>

type GetComplimentsByTaskIdsData = Record<string, ComplimentData[]>

export const {
  createCompliment,
  getComplimentsByTaskId,
  getComplimentsByTaskIds,
  deleteCompliment,
} = new ComplimentsService(apiAxios)