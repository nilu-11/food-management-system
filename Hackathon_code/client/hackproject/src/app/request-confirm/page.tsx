"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function RequestConfirmation() {
  const router = useRouter();

  const handleContinueClick = () => {
    router.push('/hungerspot');
  };


  return (
    <main className="flex flex-col items-center min-h-screen bg-[#FDF5E8]">
      <div className="w-full max-w-md text-center px-6 py-8">
        <h1 className="text-xl font-bold mb-20 mt-4">Request Confirmation</h1>
        
        {/* Green checkmark circle */}
        <div className="w-25 h-25 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="white"/>
          </svg>
        </div>
        
        <h2 className="text-[#4B735E] text-xl font-semibold mb-12">Request Confirmed</h2>
        
        <p className="text-[#4B735E] text-2xl">
          Your order has been confirmed, please pick up the food within the preferred time.
        </p>
      </div>
      
      <div className="fixed bottom-10 left-0 right-0 border-8 bg-[#4CAF50] text-white h-16 flex justify-around items-center">
        <button onClick={handleContinueClick} className="flex flex-col items-center justify-center flex-1">
          <span className="text-xl mt-1">Continue</span>
        </button>
        
      </div>
    </main>
  );
}
