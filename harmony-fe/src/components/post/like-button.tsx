import { Button } from '@mui/material'
import { ThumbUp, ThumbUpOffAltOutlined } from '@mui/icons-material'

import { Post } from '../../models/post'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'

interface LikeButtonProps {
  isLiked: boolean
  post: Post
  handleLike: () => void
}

const LikeButton = ({ isLiked, post, handleLike }: LikeButtonProps) => {
  const [postLikeRequest] = useHttpRequest({
    url: `/post/${post.postId}/like`,
    method: HttpMethod.POST,
    body: { postId: post.postId },
  })

  const [removeLikeRequest] = useHttpRequest({
    url: `/post/${post.postId}/like`,
    method: HttpMethod.DELETE,
    body: { postId: post.postId },
  })

  const toggleLike = () => {
    if (!isLiked) {
      postLikeRequest()
      handleLike()
    } else {
      removeLikeRequest()
      handleLike()
    }
  }

  return (
    <Button size="small" onClick={toggleLike}>
      {isLiked ? <ThumbUp /> : <ThumbUpOffAltOutlined />}
    </Button>
  )
}

export default LikeButton
