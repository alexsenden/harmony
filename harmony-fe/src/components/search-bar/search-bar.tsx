import { useRouter } from 'next/navigation'
import { TextField } from '@mui/material'

import { Topic } from '../../models/topic'
import { User } from '../../models/user'
import ApiAutocomplete from '../api-autocomplete'

type TSearchOption = Partial<User> | Topic

interface ISearchBarProps {
  onSearch: () => void
}

export const SearchBar = ({ onSearch }: ISearchBarProps) => {
  const router = useRouter()

  const getOptionLabel = (option: unknown) => {
    const searchOption = option as TSearchOption
    return 'name' in searchOption
      ? searchOption.name
      : searchOption.username || ''
  }

  const buildResultUrl = (search?: TSearchOption) => {
    console.log(search)
    if (!search) {
      return undefined
    }
    if ('name' in search) {
      if (search.topicId.artistId) {
        return `/artist/${search.topicId.artistId}`
      } else if (search.topicId.albumId) {
        return `/album/${search.topicId.albumId}`
      } else if (search.topicId.songId) {
        return `/song/${search.topicId.songId}`
      }
    } else if ('username' in search) {
      return `/profile/${search.username}`
    }
    return '/home'
  }

  const onSubmit = (search?: TSearchOption) => {
    const resultUrl = buildResultUrl(search)
    if (resultUrl) {
      router.push(resultUrl)
      onSearch()
    }
  }

  return (
    <ApiAutocomplete
      url={'/topic/partialNameOrUsername'}
      onChange={(event, value) => onSubmit(value as TSearchOption)}
      getOptionLabel={getOptionLabel}
      autoHighlight
      autoComplete
      autoFocus
      renderInput={params => (
        <TextField
          {...params}
          label="Search artists, albums, songs, or users"
          variant="outlined"
          multiline
          autoFocus
        />
      )}
      sx={{ mx: 3, mb: 2 }}
    />
  )
}
