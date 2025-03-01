'use server'

import { db } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export const InsertMovie = async movie => {
  try {
    const movies = db.collection('newMovies')
    const response = await movies.insertOne(movie)
    console.log(response)

    return {
      acknowledged: response.acknowledged,
      insertedId: response.insertedId.toString()
    }
  } catch (error) {
    console.log(error)
  }
}

export const UpdateMovie = async movie => {
  try {
    const movies = db.collection('newMovies')
  
    const movieId = new ObjectId(movie.id)
    if (movieId && movie) {
      const response = await movies.updateOne(
        { _id: movieId},
        { $set: movie },
        { upsert: true }
      )
      console.log(`Inserted ID : ${response.upsertedId}`)
      return {
        acknowledged: response.acknowledged,
        modifiedCount: response.modifiedCount
      }
    } else {
      return {
        success: false,
        massage: 'Movie not received correctly',
        receivedData: movie
      }
    }
  } catch (e) {
    return {
      success: false,
      massage: 'Internal Server Error',
      error: e
    }
  }
}
