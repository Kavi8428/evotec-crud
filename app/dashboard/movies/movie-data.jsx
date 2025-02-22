import React from 'react'
import { getMovies } from "@/lib/apis/server"


export default async function MovieData() {
    const fetchedMovies = await getMovies();
    console.log('fetchedMovies',fetchedMovies);
  return (
    <div>
        <h2>Movie data fetched success</h2>
    </div>
  )
}
