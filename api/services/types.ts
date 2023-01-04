import { Collection } from "mongodb"

export type AppCollections = {
  got_here?: Collection<GotHere>
  votes?: Collection<Vote>
  scores?: Collection<Scores>
}

interface GotHere {
  got_here: string
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
