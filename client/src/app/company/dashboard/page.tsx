"use client"
import CompanyHeader from '@/components/company/Header';
import CompanySidebar from '@/components/company/Sidebar';
import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <CompanyHeader/>
      <CompanySidebar/>
    </div>
  )
}

export default Dashboard;
