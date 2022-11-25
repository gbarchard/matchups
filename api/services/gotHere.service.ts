import { collections } from "./database.service"

export async function gotHereService() {
  const gotHereCollection = await collections.got_here.find().toArray()

  return gotHereCollection[0].got_here
}
