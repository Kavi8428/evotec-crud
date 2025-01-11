import { MongoClient } from "mongodb";

export default function dbConnection() {
    const url = process.env.NEXT_PUBLIC_DATABASE_URL;
    const options = {};

    if (!url) {
        throw new Error('Invalid/missing environment variable "NEXT_PUBLIC_DATABASE_URL"');
    }

    const client = new MongoClient(url, options);
    return client.connect();
}
