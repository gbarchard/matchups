import { useAuth0 } from "@auth0/auth0-react"
import { Button, Table } from "react-bootstrap"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useFetch } from "usehooks-ts"

import { Character, Vote } from "../types"
import CharacterLabel from "./CharacterLabel"
import MatchupPage from "./MatchupPage"
import VoteButtonGroup from "./VoteButtonGroup"

export default function CharacterPage(props: {
  allCharacters: Character[]
  selectedCharachter: Character
}) {
  const { allCharacters, selectedCharachter } = props
  return (
    <Routes>
      <Route path="/" element={<CharacterPageContent {...props} />} />
      {allCharacters.map((c) => (
        <Route
          key={c.path}
          path={c.path}
          element={
            <MatchupPage
              characterAgainst={c}
              characterAs={selectedCharachter}
            />
          }
        />
      ))}
    </Routes>
  )
}

function CharacterPageContent(props: {
  allCharacters: Character[]
  selectedCharachter: Character
}) {
  const { allCharacters, selectedCharachter } = props
  const navigate = useNavigate()
  const visitMatchupPage = (path: string) => navigate(path)

  const { user } = useAuth0()
  const body = { user_id: user?.sub, characterId: selectedCharachter.path }
  const { data: votes } = useFetch<Vote[]>(
    `${process.env.REACT_APP_API_BASE_URL}/api/votes`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const goBack = () => navigate("/matchups")

  return (
    <>
      <Button variant="link" onClick={goBack}>
        Back to Matchups
      </Button>
      <h1>{selectedCharachter.label}</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Character</th>
            <th>Vour Vote</th>
          </tr>
        </thead>
        <tbody>
          {allCharacters.map((c) => (
            <tr
              className="cursor-pointer"
              key={c.path}
              onClick={() => visitMatchupPage(c.path)}
            >
              <td>
                <CharacterLabel character={c} />
              </td>
              {votes && user?.sub && (
                <td>
                  <VoteButtonGroup
                    as={selectedCharachter}
                    against={c}
                    defaultValue={getVoteValue(votes, c.path)}
                  />
                </td>
              )}
              {!user && <td>Log in</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

function getVoteValue(votes: Vote[], characterId: string) {
  return (
    votes.find((v) => v.data[0].characterId === characterId)?.data[1].value ??
    votes.find((v) => v.data[1].characterId === characterId)?.data[0].value
  )
}
