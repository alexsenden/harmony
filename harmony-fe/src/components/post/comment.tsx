import { Avatar, Button, CardContent } from '@mui/material'

import { CommentWithUser } from '../../models/comment'
import TextBlock from '../text-block'

interface CommentProps {
  comment: CommentWithUser
  index: number
}

const Comment = ({ comment, index }: CommentProps) => {
  return (
    <CardContent key={index}>
      <TextBlock gutterBottom variant="body1">
        <Button href={`/profile/${comment.user.username}`}>
          <Avatar
            src={`/image/profilepic/${comment.user.picture}.png`}
            sx={{ mr: 1, height: 24, width: 24 }}
          ></Avatar>
          <strong>{comment.user.username}</strong>
        </Button>
      </TextBlock>
      <TextBlock>{comment.content}</TextBlock>
    </CardContent>
  )
}

export default Comment
