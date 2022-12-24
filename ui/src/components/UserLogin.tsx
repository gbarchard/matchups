import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "flowbite-react"

export default function UserLogin() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0()

  if (isAuthenticated) {
    return (
      <Button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </Button>
    )
  }

  return (
    <Button
      onClick={() =>
        loginWithRedirect({
          redirectUri: window.location.origin,
        })
      }
    >
      Log In
    </Button>
  )
}
