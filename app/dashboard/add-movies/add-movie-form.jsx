'use client'

import { useState } from 'react'
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { GENRE_OPTIONS, RATING_OPTIONS } from '@/lib/constants'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { InsertMovie } from '@/lib/actions/movie'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  director: z.string().min(1, 'Director is required'),
  year: z.string().regex(/^\d{4}$/, 'Year must be a 4-digit number'),
  genres: z
    .array(z.string())
    .min(1, 'Select at least one genre')
    .max(4, 'Select up to 4 genres'),
  plot: z.string().min(1, 'Enter at least a sentence for the plot'),
  poster: z.any().optional(),
  rating: z.string().min(1, 'Rating is required')
})

export default function AddMovieForm () {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')
  const router = useRouter() // Move useRouter here, inside the component body

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      director: '',
      year: '',
      genres: [],
      plot: '',
      poster: '',
      rating: '',
      runtime: ''
    }
  })

  function onSubmit (values) {
    setMessage('')
    startTransition(async () => {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value)
      })
  
      let title = formData.get('title')
      let director = formData.get('director')
      let year = formData.get('year')
      let genres = formData.get('genres').split(',')
      let plot = formData.get('plot')
      let poster = formData.get('poster')
      let rating = formData.get('rating')
      let runtime = formData.get('runtime')
  
      const response = await InsertMovie({
        title,
        director,
        year,
        genres,
        plot,
        poster,
        rating,
        runtime
      })
  
      if (response && response.insertedId) {
        setMessage('Movie added successfully')
        router.push('/dashboard/movies') // Redirect to the movies page after adding a movie
      } else {
        setMessage('Failed to add movie')
      }
      console.log(response) // Debugging line to check the response
    })
  }

  return (
    <div className='flex flex-col items-center justify-center  h-full'>
      <Card className=' m-1 sm:w-full md:w-full lg:w-5/6 xl:4/6 bg-white text-background '>
        <CardHeader>
          <CardTitle>Add a New Movie</CardTitle>
          <CardDescription>
            Fill out the form below to add a new movie to the database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
              {/* Previous fields remain the same */}
              <div className='grid gap-1 w-full sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Movie Title</FormLabel>
                      <FormControl>
                        <Input
                          className='w-50 sm:w-full md:w-full'
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
                          className='w-50 sm:w-full md:w-full'
                          placeholder="Enter director's name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid gap-1 w-full sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='year'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Release Year</FormLabel>
                      <FormControl>
                        <Input
                          className='w-50 sm:w-full md:w-full '
                          type='text'
                          placeholder='Enter release year (e.g., 2023)'
                          {...field}
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
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid gap-1 w-full sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='runtime'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Runtime</FormLabel>
                      <FormControl>
                        <Input
                          className='w-50 sm:w-full md:w-full '
                          type='number'
                          placeholder='Enter Run Time in Hours'
                          {...field}
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
                          <SelectTrigger className='w-full hover:bg-foreground hover:text-background'>
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
                  <FormItem className='flex flex-col bg-transparent '>
                    <FormLabel>Genres</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'w-full justify-between sm:w-full md:w-ful bg-transparent l',
                              !field.value.length && 'text-muted-foreground'
                            )}
                          >
                            {field.value.length > 0
                              ? field.value.join(', ')
                              : 'Select genres'}
                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-full p-0'>
                        <Command>
                          <CommandInput placeholder='Search genres...' />
                          <CommandList>
                            <CommandEmpty>No genres found.</CommandEmpty>
                            <CommandGroup>
                              {GENRE_OPTIONS.map(genre => (
                                <CommandItem
                                  value={genre}
                                  key={genre}
                                  onSelect={() => {
                                    const currentGenres = field.value
                                    const newGenres = currentGenres.includes(
                                      genre
                                    )
                                      ? currentGenres.filter(g => g !== genre)
                                      : [...currentGenres, genre]

                                    form.setValue('genres', newGenres)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      field.value.includes(genre)
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  {genre}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
                      <Textarea placeholder='Enter movie plot' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-end'>
                <Button
                  variant='destructive'
                  onClick={() => form.reset()}
                  disabled={isPending}
                >
                  Reset Form
                </Button>
                <Button
                  type='submit'
                  disabled={isPending}
                  variant='outline'
                  className='ml-2 text-background bg-foreground hover:bg-green-600'
                >
                  {isPending ? 'Adding...' : 'Add Movie'}
                </Button>
              </div>
            </form>
            {message && (
              <p className='mt-4 justify-center  text-green-600'>{message}</p>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
