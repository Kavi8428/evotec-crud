'use server'

import { db } from '@/lib/mongodb'

export const FetchUsers = async () => {
  try {
    const users = db.collection('user')
    const response = await users
      .find({})
      .sort({})
      .limit(20)
      .toArray()

    // console.log('response', response)
    return response.map((user) => {
      const { _id, name, email, emailVerified, createdAt } = user
      return {
        _id: _id.toString(),
        name,
        email,
        emailVerified,
        createdAt: createdAt.toISOString()
      }
    })
  
  } catch (error) {
    console.error('Error fetching users:', error)
    return {
      success: false,
      error: 'Failed to fetch users. Please try again later.'
    }
  }
}
