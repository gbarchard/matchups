import express from "express"
import cors from "cors"
import { gotHere } from "./services/gotHere.service"
import { connectToDatabase } from "./services/database.service"

const app = express()
const port = process.env.port || 9000

app.use(cors())

app.listen(port, () => {
  console.log(`Node api is running on port ${port}.`)
})

app.get("/got-here", gotHere)

connectToDatabase()
