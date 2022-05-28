import {AxiosInstance} from "axios";
import {Optional} from "utility-types";
import {apiAxios} from "api"

export class UsersService {
  axiosInstance: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance
  }

  createUser(input: CreateUserInput) {
    return this.axiosInstance.post<CreateUserData>("/users", input)
  }

  getUser(id: string) {
    return this.axiosInstance.get<GetUserDate>(`/users/${id}`)
  }

  updateUser(input: UpdateUserInput) {
    return this.axiosInstance.post<UpdateUserData>("/users", input)
  }

  deleteUser(id: string) {
    return this.axiosInstance.delete(`/users/${id}`)
  }
}

export type UserData = {
  _id: string
  createdAt: number
  email: string
  followers: string[]
  followings: string[]
  image?: string
  name: string
  updatedAt: number
  userId: number
}

type CreateUserInput = Omit<
  UserData, 
  "_id" | "createdAt" | "followers" | "followings" | "updatedAt"
>
type CreateUserData = UserData

type UpdateUserInput = Optional<Omit<
  UserData, 
  "followings" | "updatedAt"
>>
type UpdateUserData = UserData

type GetUserDate = UserData

export const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = new UsersService(apiAxios)