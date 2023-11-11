import styled from '@emotion/styled'
import { Button } from '@mui/material'

const FollowFilterButton = styled(Button)(({ variant }) => ({
  ...(variant === 'contained' && {}),
  ...(variant === 'outlined' && {}),
}))

export default FollowFilterButton
