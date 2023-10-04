import { Post } from '../models/post'

// Stub
export const createPost = (postData: Post) => {
  return {
    ...postData,
    postId: '1',
  }
}
