"use client"
import React from 'react'

interface Props {
    children:React.ReactNode
}

const layout = ({children}:Props) => {
  return (
   <div className="bg-muted flex flex-col min-h-screen  items-center justify-center p-6 md:p-10">
      <div className="w-full h-full max-w-sm md:max-w-3xl">
    {children}
      </div>
    </div>
  )
}

export default layout
