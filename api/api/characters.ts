import { type Request, type Response, type NextFunction } from "express"
import characterData from "../data/characters.json"
export async function characters(
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.status(200).json(characterData)
}
