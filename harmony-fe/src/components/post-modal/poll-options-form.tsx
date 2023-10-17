import { Box, Button, TextField } from '@mui/material'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import React, { useState } from 'react'
import { v4 as newUuid } from 'uuid'

import { PostField } from '../../models/post'
import { PollOption } from '../../models/pollOption'

const MAX_NUM_OPTIONS = 8
const MIN_NUM_OPTIONS = 2

interface PollOptionsFormProps {
  onChange: (argName: PostField, argValue: unknown) => void
}

export const PollOptionsForm = ({ onChange }: PollOptionsFormProps) => {
  const newOption = (): PollOption => {
    return {
      pollOptionId: newUuid(),
      option: '',
    }
  }

  const [options, setOptions] = useState<Array<PollOption>>([
    newOption(),
    newOption(),
    newOption(),
  ])

  const addOption = () => {
    if (options.length < MAX_NUM_OPTIONS) {
      setOptions([...options, newOption()])
    }
  }

  const removeOption = () => {
    if (options.length > MIN_NUM_OPTIONS) {
      setOptions(options.slice(0, options.length - 1))
    }
  }

  onChange(PostField.POLL_OPTIONS, options)

  return (
    <>
      {options.map((option, index) => {
        return (
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            width={1}
            sx={{ mt: index === 0 ? 3 : 2, mr: 2 }}
          >
            <CheckBoxOutlinedIcon sx={{ mx: 2 }} />
            <TextField
              label={`Poll Option ${index + 1}`}
              defaultValue={option.option}
              variant="outlined"
              fullWidth
              size="small"
              onChange={event => (option.option = event.target.value)}
            />
          </Box>
        )
      })}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        width={1}
        sx={{ mx: 3, mt: 3 }}
      >
        <Button
          variant="outlined"
          fullWidth
          onClick={removeOption}
          sx={{ mr: 1 }}
        >
          Remove Option
        </Button>
        <Button variant="outlined" fullWidth onClick={addOption} sx={{ ml: 1 }}>
          Add Option
        </Button>
      </Box>
    </>
  )
}
