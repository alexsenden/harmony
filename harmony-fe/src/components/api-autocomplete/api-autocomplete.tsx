import { useEffect, useState } from 'react'
import { Autocomplete } from '@mui/material'

import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'

interface IApiAutocompleteProps
  extends Partial<React.ComponentProps<typeof Autocomplete>> {
  url: string
  debounceTimeMillis?: number
}

const ApiAutocomplete = ({
  url,
  debounceTimeMillis = 1000,
  ...props
}: IApiAutocompleteProps) => {
  const [input, setInput] = useState('')
  const [options, setOptions] = useState([])

  const onInputChange = (newValue: string) => {
    setInput(newValue)
  }

  const [getResults, topicsResponse] = useHttpRequest({
    url: `${url}/${input}`,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    if (topicsResponse) {
      setOptions(topicsResponse)
      console.log(topicsResponse)
    }
  }, [topicsResponse])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      getResults()
    }, debounceTimeMillis)

    return () => clearTimeout(debounceTimer)
  }, [input])

  return (
    <Autocomplete
      renderInput={() => <></>}
      {...props}
      options={options}
      onInputChange={(event, value) => onInputChange(value)}
    />
  )
}

export default ApiAutocomplete
