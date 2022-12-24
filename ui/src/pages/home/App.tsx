import { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { Typography } from "../../components/Typography"

export default function App() {
  // This is an example for using access token
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  useEffect(() => {
    if (!isAuthenticated) return
    getAccessTokenSilently({
      audience: `https://${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/`,
    }).then((tok) => {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/got-here`, {
        headers: {
          Authorization: `Bearer ${tok}`,
        },
      }).then((res) => res.json().then(console.log))
    })
  }, [getAccessTokenSilently, isAuthenticated])

  return (
    <Typography>
      <h1>Home Page</h1>
    </Typography>
  )
}
