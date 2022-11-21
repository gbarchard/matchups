import * as mongoDB from "mongodb"

export const collections: { got_here?: mongoDB.Collection } = {}

export async function connectToDatabase() {
  /** @todo store this somewhere else */
  const client = new mongoDB.MongoClient("mongodb://localhost:27017")

  await client.connect()

  /** @todo store this somewhere else */
  const db: mongoDB.Db = client.db("test")

  collections.got_here = db.collection("got_here")

  console.log(`Successfully connected to database: ${db.databaseName}`)
}
