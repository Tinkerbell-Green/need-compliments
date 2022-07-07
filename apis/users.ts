import {Optional} from "utility-types";
import {apiAxios} from "./axios"

export class UsersService {
  createUser(input: CreateUserInput) {
    return apiAxios.post<CreateUserData>("/users", input)
  }

  getUser(id: string) {
    return apiAxios.get<GetUserDate>(`/users/${id}`)
  }

  updateUser(id: string, input: UpdateUserInput) {
    return apiAxios.post<UpdateUserData>(`/users/${id}`, input)
  }

  deleteUser(id: string) {
    return apiAxios.delete(`/users/${id}`)
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
  userId: string
}

export type CreateUserInput = Omit<
  UserData, 
  "_id" | "createdAt" | "followers" | "followings" | "updatedAt"
>
export type CreateUserData = {
  user: UserData
}

export type UpdateUserInput = Optional<Omit<
  UserData, 
  "followings" | "updatedAt"
>>
export type UpdateUserData = {
  user: UserData
}

export type GetUserDate = {
  user: UserData
}

export const usersService = new UsersService()