import { Box, Button } from '@mui/material'
import { PollOption } from '../../models/pollOption'
import TextBlock from '../text-block'

interface PollAnswerProps {
  pollOption: PollOption
}

export const PollAnswer = ({ pollOption }: PollAnswerProps) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      sx={{ mt: 2, ml: 3 }}
    >
      <Button
        variant="outlined"
        size="small"
        disabled
        sx={{ minWidth: 0, mr: 2 }}
      >
        x
      </Button>
      <TextBlock>{pollOption.option}</TextBlock>
    </Box>
  )
}
