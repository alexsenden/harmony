import React from 'react'
import { Divider, Stack } from '@mui/material'
import { FollowMode } from '../../pages/home/home'
import FollowFilterButton from './followFilterButton.styled'

interface FollowPostButtonsProps {
  activeButton: FollowMode
  handleButtonClick: (button: FollowMode) => void
}
const FollowFilterPostButtons = ({
  activeButton,
  handleButtonClick,
}: FollowPostButtonsProps) => {
  return (
    <Stack
      sx={{ px: 4, pt: 1, pb: 2 }}
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={1}
      justifyContent="center"
    >
      <FollowFilterButton
        variant={activeButton === FollowMode.ALL ? 'contained' : 'text'}
        onClick={() => handleButtonClick(FollowMode.ALL)}
      >
        All
      </FollowFilterButton>
      <FollowFilterButton
        variant={activeButton === FollowMode.ALBUM ? 'contained' : 'text'}
        onClick={() => handleButtonClick(FollowMode.ALBUM)}
      >
        Album
      </FollowFilterButton>
      <FollowFilterButton
        variant={activeButton === FollowMode.ARTIST ? 'contained' : 'text'}
        onClick={() => handleButtonClick(FollowMode.ARTIST)}
      >
        Artist
      </FollowFilterButton>
      <FollowFilterButton
        variant={activeButton === FollowMode.SONG ? 'contained' : 'text'}
        onClick={() => handleButtonClick(FollowMode.SONG)}
      >
        Song
      </FollowFilterButton>
      <FollowFilterButton
        variant={activeButton === FollowMode.USER ? 'contained' : 'text'}
        onClick={() => handleButtonClick(FollowMode.USER)}
      >
        User
      </FollowFilterButton>
    </Stack>
  )
}

export default FollowFilterPostButtons
