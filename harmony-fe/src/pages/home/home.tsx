import React, { useEffect } from 'react'
import { Card } from '@mui/material'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import HarmonyAppBar from '../../components/appbar'

const HomePage = () => {
  const [sendRequest, response, error, loading] = useHttpRequest({
    method: HttpMethod.GET,
    url: '/example?echo=Echo_Me_Please!',
  })

  useEffect(() => {
    sendRequest()
  }, [])

  return (
    <>
      <HarmonyAppBar />
      <Card variant="outlined">
      <h1>This is the homepage. Hello World!</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>{response?.echo || JSON.stringify(error)}</p>
      )}
    </Card>
    </>
  )
}

export default HomePage
