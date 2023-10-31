export type User = {
  userId: string
  username: string
  password: string
  createdAt: Date
  active: boolean
  firstName: string
  lastName: string
  bio: string
  picture: number
}

export type NewUser = {
  firstName: string
  lastName: string
  username: string
  password: string
}
