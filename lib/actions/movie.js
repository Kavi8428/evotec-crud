"use server";

import dbConnection from "@/lib/mongodb";



export const InsertMovie = async (movie) => {
   try{
    const client = await dbConnection(); 
    const movies = client.db('sample_mflix').collection("newMovies");
    const response = await movies.insertOne(movie);
    console.log(response);

    return { acknowledged: response.acknowledged, insertedId: response.insertedId.toString() };

   }catch(error){
       console.log(error)
   }    
}

