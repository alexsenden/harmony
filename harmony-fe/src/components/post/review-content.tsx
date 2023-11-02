import { Rating } from '@mui/material'

import { Post } from '../../models/post'
import TextBlock from '../text-block'

interface ReviewContentProps {
  post: Post
}

export const ReviewContent = ({ post }: ReviewContentProps) => {
  return (
    <>
      {post.rating && (
        <Rating
          size="large"
          value={post.rating}
          precision={0.5}
          readOnly
          sx={{ my: 1, ml: 0.5 }}
        />
      )}
      {post.body && <TextBlock sx={{ ml: 1 }}>{post.body}</TextBlock>}
    </>
  )
}
