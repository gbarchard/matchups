import { Typography } from "../../components/Typography"
import { useGotHereFetcher } from "../../api"

export default function App() {
  const gotHere = useGotHereFetcher()

  console.log(gotHere)

  return (
    <Typography>
      <h1>Home Page</h1>
    </Typography>
  )
}
