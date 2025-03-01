'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { GENRE_OPTIONS, RATING_OPTIONS } from '@/lib/constants'
import { InsertMovie, UpdateMovie } from '@/lib/actions/movie'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  director: z.string().min(1, 'Director is required'),
  year: z.number().refine(val => /^\d{4}$/.test(val), 'Year must be a 4-digit number'),
  genres: z
    .array(z.string())
    .min(1, 'Select at least one genre')
    .max(4, 'Select up to 4 genres'),
  plot: z.string().min(1, 'Enter at least a sentence for the plot'),
  poster: z.string().optional(),
  rating: z.string().min(1, 'Rating is required'),
  runtime: z.number().min(1, 'Runtime is required')
})

export default function EditMovieForm({ open, onCancel, movie, onSubmit }) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')
  const [selectedGenres, setSelectedGenres] = useState(movie.genres || [])

  // Normalize movie data to prevent undefined values
  const normalizedMovie = {
    title: movie.title || '',
    director: String(movie.director ?? ''),
    year: movie.year || '',
    genres: movie.genres || [],
    plot: movie.plot || '',
    poster: movie.poster || '',
    rating: movie.rating || '',
    runtime: movie.runtime || ''
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: normalizedMovie
  })

  useEffect(() => {
    setSelectedGenres(movie.genres || [])
    form.reset(normalizedMovie)
  }, [movie, form])

  function onEditSubmit(values) {
    setMessage('')
    startTransition(async () => {
      onSubmit({
        ...movie,
        ...values,
        id: movie._id.toString()
      })
    })
  }

  const handleGenreSelect = genre => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre].slice(0, 4)
    setSelectedGenres(updatedGenres)
    form.setValue('genres', updatedGenres)
  }

  return (
    <div className='h-screen'>
      <Dialog className='text-black' open={open} onOpenChange={onCancel}>
        <DialogContent className='overflow-y-auto max-h-screen'>
          <DialogHeader>
            <DialogTitle className='text-black font-sans'>
              Edit Movie
            </DialogTitle>
          </DialogHeader>
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='m-1 w-full max-w-2xl'>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onEditSubmit)}
                  className='space-y-2 text-gray-500'
                >
                  <div className='grid gap-1 w-full sm:grid-cols-1 md:grid-cols-2'>
                    <FormField
                      control={form.control}
                      name='title'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Movie Title</FormLabel>
                          <FormControl>
                            <Input
                              className='w-full'
                              placeholder='Enter movie title'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='director'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Director</FormLabel>
                          <FormControl>
                            <Input
                              className='w-full'
                              placeholder="Enter director's name"
                              value={field.value ?? ''} // Explicit fallback
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              name={field.name}
                              ref={field.ref}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='grid gap-1 w-full sm:grid-cols-1 md:grid-cols-2'>
                    <FormField
                      control={form.control}
                      name='year'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Release Year</FormLabel>
                          <FormControl>
                            <Input
                              className='w-full'
                              type='number'
                              placeholder='Enter release year (e.g., 2023)'
                              value={field.value ?? ''}
                              onChange={e => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='poster'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Poster</FormLabel>
                          <FormControl>
                            <Input
                              type='text'
                              placeholder='Enter link of image banner'
                              value={field.value ?? ''}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='grid gap-1 w-full sm:grid-cols-1 md:grid-cols-2'>
                    <FormField
                      control={form.control}
                      name='runtime'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Runtime</FormLabel>
                          <FormControl>
                            <Input
                              className='w-full'
                              type='number'
                              placeholder='Enter Run Time in Hours'
                              value={field.value ?? ''}
                              onChange={e => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='rating'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rating</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className='w-full'>
                                <SelectValue placeholder='Select Rating' />
                              </SelectTrigger>
                              <SelectContent>
                                {RATING_OPTIONS.map(rating => (
                                  <SelectItem key={rating} value={rating}>
                                    {rating}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name='genres'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Genres (Select up to 4)</FormLabel>
                        <div className='flex flex-wrap gap-2'>
                          {GENRE_OPTIONS.map(genre => (
                            <Button
                              key={genre}
                              type='button'
                              variant={
                                selectedGenres.includes(genre)
                                  ? 'default'
                                  : 'secondary'
                              }
                              size='sm'
                              onClick={() => handleGenreSelect(genre)}
                              className={cn(
                                'h-8',
                                selectedGenres.includes(genre) &&
                                  'bg-blue-100 text-primary-background'
                              )}
                            >
                              {genre}
                            </Button>
                          ))}
                        </div>
                        <FormDescription className='hidden'>
                          Selected: {selectedGenres.join(', ') || 'None'}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='plot'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plot</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Enter movie plot'
                            value={field.value ?? ''}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='flex justify-end gap-2'>
                    <Button
                      type='button'
                      variant='secondary'
                      onClick={() => {
                        form.reset(normalizedMovie)
                        setSelectedGenres([])
                      }}
                      disabled={isPending}
                    >
                      Reset Form
                    </Button>
                    <Button type='submit' disabled={isPending}>
                      {isPending ? 'Updating...' : 'Update Movie'}
                    </Button>
                  </div>
                </form>
                {message && <p className='mt-4 text-green-600'>{message}</p>}
              </Form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}