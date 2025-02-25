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

export default function MovieTable ({ movies }) {
  const [editingMovie, setEditingMovie] = useState(null)
  const [deletingMovie, setDeletingMovie] = useState(null)

  const HandleEdit = movie => {
    // console.log('edit movies', movie);
    setEditingMovie(movie)
  }

  const HandleDelete = movie => {
    // console.log('delete movie', movie);
    setDeletingMovie(movie)
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
          {movies.map(movie => (
            <TableRow className='h-20' key={movie._id}>
              <TableCell>
                <Image
                  src={movie.poster}
                  width={50}
                  height={100}
                  alt='Picture of the movie'
                  className='h-full'
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
                    onClick={() => {
                      HandleEdit(movie)
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => {
                      HandleDelete(movie)
                    }}
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
           <EditMovieForm open={true} onCancel ={()=>{
              setEditingMovie(null);
           }}  />
      )}
    </div>
  )
}
