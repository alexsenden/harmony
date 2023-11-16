import { Avatar, Box, Button, Card, CardContent } from '@mui/material'

import { CommentWithUser } from '../../models/comment'
import TextBlock from '../text-block'
import moment from 'moment'

interface CommentProps {
  comment: CommentWithUser
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Button href={`/profile/${comment.user.username}`}>
            <Avatar
              src={`/images/profilepic/${comment.user.picture}.png`}
              sx={{ mr: 1, height: 24, width: 24 }}
            />
            <strong>{comment.user.username}</strong>
          </Button>
          <TextBlock>{moment(comment.createdAt).fromNow()}</TextBlock>
        </Box>
        <TextBlock>{comment.content}</TextBlock>
      </CardContent>
    </Card>
  )
}

export default Comment
