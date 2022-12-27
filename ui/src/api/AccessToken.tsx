import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"

export function useAccessToken() {
  const { getAccessTokenSilently } = useAuth0()
  const [token, setToken] = useState<string>()

  useEffect(() => {
    getAccessTokenSilently({
      audience: `https://${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/`,
    }).then((tok) => {
      setToken(tok)
    })
  }, [getAccessTokenSilently])

  return token
}
