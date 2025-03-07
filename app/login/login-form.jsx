'use client'
import { useState } from 'react'
import { signIn } from '@/lib/auth-client'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Eye } from 'lucide-react'
import { EyeOff } from 'lucide-react'

export default function LoginForm () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remMe, setRemMe] = useState(true)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)

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

    setLoading(true)
    await signIn.email(
      {
        email,
        password
      },
      {
        onSuccess: () => {
          setLoading(false)
          setError('')
          setSuccess('successful You will be redirected shortly')
          redirect('/dashboard')
        },
        onError: ctr => {
          setLoading(false)
          setError(ctr.error.message || 'An error occurred')
          // console.log('error', ctr);
          // console.log('ctr.message', ctr.message);
          // console.log('ctr.error', ctr.error);
          // console.log('ctr.error.massage', ctr.error.message);
        }
      }
    )
  }

  return (
    <div className='flex bg-black rounded-lg shadow-lg w-[375px] border border-white'>
      <div className='p-5 w-full'>
        <div className='flex justify-center mb-1'>
          <Image src='/movieHubLogo.png' alt='logo' width={80} height={80} />
        </div>
        <form>
          <h3 className='text-lg font-semibold text-center mb-2'>
            Sign in to Your Account
          </h3>
          <div className='flex flex-col w-full mb-5'>
            <label htmlFor='email' className='text-sm pt-1 mb-1'>
              Your Mail:
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={e => {
                setEmail(e.target.value)
              }}
              className='rounded-md p-2 w-full border bg-transparent text-sm focus:ring-1 focus:ring-blue-500 focus:text-sm'
              placeholder='name@company.com'
              disabled={loading}
            />
            {emailError && (
              <div className='text-xs ms-1 mt-1 text-red-500'>
                email is required!
              </div>
            )}
          </div>

          <div className='flex flex-col w-full mb-5'>
            <label htmlFor='password' className='text-sm pt-1 mb-1'>
              Your Password:
            </label>
            <div className='relative'>
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => {
                  setPassword(e.target.value)
                }}
                className='rounded-md p-2 w-full border bg-transparent text-sm focus:ring-1 focus:ring-blue-500 focus:text-sm'
                placeholder='*****'
                disabled={loading}
              />
              {showPassword ? (
                <EyeOff
                  className='absolute top-2 right-2 text-gray-500 cursor-pointer'
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className='absolute top-2 right-2 text-gray-500 cursor-pointer'
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            {passwordError && (
              <div className='text-xs ms-1 mt-1 text-red-500'>
                Password is required!
              </div>
            )}
          </div>
          <div className='flex justify-between mb-5'>
            <div className='flex'>
              <input
                className='me-2'
                id='remMe'
                value={remMe}
                type='checkbox'
              />
              <label htmlFor='remMe' className='text-sm'>
                Remember Me
              </label>
            </div>
            <div>
              <a
                href='/forgot-password'
                className='text-sm text-blue-700 hover:underline'
              >
                Lost Password?
              </a>
            </div>
          </div>
          <div>
            <div className='flex justify-center'>
              {error && (
                <div className='text-red-500 text-sm mb-2'>{error}</div>
              )}
            </div>
            <div className='flex justify-center'>
              {success && (
                <div className='text-green-500 text-sm mb-2'>{success}</div>
              )}
            </div>
            <button
              type='button'
              id='submit'
              variant='destructive'
              onClick={logUserInput}
              className='bg-red-500 text-sm w-full rounded-md py-2 text-white font-semibold focus:ring-2 focus:ring-red-300 hover:bg-red-700'
            >
              {loading ? 'Validating...' : 'LOGIN'}
            </button>
          </div>
          <div className='flex justify-center space-x-1'>
            <h6 className='text-sm'>Not a Member?</h6>{' '}
            <a
              className='text-sm text-blue-700 hover:underline'
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
