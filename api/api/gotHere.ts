import { Request, Response, NextFunction } from "express"
import { gotHereService } from "../services/gotHere.service"

export async function gotHere(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const gotHere = await gotHereService()

  response.status(200).json(gotHere)
}
