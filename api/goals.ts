import {Optional} from "utility-types";
import {apiAxios} from "./axios"
import {Theme} from "styles/theme";

export class GoalsService {
  createGoal(input: CreateGoalInput) {
    return apiAxios.post<CreateGoalData>("/goals", input)
  }

  getGoalsByIds(ids: string[]) {
    return apiAxios.get<GetGoalsByIdsData>(`/goals/${ids.map(item=>encodeURIComponent(item)).join(",")}`)
  }

  getGoals(input: GetGoalsInput) {
    const params = Object.entries(input)
      .map(entry => entry.map(encodeURIComponent).join("="))
      .join("&");

    return apiAxios.get<GetGoalsData>(`/goals?${params}`)
  }

  updateGoal(id: string, input: UpdateGoalInput) {
    return apiAxios.patch<UpdateGoalData>(`/goals/${id}`, input)
  }

  deleteGoal(id: string) {
    return apiAxios.delete(`/goals/${id}`)
  }
}

export type GoalColor = keyof Theme["colors"]["goals"]

export type GoalData = {
  _id: string
  author: string
  color: GoalColor
  createdAt: number
  name: string
  readPermission: "everyone" | "me" | "none"
  updatedAt: number
}

export type GetGoalsByIdsData = {
  goals: GoalData[]
}

export type GetGoalsInput = {
  author?: string
}
export type GetGoalsData = {
  goals: GoalData[]
}

export type CreateGoalInput = Omit<GoalData, "_id" | "createdAt" | "updatedAt">
export type CreateGoalData = GoalData

export type UpdateGoalInput = Optional<Omit<GoalData, "_id" | "createdAt" | "updatedAt">>
export type UpdateGoalData = GoalData

export const goalsService = new GoalsService()