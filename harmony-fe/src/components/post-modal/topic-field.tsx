import { useEffect, useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'

import { Topic } from '../../models/topic'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { PostField } from '../../models/post'
import AutocompleteLi from '../autocomplete-li'
import { getSearchableLabel } from '../../utils/additionalContext'
import { Searchable } from '../../models/searchable'

interface ITopicFieldProps {
  error?: boolean
  onChange: (argName: PostField, argValue: unknown) => void
}

export const TopicField = ({ error, onChange }: ITopicFieldProps) => {
  const [topicInput, setTopicInput] = useState('')
  const [topicOptions, setTopicOptions] = useState<Array<Topic>>([])

  const onTopicInputChange = (newTopicValue: string) => {
    setTopicInput(newTopicValue)
  }

  const onTopicChange = (newTopic: Topic | null) => {
    onChange(PostField.TOPIC_ID, newTopic?.topicId)
  }

  const [getTopicsByPartialName, topicsResponse] = useHttpRequest({
    url: `/topic/partialName/${topicInput}`,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    if (topicsResponse) {
      setTopicOptions(topicsResponse)
    }
  }, [topicsResponse])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      getTopicsByPartialName()
    }, 500)

    return () => clearTimeout(debounceTimer)
  }, [topicInput])

  return (
    <Autocomplete
      options={topicOptions}
      onInputChange={(event, value) => onTopicInputChange(value)}
      onChange={(event, value) => onTopicChange(value)}
      getOptionLabel={option => getSearchableLabel(option as Searchable)}
      isOptionEqualToValue={(option, value) => option?.name === value?.name}
      fullWidth
      sx={{ justifyContent: 'center' }}
      autoHighlight
      renderInput={params => (
        <TextField
          {...params}
          label="Topic"
          variant="outlined"
          helperText="Artist, Album, or Song"
          multiline
          error={error}
          sx={{ mt: 3 }}
        />
      )}
      renderOption={(props, option) => (
        <AutocompleteLi option={option as Searchable} {...props} />
      )}
    />
  )
}
