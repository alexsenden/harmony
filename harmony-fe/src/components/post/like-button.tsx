import { Button } from '@mui/material'
import { ThumbUp, ThumbUpOffAltOutlined } from '@mui/icons-material'

import { Post } from '../../models/post'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'

interface LikeButtonProps {
  isLiked: boolean
  post: Post
  handleLike: () => void
}

const LikeButton = ({ isLiked, post, handleLike }: LikeButtonProps) => {
  const user = useContext(UserContext)

  const [postLikeRequest] = useHttpRequest({
    url: `/post/${post.postId}/like`,
    method: HttpMethod.POST,
  })

  const [removeLikeRequest] = useHttpRequest({
    url: `/post/${post.postId}/like`,
    method: HttpMethod.DELETE,
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
    <Button size="small" onClick={toggleLike} disabled={!user}>
      {isLiked ? <ThumbUp /> : <ThumbUpOffAltOutlined />}
    </Button>
  )
}

export default LikeButton
