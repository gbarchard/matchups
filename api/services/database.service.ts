import { MongoClient } from "mongodb"
import { AppCollections } from "./types"

export const collections: AppCollections = {}

export async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGO_URL)

  await client.connect()

  const db = client.db(process.env.MONGO_DB)

  ;(await db.collections()).forEach((c) => (collections[c.collectionName] = c))

  console.log(`Successfully connected to database: ${db.databaseName}`)
}
