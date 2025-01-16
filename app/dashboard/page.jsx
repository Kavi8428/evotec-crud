import React from 'react'
import { getMovies } from '../../lib/apis/server'
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
  import { FaImdb } from "react-icons/fa";
  import { CiTimer } from "react-icons/ci";

  
  export default async function dashboard() {
    const { body } = await getMovies();
    return (
      <div className='flex flex-col min-h-screen'>
        {/* Fixed navbar with high z-index */}
        <nav className='bg-black fixed w-full h-16 flex justify-between items-center px-5 transition-all duration-500 ease-in-out z-50'>
          <div className='text-white font-bold transform hover:scale-110 transition-transform duration-300 cursor-pointer'>
            Dashboard
          </div>
          <div className='flex items-center'>
            <div>
                <input type='search' id='movieSearch' placeholder='search movies' className=' border-2 rounded-md mr-3 pl-1  '></input>
            </div>
            <div className='text-white ml-1 mr-5 transform hover:scale-110 transition-transform duration-300 cursor-pointer'>
              Home
            </div>
            <div className='text-white mr-5 transform hover:scale-110 transition-transform duration-300 cursor-pointer'>
              About
            </div>
            <div className='text-white mr-5 transform hover:scale-110 transition-transform duration-300 cursor-pointer'>
              Services
            </div>
            <div className='text-white mr-5 transform hover:scale-110 transition-transform duration-300 cursor-pointer'>
              Contact
            </div>
          </div>
        </nav>
        
        {/* Main content with padding-top to account for fixed navbar */}
        <main className='flex-1 pt-16'>
          <div className='text-white sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid gap-8 p-5'>
            {body?.length &&
              body.map(movie => {
               // console.log(movie)
                return (
                  <div key={movie._id} className='relative group'>
                    <Card className="bg-gradient-to-b from-black/90 to-black border-0 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
                      
                      <div className="relative aspect-[3/4]">
                        {movie?.poster && (
                          <Image 
                            src={movie.poster} 
                            alt={movie?.title} 
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
  
                      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 space-y-2">
                        <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                          {movie?.title}<i>{`(${movie?.year??"N/A"})`}</i> 
                        </CardTitle>
  
                        <div className="flex items-center gap-1 w-full text-sm text-gray-400">
                        <FaImdb />
                          <span title='IMDB Rating' >{movie?.imdb?.rating?.toFixed(1) || 'PG-13'}</span>
                          <CiTimer />
                          <span title='Run Time' >{(movie?.runtime / 60).toFixed(1) + ' hrs' || '2h 49min'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <span>#{movie?.genres.join('/') || 'Adventure, Drama'}</span>
                        </div>
  
                        <CardDescription className="text-gray-300 line-clamp-3">
                          {movie?.plot}
                        </CardDescription>
  
                        <div className="flex items-center gap-4">
                          <Button 
                            variant="outline" 
                            className="bg-red-500/10 border-red-500/50  text-white flex items-center gap-2"
                          >
                            <Play className="w-4 h-4" /> WATCH TRAILER
                          </Button>
                          
                          <div className="flex items-center gap-4 ml-auto">
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-black">
                              <Bookmark className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-black">
                              <Share2 className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                )
              })}
          </div>
        </main>
      </div>
    )
  }