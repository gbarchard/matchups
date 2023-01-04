import { Collection, MongoClient, Document } from "mongodb"
import { AppCollections } from "./types"

export const collections: AppCollections = {}

export async function connectToDatabase() {
  if (!process.env.MONGO_URL) {
    throw new Error("Missing MONGO_URL")
  }
  const client = new MongoClient(process.env.MONGO_URL)

  await client.connect()

  const db = client.db(process.env.MONGO_DB)

  ;(await db.collections()).forEach(
    (c) =>
      ((collections[
        c.collectionName as keyof AppCollections
      ] as Collection<Document>) = c)
  )

  console.log(`Successfully connected to database: ${db.databaseName}`)
}
