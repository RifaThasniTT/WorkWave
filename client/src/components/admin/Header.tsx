"use client"
import Image from 'next/image'
import React from 'react'
import { FiBell } from 'react-icons/fi'
import Logo from "../../../public/logo.png"

const AdminHeader = () => {
  return (
    <header className="w-full h-20 bg-white border-b flex items-center justify-between px-16 shadow-sm">
      <div className="text-2xl font-bold">
        <Image src={Logo} alt='Logo' height={50} width={180}/>
      </div>

      <div className="flex items-center space-x-10">
        
        <FiBell className="text-xl cursor-pointer hover:text-blue-500" />
        
      </div>
    </header>
  )
}

export default AdminHeader
