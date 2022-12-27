import { useEffect, useState } from "react"
import { useAccessToken } from "./AccessToken"

/**
 * Test api that hits a simple end point and returns a string
 */
export function useGotHereFetcher() {
  const token = useAccessToken()
  const [res, setRes] = useState<string>()

  useEffect(() => {
    if (!token) return
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/got-here`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json().then(setRes))
  }, [token])

  return res
}
