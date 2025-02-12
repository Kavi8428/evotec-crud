'use client'
import { useState } from 'react'
import { signIn} from '@/lib/auth-client'
import { redirect } from 'next/navigation';
export default function LoginForm () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remMe, setRemMe] = useState(true)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const logUserInput = async e => {
    e.preventDefault()
    if (email === '') {
      setEmailError('Email is required')
      return
    } else {
      setEmailError('')
    }
    if (password === '') {
      setPasswordError('Password is required')
      return
    } else {
      setPasswordError('')
    }

    await signIn.email({
      email,
      password
    },
    {
      onSuccess: ()=>{
        redirect("/dashboard");
      },
      onError : (ctr)=>{
        console.log('error', ctr);
    
      }
    }
  )

  
  }

  return (
    <div className=' flex bg-white rounded-lg shadow-lg w-[375px] '>
      <div className='p-5 w-full '>
        <form>
          <h3 className='text-lg font-semibold text-center mb-2 '>
            Sign in to your Account
          </h3>
          <div className='flex flex-col w-full mb-5'>
            <label htmlFor='email' className=' text-sm pt-1 mb-1 '>
              Your Mail :
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={e => {
                setEmail(e.target.value)
              }}
              className='rounded-md p-2 w-full text-sm border focus:bg-gray-200 focus:ring-1 focus:ring-blue-500 focus:text-sm '
              placeholder='name@company.com'
            />
            {emailError && (
              <div className='text-xs ms-1 mt-1 text-red-500 '>
                email is required !
              </div>
            )}
          </div>

          <div className='flex flex-col w-full mb-5'>
            <label htmlFor='password' className=' text-sm pt-1 mb-1 '>
              Your Password :
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={e => {
                setPassword(e.target.value)
              }}
              className='rounded-md p-2 w-full border focus:bg-gray-200 '
              placeholder='*****'
            />
            {passwordError && (
              <div className='text-xs ms-1 mt-1 text-red-500 '>
                Password is required!
              </div>
            )}
          </div>
          <div className='flex justify-between mb-5 '>
            <div className='flex'>
              <input
                className='me-2 '
                id='remMe'
                value={remMe}
                type='checkbox'
              />
              <label htmlFor='remMe' className='text-sm '>
                Remember Me
              </label>
            </div>
            <div>
              <a
                href='/forgot-password'
                className='text-sm text-blue-700 hover:underline '
              >
                Lost Password?
              </a>
            </div>
          </div>
          <div>
            <button
              type='button'
              id='submit'
              onClick={logUserInput}
              className='bg-blue-500 text-sm w-full rounded-md py-2 text-white font-semibold focus:ring-2 focus:ring-blue-800 hover:bg-blue-700'
            >
              SUBMIT
            </button>
          </div>
          <div className='flex justify-center space-x-1  '>
            <h6 className='text-sm'>Not a Member?</h6>{' '}
            <a
              className='text-sm text-blue-700 hover:underline '
              href='/register'
            >
              Be a Member
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
