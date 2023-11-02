export type Comment = {
  commentId: string
  userId: string
  postId: string
  createdAt: Date
  content?: string
}

export type CommentWithUser = {
  commentId: string
  userId: string
  postId: string
  createdAt: Date
  content?: string
  user: {
    username: string
    picture: number
  }
}
