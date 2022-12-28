import { useFetch } from "usehooks-ts"
import { Vote, type Character } from "../types"
import VoteButtonGroup from "./VoteButtonGroup"
import { useAuth0 } from "@auth0/auth0-react"
import { Typography } from "../../../components/Typography"

export default function MatchupPage(props: {
  characterAs: Character
  characterAgainst: Character
}) {
  const { characterAgainst, characterAs } = props
  const { user } = useAuth0()

  const body = {
    userId: user?.sub,
    characterIds: [characterAgainst.id, characterAs.id],
  }

  const { data } = useFetch<{ vote: Vote; average: number }>(
    `${process.env.REACT_APP_API_BASE_URL}/api/matchup-content`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  if (!data) return null

  const { average, vote } = data
  const isDitto = characterAs.id === characterAgainst.id
  const title = isDitto
    ? `${characterAs.label} Ditto`
    : `${characterAs.label} vs ${characterAgainst.label}`

  return (
    <>
      <Typography>
        <h1>{title}</h1>
        <h2>Value: {average}</h2>
      </Typography>
      <VoteButtonGroup
        againstId={characterAgainst.id}
        asId={characterAs.id}
        defaultValue={getVoteValue(vote, characterAgainst.id)}
      />
    </>
  )
}

function getVoteValue(vote: Vote | null, characterId: string) {
  if (!vote) return
  if (vote.data[0].characterId === characterId) {
    return vote.data[1].value
  }
  return vote.data[0].value
}
