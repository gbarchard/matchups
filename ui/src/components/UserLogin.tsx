import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "react-bootstrap"

export default function UserLogin() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0()

  if (isAuthenticated) {
    return (
      <Button
        onClick={() => logout({ returnTo: window.location.origin })}
        variant="primary"
      >
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
      variant="primary"
    >
      Log In
    </Button>
  )
}
