"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { OctagonAlertIcon } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

// ✅ Zod schema with correct .refine usage
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
  confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

const SignUpView = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null)
    setPending(true)

    const { error } = await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          setPending(false)
          router.push('/')
        },
        onError: ({ error }) => {
          setPending(false)
          setError(error.message)
        },
      }
    )
  }

  console.log('sign up view')
  return (
    <div className='h-screen  flex items-center justify-center p-3 overflow-hidden'>
      <div className='w-full max-w-4xl h-full flex flex-col justify-center'>
        <div className='flex flex-col gap-3'>
          <Card className='overflow-hidden shadow-2xl border-0 backdrop-blur-sm bg-white/80'>
            <CardContent className='grid p-0 md:grid-cols-2'>
              <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='p-4 md:p-5 space-y-3'>
                  <div className='flex flex-col gap-3'>
                    <div className='flex flex-col items-center text-center space-y-1'>
                      <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center'>
                        <div className='w-5 h-5 bg-white rounded-full'></div>
                      </div>
                      <h1 className='text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent'>
                        Welcome
                      </h1>
                      <p className='text-slate-500 text-sm font-medium'>
                        Sign Up to your account
                      </p>
                    </div>

                    <div className='space-y-3'>
                      <FormField control={form.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem className='space-y-1'>
                            <FormLabel className='text-xs font-semibold text-slate-700 uppercase tracking-wide'>
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                type='text'
                                placeholder='Enter your Name'
                                className='h-9 px-3 text-sm border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-white/70 backdrop-blur-sm'
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem className='space-y-1'>
                            <FormLabel className='text-xs font-semibold text-slate-700 uppercase tracking-wide'>
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                type='email'
                                placeholder='Enter your email'
                                className='h-9 px-3 text-sm border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-white/70 backdrop-blur-sm'
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />


                      <FormField control={form.control}
                        name='password'
                        render={({ field }) => (
                          <FormItem className='space-y-1'>
                            <FormLabel className='text-xs font-semibold text-slate-700 uppercase tracking-wide'>
                              Password
                            </FormLabel>
                            <FormControl>
                              <Input
                                type='password'
                                placeholder='Enter your password'
                                className='h-9 px-3 text-sm border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-white/70 backdrop-blur-sm'
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField control={form.control}
                        name='confirmPassword'
                        render={({ field }) => (
                          <FormItem className='space-y-1'>
                            <FormLabel className='text-xs font-semibold text-slate-700 uppercase tracking-wide'>
                              confirm Password
                            </FormLabel>
                            <FormControl>
                              <Input
                                type='password'
                                placeholder='Confirm your password'
                                className='h-9 px-3 text-sm border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-white/70 backdrop-blur-sm'
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />


                    </div>

                    {!!error && (
                      <Alert className='bg-red-50 border-2 border-red-200 rounded-lg p-2'>
                        <OctagonAlertIcon className='h-4 w-4 text-red-500' />
                        <AlertTitle className='text-red-700 font-semibold ml-2 text-sm'>{error}</AlertTitle>
                      </Alert>
                    )}

                    <Button disabled={pending} type='submit' className='w-full h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 text-sm'>
                      Sign Up
                    </Button>

                    <div className='relative'>
                      <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-slate-300'></div>
                      </div>
                      <div className='relative flex justify-center text-xs'>
                        <span className='bg-white px-3 text-slate-500 font-medium'>Or continue with</span>
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-2'>
                      <Button
                        disabled={pending}
                        onClick={() => {
                          authClient.signIn.social({
                            provider: "google"
                          })
                        }} 
                        variant="outline"
                        type='button'
                        className='h-9 border-2 border-slate-200 hover:border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200 hover:scale-[1.02] text-xs'
                      >
                        <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                      </Button>
                      <Button
                        disabled={pending}
                        variant="outline"
                        type='button'
                        className='h-9 border-2 border-slate-200 hover:border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200 hover:scale-[1.02] text-xs'
                      >
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Github
                      </Button>
                    </div>

                    <div className='text-center text-sm text-slate-600'>
                      Already have an account?{" "}
                      <Link className='font-semibold text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline transition-colors duration-200' href='/auth/sign-in'>
                        Sign in
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>

              <div className='bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 items-center justify-center relative hidden md:flex flex-col overflow-hidden'>
                <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20'></div>
                <div className='relative z-10 flex flex-col items-center space-y-4'>
                  <div className='w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30'>
                    <img src="/new.svg" alt="image" className='h-12 w-12' />
                  </div>
                  <div className='text-center space-y-1'>
                    <p className='text-2xl font-bold text-white'>
                      Meet.AI
                    </p>
                    <p className='text-blue-100 text-base font-medium max-w-xs'>
                      Your intelligent meeting companion
                    </p>
                  </div>
                  <div className='grid grid-cols-3 gap-2 mt-4'>
                    <div className='w-2 h-2 bg-white/40 rounded-full animate-pulse'></div>
                    <div className='w-2 h-2 bg-white/60 rounded-full animate-pulse' style={{ animationDelay: '0.2s' }}></div>
                    <div className='w-2 h-2 bg-white/40 rounded-full animate-pulse' style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='text-slate-500 text-center text-xs bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-slate-200'>
            By clicking continue you agree to our{" "}
            <a href="#" className='font-medium text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline transition-colors duration-200'>
              Terms of Service
            </a>
            {" "}and{" "}
            <a href="#" className='font-medium text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline transition-colors duration-200'>
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpView