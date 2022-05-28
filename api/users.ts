import {AxiosInstance} from "axios";
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
  image: string
  name: string
  updatedAt: number
  userId: number
}

type CreateUserInput = {
  userId: string
  name: string
  email: string
  image?: string
}

type CreateUserData = UserData

type GetUserDate = UserData

export const {
  createUser,
  getUser,
  deleteUser,
} = new UsersService(apiAxios)