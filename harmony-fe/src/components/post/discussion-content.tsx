import { Post } from '../../models/post'
import TextBlock from '../text-block'

interface DiscussionContentProps {
  post: Post
}

export const DiscussionContent = ({ post }: DiscussionContentProps) => {
  return <>{post.body && <TextBlock sx={{ ml: 1 }}>{post.body}</TextBlock>}</>
}
