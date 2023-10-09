import { useEffect, useState } from 'react'
import { Autocomplete, Box, TextField } from '@mui/material'

import { PostField, PostType } from '../../models/post'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { Topic } from '../../models/topic'

interface CommonPostDataProps {
  postType: PostType
  onChange: (argName: PostField, argValue: unknown) => void
}

export const CommonPostData = ({ postType, onChange }: CommonPostDataProps) => {
  const [topicInput, setTopicInput] = useState('')
  const [topicOptions, setTopicOptions] = useState<Array<Topic>>([])

  const onTopicInputChange = (newTopicValue: string) => {
    setTopicInput(newTopicValue)
  }

  const onTopicChange = (newTopic: Topic | null) => {
    onChange(PostField.TOPIC_ID, newTopic?.topicId)
  }

  const [getTopicsByPartialName, topicsResponse] = useHttpRequest({
    url: `/topic/partialName?partialName=${topicInput}`,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    if (topicsResponse) {
      setTopicOptions(topicsResponse)
    }
  }, [topicsResponse])

  useEffect(() => {
    getTopicsByPartialName()
  }, [topicInput])

  onChange(PostField.POST_TYPE, postType)

  return (
    <Box
      sx={{
        width: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mx: 3,
      }}
    >
      <Autocomplete
        options={topicOptions}
        onInputChange={(event, value) => onTopicInputChange(value)}
        onChange={(event, value) => onTopicChange(value)}
        getOptionLabel={topic => topic?.name || ''}
        isOptionEqualToValue={(option, value) => option?.name === value?.name}
        fullWidth
        autoHighlight
        renderInput={params => (
          <TextField
            {...params}
            label="Topic"
            variant="outlined"
            helperText="Artist, Album, or Song"
            multiline
            fullWidth
            sx={{ mt: 3 }}
          />
        )}
      />
      <TextField
        onChange={event => onChange(PostField.TITLE, event.target.value)}
        label="Title"
        variant="outlined"
        fullWidth
        multiline
        sx={{ mt: 3 }}
      />
      <TextField
        onChange={event => onChange(PostField.BODY, event.target.value)}
        label="Body"
        variant="outlined"
        fullWidth
        multiline
        rows={6}
        sx={{ mt: 3 }}
      />
    </Box>
  )
}
