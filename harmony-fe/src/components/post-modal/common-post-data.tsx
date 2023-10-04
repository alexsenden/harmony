import { Box, TextField } from '@mui/material'

export const CommonPostData = () => {
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
        label="Topic"
        variant="outlined"
        helperText="Artist, Album, or Song"
        fullWidth
        multiline
        sx={{ mt: 3 }}
      />
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        multiline
        sx={{ mt: 3 }}
      />
      <TextField
        label="Body"
        variant="outlined"
        fullWidth
        multiline
        rows={6}
        sx={{ my: 3 }}
      />
    </Box>
  )
}
