'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Footer from '../hungerspot/footer'

const KitchenCard = ({ title, mealCount, location, distance }) => (
  <div className='bg-[#FDF5E8] rounded-xl mb-6'>
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold text-black'>{title}</h2>
        <div className='flex items-center bg-white rounded-full px-3 py-1 shadow-sm'>
          <svg
            className='w-4 h-4 mr-1'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 13.5C13.6569 13.5 15 12.1569 15 10.5C15 8.84315 13.6569 7.5 12 7.5C10.3431 7.5 9 8.84315 9 10.5C9 12.1569 10.3431 13.5 12 13.5Z'
              stroke='black'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M12 22C14 19 20 16.4183 20 10.5C20 5.80558 16.4183 2 12 2C7.58172 2 4 5.80558 4 10.5C4 16.4183 10 19 12 22Z'
              stroke='black'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span className='text-black text-sm'>{distance} Km</span>
        </div>
      </div>
      <div className='mt-1 flex items-center space-x-4'>
        <span className='text-gray-700 text-sm font-medium'>
          {mealCount} Meal
        </span>
        <div className='flex items-center'>
          <svg
            className='w-4 h-4 text-gray-600'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 13.5C13.6569 13.5 15 12.1569 15 10.5C15 8.84315 13.6569 7.5 12 7.5C10.3431 7.5 9 8.84315 9 10.5C9 12.1569 10.3431 13.5 12 13.5Z'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M12 22C14 19 20 16.4183 20 10.5C20 5.80558 16.4183 2 12 2C7.58172 2 4 5.80558 4 10.5C4 16.4183 10 19 12 22Z'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span className='text-gray-700 text-sm ml-1'>{location}</span>
        </div>
      </div>
    </div>
    <div className='relative w-full h-48 mt-2'>
      <Image
        src='/images/trisaraFood.png'
        alt='Food'
        layout='fill'
        objectFit='cover'
      />
    </div>
    <div className='flex justify-center mt-2 pb-2'>
      <div className='flex space-x-1'>
        <div className='w-2 h-2 rounded-full bg-gray-400'></div>
        <div className='w-2 h-2 rounded-full bg-gray-400'></div>
        <div className='w-2 h-2 rounded-full bg-gray-400'></div>
      </div>
    </div>
  </div>
)

const PickupToggle = ({ pickupOption, setPickupOption }) => (
  <div className='flex items-center space-x-4'>
    <span className='mr-2'>Self:</span>
    <label className='relative inline-flex items-center cursor-pointer'>
      <input
        type='checkbox'
        checked={pickupOption === 'self'}
        onChange={() => setPickupOption('self')}
        className='sr-only peer'
      />
      <div className='w-5 h-5 border border-gray-300 rounded peer-checked:bg-white peer-checked:border-green-600 peer-checked:flex peer-checked:items-center peer-checked:justify-center'>
        {pickupOption === 'self' && (
          <svg
            className='w-3 h-3 text-green-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 13l4 4L19 7'
            ></path>
          </svg>
        )}
      </div>
    </label>

    <span className='mr-2'>Delivery:</span>
    <label className='relative inline-flex items-center cursor-pointer'>
      <input
        type='checkbox'
        checked={pickupOption === 'delivery'}
        onChange={() => setPickupOption('delivery')}
        className='sr-only peer'
      />
      <div className='w-5 h-5 border border-gray-300 rounded peer-checked:bg-green-600 peer-checked:border-green-600 peer-checked:flex peer-checked:items-center peer-checked:justify-center'>
        {pickupOption === 'delivery' && (
          <svg
            className='w-3 h-3 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 13l4 4L19 7'
            ></path>
          </svg>
        )}
      </div>
    </label>
  </div>
)

const MealCounter = ({ count, onChange }) => (
  <div className='flex items-center'>
    <div className='flex items-center bg-white rounded-lg'>
      <button
        type='button'
        onClick={() => onChange(-1)}
        className='w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full'
      >
        -
      </button>
      <span className='px-4'>{count}</span>
      <button
        type='button'
        onClick={() => onChange(1)}
        className='w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full'
      >
        +
      </button>
    </div>
  </div>
)

export default function DonationDetails() {
  const router = useRouter()
  const [pickupOption, setPickupOption] = useState('delivery')
  const [peopleCount, setPeopleCount] = useState(5)

  const handlePeopleCountChange = (amount) => {
    setPeopleCount((prev) => Math.max(1, prev + amount))
  }

  const handleBackClick = () => {
    router.push('/home')
  }

  const handleSendRequestClick = () => {
    router.push('/request-confirm')
  }

  return (
    <main className='flex flex-col min-h-screen bg-[#FDF5E8]'>
      {/* Header */}
      <div className='relative bg-[#FDF5E8] p-7'>
        <button
          onClick={handleBackClick}
          className='absolute left-4 top-1/2 transform -translate-y-1/2'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M15 19l-7-7 7-7'
            ></path>
          </svg>
        </button>
        <h1 className='text-xl font-bold text-center'>Donation details</h1>
        <div className='absolute right-4 top-1/2 transform -translate-y-1/2'>
          <svg
            className='w-6 h-6 text-green-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
            ></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 px-4 max-w-md mx-auto w-full'>
        <KitchenCard
          title='The Chimney Kitchen'
          mealCount={15}
          location='Thamel,Kathmandu'
          distance={5}
        />

        <h3 className='text-lg font-medium mb-2'>Food details</h3>
        <p className='text-gray-500 text-sm mb-6'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore
        </p>

        <div className='bg-white rounded-xl p-4 mb-4 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <div className='w-10 h-10 mr-2 rounded-md overflow-hidden relative'>
                <Image
                  src='/images/trisaraFood.png'
                  alt='Food icon'
                  fill
                  className='object-cover'
                />
              </div>

              <span className='font-medium'>The Chimney Kitchen</span>
            </div>
            <MealCounter
              count={peopleCount}
              onChange={handlePeopleCountChange}
            />
          </div>
        </div>

        <div className='bg-white rounded-xl p-4 mb-4 shadow-sm'>
          <div className='flex items-center'>
            <div className='mr-2'>
              <svg
                className='w-5 h-5 text-green-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
            </div>
            <span className='font-medium mr-4'>Pickup</span>
            <PickupToggle
              pickupOption={pickupOption}
              setPickupOption={setPickupOption}
            />
          </div>
        </div>

        <button
          style={{ backgroundColor: '#327925', height: '50px' }}
          onClick={handleSendRequestClick}
          className='mt-4 w-full bg-green-600 text-white rounded-lg p-3 flex items-center justify-between'
        >
          <span>{peopleCount} Persons</span>
          <div className='flex items-center'>
            <span>Send request</span>
            <svg
              className='w-5 h-5 ml-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M14 5l7 7m0 0l-7 7m7-7H3'
              ></path>
            </svg>
          </div>
        </button>
      </div>
    </main>
  )
}
