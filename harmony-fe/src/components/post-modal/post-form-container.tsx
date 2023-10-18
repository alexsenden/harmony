import { Box } from '@mui/material'

interface IPostFormContainerProps {
  children?: React.ReactNode
}

const PostFormContainer = ({ children }: IPostFormContainerProps) => {
  return (
    <Box
      width={500}
      display="flex"
      flexDirection="column"
      alignItems="center"
      mx={3}
    >
      {children}
    </Box>
  )
}

export default PostFormContainer
