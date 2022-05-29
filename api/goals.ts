import {Optional} from "utility-types";
import {apiAxios} from "./axios"
import {Theme} from "styles/theme";

export class GoalsService {
  createGoal(input: CreateGoalInput) {
    return apiAxios.post<CreateGoalData>("/goals", input)
  }

  getGoals(id: string) {
    return apiAxios.get<GetGoalsData>(`/goals/${id}`)
  }

  getGoalsByUserId(userId: string) {
    return apiAxios.get<GetGoalsByUserData>(`/users/${userId}/goals`)
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

export type GetGoalsByUserData = {
  goals: GoalData[]
}

export type GetGoalsData = {
  goals: GoalData[]
}

export type CreateGoalInput = Omit<GoalData, "_id" | "createdAt" | "updatedAt">
export type CreateGoalData = GoalData

export type UpdateGoalInput = Optional<Omit<GoalData, "_id" | "createdAt" | "updatedAt">>
export type UpdateGoalData = GoalData

export const goalsService = new GoalsService()