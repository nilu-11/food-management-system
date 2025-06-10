'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

interface Restaurant {
  id: string
  name: string
  vicinity: string
  rating?: number
  geometry?: {
    location: google.maps.LatLng
  }
}

interface LocationSearchProps {
  onSearch: (query: string, selectedRestaurant?: Restaurant) => void
}

const SearchBar: React.FC<LocationSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchRestaurants(searchQuery)
    }
  }

  // Handle restaurant selection - just pass to parent component
  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setShowResults(false)
    onSearch(searchQuery, restaurant)
  }

  // Search for restaurants by name
  const searchRestaurants = (query: string) => {
    if (!window.google) {
      console.error('Google API not loaded.')
      return
    }

    setLoading(true)
    setShowResults(true)
    setErrorMessage(null)

    const defaultLocation = new google.maps.LatLng(27.7172, 85.324)

    const service = new google.maps.places.PlacesService(
      document.createElement('div')
    )

    const textSearchRequest: google.maps.places.TextSearchRequest = {
      query: query + ' restaurant Nepal',
      location: defaultLocation,
      radius: 50000, // 50km radius
      type: 'restaurant',
    }

    service.textSearch(textSearchRequest, (placesResults, placesStatus) => {
      setLoading(false)

      if (
        placesStatus === google.maps.places.PlacesServiceStatus.OK &&
        placesResults &&
        placesResults.length > 0
      ) {
        // @ts-ignore - Suppress TypeScript errors for the mapping operation
        const formattedResults: Restaurant[] = placesResults.map((place) => ({
          id: place.place_id || `place-${Math.random()}`,
          name: place.name || 'Unknown Place',
          vicinity:
            place.vicinity || place.formatted_address || 'No address available',
          rating: place.rating,
          geometry: place.geometry
            ? {
                // Force TypeScript to accept this as the correct type
                location: place.geometry.location as google.maps.LatLng,
              }
            : undefined,
        }))

        setRestaurants(formattedResults)

        if (formattedResults.length === 1) {
          handleRestaurantSelect(formattedResults[0])
        }
      } else {
        setErrorMessage(`No restaurants matching '${query}' found in Nepal.`)
        setRestaurants([])
      }
    })
  }

  return (
    <div
      className='absolute w-90 h-14 left-1/2 -translate-x-1/2 top-[700px] z-[1002]'
      ref={searchContainerRef}
    >
      <form onSubmit={handleSubmit} className='w-full h-full'>
        <div className='relative flex w-full h-full'>
          <Input
            type='text'
            placeholder='Search for restaurants in Nepal...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full h-full rounded-full pl-5 pr-12 bg-white text-black border shadow-md focus:outline-none'
          />
          <Button
            type='submit'
            size='icon'
            className='absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-green-600 hover:bg-green-700 text-white'
          >
            <Search className='h-4 w-4' />
          </Button>
        </div>
      </form>

      {showResults && (
        <div className='absolute z-50 w-full mt-2 bg-white shadow-lg max-h-60 overflow-auto'>
          {loading && <div className='text-center p-2'>Loading...</div>}
          {errorMessage && (
            <div className='text-center text-red-600 p-2'>{errorMessage}</div>
          )}
          <ul className='max-h-60 overflow-auto'>
            {restaurants.map((restaurant) => (
              <li
                key={restaurant.id}
                className='p-2 cursor-pointer hover:bg-gray-100'
                onClick={() => handleRestaurantSelect(restaurant)}
              >
                <span className='font-bold'>{restaurant.name}</span>
                <p className='text-sm'>{restaurant.vicinity}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchBar
