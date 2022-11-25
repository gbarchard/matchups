import { Collection } from "mongodb"

export type AppCollections = {
  got_here?: Collection<GotHere>
}

interface GotHere {
  got_here: string
}
