import React from 'react'
import { getMovies } from '@/lib/apis/server'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Share2, Bookmark, Play } from 'lucide-react'
import { FaImdb } from 'react-icons/fa'
import { CiTimer } from 'react-icons/ci'
import LandingNav from "@/components/ui/landingNav";

export default async function dashboard () {
  const { body } = await getMovies()
  return (
    <div className='flex flex-col min-h-screen w-full '>
      <header className='p-2 sm:px-8 md:px-2 lg:px-52 xl:px-52 sticky top-0 z-50' >
        <LandingNav />
      </header>
      {/* Main content with padding-top to account for fixed navbar */}
      <div className='text-white sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid gap-8 p-5'>
        {body?.length &&
          body.map(movie => {
            // console.log(movie)
            return (
              <div key={movie._id} className='relative group'>
                <Card className='bg-gradient-to-b from-black/90 to-black border-0 overflow-hidden'>
                  <div className='absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10' />

                  <div className='relative aspect-[3/4]'>
                    {movie?.poster && (
                      <Image
                        src={movie.poster}
                        alt={movie?.title}
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        priority
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                    )}
                  </div>

                  <div className='absolute bottom-0 left-0 right-0 z-20 p-6 space-y-2'>
                    <CardTitle className='text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent'>
                      {movie?.title}
                      <i>{`(${movie?.year ?? 'N/A'})`}</i>
                    </CardTitle>

                    <div className='flex items-center gap-1 w-full text-sm text-gray-400'>
                      <FaImdb />
                      <span title='IMDB Rating'>
                        {movie?.imdb?.rating?.toFixed(1) || 'PG-13'}
                      </span>
                      <CiTimer />
                      <span title='Run Time'>
                        {(movie?.runtime / 60).toFixed(1) + ' hrs' ||
                          '2h 49min'}
                      </span>
                    </div>
                    <div className='flex items-center gap-1 text-sm text-gray-400'>
                      <span>
                        #{movie?.genres.join('/') || 'Adventure, Drama'}
                      </span>
                    </div>

                    <CardDescription className='text-gray-300 line-clamp-3'>
                      {movie?.plot}
                    </CardDescription>

                    <div className='flex justify-between items-center gap-1'>
                      <Button
                        variant='outline'
                        className='bg-red-500/10 border-red-500/50  text-white flex items-center gap-2'
                      >
                        <Play className='w-4 h-4' /> WATCH TRAILER
                      </Button>

                      <Button
                        variant='ghost'
                        size='icon'
                        className='text-gray-400 hover:text-black'
                      >
                        <Bookmark className='w-5 h-5' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='text-gray-400 hover:text-black'
                      >
                        <Share2 className='w-5 h-5' />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )
          })}
      </div>
    </div>
  )
}
