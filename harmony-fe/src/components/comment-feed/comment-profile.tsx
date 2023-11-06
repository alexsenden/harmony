import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Link,
} from '@mui/material'

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
        <TextBlock
          display="flex"
          justifyContent="space-between"
          gutterBottom
          variant="body1"
        >
          <Box>
            <Button href={`/profile/${comment.user.username}`}>
              <Avatar
                src={`/images/profilepic/${comment.user.picture}.png`}
                sx={{ mr: 1, height: 24, width: 24 }}
              ></Avatar>
              <strong>{comment.user.username}</strong>
            </Button>
            <>on </>
            <Link href={`/posts/${comment.postId}`} underline="none">
              {comment.postTitle}
            </Link>
          </Box>
          {moment(comment.createdAt).fromNow()}
        </TextBlock>
        <TextBlock>{comment.content}</TextBlock>
      </CardContent>
    </Card>
  )
}

export default Comment
