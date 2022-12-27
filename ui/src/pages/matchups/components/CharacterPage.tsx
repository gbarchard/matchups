import { useAuth0 } from "@auth0/auth0-react"
import { Table } from "flowbite-react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useFetch } from "usehooks-ts"
import TierList from "../../../components/TierList"
import { Typography } from "../../../components/Typography"

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

const MATCHUP_MAP = {
  20: "-3",
  30: "-2",
  40: "-1",
  50: "±0",
  60: "+1",
  70: "+2",
  80: "+3",
}

function CharacterPageContent(props: {
  allCharacters: Character[]
  selectedCharachter: Character
}) {
  const { allCharacters, selectedCharachter } = props
  const navigate = useNavigate()
  const visitMatchupPage = (path: string) => navigate(path)

  const { user } = useAuth0()
  const body = { user_id: user?.sub, characterId: selectedCharachter.id }
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

  const { data: averages } = useFetch<{ [key: string]: number }>(
    `${process.env.REACT_APP_API_BASE_URL}/api/average-votes`,
    {
      method: "POST",
      body: JSON.stringify({ characterId: selectedCharachter.id }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const tiers: { [key: string]: Character[] } = {}

  for (let i = 0; i < allCharacters.length; i++) {
    const character = allCharacters[i]
    const average = averages?.[character.id]
    if (!average) continue
    const roundedAvg = (10 *
      Math.round(average / 10)) as unknown as keyof typeof MATCHUP_MAP
    if (!(MATCHUP_MAP[roundedAvg] in tiers)) {
      tiers[MATCHUP_MAP[roundedAvg]] = [character]
    } else {
      tiers[MATCHUP_MAP[roundedAvg]].push(character)
    }
  }

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
          {allCharacters.map((c) => (
            <Table.Row
              className="cursor-pointer"
              key={c.id}
              onClick={() => visitMatchupPage(c.id)}
            >
              <Table.Cell>
                <CharacterLabel character={c} />
              </Table.Cell>
              <Table.Cell>{averages?.[c.id] ?? "-"}</Table.Cell>
              {votes && user?.sub && (
                <Table.Cell>
                  <VoteButtonGroup
                    as={selectedCharachter}
                    against={c}
                    defaultValue={
                      selectedCharachter.id === c.id
                        ? 50
                        : getVoteValue(votes, c.id)
                    }
                  />
                </Table.Cell>
              )}
              {!user && <Table.Cell>Log in</Table.Cell>}
            </Table.Row>
          ))}
        </Table.Body>
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
