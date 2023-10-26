import styled from '@emotion/styled'
import { Button } from '@mui/material'

const FeedButton = styled(Button)(({ variant }) => ({
  ...(variant === 'contained' && {
    backgroundColor: 'red',
  }),
  ...(variant === 'outlined' && {
    backgroundColor: 'blue',
  }),
}))

export default FeedButton
