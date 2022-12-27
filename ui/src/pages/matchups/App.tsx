import { Route, Routes } from "react-router-dom"
import { useFetch } from "usehooks-ts"
import NotFound from "../not-found/App"
import { type Character } from "./types"
import AllCharactersPage from "./components/AllCharactersPage"
import CharacterPage from "./components/CharacterPage"
import { useAuth0 } from "@auth0/auth0-react"

export default function App() {
  const { data: characters } = useFetch<Character[]>(
    `${process.env.REACT_APP_API_BASE_URL}/api/characters`
  )

  const { isLoading } = useAuth0()

  if (!characters || isLoading) return null
  return (
    <Routes>
      <Route path="/" element={<AllCharactersPage characters={characters} />} />
      {characters?.map((c) => (
        <Route
          key={c.id}
          path={`${c.id}/*`}
          element={
            <CharacterPage allCharacters={characters} selectedCharachter={c} />
          }
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
