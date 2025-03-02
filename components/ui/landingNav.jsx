'use client'

import React from 'react'
import UserAvatar from '@/components/ui/user-avatar'
import Image from 'next/image'

export default function LandingNav () {
    return (
        <div className='flex justify-between items-center bg-gradient-to-r from-blue-400 to-teal-400 p-1 text-foreground rounded-sm'>
            <div className='flex px-2 justify-between items-center gap-2'>
                <Image
                    src={require('@/public/movieHubLogo.png')}
                    alt='Logo'
                    width={30}
                    height={30}
                />
                <div className='font-bold font-sans'>Movie Hub</div>
            </div>
            <div className='flex items-center gap-4'>
                <input
                    type='text'
                    placeholder='Search Movies...'
                    className='px-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <UserAvatar />
            </div>
        </div>
    )
}
