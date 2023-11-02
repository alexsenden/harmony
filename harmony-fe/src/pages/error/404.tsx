import { Box } from '@mui/material'
import TextBlock from '../../components/text-block'

export default function Error404() {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <TextBlock>404 - Page Not Found</TextBlock>
      </Box>
    </>
  )
}
