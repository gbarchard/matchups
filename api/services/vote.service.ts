import { WithId } from "mongodb"
import { collections } from "./database.service"
import { Vote } from "./types"

export async function getVoteService(
  user_id: string,
  characterIds: [string, string]
) {
  if (characterIds[0] === characterIds[1]) return null
  return await collections.votes?.findOne({
    user_id,
    $and: [
      {
        data: { $elemMatch: { characterId: characterIds[0] } },
      },
      {
        data: { $elemMatch: { characterId: characterIds[1] } },
      },
    ],
  })
}

export async function getVotesByCharacterService(
  user_id: string,
  characterId: string
) {
  return await collections.votes
    ?.find({
      user_id,
      data: { $elemMatch: { characterId } },
    })
    .toArray()
}

export async function addVoteService(vote: Vote) {
  return collections.votes?.insertOne(vote)
}

export async function updateVoteService(vote: WithId<Vote>) {
  const { _id, data } = vote
  return collections.votes?.updateOne({ _id }, { $set: { data } })
}

export async function getAllVotesService() {
  return collections.votes?.find().toArray()
}
