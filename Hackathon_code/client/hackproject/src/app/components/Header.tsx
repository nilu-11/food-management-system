import Image from 'next/image'
import { Button } from '@mui/material'
import NotificationIcon from '../assets/Img/notification-icon.png'
import '../home/Donate.css'

const Header = () => {
  return (
    <header className='header-container p-4 absolute top-0 left-0 right-0 z-50'>
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
  )
}

export default Header
