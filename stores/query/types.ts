export type Task = {
  id: string
  title: string
  category: string
  compliments: string[]
  doneAt: string
  author: string
  createdAt: string
  updatedAt: string
}

export type Category = {
  id: string
  name: string
  color: string
  author: string
  createdAt: string
  updatedAt: string
}

export type Compliment = {
  id: string
  emoji: string
  message: string
  author: string
  createdAt: string
  updatedAt: string
}

export type User = {
  id: string
  name: string 
  followers: string[]
  followings: string[]
  createdAt: string
}