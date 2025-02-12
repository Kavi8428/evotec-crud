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

const GENRE_OPTIONS = [
  'Action',
  'Comedy',
  'Drama',
  'Science Fiction',
  'Horror',
  'Romance',
  'Thriller',
  'Documentary',
  'Animation'
]

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  director: z.string().min(1, 'Director is required'),
  year: z.string().regex(/^\d{4}$/, 'Year must be a 4-digit number'),
  genres: z.array(z.string()).min(1, 'Select at least one genre').max(5, 'Select up to 5 genres'),
  plot: z.string().min(1, 'Enter at least a sentence for the plot'),
  banner: z.any().optional()
})

export default function AddMovieForm () {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      director: '',
      year: '',
      genres: [],
      plot: '',
      banner: ''
    }
  })

  function onSubmit (values) {
    setMessage('')
    startTransition(async () => {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        console.log(`Key: ${key}, Value: ${value}`); // Debugging line
        if (key === 'genres') {
          // Join genres into a string for submission
          formData.append(key, value.join(', '))
        } else {
          formData.append(key, value)
        }
      })

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      // Placeholder for your actual submission logic
      // const result = await InsertM
      // if (result.success) { ... }
    })
  }

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <Card className='w-1/2 m-1'>
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
                  name='banner'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Banner</FormLabel>
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

              <FormField
                control={form.control}
                name='genres'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Genres</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'w-full justify-between sm:w-full md:w-full',
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
              <Button type='submit' disabled={isPending}>
                {isPending ? 'Adding...' : 'Add Movie'}
              </Button>
            </form>
            {message && <p className='mt-4 text-green-600'>{message}</p>}
          </Form>
        </CardContent>
        <CardFooter>
          <p>Ensure all fields are filled correctly before submitting.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
