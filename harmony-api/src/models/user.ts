export type User = {
  userId: string
  username: string
  password: string
  createdAt: Date
  active: boolean
  posts: Array<Object>
  likes: Array<Object>
  comments: Array<Object>
  follows: Array<Object>
  followers: Array<Object>
  firstName: string
  lastName: string
}
