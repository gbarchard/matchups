import { type Request, type Response, type NextFunction } from "express"
import characterData from "../data/characters.json"
import { Vote } from "../services/types"
import {
  addVoteService,
  getVotesByCharacterService,
  getVoteService,
  updateVoteService,
} from "../services/vote.service"
import {
  addScoreService,
  getScoresService,
  updateScoreService,
} from "../services/scores.service"

export async function setVote(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const vote: Vote = request.body
  const ids = [vote.data[0].characterId, vote.data[1].characterId]
  if (ids[0] === ids[1]) return response.status(204)

  const existingVote = await getVoteService(vote.user_id, [
    vote.data[0].characterId,
    vote.data[1].characterId,
  ])

  if (!existingVote) {
    await addVoteService(vote)
    await addScoreService(vote)
    return response.status(200).json(true)
  }

  await updateVoteService({
    _id: existingVote._id,
    data: vote.data,
    user_id: vote.user_id,
  })
  await updateScoreService(existingVote, vote)
  return response.status(200).json(true)
}

export async function getMatchupContent(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { characterIds, userId } = request.body
  if (!characterIds) return response.status(204).end()
  const [asId, againstId] = characterIds
  if (asId === againstId) return response.status(200).json(50)

  const scores = await getScoresService()

  const matchup = scores[asId]?.[againstId]
  if (!matchup) return response.status(204)

  const average = matchup.total / matchup.count

  const vote = await getVoteService(userId, characterIds)

  const output = {
    average,
    vote,
  }

  response.status(200).json(output)
}

export async function getCharacterContent(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { characterId, userId } = request.body as {
    characterId: string
    userId: string
  }

  const averages: { [key: string]: { average: number; count: number } } = {}
  const scores = await getScoresService()
  const votes = await getVotesByCharacterService(userId, characterId)

  for (const character in scores[characterId]) {
    const { count, total } = scores[characterId][character]
    averages[character] = {
      average: total / count,
      count,
    }
  }

  const sortedCharacters: {
    id: string
    value?: number
    tier?: string
    vote?: number
    count?: number
  }[] = Object.keys(averages)
    .map((againstId) => {
      const { average, count } = averages[againstId]
      return {
        id: againstId,
        value: Math.round(average),
        tier: getMatchupTierByValue(average),
        vote: getVoteValue(votes, againstId),
        count,
      }
    })
    .sort((a, b) => (a.value < b.value ? 1 : -1))

  characterData.forEach((character) => {
    if (!(character.id in averages)) {
      sortedCharacters.push({ id: character.id })
    }
  })

  response.status(200).json(sortedCharacters)
}

function getMatchupTierByValue(value: number) {
  if (value < 25) return "-3"
  if (value < 35) return "-2"
  if (value < 45) return "-1"
  if (value < 55) return "±0"
  if (value < 65) return "+1"
  if (value < 75) return "+2"
  return "+3"
}

function getVoteValue(votes: Vote[], characterId: string) {
  return (
    votes.find((v) => v.data[0].characterId === characterId)?.data[1].value ??
    votes.find((v) => v.data[1].characterId === characterId)?.data[0].value
  )
}

export async function getTotalScores(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const scores = await getScoresService()

  delete scores._id

  const averageMap: { [key: string]: number } = {}
  for (const character in scores) {
    const averages: number[] = []
    for (const votes in scores[character]) {
      const { count, total } = scores[character][votes]
      averages.push(total / count)
    }
    averageMap[character] =
      averages.reduce((a, b) => a + b, 0) /
      Object.keys(scores[character]).length
  }

  const sortedTierList: { id: string; value?: number; tier?: string }[] =
    Object.keys(averageMap)
      .map((characterId) => {
        const value = averageMap[characterId]
        return {
          id: characterId,
          value: Math.round(value),
          tier: getTierByValue(value),
        }
      })
      .sort((a, b) => (a.value < b.value ? 1 : -1))

  characterData.forEach((character) => {
    if (!(character.id in averageMap)) {
      sortedTierList.push({ id: character.id })
    }
  })

  response.status(200).json(sortedTierList)
}

function getTierByValue(value: number) {
  if (value < 35) return "C"
  if (value < 45) return "B"
  if (value < 55) return "A"
  if (value < 65) return "S"
  return "S+"
}
