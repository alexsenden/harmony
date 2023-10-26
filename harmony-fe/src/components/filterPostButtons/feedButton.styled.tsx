import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { globalTheme } from '../../pages/_app'

const FeedButton = styled(Button)(({ variant }) => ({
  ...(variant === 'contained' && {
    boxShadow: `0px 0px 10px 5px ${globalTheme.palette.primary.main}`,
  }),
  ...(variant === 'outlined' && {}),
}))

export default FeedButton
