export type Like = {
  userId: string
  postId: string
}
export type LikeWithUser = {
  userId: string
  postId: string
  user: {
    username: string
    picture: number
  }
}
