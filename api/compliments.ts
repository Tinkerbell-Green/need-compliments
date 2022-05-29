import {apiAxios} from "./axios"

export class ComplimentsService {
  createCompliment(input: CreateComplimentInput) {
    return apiAxios.post<CreateComplimentData>("/compliments", input)
  }

  getComplimentsByTaskId(taskId: string) {
    return apiAxios.get<GetComplimentsByTaskIdData>(`/tasks/${taskId}/compliments`)
  }

  getComplimentsByTaskIds(taskIds: string[]) {
    const joinedTaskIds = taskIds.map(item => encodeURIComponent(item)).join(",") 

    return apiAxios.get<GetComplimentsByTaskIdsData>(`/tasks/${joinedTaskIds}/compliments`)
  }

  deleteCompliment(id: string) {
    return apiAxios.delete(`/compliments/${id}`)
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

export const complimentsService = new ComplimentsService()