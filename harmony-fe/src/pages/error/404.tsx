import { Box } from '@mui/material'
import HarmonyAppBar from '../../components/appBar'
import TextBlock from '../../components/text'

export default function Error404() {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <TextBlock>404 - Page Not Found</TextBlock>
      </Box>
    </>
  )
}
