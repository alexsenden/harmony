import { Box, Rating } from '@mui/material'

import { PostField, PostType } from '../../models/post'
import PostFormContainer from './post-form-container'
import { PostInputField } from './post-input-field'
import { TopicField } from './topic-field'

interface IDiscussionPostFormProps {
  onChange: (argName: PostField, argValue: unknown) => void
}

export const ReviewPostForm = ({ onChange }: IDiscussionPostFormProps) => {
  onChange(PostField.POST_TYPE, PostType.REVIEW)

  return (
    <PostFormContainer>
      <TopicField onChange={onChange} />
      <Box display="flex" flexDirection="row" alignItems="center" width={1}>
        <PostInputField
          label="Title"
          field={PostField.TITLE}
          onChange={onChange}
          textFieldProps={{ sx: { mt: 1 } }}
        />
        <Rating
          size="large"
          defaultValue={2.5}
          precision={0.5}
          onChange={(event, newValue) => {
            onChange(PostField.RATING, newValue)
          }}
          sx={{ ml: 2, mr: 1, pt: 1 }}
        />
      </Box>
      <PostInputField
        label="Review"
        field={PostField.BODY}
        textFieldProps={{ rows: 6 }}
        onChange={onChange}
      />
    </PostFormContainer>
  )
}
