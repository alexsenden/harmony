import { Box } from '@mui/material'
import TextBlock from '../../components/text-block'

const Error404 = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        //flexDirection="column"
        height="70vh"
      >
        <TextBlock variant="h3">404 - Page Not Found</TextBlock>
      </Box>
    </>
  )
}

export default Error404
