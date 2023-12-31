export type CommentWithUser = {
  commentId: string
  userId: string
  postId: string
  postTitle: string
  createdAt: Date
  content?: string
  user: {
    username: string
    picture: number
  }
}
