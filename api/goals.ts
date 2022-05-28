import {AxiosInstance} from "axios";
import {Optional} from "utility-types";
import {apiAxios} from "api"
import {Theme} from "styles/theme";

export class GoalsService {
  axiosInstance: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance
  }

  createGoal(input: CreateGoalInput) {
    return this.axiosInstance.post<CreateGoalData>("/goals", input)
  }

  getGoals(id: string) {
    return this.axiosInstance.get<GetGoalsData>(`/goals/${id}`)
  }

  getGoalsByUserId(userId: string) {
    return this.axiosInstance.get<GetGoalsByUserData>(`/users/${userId}/goals`)
  }

  updateGoal(id: string, input: UpdateGoalInput) {
    return this.axiosInstance.patch<UpdateGoalData>(`/goals/${id}`, )
  }

  deleteGoal(id: string) {
    return this.axiosInstance.delete(`/goals/${id}`)
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

type GetGoalsByUserData = {
  goals: GoalData[]
}

type GetGoalsData = {
  goals: GoalData[]
}

type CreateGoalInput = Omit<GoalData, "_id" | "createdAt" | "updatedAt">
type CreateGoalData = GoalData

type UpdateGoalInput = Optional<Omit<GoalData, "_id" | "createdAt" | "updatedAt">>
type UpdateGoalData = GoalData

export const {
  getGoalsByUserId,
  getGoals,
  createGoal,
  deleteGoal,
  updateGoal,
} = new GoalsService(apiAxios)