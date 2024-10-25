"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import React, {  useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaHome, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = () => {
    localStorage.removeItem("role");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      setIsLoggedIn(true);
    }
  }, []);


  const handleBackClick = () => {
    router.back();
  };

  return (
    <header
      className="bg-black flex justify-between items-center py-3 px-5 fixed top-0 left-0 w-full z-10 h-16"
      
    >
      <nav className="flex justify-between items-center w-full text-yellow-400 text-lg font-semibold">
        <div className="flex items-center space-x-4">
            {pathname !== '/' &&
          <button onClick={handleBackClick} className="hover:text-yellow-300 flex items-center">
            <FaArrowLeft className="mr-2" />
          </button>
            }

          <img
            src="/bgblack.jpg"
            alt="CrimeTrack Logo"
            className="h-12 w-15"
          /><p>C R I M E T R A C K</p>
        </div>

        <div className="flex space-x-11 items-center">
          <Link href="/" className="hover:text-yellow-300">
            <FaHome />
          </Link>
          {isLoggedIn ? (
            <button onClick={handleSignOut} className="text-yellow-400 flex items-center">
              <FaSignOutAlt className="mr-2" />
            </button>
          ) : (
            <Link href="/Login" className="flex items-center hover:text-yellow-300">
              <FaSignInAlt className="mr-2" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
