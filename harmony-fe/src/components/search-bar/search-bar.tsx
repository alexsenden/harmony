import { useRouter } from 'next/navigation'
import { TextField } from '@mui/material'

import ApiAutocomplete from '../api-autocomplete'
import AutocompleteLi from '../autocomplete-li/autocomplete-li'
import { getSearchableLabel } from '../../utils/additionalContext'
import { Searchable } from '../../models/searchable'

interface ISearchBarProps {
  onSearch: () => void
}

export const SearchBar = ({ onSearch }: ISearchBarProps) => {
  const router = useRouter()

  const buildResultUrl = (search?: Searchable) => {
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

  const onSubmit = (search?: Searchable) => {
    const resultUrl = buildResultUrl(search)
    if (resultUrl) {
      router.push(resultUrl)
      onSearch()
    }
  }

  return (
    <ApiAutocomplete
      url={'/topic/partialNameOrUsername'}
      onChange={(event, value) => onSubmit(value as Searchable)}
      autoHighlight
      autoComplete
      autoFocus
      getOptionLabel={option => getSearchableLabel(option as Searchable)}
      renderInput={params => (
        <TextField
          {...params}
          label="Search artists, albums, songs, or users"
          variant="outlined"
          multiline
          autoFocus
        />
      )}
      renderOption={(props, option) => (
        <AutocompleteLi option={option as Searchable} {...props} />
      )}
      sx={{ mx: 3, mb: 2 }}
    />
  )
}
