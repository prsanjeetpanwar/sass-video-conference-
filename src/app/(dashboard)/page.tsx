import { auth } from '@/lib/auth'
import HomeView from '@/module/home/ui/home-view'
import { caller } from '@/trpc/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'


const page = async () => {
  // const greeting =await caller.hello({text:"Prsanjeet panwar "})
const session=await auth.api.getSession({
  headers:await headers()
})
if(!session){
  redirect('/auth/sign-in')
}

// return <p>{greeting.greeting}</p>

  return <HomeView/>
}

export default page
