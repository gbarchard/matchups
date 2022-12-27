export type Character = {
  id: string
  label: string
}

type VoteValue = { characterId: string; value: number }

export type Vote = {
  user_id: string
  data: [VoteValue, VoteValue]
}
