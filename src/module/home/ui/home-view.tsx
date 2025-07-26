"use client"
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { Router } from 'next/router'
import { useRouter } from 'next/navigation'

const HomeView = () => {
  const router =useRouter()
  const {data:session}=authClient.useSession()
  if(!session){
    return (
          <div className="flex flex-col p-4 gap-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

    )
  }
  return (
    <div className='flex flex-col p-4 gap-y-4'>
      <p>Logged in as {session?.user.name}</p>
      <Button onClick={()=>authClient.signOut({
        fetchOptions:{
          onSuccess:()=>router.push('/auth/sign-in')
        }
      })}>
        Sign Out
      </Button>
    </div>
  )
}

export default HomeView
