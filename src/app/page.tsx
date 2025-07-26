import { auth } from '@/lib/auth'
import HomeView from '@/module/home/ui/home-view'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'


const page = async () => {
const session=await auth.api.getSession({
  headers:await headers()
})
if(!session){
  redirect('/auth/sign-in')
}

  return <HomeView/>
}

export default page
