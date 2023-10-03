'use client'
import { useRouter } from 'next/navigation'
//import { useEffect } from 'react'

const LandingPage = () => {
  const router = useRouter()

  useEffet(() => {
    router.push('/home')
  }, [])
}

export default LandingPage
