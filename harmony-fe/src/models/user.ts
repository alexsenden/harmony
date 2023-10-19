export type User = {
  userId: string
  username: string
  password: string
  createdAt: Date
  active: boolean
  firstName: string
  lastName: string
}

export type NewUser = {
  firstName: string
  lastName: string
  username: string
  password: string
}
