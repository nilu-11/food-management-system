'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Hero: React.FC = () => {
  const router = useRouter()
  const [mountTime, setMountTime] = useState<number | null>(null)

  useEffect(() => {
    setMountTime(Date.now()) // Runs only on the client

    const timer = setTimeout(() => {
      console.log('Animation completed, redirecting...')
      router.push('/first-registration')
    }, 4100)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div
      className='relative w-full h-screen bg-cover bg-center'
      style={{ backgroundImage: "url('/images/splash-background.png')" }}
    >
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='-translate-y-1/4'>
          {mountTime !== null && ( // Ensures no mismatch during SSR
            <img
              key={mountTime}
              src='/images/splash-gif.gif'
              alt='Splash Animation'
              className='max-w-full max-h-full'
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Hero
