import { MongoClient } from "mongodb";

export default function dbConnection() {
    const url = process.env.DATABASE_URI;
    const options = {};

    if (!url) {
        throw new Error('Invalid/missing environment variable "DATABASE_URI"');
    }

    const client = new MongoClient(url, options);
    return client.connect();
}
