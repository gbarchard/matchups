import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "flowbite-react"
import { useCallback } from "react"
import { useLocation } from "react-router-dom"

export default function UserLogin() {
  const { isAuthenticated } = useAuth0()
  const { login, logout } = useAuthentication()

  if (isAuthenticated) {
    return <Button onClick={logout}>Log Out</Button>
  }

  return <Button onClick={login}>Log In</Button>
}

export function useAuthentication() {
  const { loginWithRedirect, logout: logoutUser } = useAuth0()
  const { pathname } = useLocation()

  const setRedirectUrl = useCallback(() => {
    window.localStorage.setItem("redirectUrl", pathname)
  }, [pathname])

  const login = useCallback(() => {
    setRedirectUrl()
    loginWithRedirect({
      redirectUri: `${window.location.origin}/redirect`,
    })
  }, [loginWithRedirect, setRedirectUrl])

  const logout = useCallback(() => {
    setRedirectUrl()
    logoutUser({ returnTo: `${window.location.origin}/redirect` })
  }, [logoutUser, setRedirectUrl])

  return { login, logout }
}
