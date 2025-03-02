import React from 'react'
import {SidebarTrigger } from '@/components/ui/sidebar'
import UserAvatar from './user-avatar'

export default function NavBar() {
  return (
    <div  className='sticky top-0 z-50 flex h-16 items-center overflow-hidden justify-between gap-5 px-6 bg-foreground border-b shadow-sm' >
      <div className='flex justify-between items-center text-background'>
              <SidebarTrigger />
              <div className='font-bold'>Dashboard</div>
            </div>
            <div className='flex items-center justify-end'>
              <div>
                <input
                  type='search'
                  id='movieSearch'
                  placeholder='search movies'
                  className='border-2 rounded-md mr-3 pl-1'
                />
              </div>
              <UserAvatar />
            </div>
    </div>
  )
}
