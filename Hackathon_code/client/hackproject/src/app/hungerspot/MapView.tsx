"use client"
import React, { useState, useRef, useMemo, useCallback, Suspense } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import './mapdonate.css';
import { v4 as uuid } from 'uuid';

// Prefetch the donation-details page for instant navigation
import { useRouter } from 'next/navigation';

// Lazy load components with proper loading states
const SearchBar = React.lazy(() => import('../components/searchBar'));
const MapDonate = React.lazy(() => import('./MapDonate'));

// Define types
interface Restaurant {
  id: string;
  name: string;
  vicinity: string;
  rating?: number;
  geometry?: {
    location: google.maps.LatLng;
  };
}

interface MarkerData {
  lat: number;
  lng: number;
  name: string;
  vicinity?: string;
  rating?: number;
}

interface MealImage {
  picture: string;
  altText: string;
}

interface DonaterInfoType {
  name: string;
  date: string;
  location: string;
  noofmeal: number;
  images: MealImage[];
}

// Library options needed for the maps
const libraries = ['places'];

const MapView: React.FC = () => {
  const router = useRouter();
  const mapRef = useRef<google.maps.Map | null>(null);
  
  // Implement image preloading with better error handling
  const [mealImages, setMealImages] = useState<{[key: string]: string}>({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Prefetch the donation-details page on component mount
  React.useEffect(() => {
    // This tells Next.js to prefetch the page
    router.prefetch('/donation-details');
  }, [router]);

  // Optimize image loading with a single Promise.all
  React.useEffect(() => {
    const loadImages = async () => {
      try {
        const [meal1, meal2, meal3] = await Promise.all([
          import('../assets/Img/meal1.png'),
          import('../assets/Img/meal2.png'),
          import('../assets/Img/meal3.png')
        ]);
        
        setMealImages({
          meal1: meal1.default.src,
          meal2: meal2.default.src,
          meal3: meal3.default.src,
        });
        setImagesLoaded(true);
      } catch (error) {
        console.error("Failed to load images:", error);
        // Use fallback images or handle error state
        setImagesLoaded(true); // Still mark as loaded to prevent blocking
      }
    };
    
    loadImages();
  }, []);

  // Create donater info using the loaded images with memoization
  const DonaterInfo = useMemo<DonaterInfoType[]>(() => {
    if (!imagesLoaded) return [];
    
    return [{
      name: 'Trishara Kitchen',
      date: '12 March,2025',
      location: 'Thamel Kathmnandu',
      noofmeal: 15,
      images: [
        { picture: mealImages.meal1 || '', altText: 'Chowemin' },
        { picture: mealImages.meal2 || '', altText: 'Rice' },
        { picture: mealImages.meal3 || '', altText: 'Daal' },
      ],
    }];
  }, [mealImages, imagesLoaded]);
  
  // Default restaurant markers with memoization
  const defaultMarkers: MarkerData[] = useMemo(() => [
    { lat: 27.7015, lng: 85.3240, name: "Maharaj Restaurant", vicinity: "Kathmandu, Nepal" },
    { lat: 27.7154, lng: 85.2921, name: "Dwarika's Hotel Restaurant", vicinity: "Dwarika's Hotel, Kathmandu" },
    { lat: 27.7114, lng: 85.3145, name: "Buddha Stupa Restaurant", vicinity: "Near Boudhanath, Kathmandu" },
    { lat: 27.6751, lng: 85.3117, name: "Patan House Restaurant", vicinity: "Patan, Lalitpur" },
    { lat: 27.7128, lng: 85.3194, name: "The Third Eye Restaurant", vicinity: "Thamel, Kathmandu" },
    { lat: 27.6889, lng: 85.3201, name: "La Dolce Vita Restaurant", vicinity: "Jhamsikhel, Lalitpur" },
    { lat: 27.6935, lng: 85.3125, name: "Kaiser Cafe", vicinity: "Garden of Dreams, Kathmandu" },
    { lat: 27.7135, lng: 85.3198, name: "Shree Restaurant", vicinity: "Thamel, Kathmandu" },
    { lat: 27.7053, lng: 85.3170, name: "The Chimney Restaurant", vicinity: "Durbar Marg, Kathmandu" },
    { lat: 27.6812, lng: 85.3297, name: "Newa Momo", vicinity: "Pulchowk, Lalitpur" },
  ], []);

  // Calculate map center once
  const mapCenter = useMemo(() => {
    const avgLat = defaultMarkers.reduce((sum, marker) => sum + marker.lat, 0) / defaultMarkers.length;
    const avgLng = defaultMarkers.reduce((sum, marker) => sum + marker.lng, 0) / defaultMarkers.length;
    return { lat: avgLat, lng: avgLng };
  }, [defaultMarkers]);

  // Load Google Maps with proper type definition
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries as google.maps.Libraries,
  });

  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number }>(mapCenter);
  const [mapZoom, setMapZoom] = useState(14);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [activeMarker, setActiveMarker] = useState<MarkerData | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  // Add state for preloading status
  const [isReservationReady, setIsReservationReady] = useState(false);

  // Map options defined with useMemo
  const mapOptions = useMemo(() => ({
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeId: 'roadmap',
    restriction: {
      latLngBounds: {
        north: 30.4227, 
        south: 26.3470, 
        east: 88.2015,   
        west: 80.0586
      }, 
      strictBounds: true,
    },
    minZoom: 7,
    maxZoom: 20,
  }), []);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleSearch = useCallback((query: string, restaurant?: Restaurant) => {
    if (restaurant && restaurant.geometry && restaurant.geometry.location) {
      const newPosition = {
        lat: restaurant.geometry.location.lat(),
        lng: restaurant.geometry.location.lng(),
      };
      
      setMarkerPosition(newPosition);
      setSelectedRestaurant(restaurant);
      
      if (mapRef.current) {
        mapRef.current.panTo(newPosition);
        setMapZoom(18);
      }

      const selectedMarkerData: MarkerData = {
        lat: newPosition.lat,
        lng: newPosition.lng,
        name: restaurant.name,
        vicinity: restaurant.vicinity,
        rating: restaurant.rating
      };
      setActiveMarker(selectedMarkerData);
      setShowModal(true);
      
      // Start preloading the reservation data when a marker is selected
      setIsReservationReady(false);
      preloadReservationData(restaurant.id);
    }
  }, []);

  // Preload data needed for the reservation
  const preloadReservationData = useCallback(async (restaurantId: string) => {
    try {
      // Simulate preloading any data needed for the reservation page
      // In a real app, you would fetch actual data here
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Store any necessary data in sessionStorage for quick access on the next page
      sessionStorage.setItem('selectedRestaurantId', restaurantId);
      sessionStorage.setItem('selectedRestaurantData', JSON.stringify(activeMarker));
      
      setIsReservationReady(true);
    } catch (error) {
      console.error("Failed to preload reservation data:", error);
      // Still allow navigation even if preloading fails
      setIsReservationReady(true);
    }
  }, [activeMarker]);

  const handleMarkerClick = useCallback((marker: MarkerData) => {
    setActiveMarker(marker);
    setShowModal(true);
    
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.panTo({ lat: marker.lat, lng: marker.lng });
      
      if (currentZoom !== undefined && currentZoom < 14) {
        mapRef.current.setZoom(14);
        setMapZoom(14);
      } else {
        setMapZoom(currentZoom || 14);
      }
    }
    
    // Start preloading reservation data when marker is clicked
    setIsReservationReady(false);
    // Create a mock ID if we don't have a real one from the marker
    const mockId = `${marker.lat}-${marker.lng}`;
    preloadReservationData(mockId);
  }, [preloadReservationData]);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  // Handle direct navigation programmatically
  const handleReservation = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    // If data isn't ready yet, show loading indicator (but still navigate after a short timeout)
    if (!isReservationReady) {
      // You could show a loading state here
      
      // Still navigate after a short delay to prevent blocking
      setTimeout(() => {
        router.push('/donation-details');
      }, 300);
      return;
    }
    
    // Navigate programmatically for faster transition
    router.push('/donation-details');
  }, [isReservationReady, router]);

  // Render loading state while map is loading
  if (loadError) return <div className="h-screen flex justify-center items-center">Error loading maps</div>;
  if (!isLoaded) return <div className="h-screen flex justify-center items-center">
    <div className="animate-spin h-10 w-10 border-4 border-green-500 rounded-full border-t-transparent"></div>
  </div>;

  return (
    <div className="relative">
      <div className="absolute top-[-11px] left-[-12px] w-[402px] h-[80px] z-10 bg-gradient-to-r from-[#F8F7F7] to-[#FCF5E8] blur-[15px]"></div>

      <GoogleMap
        mapContainerStyle={{ height: '100vh', width: '100vw' }}
        center={markerPosition}
        zoom={mapZoom}
        onLoad={onMapLoad}
        options={mapOptions}
      >
        {defaultMarkers.map((marker, index) => (
          <Marker
            key={`default-${index}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.name}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}
        
        {selectedRestaurant && (
          <Marker 
            position={markerPosition}
            title={selectedRestaurant.name}
            onClick={() => handleMarkerClick({
              lat: markerPosition.lat,
              lng: markerPosition.lng,
              name: selectedRestaurant.name,
              vicinity: selectedRestaurant.vicinity,
              rating: selectedRestaurant.rating
            })}
          />
        )}
      </GoogleMap>

      {showModal && activeMarker && (
        <div className="fixed bottom-30 left-1/2 transform -translate-x-1/2 z-[1003]">
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-xs" 
            onClick={closeModal}
          ></div>
          
          <div className="relative bg-white rounded-xl shadow-sm p-5 w-[450px] h-auto max-w-[90vw] max-h-[80vh] z-[1004]">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">{activeMarker.name}</h2>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition duration-200"
              >
                &times;
              </button>
            </div>

            <p className="text-gray-500 mt-2 text-sm">{activeMarker.vicinity}</p>

            <div className="mt-4 space-y-3 max-h-[200px] overflow-y-auto">
              <Suspense fallback={<div className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>}>
                {DonaterInfo.map((donater) => (
                  <MapDonate key={uuid()} {...donater} />
                ))}
              </Suspense>
            </div>

            <div className="mt-5">
              <button 
                onClick={handleReservation}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                  isReservationReady 
                    ? "bg-green-600 text-white hover:bg-green-700" 
                    : "bg-green-500 text-white relative overflow-hidden"
                }`}
                disabled={!isReservationReady}
              >
                {isReservationReady ? (
                  "Reserve your meal"
                ) : (
                  <>
                    <span>Preparing reservation...</span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin"></span>
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Suspense fallback={<div className="h-12 bg-white/80 rounded-lg animate-pulse absolute top-4 left-1/2 transform -translate-x-1/2 w-[80%] max-w-md z-20"></div>}>
        <SearchBar onSearch={handleSearch} />
      </Suspense>
    </div>
  );
};

export default MapView;