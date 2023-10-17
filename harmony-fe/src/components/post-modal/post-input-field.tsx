import { TextField } from '@mui/material'
import { PostField } from '../../models/post'

interface IPostInputFieldProps {
  field: PostField
  label: string
  textFieldProps?: React.ComponentProps<typeof TextField>
  onChange: (argName: PostField, argValue: unknown) => void
}

export const PostInputField = ({
  label,
  field,
  textFieldProps,
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
      {...textFieldProps}
    />
  )
}
