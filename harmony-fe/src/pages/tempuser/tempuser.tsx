import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { useEffect } from 'react'

const TempUserPage = () => {
  const [sendTempRequest, response] = useHttpRequest({
    url: '/user/maketemp',
    method: HttpMethod.POST,
    body: {},
    headers: {},
  })

  useEffect(() => {
    sendTempRequest()
  }, [])

  useEffect(() => {
    window.location.href = '../home'
  }, [response])
}

export default TempUserPage
