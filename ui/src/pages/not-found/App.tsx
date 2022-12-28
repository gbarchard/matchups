import { useNavigate } from "react-router-dom"
import { Typography } from "../../components/Typography"

/**
 * Fallback page for when the user goes to an unknown url. Directs the user back to the home page
 */
export default function App() {
  const navigate = useNavigate()
  const goHome = () => navigate("/")

  return (
    <div className="flex justify-center mt-8">
      <Typography>
        <span>
          {"The page you are looking for cannot be found. Click "}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              goHome()
            }}
          >
            here
          </a>
          {" to go home."}
        </span>
      </Typography>
    </div>
  )
}
