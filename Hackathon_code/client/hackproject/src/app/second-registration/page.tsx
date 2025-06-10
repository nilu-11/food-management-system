'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function SecondRegistration() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const userType = searchParams.get('userType')

  const [formData, setFormData] = useState({
    photo: null as File | null,
    citizenshipFront: null as File | null,
    citizenshipBack: null as File | null,
    registrationPapers: null as File | null,
    address: '',
    role: 'Donor',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target

    if (type === 'file') {
      const files = (e.target as HTMLInputElement).files
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : null,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.value,
      }))
    }
  }

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      role: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() // Prevent default form submission
    router.push('/home')
  }

  return (
    <main className='relative flex min-h-screen flex-col items-center justify-center p-6 bg-[#FDF5E8]'>
      <form
        onSubmit={handleSubmit}
        className='relative w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-black'
      >
        <h1 className='text-4xl font-bold mb-6 text-center text-[#448439]'>
          Just One More Step
        </h1>

        {userType === 'Individual' && (
          <>
            <div className='mb-4'>
              <label
                htmlFor='photo'
                className='block text-sm font-medium text-[#448439]'
              >
                Your Photo
              </label>
              <input
                type='file'
                id='photo'
                name='photo'
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border-[#448439] shadow-sm focus:border-[#448439] focus:ring-[#448439] sm:text-sm'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='citizenshipFront'
                className='block text-sm font-medium text-[#448439]'
              >
                Identification Photo (Front)
              </label>
              <input
                type='file'
                id='citizenshipFront'
                name='citizenshipFront'
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border-[#448439] shadow-sm focus:border-[#448439] focus:ring-[#448439] sm:text-sm'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='citizenshipBack'
                className='block text-sm font-medium text-[#448439]'
              >
                Identification Photo (Back)
              </label>
              <input
                type='file'
                id='citizenshipBack'
                name='citizenshipBack'
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border-[#448439] shadow-sm focus:border-[#448439] focus:ring-[#448439] sm:text-sm'
              />
            </div>
          </>
        )}

        {userType === 'Organization' && (
          <>
            <div className='mb-4'>
              <label
                htmlFor='registrationPapers'
                className='block text-sm font-medium text-[#448439]'
              >
                Organization Registration Papers
              </label>
              <input
                type='file'
                id='registrationPapers'
                name='registrationPapers'
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border-[#448439] shadow-sm focus:border-[#448439] focus:ring-[#448439] sm:text-sm'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='address'
                className='block text-sm font-medium text-[#448439]'
              >
                Organization Address
              </label>
              <input
                type='text'
                id='address'
                name='address'
                value={formData.address}
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border-[#448439] shadow-sm focus:border-[#448439] focus:ring-[#448439] sm:text-sm'
                placeholder='Address'
              />
            </div>
          </>
        )}

        <button
          type='submit'
          className='w-full py-2 px-4 bg-[#448439] text-white font-medium rounded-md shadow-sm hover:bg-[#367a2e] focus:outline-none focus:ring-2 focus:ring-[#448439] focus:ring-offset-2'
        >
          Submit
        </button>
      </form>
    </main>
  )
}
