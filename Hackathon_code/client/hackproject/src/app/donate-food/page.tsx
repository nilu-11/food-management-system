'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function DonateFood() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [mealName, setMealName] = useState('')
  const [mealQuantity, setMealQuantity] = useState(0)
  const [foodType, setFoodType] = useState('Vegetarian')
  const [mealDescription, setMealDescription] = useState('')
  const [pickupLocation, setPickupLocation] = useState('')
  const [qualityAssurance, setQualityAssurance] = useState(false)
  const [mealImage, setMealImage] = useState<string | null>(null)

  const handleIncreaseMealQuantity = () => {
    setMealQuantity((prev) => prev + 1)
  }

  const handleDecreaseMealQuantity = () => {
    setMealQuantity((prev) => (prev > 0 ? prev - 1 : 0))
  }

  const handleImageClick = () => {
    // Trigger the hidden file input when the image area is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create a URL for the image to display as preview
      const imageUrl = URL.createObjectURL(file)
      setMealImage(imageUrl)
    }
  }

  const handleConfirmDonation = () => {
    // Handle form submission logic here
    // You would typically upload the image to your server here
    console.log({
      mealName,
      mealQuantity,
      foodType,
      mealDescription,
      pickupLocation,
      qualityAssurance,
      hasImage: !!mealImage,
    })
    router.push('/donation-confirmation')
  }

  const handleBackClick = () => {
    router.push('/home')
  }


  return (
    <div className='flex flex-col min-h-screen bg-[#FDF5E8]'>
      {/* Header */}
      <header className='flex items-center justify-between p-4'>
        <button className='w-8 h-8 flex items-center justify-center rounded-md bg-[#4CAF50] text-white' onClick = {handleBackClick}>
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'
              fill='white'
            />
          </svg>
        </button>
        <h1 className='text-xl font-bold'>Donate Food</h1>
        <button className='w-8 h-8 flex items-center justify-center rounded-md bg-[#4CAF50] text-white'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z'
              fill='white'
            />
          </svg>
        </button>
      </header>

      {/* Form */}
      <div className='flex-1 px-4'>
        <div className='mb-4'>
          <label className='block text-sm text-gray-700 mb-1'>Meal Name</label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z'
                  fill='#666'
                />
              </svg>
            </div>
            <input
              type='text'
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              placeholder='Rice and Daal'
              className='w-full py-3 pl-10 pr-3 border border-gray-300 rounded-md bg-white'
            />
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-sm text-gray-700 mb-1'>
            Meal Quantity
          </label>
          <div className='relative flex items-center border border-gray-300 rounded-md bg-white'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z'
                  fill='#666'
                />
              </svg>
            </div>
            <input
              type='text'
              placeholder='Add meal quantity'
              className='flex-1 py-3 pl-10 border-0 bg-transparent'
              readOnly
            />
            <div className='flex items-center'>
              <button
                type='button'
                onClick={handleDecreaseMealQuantity}
                className='px-3 py-1 text-gray-600'
              >
                −
              </button>
              <span className='w-6 text-center'>{mealQuantity}</span>
              <button
                type='button'
                onClick={handleIncreaseMealQuantity}
                className='px-3 py-1 text-gray-600'
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-sm text-gray-700 mb-1'>Food Type</label>
          <div className='flex space-x-3'>
            <button
              type='button'
              onClick={() => setFoodType('Vegetarian')}
              className={`flex items-center px-4 py-2 rounded-md ${
                foodType === 'Vegetarian'
                  ? 'bg-[#4CAF50] text-white'
                  : 'bg-white border border-gray-300 text-gray-700'
              }`}
            >
              {foodType === 'Vegetarian' && (
                <svg
                  className='mr-1'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z'
                    fill='white'
                  />
                </svg>
              )}
              Vegetarian
            </button>
            <button
              type='button'
              onClick={() => setFoodType('Non Veg')}
              className={`px-4 py-2 rounded-md ${
                foodType === 'Non Veg'
                  ? 'bg-[#4CAF50] text-white'
                  : 'bg-white border border-gray-300 text-gray-700'
              }`}
            >
              Non Veg
            </button>
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-sm text-gray-700 mb-1'>
            Meal Description
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'
                  fill='#666'
                />
              </svg>
            </div>
            <input
              type='text'
              value={mealDescription}
              onChange={(e) => setMealDescription(e.target.value)}
              placeholder='Write the meal description'
              className='w-full py-3 pl-10 pr-3 border border-gray-300 rounded-md bg-white'
            />
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-sm text-gray-700 mb-1'>
            Pickup Location
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'
                  fill='#666'
                />
              </svg>
            </div>
            <input
              type='text'
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              placeholder='Add your pickup location'
              className='w-full py-3 pl-10 pr-3 border border-gray-300 rounded-md bg-white'
            />
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-sm text-gray-700 mb-1'>Add image</label>
          <div
            onClick={handleImageClick}
            className='border border-gray-300 rounded-md bg-white p-6 flex flex-col items-center justify-center cursor-pointer h-40'
          >
            {mealImage ? (
              <div className='relative w-full h-full'>
                <Image
                  src={mealImage}
                  alt='Meal preview'
                  className='w-full h-full object-contain'
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setMealImage(null)
                  }}
                  className='absolute top-1 right-1 bg-white rounded-full p-1'
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
                      fill='#666'
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'
                    fill='#CCC'
                  />
                </svg>
                <p className='text-sm text-gray-500 mt-2'>
                  Add your meal image(s)
                </p>
              </>
            )}
          </div>
          {/* Hidden file input */}
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleImageChange}
            accept='image/*'
            className='hidden'
          />
        </div>

        <div className='mb-8 flex items-start'>
          <input
            type='checkbox'
            id='qualityAssurance'
            checked={qualityAssurance}
            onChange={(e) => setQualityAssurance(e.target.checked)}
            className='mt-1 mr-2 h-4 w-4 text-[#4CAF50]'
          />
          <label htmlFor='qualityAssurance' className='text-sm text-gray-600'>
            I assure that food quality and hygiene has maintained.
          </label>
        </div>

        <button
          onClick={handleConfirmDonation}
          className='w-full py-3 bg-[#4CAF50] text-white font-medium rounded-md mb-20'
        >
          Confirm Donation
        </button>
      </div>
    </div>
  )
}
