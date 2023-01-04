import { ObjectId } from "mongodb"
import { collections } from "./database.service"
import { Scores, Vote } from "./types"

export async function getScoresService() {
  return await collections.scores.findOne()
}

export async function addScoreService(vote: Vote) {
  const scores = await getScoresService()
  const ids = [vote.data[0].characterId, vote.data[1].characterId]
  const values = [vote.data[0].value, vote.data[1].value]

  if (!scores[ids[0]]) {
    scores[ids[0]] = {}
  }
  if (!scores[ids[0]][ids[1]]) {
    scores[ids[0]][ids[1]] = { count: 0, total: 0 }
  }
  scores[ids[0]][ids[1]].count++
  scores[ids[0]][ids[1]].total += values[0]

  if (!scores[ids[1]]) {
    scores[ids[1]] = {}
  }
  if (!scores[ids[1]][ids[0]]) {
    scores[ids[1]][ids[0]] = { count: 0, total: 0 }
  }
  scores[ids[1]][ids[0]].count++
  scores[ids[1]][ids[0]].total += values[1]

  return collections.scores.findOneAndReplace({ _id: scores._id }, scores)
}

export async function updateScoreService(previousVote: Vote, newVote: Vote) {
  const scores = await getScoresService()
  const ids = [newVote.data[0].characterId, newVote.data[1].characterId]
  const previousValues = [
    previousVote.data[0].value,
    previousVote.data[1].value,
  ]
  const newValues = [newVote.data[0].value, newVote.data[1].value]

  scores[ids[0]][ids[1]].total += newValues[0] - previousValues[0]
  scores[ids[1]][ids[0]].total += newValues[1] - previousValues[1]

  return collections.scores.findOneAndReplace({ _id: scores._id }, scores)
}

export async function replaceScoresService(id: ObjectId, scores: Scores) {
  return collections.scores.findOneAndReplace({ _id: id }, scores)
}
