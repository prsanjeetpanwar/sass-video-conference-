import { SidebarProvider } from '@/components/ui/sidebar'
import DashboardNavbar from '@/module/dashboard/ui/components/dashboard-navbar'
import DashboardSidebar from '@/module/dashboard/ui/page'
import React from 'react'

interface Props {
    children:React.ReactNode
}

const Layout = ({children}:Props) => {
  return (
    <SidebarProvider>
        <DashboardSidebar/>
      
        <main className='flex flex-col h-screen w-screen '>
            <DashboardNavbar/>
             {children}
        </main>
   
    </SidebarProvider>
  )
}

export default Layout
