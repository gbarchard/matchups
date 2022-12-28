import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Typography } from "../../components/Typography"

/** Redirect to "redirectUrl" local storage item */
export default function Login() {
  const { isLoading } = useAuth0()
  const navigate = useNavigate()

  const redirect = useMemo(() => {
    return window.localStorage.getItem("redirectUrl")
  }, [])

  useEffect(() => {
    if (isLoading) return
    if (!redirect) return navigate("/")
    navigate(redirect)
  }, [redirect, isLoading, navigate])

  return (
    <Typography>
      <p>Redirecting...</p>
    </Typography>
  )
}
