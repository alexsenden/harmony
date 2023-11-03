import { Post } from '../../models/post'
import { PollAnswer } from './poll-answer'

interface PollContentProps {
  post: Post
}

export const PollContent = ({ post }: PollContentProps) => {
  return (
    <>
      {post.pollOptions &&
        post.pollOptions.map((option, index) => (
          <PollAnswer pollOption={option} key={`poll-answer=${index}`} />
        ))}
    </>
  )
}
