import { MongoClient } from 'mongodb'

const OPTION = {}
const MONGO_URI = process.env.DATABASE_URI

const client = new MongoClient(MONGO_URI, OPTION)

export const db = client.db('sample_mflix');

export function dbConnection () {
  if (!url) {
    throw new Error('Invalid/missing environment variable "DATABASE_URI"')
  }

  const client = new MongoClient(MONGO_URI, OPTION)
  return client.connect()
}
