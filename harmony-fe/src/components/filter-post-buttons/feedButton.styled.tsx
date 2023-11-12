import styled from '@emotion/styled'
import { Button, useTheme } from '@mui/material'

const FeedButton = styled(Button)(({ variant }) => ({
  ...(variant === 'contained' && {
    boxShadow: `0px 0px 10px 5px ${useTheme().palette.primary.main}`,
  }),
  ...(variant === 'outlined' && {}),
}))

export default FeedButton
