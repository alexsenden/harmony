import React from 'react'
import { Button, Divider, Stack } from '@mui/material'

interface FilterPostButtonsProps {
  activeButton: string
  handleButtonClick: (button: string) => void
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
        variant={activeButton === 'followed' ? 'contained' : 'outlined'}
        onClick={() => handleButtonClick('followed')}
      >
        Followed
      </Button>
      <Button
        variant={activeButton === 'recommended' ? 'contained' : 'outlined'}
        onClick={() => handleButtonClick('recommended')}
      >
        Recommended
      </Button>
    </Stack>
  )
}

export default FilterPostButtons
