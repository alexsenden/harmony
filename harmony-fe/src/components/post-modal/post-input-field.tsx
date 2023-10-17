import { TextField } from '@mui/material'

import { Post, PostField } from '../../models/post'

interface IPostInputFieldProps {
  field: PostField
  label: string
  textFieldProps?: React.ComponentProps<typeof TextField>
  errorFields?: Partial<Post>
  onChange: (argName: PostField, argValue: unknown) => void
}

export const PostInputField = ({
  label,
  field,
  textFieldProps,
  errorFields,
  onChange,
}: IPostInputFieldProps) => {
  return (
    <TextField
      onChange={event => onChange(field, event.target.value)}
      label={label}
      variant="outlined"
      fullWidth
      multiline
      sx={{ mt: 3 }}
      {...{ error: errorFields && !!errorFields[field] }}
      {...textFieldProps}
    />
  )
}
