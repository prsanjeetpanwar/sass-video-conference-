
import { Card } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import SignupView from '@/module/auth/ui/view/sign-up-view'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async() => {
    const session=await auth.api.getSession({
      headers:await headers()
    })
    if(!!session){
      redirect('/')
    }
  
  console.log('sign in page')
  return <SignupView/>
}

export default Page
