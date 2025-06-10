import Image from 'next/image'
import LocationIcon from '../assets/Img/location-icon.png'
import TimeIcon from '../assets/Img/time-icon.png'

interface ImageProps {
  picture: string
  altText: string
}

interface DonaterProps {
  name: string
  date: string
  location: string
  noofmeal: number
  images: ImageProps[]
}

const Donater: React.FC<DonaterProps> = ({
  name,
  date,
  location,
  noofmeal,
  images,
}) => {
  // Make sure we have images to work with
  const mainImage = images.length > 0 ? images[0] : null;
  const secondaryImages = images.slice(1);

  return (
    <div className='donater-info'>
      <div className='center-inline'>
        <h3 className='restro-name'>{name}</h3>
        <Image
          src={LocationIcon}
          alt='location icon'
          className='location-icon'
          width={20}
          height={20}
        />
      </div>
      <div className='donation-details'>
        <Image 
          src={TimeIcon} 
          alt='Time Icon'
          width={16}
          height={16}
        />
        <h4 className='small-text'>{date}</h4>
        <h4 className='small-text'>{location}</h4>
      </div>
      <div className='donation-bar-div'>
        <div className='donated-bar'></div>
        <div className='complete-bar'></div>
      </div>
      <h4 className='small-text'>{`${noofmeal} meal donated`}</h4>
      
      {/* Restructured image grid */}
      <div className='donater-image-grid'>
        {mainImage && (
          <div className="main-image-container">
            <Image
              src={mainImage.picture}
              alt={mainImage.altText}
              className='food-image main-image'
              width={150}
              height={160}
            />
          </div>
        )}
        <div className="secondary-images-container">
          {secondaryImages.map((image, index) => (
            <Image
              key={index}
              src={image.picture}
              alt={image.altText}
              className='food-image secondary-image'
              width={80}
              height={75}
            />
          ))}
        </div>
      </div>
      
      <div className='button-div'>
        <button className='see-details' type='button'>
          See Details
        </button>
        <button className='reserve-meal' type='button'>
          Reserve Meal
        </button>
      </div>
    </div>
  )
}

export default Donater