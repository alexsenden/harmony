import { Post } from "./post"

export type User = {
    userId: string
    username: string
    password: string
    createdAt: string
    active: string
    posts: Array<Object>
    likes: Array<Object>
    comments: Array<Object>
    follows: Array<Object>
    followers: Array<Object>
    firstName: string
    lastName: string
}

export type NewUser = {
    firstName: string
    lastName: string
    username: string
    password: string
}

