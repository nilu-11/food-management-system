'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function FirstRegistration() {
  const router = useRouter()
  const [userType, setUserType] = useState('Individual')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // if (formData.password !== formData.confirmPassword) {
    //   setError("Passwords do not match");
    //   return;
    // }
    // setError("");
    router.push(`/second-registration?userType=${userType}`)
  }

  return (
    <main className='relative flex min-h-screen flex-col items-center justify-center p-6 bg-[#FDF5E8]'>
      <div
        className='absolute top-0 left-0 w-full h-64 bg-no-repeat bg-top bg-cover'
        style={{ backgroundImage: 'url(/.svg)' }}
      ></div>

      <h1 className='text-4xl font-bold mb-6 text-center text-[#448439]'>
        Register
      </h1>

      {error && <p className='mb-4 text-sm text-red-600'>{error}</p>}

      <form
        onSubmit={handleSubmit}
        className='relative w-full max-w-md mt-16 bg-white p-6 shadow-lg rounded-lg'
      >
        {/* User Type Selection */}
        <div className='mb-4'>
          <label
            htmlFor='userType'
            className='block text-sm font-medium text-[#448439]'
          >
            Register as
          </label>
          <select
            id='userType'
            name='userType'
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className='mt-1 block w-full rounded-md border border-[#448439] shadow-sm focus:border-[#367a2e] focus:ring-[#367a2e] sm:text-sm bg-white p-2'
          >
            <option value='Individual'>Individual</option>
            <option value='Organization'>Organization</option>
          </select>
        </div>

        {/* Input Fields */}
        {[
          {
            id: 'name',
            type: 'text',
            placeholder: 'Name',
            icon: '/images/person.svg',
          },
          {
            id: 'phone',
            type: 'tel',
            placeholder: 'Phone Number',
            icon: '/images/call.svg',
          },
          {
            id: 'email',
            type: 'email',
            placeholder: 'Email',
            icon: '/images/email.svg',
          },
          {
            id: 'password',
            type: 'password',
            placeholder: 'Password',
            icon: '/images/question.svg?v=1',
          },
          {
            id: 'confirmPassword',
            type: 'password',
            placeholder: 'Confirm Password',
            icon: '/images/question.svg?v=2',
          },
        ].map((field) => (
          <div key={field.id} className='mb-4 relative'>
            <div className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#448439]'>
              <img src={field.icon} alt={`${field.id} icon`} />
            </div>
            <label htmlFor={field.id} className='sr-only'>
              {field.placeholder}
            </label>
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              value={formData[field.id as keyof typeof formData]}
              onChange={handleChange}
              className='mt-1 block w-full pl-10 rounded-md border border-[#448439] shadow-sm focus:border-[#367a2e] focus:ring-[#367a2e] sm:text-sm bg-white p-2'
              placeholder={field.placeholder}
            />
          </div>
        ))}

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full py-2 px-4 bg-[#448439] text-white font-medium rounded-md shadow-sm hover:bg-[#367a2e] focus:outline-none focus:ring-2 focus:ring-[#367a2e] focus:ring-offset-2 transition-all'
        >
          Register
        </button>
      </form>
    </main>
  )
}
