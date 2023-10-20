import React from 'react'
import { Button, Divider, Stack } from '@mui/material'
import { FeedMode } from '../../pages/home/home'

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
      sx={{ p: 4 }}
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      justifyContent="center"
    >
      <Button
        variant={activeButton === FeedMode.FOLLOWING ? 'contained' : 'outlined'}
        onClick={() => handleButtonClick(FeedMode.FOLLOWING)}
      >
        Following
      </Button>
      <Button
        variant={activeButton === FeedMode.TRENDING ? 'contained' : 'outlined'}
        onClick={() => handleButtonClick(FeedMode.TRENDING)}
      >
        Trending
      </Button>
    </Stack>
  )
}

export default FilterPostButtons
