import { Request, Response, NextFunction } from "express"

export const gotHere = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("got here")
  response.status(200).json("got here")
}
