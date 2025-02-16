import dbConnection from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const mongo = await dbConnection();
    const db = mongo.db("sample_mflix");
    const movies = await db
    .collection('newMovies')
    .find({})
    .sort({})
    .limit(20)
    .toArray();

    return NextResponse.json({
      message: 'success',
      body: movies
    })
  } catch (error) {
    return NextResponse.json({
      message: 'Internal Server Error',
      status: 500
    })
  }
}
