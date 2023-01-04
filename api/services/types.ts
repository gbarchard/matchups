import { Collection } from "mongodb"

export type AppCollections = {
  votes?: Collection<Vote>
  scores?: Collection<Scores>
}

type VoteValue = { characterId: string; value: number }

export interface Vote {
  user_id: string
  data: [VoteValue, VoteValue]
}

export type Scores = {
  [key: string]: {
    [key: string]: {
      total: number
      count: number
    }
  }
}
