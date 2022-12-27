import { type Request, type Response, type NextFunction } from "express"
import { Vote } from "../services/types"
import characterData from "../data/characters.json"
import {
  getAllVotes,
  getAllVotesByMatchup,
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

export async function getMatchupAverage(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { characterIds } = request.body
  if (!characterIds) return response.status(204).end()
  const [asId, againstId] = characterIds
  if (asId === againstId) return response.status(200).json(50)
  const votes = await getAllVotesByMatchup(characterIds)

  let total = 0

  votes.forEach((vote) => {
    if (vote.data[0].characterId === asId) {
      total += vote.data[0].value
    } else {
      total += vote.data[1].value
    }
  })

  const average = total / votes.length

  response.status(200).json(average)
}

export async function getMatchupAverages(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { characterId } = request.body as { characterId: string }

  const averages: { [key: string]: number } = {}

  for (let i = 0; i < characterData.length; i++) {
    const character = characterData[i]
    const votes = await getAllVotesByMatchup([characterId, character.id])
    let total = 0

    votes.forEach((vote) => {
      if (vote.data[0].characterId === characterId) {
        total += vote.data[0].value
      } else {
        total += vote.data[1].value
      }
    })

    const average = total / votes.length

    if (characterId !== character.id) {
      averages[character.id] = average
    }
  }

  response.status(200).json(averages)
}

export async function getTotalScores(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const votes = await getAllVotes()

  const voteMap: { [key: string]: { [key: string]: number[] } } = {}

  characterData.forEach((character) => {
    voteMap[character.id] = {}
    characterData.forEach((c) => {
      voteMap[character.id][c.id] = []
    })
  })

  votes.forEach((vote) => {
    voteMap[vote.data[0].characterId][vote.data[1].characterId].push(
      vote.data[0].value
    )

    voteMap[vote.data[1].characterId][vote.data[0].characterId].push(
      vote.data[1].value
    )
  })

  let averageMap: { [key: string]: number } = {}
  for (const i in voteMap) {
    const character1 = voteMap[i]
    const averages: number[] = []
    for (const j in character1) {
      const values = character1[j]
      const average = values.reduce((a, b) => a + b, 0) / values.length
      if (average) {
        averages.push(average)
      }
    }
    const score = averages.reduce((a, b) => a + b, 0) / averages.length
    averageMap[i] = score
  }

  response.status(200).json(averageMap)
}
