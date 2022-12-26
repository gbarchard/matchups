import cors from "cors"
import * as dotenv from "dotenv"
import express from "express"
import { auth } from "express-oauth2-jwt-bearer"
import {
  gotHere,
  characters,
  getMatchupAverage,
  getVote,
  getVotes,
  setVote,
  getMatchupAverages,
  getTotalScores,
} from "./api"
import { connectToDatabase } from "./services/database.service"

const app = express()
const port = process.env.port || 9000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dotenv.config()

app.listen(port, () => {
  console.log(`Node api is running on port ${port}.`)
})

const checkJwt = auth({
  audience: `${process.env.AUTH_DOMAIN}.us.auth0.com/api/v2/`,
  issuerBaseURL: `${process.env.AUTH_DOMAIN}.us.auth0.com`,
})

app.get("/api/got-here", checkJwt, gotHere)
app.get("/api/characters", characters)
app.post("/api/vote", getVote)
app.post("/api/update-vote", setVote)
app.post("/api/votes", getVotes)
app.post("/api/average-vote", getMatchupAverage)
app.post("/api/average-votes", getMatchupAverages)
app.post("/api/total-scores", getTotalScores)

connectToDatabase()
