import React from 'react'
import { Divider, Stack } from '@mui/material'
import { FeedMode } from '../../pages/home/home'
import FeedButton from './feedButton.styled'

interface FilterPostButtonsProps {
  activeButton: FeedMode
  handleButtonClick: (button: FeedMode) => void
}
const FilterPostButtons = ({
  activeButton,
  handleButtonClick,
}: FilterPostButtonsProps) => {
  return (
    <Stack
      sx={{ px: 4, pt: 4, pb: 2 }}
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      justifyContent="center"
    >
      <FeedButton
        variant={activeButton === FeedMode.TRENDING ? 'contained' : 'outlined'}
        onClick={() => handleButtonClick(FeedMode.TRENDING)}
      >
        New
      </FeedButton>
      <FeedButton
        variant={activeButton === FeedMode.FOLLOWING ? 'contained' : 'outlined'}
        onClick={() => handleButtonClick(FeedMode.FOLLOWING)}
      >
        Following
      </FeedButton>
    </Stack>
  )
}

export default FilterPostButtons
