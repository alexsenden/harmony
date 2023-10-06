import React, { useEffect, useState } from 'react'
import { Button, Card } from '@mui/material'

import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import PostModal from '../../components/post-modal'

const HomePage = () => {
  const [sendRequest, response, error, loading] = useHttpRequest({
    method: HttpMethod.GET,
    url: '/example?echo=Echo_Me_Please!',
  })

  useEffect(() => {
    sendRequest()
  }, [])

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Card variant="outlined">
        <p>This is the homepage. Hello World!</p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>{response?.echo || JSON.stringify(error)}</p>
        )}
      </Card>
      <Button variant="outlined" onClick={handleOpen}>
        + New Post
      </Button>
      <PostModal open={open} onClose={handleClose} />
    </>
  )
}

export default HomePage
