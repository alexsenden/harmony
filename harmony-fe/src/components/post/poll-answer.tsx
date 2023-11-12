import { Box, Button } from '@mui/material'
import { PollOption } from '../../models/pollOption'
import TextBlock from '../text-block'
import { UserContext } from '../../contexts/userContext'
import React from 'react'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'

interface PollAnswerProps {
  pollOption: PollOption
  voteAction: () => void
}

export const PollAnswer = ({ pollOption, voteAction }: PollAnswerProps) => {
  const isUser = !(React.useContext(UserContext) === undefined)

  const [pollVote] = useHttpRequest({
    url: '/post/vote',
    method: HttpMethod.POST,
    body: { pollOptionId: pollOption.pollOptionId },
  })

  const voteOption = () => {
    voteAction()
    pollOption.votes = (pollOption.votes || 0) + 1
    pollOption.votedOn = true
    pollVote()
  }

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
        disabled={!isUser}
        sx={{ minWidth: 0, mr: 2 }}
        onClick={voteOption}
      >
        x
      </Button>
      <TextBlock>{pollOption.option}</TextBlock>
    </Box>
  )
}
