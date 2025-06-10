import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import TrisaraImg from '../assets/Img/trisara-icon.jpg'
import Footer from '../hungerspot/footer'
import RiceImg from '../assets/Img/rice-curry.jpg'
interface DonationItem {
  id: number
  name: string
  date: string
  image: string
}

const DonationConfirmation: React.FC = () => {
  // Sample donation data
  const donations: DonationItem[] = [
    {
      id: 1,
      name: 'Veg Fried Rice, Curry',
      date: 'Apr 22,2025',
      image: '/images/meal1.jpg',
    },
    {
      id: 2,
      name: 'Daal Bhatt',
      date: 'Mar 10,2025',
      image: '/images/meal2.jpg',
    },
    {
      id: 3,
      name: 'Daal Bhatt',
      date: 'Mar 10,2025',
      image: '/images/meal3.jpg',
    },
  ]

  return (
    <div className=' relative h-screen w-full max-w-md mx-auto overflow-hidden bg-white'>
      {/* Phone status bar */}
      <div className='bg-[#75B04D] px-4 py-2 flex justify-between items-center'>
        <div className='text-white font-medium'>9:41</div>
        <div className='flex items-center space-x-1'></div>
      </div>

      {/* Main content */}
      <div className='bg-[#75B04D]  pt-8 pb-16 px-6 relative'>
        {/* Logo and title */}
        <div className='flex flex-col items-center'>
          <div className='bg-white rounded-full p-4 w-24 h-24 flex items-center justify-center mb-4'>
            <div className='relative w-full h-full'>
              <Image
                src={TrisaraImg}
                alt='Trisara Logo'
                layout='fill'
                className='object-contain'
              />
            </div>
          </div>
          <h1 className='text-white text-xl font-semibold'>Trisara Kitchen</h1>
          <p className='text-white text-sm opacity-90'>Kathmandu, Nepal</p>
        </div>

        {/* Welcome message */}
        <div className='mt-8 text-white'>
          <p className='opacity-90'>Welcome Back, Trisara!</p>
          <p className='font-semibold text-lg mt-1'>
            You've provided 5 meals
            <br />
            worth of food in last month
          </p>
        </div>
      </div>

      {/* Donations list */}
      <div className='bg-white rounded-t-3xl -mt-8 pt-4 pb-20 min-h-full corner-div'>
        <div className='px-6 mb-4'>
          <h2 className='text-gray-800 font-semibold text-lg mt-10'>
            My Donation (10)
          </h2>
        </div>

        <div className='space-y-4 px-4'>
          {donations.map((donation) => (
            <Link href={`/donations/${donation.id}`} key={donation.id}>
              <div className='flex items-center justify-between px-2 mb-4 py-1 cursor-pointer'>
                <div className='flex items-center'>
                  <div className='relative w-16 h-16 rounded-lg overflow-hidden'>
                    <Image
                      src={RiceImg}
                      alt={donation.name}
                      layout='fill'
                      className='object-cover'
                    />
                  </div>
                  <div className='ml-4'>
                    <p className='font-medium text-gray-800'>{donation.name}</p>
                    <p className='text-sm text-gray-500'>{donation.date}</p>
                  </div>
                </div>
                <div className='text-gray-400'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default DonationConfirmation
