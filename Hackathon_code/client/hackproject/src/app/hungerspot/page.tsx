"use client"
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import Header from "../components/Header";
import ClientMapWrapper from "./ClientMapWrapper";
import Footer from "./footer";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [preloaderAnimation, setPreloaderAnimation] = useState<any>(null);

  useEffect(() => {
    // Check if the user has already loaded the app
    const hasLoadedBefore = localStorage.getItem("hasLoadedBefore");

    if (hasLoadedBefore) {
      // If the app has loaded before, skip the preloader
      setIsLoading(false);
    } else {
      // If it's the first time, load the preloader animation
      const loadAnimation = async () => {
        const response = await fetch("/animations/preloader.json"); // URL relative to /public
        const data = await response.json();
        setPreloaderAnimation(data);
      };

      loadAnimation();

      // Simulate loading time before removing preloader
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Set localStorage flag so it doesn't show the preloader again
        localStorage.setItem("hasLoadedBefore", "true");
      }, 2000); // Adjust as necessary

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center p-2">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          {preloaderAnimation && (
            <Lottie animationData={preloaderAnimation} loop={true} className="h-32 w-32" />
          )}
        </div>
      ) : (
        <>
          <Header />
          <ClientMapWrapper />
          <Footer />
        </>
      )}
    </div>
  );
};

export default HomePage;
