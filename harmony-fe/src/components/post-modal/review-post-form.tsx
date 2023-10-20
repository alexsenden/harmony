import { Box, Rating } from '@mui/material'

import { Post, PostField, PostType } from '../../models/post'
import PostFormContainer from './post-form-container'
import { PostInputField } from './post-input-field'
import { TopicField } from './topic-field'

export const DEFAULT_RATING = 2.5

interface IDiscussionPostFormProps {
  errorFields: Partial<Post>
  onChange: (argName: PostField, argValue: unknown) => void
}

export const ReviewPostForm = ({
  errorFields,
  onChange,
}: IDiscussionPostFormProps) => {
  onChange(PostField.POST_TYPE, PostType.REVIEW)

  return (
    <PostFormContainer>
      <TopicField
        onChange={onChange}
        {...{ error: errorFields && !!errorFields[PostField.TOPIC_ID] }}
      />
      <Box display="flex" flexDirection="row" alignItems="center" width={1}>
        <PostInputField
          label="Title"
          field={PostField.TITLE}
          errorFields={errorFields}
          onChange={onChange}
          textFieldProps={{ sx: { mt: 1 } }}
        />
        <Rating
          size="large"
          defaultValue={DEFAULT_RATING}
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
        errorFields={errorFields}
        textFieldProps={{ rows: 6 }}
        onChange={onChange}
      />
    </PostFormContainer>
  )
}
