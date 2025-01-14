// This file for client component
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { use, useState } from 'react'
import { register } from '../libs/apis/server'

export default function RegisterPage () {
  const [fullName, fullNameHolder] = useState('')
  const [userName, userNameHolder] = useState('')
  const [email, emailHolder] = useState('')
  const [password, passwordHolder] = useState('')
  const [conPassword, conPasswordHolder] = useState('')

  const DEFAULT_ERROR = {
    error: false,
    massage: ''
  }
  const [error, setError] = useState(DEFAULT_ERROR)
  const [isLoading, setLoading] = useState(false)

  const submit = async event => {
    event.preventDefault()
    const formData = new FormData(event?.currentTarget)
    const fullName = formData.get('fullName').toString()
    const userName = formData.get('userName').toString()
    const email = formData.get('email').toString()
    const password = formData.get('password').toString()
    const conPassword = formData.get('conPassword').toString()

    // console.log(fullName,userName,email,password,conPassword);

    if (fullName && userName && email && password && conPassword) {
      if (password === conPassword) {
        setLoading(true)
        setError(DEFAULT_ERROR)
        const serverResponse = await register({
          fullName,
          userName,
          email,
          password
        })
        setLoading(false)

        if (serverResponse?.success === true) {
          setError({
            error: false,
            massage: 'Successfully Registered'
          })
        } else {
          setError({
            error: true,
            massage: serverResponse.error
          })
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
                <Input
                  id='password'
                  type='password'
                  className=' w-full text-white  rounded-md'
                  placeholder='ABC@123'
                  name='password'
                  value={password}
                  onChange={e => {
                    passwordHolder(e.target.value)
                  }}
                ></Input>
              </div>

              <div className='flex flex-col justify-between gap-1  '>
                <Label className='text-xs'>Confirm Password : </Label>
                <Input
                  id='confirmPassword'
                  type='password'
                  className=' w-full text-white  rounded-md'
                  placeholder='ABC@123'
                  name='conPassword'
                  value={conPassword}
                  onChange={e => {
                    conPasswordHolder(e.target.value)
                  }}
                ></Input>
              </div>
              <div>
                {error?.error == true && (
                  <span className='flex text-red-600 text-xs justify-start'>
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
                disabled = {isLoading}
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