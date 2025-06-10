'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Footer from '../hungerspot/footer'

export default function DonationConfirmation() {
  const router = useRouter()

  const handleContinueClick = () => {
    router.push('/hungerspot')
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen p-6 bg-[#FDF5E8]'>
      <div className='w-full max-w-md text-center flex flex-col items-center'>
        {/* Green circle with checkmark */}
        <div className='w-25 h-25 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-6'>
          <svg
            width='50'
            height='50'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z'
              fill='white'
            />
          </svg>
        </div>

        {/* Text content */}
        <h1 className='text-3xl font-medium text-[#4CAF50] mb-6'>
          Donation Confirmed
        </h1>

        <p className='text-xl mb-4 text-gray-700'>
          Thank you for you valuable donation
          <br />
          in making food accessible to all.
        </p>

        <p className='text-md text-gray-600 mb-12'>
          We will let you know when the donations has
          <br />
          been booked.
        </p>

        {/* Buttons */}
        <div className='w-full flex flex-col space-y-4'>
          <button
            onClick={handleContinueClick}
            className='w-full px-6 py-3 bg-green-500 text-white rounded-md'
          >
            Continue
          </button>

          <button className='w-full px-7 py-3 border border-green-500 text-green-500 rounded-md'>
            Share
          </button>
        </div>
      </div>
    </main>
  )
}
