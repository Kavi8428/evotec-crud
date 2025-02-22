'use client'

import {
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LogOut, LogIn } from 'lucide-react';
import { useSession,signOut} from '@/lib/auth-client'
import { User } from 'lucide-react'
import { Settings } from 'lucide-react'
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'
import { redirect } from 'next/navigation';

export default function UserAvatar () {
  const { data: session } = useSession();



  const HandleLogout = async ()=>{
    // console.log('logging out') 
    redirect('/dashboard');
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='text-white' asChild>
        <Button
          variant='ghost'
          className='relative border rounded-full h-8 w-8 '
        >
          <Avatar className='h-8 w-8 border-2 border-blue-400 '>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount='true'>
   
     

        <DropdownMenuItem onClick={HandleLogout} >
            <LogIn  />
            Sign in to Dashboard
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
