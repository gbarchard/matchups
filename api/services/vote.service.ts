import { collections } from "./database.service"
import { Vote } from "./types"

export async function getVoteService(
  user_id: string,
  characterIds: [string, string]
) {
  return await collections.votes.findOne({
    user_id,
    $or: [
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
    .find({
      user_id,
      data: { $elemMatch: { characterId } },
    })
    .toArray()
}

export async function setVoteService(vote: Vote) {
  const { user_id, data } = vote
  const existingVote = await getVoteService(user_id, [
    data[0].characterId,
    data[1].characterId,
  ])

  if (!existingVote) {
    return collections.votes.insertOne({ user_id, data })
  }

  return collections.votes.updateOne(
    { _id: existingVote._id },
    { $set: { data } }
  )
}
