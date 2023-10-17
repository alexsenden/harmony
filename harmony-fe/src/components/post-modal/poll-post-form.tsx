import { PostField, PostType } from '../../models/post'
import { PollOptionsForm } from './poll-options-form'
import PostFormContainer from './post-form-container'
import { PostInputField } from './post-input-field'
import { TopicField } from './topic-field'

interface IPollPostFormProps {
  onChange: (argName: PostField, argValue: unknown) => void
}

export const PollPostForm = ({ onChange }: IPollPostFormProps) => {
  onChange(PostField.POST_TYPE, PostType.POLL)

  return (
    <PostFormContainer>
      <TopicField onChange={onChange} />
      <PostInputField
        label="Title"
        field={PostField.TITLE}
        onChange={onChange}
        textFieldProps={{ sx: { mt: 1 } }}
      />
      <PollOptionsForm onChange={onChange} />
    </PostFormContainer>
  )
}
