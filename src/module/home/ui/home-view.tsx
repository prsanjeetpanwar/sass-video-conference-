"use client"

import React from 'react'

import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'

const HomeView = () => {
  const trpc =useTRPC()
  
  
 
  return (
    <div className='flex flex-col p-4 gap-y-4 text-black'>

    Home view
    </div>
  )
}

export default HomeView
