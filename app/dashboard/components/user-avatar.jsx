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
import { LogOut } from 'lucide-react';
import { useSession,signOut} from '@/lib/auth-client'
import { User } from 'lucide-react'
import { Settings } from 'lucide-react'
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'
import { redirect } from 'next/navigation';

export default function UserAvatar () {
  const { data: session } = useSession();



  const HandleLogout = async ()=>{
    console.log('logging out') 
    await signOut({
        fetchOptions : {
            onSuccess :()=>{
              redirect('/login');
            }

        }
    })
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
        <DropdownMenuLabel>
          <div className=' flex flex-col'>
            <div className=' font-bold'>{session?.user.name.toUpperCase()}</div>
            <p className='text-muted font-normal text-xs'>
              {session?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={HandleLogout} >
            <LogOut />
            Sign Out
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
