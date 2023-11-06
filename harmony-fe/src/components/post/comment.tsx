import { Avatar, Box, Button, CardContent } from '@mui/material'
import moment from 'moment'
import { CommentWithUser } from '../../models/comment'
import TextBlock from '../text-block'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'

interface CommentProps {
  comment: CommentWithUser
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <CardContent>
      <TextBlock
        display="flex"
        justifyContent="space-between"
        gutterBottom
        variant="body1"
      >
        <Button href={`/profile/${comment.user.username}`}>
          <Avatar
            src={`/images/profilepic/${comment.user.picture}.png`}
            sx={{ mr: 1, height: 24, width: 24 }}
          ></Avatar>
          <strong>{comment.user.username}</strong>
        </Button>
        {moment(comment.createdAt).fromNow()}
      </TextBlock>
      <Box display="flex" justifyContent="space-between">
        <TextBlock>{comment.content}</TextBlock>
        <MoreHorizRoundedIcon></MoreHorizRoundedIcon>
      </Box>
    </CardContent>
  )
}

export default Comment
