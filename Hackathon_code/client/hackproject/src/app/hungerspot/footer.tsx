"use client";
import React, { useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IoHome } from "react-icons/io5";
import { FaMapMarked } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { BiDonateBlood } from "react-icons/bi";
import Dock from "../components/Dock";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Prefetch routes on initial load for faster navigation
  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/hungerspot");
    router.prefetch("/donate-food");
    router.prefetch("/profile");
  }, [router]);
  
  // Memoized handlers to prevent unnecessary re-renders
  const navigateToHome = useCallback(() => {
    if (pathname !== "/") router.push("/home");
  }, [router, pathname]);
  
  const navigateToHungerspot = useCallback(() => {
    if (pathname !== "/hungerspot") router.push("/hungerspot");
  }, [router, pathname]);
  
  const navigateToDonate = useCallback(() => {
    if (pathname !== "/donate-food") router.push("/donate-food");
  }, [router, pathname]);
  
  const navigateToProfile = useCallback(() => {
    if (pathname !== "/profile") router.push("/profile");
  }, [router, pathname]);
  
  const items = [
    { 
      icon: <IoHome size={24} color="white" />, 
      label: "Home", 
      onClick: navigateToHome,
      active: pathname === "/"
    },
    { 
      icon: <FaMapMarked size={24} color="white" />, 
      label: "Hunger Spot", 
      onClick: navigateToHungerspot,
      active: pathname === "/hungerspot"
    },
    { 
      icon: <BiDonateBlood size={24} color="white" />, 
      label: "Donate", 
      onClick: navigateToDonate,
      active: pathname === "/donate-food"
    },
    { 
      icon: <FaUser size={22} color="white" />, 
      label: "Profile", 
      onClick: navigateToProfile,
      active: pathname === "/profile"
    },
  ];
  
  return <Dock items={items} baseItemSize={50} />;
};

export default Footer;