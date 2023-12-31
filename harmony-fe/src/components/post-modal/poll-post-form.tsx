import { Post, PostField, PostType } from '../../models/post'
import { PollOptionsForm } from './poll-options-form'
import PostFormContainer from './post-form-container'
import { PostInputField } from './post-input-field'
import { TopicField } from './topic-field'

interface IPollPostFormProps {
  errorFields: Partial<Post>
  onChange: (argName: PostField, argValue: unknown) => void
}

export const PollPostForm = ({ errorFields, onChange }: IPollPostFormProps) => {
  onChange(PostField.POST_TYPE, PostType.POLL)

  return (
    <PostFormContainer>
      <TopicField
        onChange={onChange}
        {...{ error: errorFields && !!errorFields[PostField.TOPIC_ID] }}
      />
      <PostInputField
        label="Title"
        field={PostField.TITLE}
        onChange={onChange}
        errorFields={errorFields}
        textFieldProps={{ sx: { mt: 1 } }}
      />
      <PollOptionsForm onChange={onChange} errorFields={errorFields} />
    </PostFormContainer>
  )
}
