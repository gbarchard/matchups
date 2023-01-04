import cors from "cors"
import * as dotenv from "dotenv"
import express, {
  type Handler,
  type NextFunction,
  type Request,
  type Response,
} from "express"
import { auth } from "express-oauth2-jwt-bearer"
import {
  characters,
  getMatchupContent,
  setVote,
  getCharacterContent,
  getTotalScores,
} from "./api"
import { setScoresFromVotes } from "./api/votes"
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

/**
 * Adds middleware unless a route is included in the whitelist
 * @param whiteList The list of routes that do not required the middleware
 * @param middleware The type of middleware to apply to all routes in the whitelist
 * @returns An Express Handler that either includes the middelware or not depending on if the route is in the whitelist
 */
function unless(whiteList: string[], middleware: Handler): Handler {
  return (req: Request, res: Response, next: NextFunction) => {
    const pathCheck = whiteList.some((path) => path === req.path)
    pathCheck ? next() : middleware(req, res, next)
  }
}

const JWT_WHITE_LIST = [
  "/api/characters",
  "/api/character-content",
  "/api/matchup-content",
  "/api/total-scores",
]

app.use(unless(JWT_WHITE_LIST, checkJwt))

app.get("/api/characters", characters)
app.post("/api/update-vote", setVote)
app.post("/api/matchup-content", getMatchupContent)
app.post("/api/character-content", getCharacterContent)
app.post("/api/total-scores", getTotalScores)
app.get("/api/calculate-scores", setScoresFromVotes)

connectToDatabase()
