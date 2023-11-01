/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react'
import axios from 'axios'

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}`

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

const cookieName = 'userCookie'

const useHttpRequest = ({
  url,
  method,
  body = {},
  headers = {},
}: HttpRequestInput): [() => void, any, any, boolean, any] => {
  const [response, setResponse] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [loading, setloading] = useState(true)

  const stopLoading = () => {
    setloading(false)
  }

  const sendHttpRequest = async () => {
    setResponse(undefined)
    setError(undefined)
    setloading(true)

    const requestHeaders = { accept: '*/*',... {[cookieName]:getCookie(cookieName)} , ...headers }

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
          setloading(false)
        })
    )
  }
  return [sendHttpRequest, response, error, loading, stopLoading]
}
function getCookie(cookieName: string): string {
  const name = cookieName + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieList = decodedCookie.split(';')
  let foundCookie = ''
  cookieList.forEach(val => {
    if (val.indexOf(name) === 0) {
      foundCookie = val.substring(name.length)
    }
  })
  return foundCookie
}

export default useHttpRequest
