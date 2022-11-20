import express from "express"
import { gotHere } from "./test"

const app = express()
const port = 3001

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`)
})

app.get("/got-here", gotHere)
