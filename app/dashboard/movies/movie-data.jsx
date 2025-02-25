import dbConnection from '@/lib/mongodb'
import React from 'react'
import MovieTable from './movie-table'
import { Button } from '@/components/ui/button'

export default async function MovieData () {
  try {
    const client = await dbConnection()
    const db = client.db('sample_mflix')
    const response = await db
      .collection('newMovies')
      .find({})
      .sort({})
      .limit(20)
      .toArray()

    if (response) {
      const movies = response.map(movie => {
        return {
          _id: movie._id.toString(),
          title: movie.title,
          poster: movie.poster,
          rating: movie.rating,
          director: movie.director,
          year: movie.year,
          genres: movie.genres,
          plot: movie.plot,
          rating: movie.rating,
          runtime: movie.runtime
        }
      })
      if (movies.length > 0) {
        // console.log('movies', movies)
        return <MovieTable movies={movies} />
      } else {
        return (
          <div className='flex flex-col justify-center items-center gap-1 text-red-600'>
            <div>
              <p className='text-lg font-semibold'>No Movies Found</p>
            </div>
            <div className='flex justify-center gap-2 text-green-400'>
              <a href='/dashboard/add-movies'>
                <Button variant='ghost' className='flex items-center gap-1'>
                  Add Movie
                </Button>
              </a>
            </div>
          </div>
        )
      }
    } else {
      return (
        <div className='flex bg-red-600'>
          <h3>No Response received from data base</h3>
        </div>
      )
    }
  } catch (error) {
    console.log('Something went wrong while connecting to the data base', error)
    return (
      <div className='flex flex-col justify-center items-center gap-4 text-red-600'>
      <div>
        <p className='text-lg font-semibold'>Something went wrong: Internal Server Error</p>
      </div>
      <div className='flex flex-col items-center gap-2'>
      <p className='text-md'>Please try the following options to resolve this:</p>
        <ul className='list-disc list-inside  '>
        <li>Check your internet connection</li>
        <li>Refresh the page</li>
        <li>Contact support if the issue persists</li>
        </ul>
      </div>
      </div>
    )
  }
}
