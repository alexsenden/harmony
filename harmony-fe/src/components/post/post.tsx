import {
  Card,
  CardActions,
  CardContent,
  Button,
  Avatar,
  Stack,
  Box,
  Divider,
  TextField,
  Collapse,
  InputAdornment,
  IconButton,
  Link,
} from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import TextBlock from '../text'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { useState } from 'react'

interface PostProps {
  title: string
  name: string
  numComments: number
  numLikes: number
  postId: string
}

const Post = ({ title, name, numComments, numLikes, postId }: PostProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false)

  const toggleLike = () => {
    setIsLiked(prevState => !prevState)
  }

  const toggleCommentSection = () => {
    setIsCommentSectionOpen(prevState => !prevState)
  }

  const [commentInput, setCommentInput] = useState('')
  const [comments, setComments] = useState<string[]>([])

  const handleCommentInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommentInput(event.target.value)
  }

  const handleCommentSubmission = () => {
    if (commentInput.trim() !== '') {
      setComments(prevComments => [...prevComments, commentInput])
      setCommentInput('')
      toggleCommentSection()
    }
  }
  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <Stack direction="row">
        <CardContent>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>poll</Avatar>
        </CardContent>

        <Box sx={{ width: '100%' }}>
          <CardContent>
            <Link href={`/posts/${postId}`}>
              <TextBlock gutterBottom variant="h5">
                {title}
              </TextBlock>
            </Link>
          </CardContent>

          <CardActions>
            <Button size="small" onClick={toggleLike}>
              {isLiked ? (
                <ThumbUpIcon style={{ color: 'blue' }} />
              ) : (
                <ThumbUpOffAltOutlinedIcon />
              )}
            </Button>

            <Button size="small" onClick={toggleCommentSection}>
              <CommentOutlinedIcon />
            </Button>
          </CardActions>

          <Divider />

          <CardActions sx={{ display: 'flex', justifyContent: 'start' }}>
            <Link href={`/profile/${name}`}>
              <TextBlock>By: {name} </TextBlock>
            </Link>
            <Button size="small" onClick={toggleCommentSection}>
              {numComments} comments
            </Button>
            <Button size="small"> {numLikes} likes</Button>
          </CardActions>

          <Collapse in={isCommentSectionOpen}>
            <CardContent>
              <TextField
                placeholder="Add a comment.."
                fullWidth
                value={commentInput}
                onChange={handleCommentInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleCommentSubmission}>
                        <SendRoundedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </CardContent>
          </Collapse>

          {/* This section should be replace with the dynamic comments from database */}
          {comments.map((comment, index) => (
            <CardContent key={index}>
              <TextBlock gutterBottom variant="body1">
                Comment {index + 1}: {comment}
              </TextBlock>
            </CardContent>
          ))}
        </Box>
      </Stack>
    </Card>
  )
}

export default Post
