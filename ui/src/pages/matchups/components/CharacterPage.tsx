import { useAuth0 } from "@auth0/auth0-react"
import { Table } from "flowbite-react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useFetch } from "usehooks-ts"
import TierList from "../../../components/TierList"
import { Typography } from "../../../components/Typography"

import { Character } from "../types"
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
          key={c.id}
          path={c.id}
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

  const { data } = useFetch<
    { id: string; value: number; tier: string; vote: number; count: number }[]
  >(`${process.env.REACT_APP_API_BASE_URL}/api/character-content`, {
    method: "POST",
    body: JSON.stringify({
      characterId: selectedCharachter.id,
      userId: user?.sub,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  const tiers: { [key: string]: Character[] } = {}

  if (!data) return null

  data.forEach((character) => {
    if (!tiers[character.tier]) {
      tiers[character.tier] = []
    }
    const c = allCharacters.find((c) => c.id === character.id)

    if (c) {
      tiers[character.tier].push(c)
    }
  })

  return (
    <>
      <Typography className="mb-4">
        <h1>{selectedCharachter.label}</h1>
      </Typography>
      <TierList className="my-4" tiers={tiers} />
      <Table striped hoverable>
        <Table.Head>
          <Table.HeadCell>Character</Table.HeadCell>
          <Table.HeadCell>Average Matchup</Table.HeadCell>
          <Table.HeadCell>Vour Vote</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {data.map((character) => (
            <Table.Row
              className="cursor-pointer"
              key={character.id}
              onClick={() => visitMatchupPage(character.id)}
            >
              <Table.Cell>
                <CharacterLabel
                  character={allCharacters.find((c) => c.id === character.id)}
                />
              </Table.Cell>
              <Table.Cell>
                {`${character.value ?? "-"} (${character.count} ${
                  character.count === 1 ? "vote" : "votes"
                })`}
              </Table.Cell>
              <Table.Cell>
                <VoteButtonGroup
                  asId={selectedCharachter.id}
                  againstId={character.id}
                  defaultValue={character.vote}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}
