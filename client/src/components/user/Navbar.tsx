'use client'

import Link from 'next/link'
import { FiBell, FiUser } from 'react-icons/fi'
import { HiOutlineChatAlt2 } from 'react-icons/hi'
import Logo from "../../../public/logo.png"
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for token on initial render
    const token = localStorage.getItem('userAccessToken')
    setIsAuthenticated(!!token)
  }, [])

  return (
    <header className="bg-white p-3 font-dmsans text-black">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          <Image src={Logo} alt='Logo' height={50} width={180}/>
        </Link>

        {/* Navigation Links */}
        <nav className="md:flex ml-4 space-x-10 font-light text-sm ">
          <Link href="/" className='hover:text-[#09B9FF]'>Home</Link>
          <Link href="/about"  className='hover:text-[#09B9FF]'>About Us</Link>
          <Link href="/contact"  className='hover:text-[#09B9FF]'>Contact Us</Link>
          <Link href="/jobs"  className='hover:text-[#09B9FF]'>Find Jobs</Link>
          <Link href="/company/login"  className='hover:text-[#09B9FF]'>Post Job</Link>
        </nav>

        {/* Right Side - Either Icons or Login Button */}
        <div className="flex items-center space-x-8 text-xl">
          {isAuthenticated ? (
            <>
              <HiOutlineChatAlt2 className="cursor-pointer hover:text-[#09B9FF] stroke-[1.3]" />
              <FiBell className="cursor-pointer hover:text-[#09B9FF] stroke-[1.3]" />
              <FiUser className="cursor-pointer hover:text-[#09B9FF] stroke-[1.3]" />
            </>
          ) : (
            <Link href="/login">
              <button className="bg-[#09B9FF] text-white px-4 py-2 rounded-md text-sm hover:bg-[#069cd9] transition">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
