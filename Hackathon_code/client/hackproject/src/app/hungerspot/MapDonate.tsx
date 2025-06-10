import Image from 'next/image'
import './mapdonate.css'
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

const MapDonate: React.FC<DonaterProps> = ({
  images,
}) => {
  return (
    <div className='image-grid flex gap-2'>
    {/* Image 1 */}
    <div className="w-[120px] h-[110px] overflow-hidden rounded-lg flex items-center justify-center bg-gray-100">
      <Image
        src={images[0].picture}
        alt={images[0].altText}
        width={120}
        height={110}
        className="rounded-lg object-contain max-w-full max-h-full"
      />
    </div>
  
    {/* Image 2 */}
    <div className="w-[120px] h-[110px] overflow-hidden rounded-lg flex items-center justify-center bg-gray-100">
      <Image
        src={images[1].picture}
        alt={images[1].altText}
        width={120}
        height={110}
        className="rounded-lg object-contain max-w-full max-h-full"
      />
    </div>
  
    {/* Image 3 */}
    <div className="w-[120px] h-[110px] overflow-hidden rounded-lg flex items-center justify-center bg-gray-100">
      <Image
        src={images[2].picture}
        alt={images[2].altText}
        width={120}
        height={110}
        className="rounded-lg object-contain max-w-full max-h-full"
      />
    </div>
  </div>
  )
}

export default MapDonate
