import { Box } from '@mui/material'
import { useContext } from 'react'
import { MobileContext } from '../../contexts/mobileContext'

interface IPostFormContainerProps {
  children?: React.ReactNode
}

const PostFormContainer = ({ children }: IPostFormContainerProps) => {
  const mobile = useContext(MobileContext)
  return (
    <Box width={mobile ? undefined : 500} alignItems="center" mx={3}>
      {children}
    </Box>
  )
}

export default PostFormContainer
