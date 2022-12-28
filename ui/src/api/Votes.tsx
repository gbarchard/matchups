import { useAuth0 } from "@auth0/auth0-react"
import { useCallback } from "react"
import { useAccessToken } from "./AccessToken"

export function useUpdateVote() {
  const token = useAccessToken()
  const { user } = useAuth0()

  const updateVote = useCallback(
    (asId: string, againstId: string, value: number) => {
      if (!user?.sub || !token) return
      const vote = {
        user_id: user.sub,
        data: [
          { characterId: asId, value: value },
          {
            characterId: againstId,
            value: 100 - value,
          },
        ],
      }

      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/update-vote`, {
        method: "POST",
        body: JSON.stringify(vote),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    },
    [token, user]
  )

  return updateVote
}
