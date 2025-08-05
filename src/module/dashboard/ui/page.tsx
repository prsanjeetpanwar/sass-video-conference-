"use client"
import React from 'react'
import {
    SidebarProvider,
    Sidebar,
    SidebarContent,
    SidebarTrigger,
    SidebarHeader,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenuItem,
    SidebarMenuButton,
} from '@/components/ui/sidebar'
import { BotIcon, StarIcon, VideoIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { usePathname } from 'next/navigation'
import DashboardUserButton from './components/dashboard-user-button'

const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: '/meetings'
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: '/agents'
    }
]

const secondSection = [
    {
        icon: StarIcon,
        label: 'Upgrade',
        href: '/upgrade'
    }
]

const DashboardSidebar = () => {
    const pathName=usePathname()
    return (
        <Sidebar className='bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 border-r border-blue-800/50'>
            <SidebarHeader className='text-white'>
                <Link href="/" className='flex items-center gap-3 px-4 py-5 hover:opacity-90 transition-opacity'>
                    <Image 
                        src={'/new.svg'} 
                        height={36}  
                        width={36} 
                        alt='Meet.ai'
                        className='filter drop-shadow-md'
                    />
                    <span className='text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent'>
                        Meet.ai
                    </span>
                </Link>
            </SidebarHeader>
            
            <div className='px-4'>
                <Separator className='bg-blue-700/50' />
            </div>
            
            <SidebarContent className='mt-4'>
                <SidebarGroup>
                    <SidebarGroupContent className='space-y-1 px-2'>
                        {firstSection.map((item) => (
                            <div key={item.href}>
                                <SidebarMenuButton className='
                                    h-11 
                                    rounded-lg
                                    transition-all
                                    hover:bg-blue-800/60 
                                    hover:shadow-sm
                                    hover:border-blue-700/30
                                    border border-transparent
                                    group
                                '>
                                    <Link href={item.href} className='flex items-center gap-3 w-full px-4 py-2'>
                                        <item.icon className='size-5 text-blue-300 group-hover:text-blue-100' />
                                        <span className='text-sm font-medium text-blue-100 group-hover:text-white'>
                                            {item.label}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </div>
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>
                
                <div className='px-4 mt-6 mb-4'>
                    <Separator  className='bg-blue-700/50' />
                </div>
                
                <SidebarGroup>
                    <SidebarGroupContent className='px-2'>
                        {secondSection.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton className='
                                    h-11 
                                    rounded-lg
                                    transition-all
                                    hover:bg-amber-500/20
                                    hover:shadow-sm
                                    hover:border-amber-400/20
                                    border border-transparent
                                    group
                                '>
                                    <Link href={item.href} className='flex items-center gap-3 w-full px-4 py-2'>
                                        <item.icon className='size-5 text-amber-400 group-hover:text-amber-300' />
                                        <span className='text-sm font-medium text-amber-200 group-hover:text-amber-100'>
                                            {item.label}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter className='p-4 text-white mt-auto'>
               <DashboardUserButton/>
            </SidebarFooter>
        </Sidebar>
    )
}

export default DashboardSidebar