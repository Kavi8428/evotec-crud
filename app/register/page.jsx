// This is for server component
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import {redirect} from 'next/navigation'
import React from 'react'
import RegisterPage from './registerPage'

export default async function register () {
  const session = auth.api.getSession({
     headers : await headers()
  })

  if(session){
    redirect('/dashboard')
  }
  


  return (
    <div className='container w-max'>
      <RegisterPage></RegisterPage>
    </div>
  )
}
