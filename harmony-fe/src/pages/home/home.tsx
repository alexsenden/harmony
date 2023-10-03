import React, { useEffect } from 'react'
import { Card } from '@mui/material'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'

const HomePage = () => {
  const [sendRequest, response, error, loading] = useHttpRequest({
    method: HttpMethod.GET,
    url: '/example?echo=Echo_Me_Please!',
  })

  useEffect(() => {
    sendRequest()
  }, [])

  return (
    <Card variant="outlined">
      <p>This is the homepage. Hello World!</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>{response?.echo || JSON.stringify(error)}</p>
      )}
    </Card>
  )
}

export default HomePage
