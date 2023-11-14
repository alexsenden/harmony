import { Box, LinearProgress, Typography, useTheme } from '@mui/material'
import { PollOption } from '../../models/pollOption'
import TextBlock from '../text-block'
import React from 'react'

interface PollAnswerProps {
  pollOption: PollOption
  totalVotes: number
}

export const PollAnswerBar = ({ pollOption, totalVotes }: PollAnswerProps) => {
  const theme = useTheme()

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        sx={{ mt: 2, ml: 3 }}
      >
        <Box sx={{ width: '25%', mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={((pollOption.votes || 0) * 100) / totalVotes}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            ((pollOption.votes || 0) * 100) / totalVotes
          )}%`}</Typography>
        </Box>
      </Box>
      <TextBlock
        color={
          pollOption.votedOn
            ? theme.palette.text.primary
            : theme.palette.text.disabled
        }
      >
        {pollOption.option}
      </TextBlock>
    </>
  )
}
