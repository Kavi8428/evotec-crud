// This file for client component
'use client'
import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// import { register } from '@/lib/apis/server'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { signUp } from '@/lib/auth-client'
// import { ToastAction } from '@radix-ui/react-toast'

export default function RegisterPage () {
  const [fullName, fullNameHolder] = useState('')
  const [userName, userNameHolder] = useState('')
  const [email, emailHolder] = useState('')
  const [password, passwordHolder] = useState('')
  const [conPassword, conPasswordHolder] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConPassword, setShowConPassword] = useState(false)

  const DEFAULT_ERROR = {
    error: false,
    massage: ''
  }
  const [error, setError] = useState(DEFAULT_ERROR)
  const [isLoading, setLoading] = useState(false)
  const { toast } = useToast()

  const submit = async event => {
    event.preventDefault()
    const formData = new FormData(event?.currentTarget)
    const fullName = formData.get('fullName').toString()
    const userName = formData.get('userName').toString()
    const email = formData.get('email').toString()
    const password = formData.get('password').toString()
    const conPassword = formData.get('conPassword').toString()

    if (fullName && userName && email && password && conPassword) {
      if (password === conPassword) {
        setLoading(true)
        setError(DEFAULT_ERROR)
        // const serverResponse = await register({
        //   fullName,
        //   userName,
        //   email,
        //   password
        // })
        // setLoading(false)

        // if (serverResponse?.success === true) {
        //   setError({
        //     error: false,
        //     massage: 'Successfully Registered'
        //   })
        //   toast({
        //     variant : 'success',
        //     title : 'Successfull..!',
        //     description: "Welcome to movie hub family.",
        //     action : <ToastAction altText='loging here'  className=' px-2 rounded-md bg-green-400 hover:ring-2 hover:bg-green-900/45' >Login</ToastAction>
        //   })
        // } else {
        //   setError({
        //     error: true,
        //     massage: serverResponse.error
        //   })
        // }

        const { data, error } = await signUp.email(
          {
            email: email,
            password: password,
            name: userName,
            image: undefined
          },
          {
            onRequest: () => {},
            onSuccess: ctx => {
              console.log('ctx', ctx)
              setLoading(false)
            },
            onError: ctx => {
              if (ctx) {
                setError({
                  error: true,
                  massage: ctx.error.message
                })
              }
              setLoading(false)
            }
          }
        )

        if (data) {
          console.log('Recieved data :', data)
          setLoading(false)
        } else if (error) {
          console.log('Error Received :', error)
          setLoading(false)
        } else {
          console.log('Bad Request')
          setLoading(false)
        }
      } else {
        setError({
          error: true,
          massage: "Pword doesn't match"
        })
      }
    } else {
      setError({
        error: true,
        massage: 'Some Fields are empty'
      })
    }
  }
  return (
    <div>
      <div className='flex flex-col justify-center min-h-screen items-center '>
        <Card className=' bg-black w-[400px] min-h-min text-white'>
          <CardHeader>
            <CardTitle className='flex justify-center'>
              <div className='flex flex-col items-center gap-2'>
                <Image
                  src={require('@/public/movieHubLogo.png')}
                  alt='Logo'
                  width={30}
                  height={30}
                />
                <span>BE A MEMBER</span>
              </div>
            </CardTitle>
            <CardDescription>
              <p>Enter Your Details to be a memebr of Movie Club</p>
            </CardDescription>
          </CardHeader>
          <form onSubmit={submit}>
            <CardContent className='flex flex-col gap-3'>
              <div className='flex flex-col justify-between gap-1  '>
                <Label className='text-xs'>Full Name: </Label>
                <Input
                  id='fullName'
                  name='fullName'
                  type='text'
                  value={fullName}
                  className=' w-full text-white  rounded-md'
                  placeholder=' Eg: M D L U Kavishka'
                  onChange={e => {
                    fullNameHolder(e.target.value)
                  }}
                ></Input>
              </div>
              <div className='flex flex-col justify-between gap-1  '>
                <Label className='text-xs'>User Name : </Label>
                <Input
                  id='userName'
                  type='text'
                  name='userName'
                  className='  w-full text-white  rounded-md'
                  placeholder=' Eg: udara'
                  value={userName}
                  onChange={e => {
                    userNameHolder(e.target.value)
                  }}
                ></Input>
              </div>
              <div className='flex flex-col justify-between gap-1  '>
                <Label className='text-xs'>Email : </Label>
                <Input
                  id='email'
                  type='email'
                  className=' w-full text-white  rounded-md'
                  placeholder=' Eg: kavishka@gmail.com'
                  name='email'
                  value={email}
                  onChange={e => {
                    emailHolder(e.target.value)
                  }}
                ></Input>
              </div>
              <div className='flex flex-col justify-between gap-1  '>
                <Label className='text-xs'>Password : </Label>
                <div className='relative'>
                    <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    className='w-full text-white rounded-md'
                    placeholder='ABC@123'
                    name='password'
                    value={password}
                    onChange={e => {
                      passwordHolder(e.target.value)
                    }}
                    />
                    {showPassword ? <EyeOff className='absolute top-2 right-2 text-gray-500 cursor-pointer' onClick={() => setShowPassword(false)} /> : <Eye  className='absolute top-2 right-2 text-gray-500 cursor-pointer' onClick={() => setShowPassword(true)} />}
                  </div>
              </div>

              <div className='flex flex-col justify-between gap-1  '>
                <Label className='text-xs'>Confirm Password : </Label>
                <div className='relative'>
                <Input
                  id='confirmPassword'
                  type={showConPassword ? 'text' : 'password'}
                  className=' w-full text-white  rounded-md'
                  placeholder='ABC@123'
                  name='conPassword'
                  value={conPassword}
                  onChange={e => {
                    conPasswordHolder(e.target.value)
                  }}
                />
                {showConPassword ? <EyeOff className='absolute top-2 right-2 text-gray-500 cursor-pointer' onClick={() => setShowConPassword(false)} /> : <Eye  className='absolute top-2 right-2 text-gray-500 cursor-pointer' onClick={() => setShowConPassword(true)} />}
                </div>
              </div>
              <div>
                {error?.error == true && (
                  <span className='flex text-red-600 text-xs justify-start animate-pulse duration-99 '>
                    {error.massage}
                  </span>
                )}
              </div>

              <div className='flex justify-start text-sm space-x-1 '>
                <p>Existing MovieHub Member?</p>
                <Link href='/login' className='text-blue-500 hover:underline'>
                  Login
                </Link>
              </div>
            </CardContent>
            <CardFooter className='flex justify-center w-full  '>
              <Button
                type='submit'
                id='submit'
                variant='destructive'
                size='icon'
                className=' flex-1 font-semibold'
                disabled={isLoading}
              >
                {isLoading && <Loader2 className='animate-spin' />}
                SUBMIT
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
