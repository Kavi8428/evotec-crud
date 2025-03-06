import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import React, { Suspense } from 'react'
import { UserData } from './user-data'
import { Loader } from 'lucide-react'

export default function Users () {
  return (
    <div className=' p-4 text-foreground '>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
        <Suspense fallback={
            <div className='flex justify-center text-background  gap-2 ' >
              <Loader className=' animate-spin duration-2000' /> 
                Fetching...
            </div>
          } >
          <UserData />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
