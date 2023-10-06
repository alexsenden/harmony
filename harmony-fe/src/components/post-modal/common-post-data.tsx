import { Box, TextField } from '@mui/material'

import { PostField } from '../../models/post'

interface CommonPostDataProps {
  onChange: (argName: PostField, argValue: string) => void
}

export const CommonPostData = ({ onChange }: CommonPostDataProps) => {
  return (
    <Box
      sx={{
        width: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mx: 3,
      }}
    >
      <TextField
        onChange={event => onChange(PostField.TOPIC_ID, event.target.value)}
        label="Topic"
        variant="outlined"
        helperText="Artist, Album, or Song"
        fullWidth
        multiline
        sx={{ mt: 3 }}
      />
      <TextField
        onChange={event => onChange(PostField.TITLE, event.target.value)}
        label="Title"
        variant="outlined"
        fullWidth
        multiline
        sx={{ mt: 3 }}
      />
      <TextField
        onChange={event => onChange(PostField.BODY, event.target.value)}
        label="Body"
        variant="outlined"
        fullWidth
        multiline
        rows={6}
        sx={{ mt: 3 }}
      />
    </Box>
  )
}
