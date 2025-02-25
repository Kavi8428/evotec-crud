import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import React, { Suspense } from 'react'
import MovieData from './movie-data'
import { Loader } from 'lucide-react'

export default function MoviePage () {
  return (
    <div className='text-background container p-4'>
      <Card>
        <CardHeader>
          <CardTitle>Movies Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={
            <div className='flex justify-center gap-2 ' >
              <Loader className=' animate-spin duration-2000' /> 
                Fetching...
            </div>
          } >
            <MovieData />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
