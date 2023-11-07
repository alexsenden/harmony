import React from 'react'
import { Box } from '@mui/material'

import { getTopicContext } from '../../utils/topicContext'
import { TSearchOption } from '../search-bar/search-bar'
import TextBlock from '../text-block'

interface IAutocompleteLiProps extends React.LiHTMLAttributes<HTMLLIElement> {
  option: TSearchOption
}

const AutocompleteLi = ({ option, ...props }: IAutocompleteLiProps) => {
  const getOptionLabel = (option: unknown) => {
    const searchOption = option as TSearchOption
    return 'name' in searchOption
      ? searchOption.name
      : searchOption.username || ''
  }

  return (
    <li {...props}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent={'space-between'}
        width="100%"
      >
        <TextBlock>{getOptionLabel(option)}</TextBlock>
        <TextBlock>
          {'topicId' in option ? getTopicContext(option.topicId) : '(User)'}
        </TextBlock>
      </Box>
    </li>
  )
}

export default AutocompleteLi
