import { useContext } from 'react'
import { MobileContext } from '../../contexts/mobileContext'
import MobilePost from './mobilePost'
import DesktopPost from './post'
import PostProps from './mobilePost'
import { Post } from '../../models/post'

interface PostProps {
  post: Post
  commentOpen?: boolean
}

const PostCard = ({ post, commentOpen = false }: PostProps) => {
  const mobile = useContext(MobileContext)
  if (mobile) {
    return MobilePost({ post, commentOpen })
  } else {
    return DesktopPost({ post, commentOpen })
  }
}

export default PostCard
