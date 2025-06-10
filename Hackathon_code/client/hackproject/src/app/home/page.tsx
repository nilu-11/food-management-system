import React from 'react'
import NotificationIcon from '../assets/Img/notification-icon.png'
import DonatingHand from '../assets/Img/DonatingHand.png'
import Image from 'next/image'
import Footer from '../hungerspot/footer'
import './Donate.css'
import { Button } from '@mui/material'
import Meal1 from '../assets/Img/meal1.png'
import Meal2 from '../assets/Img/meal2.png'
import Meal3 from '../assets/Img/meal3.png'
import { v4 as uuid } from 'uuid'
import TrisaraImage from '../assets/Img/trisara-icon.jpg'
import PeppeImage from '../assets/Img/pepe-pizza.jpg'
import SyankoImage from '../assets/Img/syanko-katti-roll.png'
import JimbuImage from '../assets/Img/jimbu-thakali.jpg'
import Donater from '../components/Donater'

const Donation = () => {
  const DonaterInfo = [
    {
      name: 'Trishara Kitchen',
      date: '12 March,2025',
      location: 'Thamel Kathmnandu',
      noofmeal: '15',
      images: [
        {
          picture: Meal2,
          altText: 'Chowemin',
        },
        {
          picture: Meal1,
          altText: 'Rice',
        },
        {
          picture: Meal3,
          altText: 'Daal',
        },
      ],
    },
  ]
  const topDonaters = [
    {
      id: 1,
      name: 'Trisara',
      image: TrisaraImage,
    },
    {
      id: 2,
      name: 'pepe pizza',
      image: PeppeImage,
    },
    {
      id: 3,
      name: 'Syanko Katti Rolls',
      image: SyankoImage,
    },
    {
      id: 4,
      name: 'Jimbu Thakali',
      image: JimbuImage,
    },
  ]
  return (
    <div className='main-container'>
      <header>
        <div className='text-group'>
          <h3 className='welcome-txt'>Welcome,</h3>
          <h2 className='user-name'>Devesh Shrestha</h2>
        </div>
        <Button type='button'>
          <Image
            src={NotificationIcon}
            alt='Notification Icon'
            className='notification-icon'
          />
        </Button>
      </header>
      <div className='share-food-container'>
        <h1 className='share-food-text'>share your extra foods</h1>
        <Image src={DonatingHand} alt='Donating Hand'></Image>
      </div>
      <div className='top-donators'>
        <h3 className='top-donators-title'>Top Donators</h3>
        <div className='top-donators-images'>
          {topDonaters.map((donor) => (
            <Image
              key={donor.id}
              src={donor.image}
              alt={donor.name}
              className='restro-image'
            />
          ))}
        </div>
      </div>

      <div className='middle-content'>
        <h3 className='nearby-donation'>Nearby Donation</h3>
        <a className='see-all'>See all</a>
      </div>
      <div className='donater-container'>
        {DonaterInfo.map((donater) => {
          return <Donater key={uuid()} {...donater} />
        })}
      </div>
      <Footer />
    </div>
  )
}

export default Donation
