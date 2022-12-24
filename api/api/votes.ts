import { type Request, type Response, type NextFunction } from "express"
import { Vote } from "../services/types"
import {
  getVotesByCharacterService,
  getVoteService,
  setVoteService,
} from "../services/vote.service"

export async function getVote(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id, characterIds } = request.body
  const vote = await getVoteService(user_id, characterIds)
  response.status(200).json(vote)
}

export async function getVotes(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id, characterId } = request.body
  const votes = await getVotesByCharacterService(user_id, characterId)
  return response.status(200).json(votes)
}

export async function setVote(
  request: Request,
  response: Response,
  next: NextFunction
) {
  await setVoteService(request.body as Vote)
  return response.status(200).end()
}
