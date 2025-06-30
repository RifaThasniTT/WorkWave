"use client";

import Image from "next/image";
import Link from "next/link";
import { FiBell } from "react-icons/fi";
import Logo from "../../../public/logo.png"

export default function CompanyHeader() {
  return (
    <header className="w-full h-20 bg-white border-b flex items-center justify-between px-16 shadow-sm">
      <div className="text-2xl font-bold">
        <Image src={Logo} alt='Logo' height={50} width={180}/>
      </div>

      <div className="flex items-center space-x-10">
        <Link
          href="/company/post-job"
          className="bg-[#09B9FF] hover:bg-blue-400 text-white text-sm px-4 py-2 rounded-md"
        >
          + Post Job
        </Link>
        <FiBell className="text-xl cursor-pointer hover:text-blue-500" />
        
      </div>
    </header>
  );
}
