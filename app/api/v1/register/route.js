import dbConnection from '@/lib/mongodb'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export const POST = async req => {
  try {
    const { fullName, userName, email, password } = await req.json()

    // Server-side input validation
    if (!fullName || !userName || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check existing user
    const mongo = await dbConnection()
    const db = mongo.db('sample_mflix')
    const existingUser = await db.collection('users').findOne({ email })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User Already Exists' },
        { status: 409 }
      )
    }

    // Password hashing
    const hashedPword = await bcrypt.hash(password, 10)

    // Optional: Store the new user in the database (if required)
    const dbResponse = await db
      .collection('users')
      .insertOne({ fullName, userName, email, password: hashedPword })

    if (dbResponse && dbResponse.acknowledged) {
      return NextResponse.json({
        success: true,
        user: {
          _id: dbResponse.insertedId,
          userName: userName,
          email: email
        }
      })
    } 
    // Respond with success message
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    )
  }
}
