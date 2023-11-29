import { useContext } from 'react'
import { MobileContext } from '../../contexts/mobileContext'
import MobilePost from './mobile-post'
import DesktopPost from './desktop-post'
//import PostProps from './mobile-post'
import { Post } from '../../models/post'

interface PostProps {
  post: Post
  commentOpen?: boolean
  expanded?: boolean
}

const PostCard = ({
  post,
  commentOpen = false,
  expanded = false,
}: PostProps) => {
  const mobile = useContext(MobileContext)
  if (mobile) {
    return MobilePost({ post, commentOpen, expanded })
  } else {
    return DesktopPost({ post, commentOpen, expanded })
  }
}

export default PostCard
