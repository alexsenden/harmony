import { Post } from '../../models/post'
import { PollAnswer } from './poll-answer'
import { PollAnswerBar } from './poll-answer-bar'
import { useState } from 'react'

interface PollContentProps {
  post: Post
  voted: boolean
  voteAction: (bool: boolean) => void
}

export const PollContent = ({ post, voted, voteAction }: PollContentProps) => {
  const [numVotes, setNumVotes] = useState(post.numVotes || 0)
  const castVote = () => {
    voteAction(true)
    setNumVotes(numVotes + 1)
  }
  return (
    <>
      {post.pollOptions &&
        !voted &&
        post.pollOptions.map((option, index) => (
          <PollAnswer
            pollOption={option}
            voteAction={castVote}
            key={`poll-answer=${option.pollOptionId}`}
          />
        ))}

      {post.pollOptions &&
        voted &&
        post.pollOptions.map((option, index) => (
          <PollAnswerBar
            pollOption={option}
            totalVotes={numVotes}
            key={`poll-answer=${option.pollOptionId}`}
          />
        ))}
    </>
  )
}
