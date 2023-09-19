import { useState } from 'react'
import axios from 'axios'

axios.defaults.baseURL = `http://${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}`

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete',
  PUT = 'put',
}

interface HttpRequestInput {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
}

const useHttpRequest = ({
  url,
  method,
  body = {},
  headers = {},
}: HttpRequestInput): [() => void, any, any, boolean] => {
  const [response, setResponse] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [loading, setloading] = useState(true)

  const sendHttpRequest = async () => {
    const requestBody = { accept: '*/*', ...headers }

    console.log(axios.defaults.baseURL)

    new Promise(() =>
      axios[method](url, headers, requestBody)
        .then(res => {
          setResponse(res.data)
          console.log('response')
        })
        .catch(err => {
          setError(err)
          console.log('error')
        })
        .finally(() => {
          setloading(false)
          console.log('finally')
        })
    )
  }

  return [sendHttpRequest, response, error, loading]
}

export default useHttpRequest
