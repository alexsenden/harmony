'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const LandingPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/home')
  }, [])
}

export default LandingPage
