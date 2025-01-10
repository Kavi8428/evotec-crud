import { NextResponse } from 'next/server'

const movies = [
  { id: 1, name: 'Avengers' },
  { id: 2, name: 'Transformers' },
  { id: 3, name: 'Inception' },
  { id: 4, name: 'The Dark Knight' },
  { id: 5, name: 'Interstellar' },
  { id: 6, name: 'The Matrix' },
  { id: 7, name: 'Gladiator' },
  { id: 8, name: 'Titanic' },
  { id: 9, name: 'Jurassic Park' },
  { id: 10, name: 'The Lion King' }
]

export const GET = async req => {
  try {
    console.log('Request received')
    let request = {}
    if (req.body) {
      request = await req.json()
      console.log('Parsed request JSON:', request)
    } else {
      console.log('Request body is empty')
    }

    return NextResponse.json({
      message: 'Hello from the Movie endpoint',
      body: movies
    })
  } catch (error) {
    console.error('Error parsing request JSON:', error)
    return NextResponse.json({
      message: 'Internal Server Error',
      status: 500
    })
  }
}
