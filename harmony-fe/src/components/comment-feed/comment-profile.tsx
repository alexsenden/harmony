import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Stack,
} from '@mui/material'

import { CommentWithUser } from '../../models/comment'
import TextBlock from '../text-block'

interface CommentProps {
  comment: CommentWithUser
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <Stack direction="row">
        <CardContent>
          <TextBlock gutterBottom variant="body1">
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
          </TextBlock>
          <TextBlock>{comment.content}</TextBlock>
        </CardContent>
      </Stack>
    </Card>
  )
}

export default Comment
