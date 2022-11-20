import { useNavigate } from "react-router-dom"

/**
 * Fallback page for when the user goes to an unknown url. Directs the user back to the home page
 */
export default function App() {
  const navigate = useNavigate()
  const goHome = () => navigate("/")

  return (
    <div className="flex justify-center mt-8">
      <div className="inline">
        <span>The page you are looking for cannot be found. Click</span>
        <button
          className="mx-1 text-blue-500 hover:text-blue-700 hover:underline"
          onClick={goHome}
        >
          here
        </button>
        <span>to go home.</span>
      </div>
    </div>
  )
}
