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
      <Card className='bg-foreground'>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <CardTitle className='text-background'>Movies Management</CardTitle>
            <CardTitle className='text-background'>
              <a href='/ ' className='text-primary'>
                Public View
              </a>
              </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className='flex justify-center text-background  gap-2 '>
                <Loader className=' animate-spin duration-2000' />
                Fetching...
              </div>
            }
          >
            <MovieData />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
