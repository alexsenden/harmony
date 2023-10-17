import { PostField, PostType } from '../../models/post'
import PostFormContainer from './post-form-container'
import { PostInputField } from './post-input-field'
import { TopicField } from './topic-field'

interface IDiscussionPostFormProps {
  onChange: (argName: PostField, argValue: unknown) => void
}

export const DiscussionPostForm = ({ onChange }: IDiscussionPostFormProps) => {
  onChange(PostField.POST_TYPE, PostType.DISCUSSION)

  return (
    <PostFormContainer>
      <TopicField onChange={onChange} />
      <PostInputField
        label="Title"
        field={PostField.TITLE}
        onChange={onChange}
        textFieldProps={{ sx: { mt: 1 } }}
      />
      <PostInputField
        label="Discussion Content"
        field={PostField.BODY}
        textFieldProps={{ rows: 6 }}
        onChange={onChange}
      />
    </PostFormContainer>
  )
}
