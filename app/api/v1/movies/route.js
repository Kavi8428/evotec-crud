import dbConnection from '@/app/libs/mongodb'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const mongo = await dbConnection(); // access db connection that created on libs folder
    const db = mongo.db("sample_mflix"); // declare the collection sample_mflix that stored in mongoDb
    const movies = await db
    .collection('movies')
    .find({})
    .sort({})
    .limit(10)
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
