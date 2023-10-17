import { Post, PostField, PostType } from '../../models/post'
import PostFormContainer from './post-form-container'
import { PostInputField } from './post-input-field'
import { TopicField } from './topic-field'

interface IDiscussionPostFormProps {
  errorFields: Partial<Post>
  onChange: (argName: PostField, argValue: unknown) => void
}

export const DiscussionPostForm = ({
  errorFields,
  onChange,
}: IDiscussionPostFormProps) => {
  onChange(PostField.POST_TYPE, PostType.DISCUSSION)

  return (
    <PostFormContainer>
      <TopicField
        onChange={onChange}
        {...{ error: errorFields && !!errorFields[PostField.TOPIC_ID] }}
      />
      <PostInputField
        label="Title"
        field={PostField.TITLE}
        errorFields={errorFields}
        onChange={onChange}
        textFieldProps={{ sx: { mt: 1 } }}
      />
      <PostInputField
        label="Discussion Content"
        field={PostField.BODY}
        errorFields={errorFields}
        onChange={onChange}
        textFieldProps={{ rows: 6 }}
      />
    </PostFormContainer>
  )
}
