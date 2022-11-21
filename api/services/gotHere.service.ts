import { Request, Response, NextFunction } from "express"
import { ObjectId } from "mongodb"
import { collections } from "./database.service"

export async function gotHere(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const gotHereCollection = (await collections.got_here.find().toArray()) as {
    _id: ObjectId
    got_here: string
  }[]

  const res = gotHereCollection[0].got_here

  response.status(200).json(res)
}
