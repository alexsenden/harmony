import { useContext, useState } from 'react'
import { SendRounded } from '@mui/icons-material'
import {
  CardContent,
  Collapse,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material'

import Post from './post'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { UserContext } from '../../contexts/userContext'

interface CommentInputProps {
  open: boolean
  post: Post
  submitComment: (comment: string) => void
}

export const CommentInput = ({
  open,
  post,
  submitComment,
}: CommentInputProps) => {
  const user = useContext(UserContext)
  const [commentInput, setCommentInput] = useState('')

  const [postComment] = useHttpRequest({
    url: `/post/${post.postId}/comment`,
    method: HttpMethod.POST,
    body: { commentInput },
  })

  const handleCommentSubmission = () => {
    if (commentInput.trim() !== '') {
      postComment()
      submitComment(commentInput)
      setCommentInput('')
    }
  }

  const handleCommentInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommentInput(event.target.value)
  }

  const placeholder = user ? 'Add a comment..' : 'Log in to post comments!'

  return (
    <Collapse in={open}>
      <CardContent>
        <TextField
          placeholder={placeholder}
          fullWidth
          value={commentInput}
          disabled={!user}
          onChange={handleCommentInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleCommentSubmission}>
                  <SendRounded />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </CardContent>
    </Collapse>
  )
}
