'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import EditMovieForm from './edit-movie-form'
import { UpdateMovie } from '@/lib/actions/movie'
import { useRouter } from 'next/navigation'

export default function MovieTable({ movies }) {
  const [editingMovie, setEditingMovie] = useState(null)
  const router = useRouter() // Move useRouter here, inside the component body

  const HandleEdit = movie => {
    setEditingMovie(movie)
  }

  const HandleEditSubmit = movie => {
    // No useRouter here, use the router from the component scope
    const { _id: id, title, year, rating, genres, plot, runtime, director, poster } = movie

    const response = UpdateMovie({
      id,
      title,
      director,
      year,
      genres,
      plot,
      poster,
      rating,
      runtime
    })

    console.log('response', response)
    router.refresh() // Use the router instance from the component
    setEditingMovie(null) // Close the edit form after submission
  }

  const HandleDelete = movie => {
    // Implement delete logic here if needed
    console.log('delete movie', movie)
  }

  return (
    <div>
      <Table>
        <TableHeader className='sticky top-0 bg-white z-10'>
          <TableRow className='font-bold'>
            <TableHead># Cover</TableHead>
            <TableHead>Movie Title</TableHead>
            <TableHead>Movie Year</TableHead>
            <TableHead>Rated</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead className='text-center'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.map((movie, index) => (
            <TableRow className='h-20  ' key={`${movie._id}-${index}`}>
              <TableCell className='w-20'> 
                <Image
                  src={movie.poster}
                  width={100}
                  height={150}
                  alt='Picture of the movie'
                  style={{ width: 'auto', height: 'auto' }}
                  priority={true}
                />
              </TableCell>
              <TableCell>{movie.title ?? 'N/A'}</TableCell>
              <TableCell>{movie.year ?? 'N/A'}</TableCell>
              <TableCell>{movie.rating ?? 'N/A'}</TableCell>
              <TableCell>{movie.genres.toString() ?? 'N/A'}</TableCell>
              <TableCell>
                <div className='flex justify-center space-x-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => HandleEdit(movie)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => HandleDelete(movie)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingMovie && (
        <EditMovieForm
          movie={editingMovie}
          open={true}
          onSubmit={HandleEditSubmit}
          onCancel={() => setEditingMovie(null)}
        />
      )}
    </div>
  )
}