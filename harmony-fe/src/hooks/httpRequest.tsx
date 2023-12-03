/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react'
import axios from 'axios'

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}`
axios.defaults.withCredentials = true

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete',
  PUT = 'put',
}

export interface HttpRequestInput {
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
  const [loading, setLoading] = useState(false)

  const sendHttpRequest = async () => {
    setResponse(undefined)
    setError(undefined)
    setLoading(true)

    const requestHeaders = { accept: '*/*', ...headers }

    new Promise(() =>
      axios({
        method: method,
        url: url,
        data: body,
        headers: requestHeaders,
      })
        .then(res => {
          setResponse(res.data)
        })
        .catch(err => {
          setError(err)
        })
        .finally(() => {
          setLoading(false)
        })
    )
  }
  return [sendHttpRequest, response, error, loading]
}

export default useHttpRequest
