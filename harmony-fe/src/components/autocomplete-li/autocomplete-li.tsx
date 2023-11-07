import React from 'react'
import { Box } from '@mui/material'

import {
  getTopicContext,
  getSearchableLabel,
} from '../../utils/additionalContext'
import TextBlock from '../text-block'
import { Searchable } from '../../models/searchable'

interface IAutocompleteLiProps extends React.LiHTMLAttributes<HTMLLIElement> {
  option: Searchable
}

const AutocompleteLi = ({ option, ...props }: IAutocompleteLiProps) => {
  return (
    <li {...props}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent={'space-between'}
        width="100%"
      >
        <TextBlock>{getSearchableLabel(option)}</TextBlock>
        <TextBlock>
          {'topicId' in option ? getTopicContext(option.topicId) : '(User)'}
        </TextBlock>
      </Box>
    </li>
  )
}

export default AutocompleteLi
