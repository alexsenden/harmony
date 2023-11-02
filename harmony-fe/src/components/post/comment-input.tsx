import { useState } from 'react'
import { SendRounded } from '@mui/icons-material'
import {
  CardContent,
  Collapse,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material'

interface CommentInputProps {
  open: boolean
  submitComment: (comment: string) => void
}

export const CommentInput = ({ open, submitComment }: CommentInputProps) => {
  const [commentInput, setCommentInput] = useState('')

  const handleCommentSubmission = () => {
    if (commentInput.trim() !== '') {
      submitComment(commentInput)
      setCommentInput('')
    }
  }

  const handleCommentInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommentInput(event.target.value)
  }

  return (
    <Collapse in={open}>
      <CardContent>
        <TextField
          placeholder="Add a comment.."
          // Disabling for sprint 2 evaluation
          //disabled
          fullWidth
          value={commentInput}
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
