import { useNavigate } from "react-router-dom"
import { useFetch } from "usehooks-ts"
import { Vote, type Character } from "../types"
import VoteButtonGroup from "./VoteButtonGroup"
import { useAuth0 } from "@auth0/auth0-react"

export default function MatchupPage(props: {
  characterAs: Character
  characterAgainst: Character
}) {
  const { characterAgainst, characterAs } = props
  const navigate = useNavigate()
  const goBack = () => navigate(`/matchups/${characterAs.path}`)
  const { user } = useAuth0()

  const body = {
    user_id: user?.sub,
    characterIds: [characterAgainst.path, characterAs.path],
  }

  const { data: vote } = useFetch<Vote | null>(
    `${process.env.REACT_APP_API_BASE_URL}/api/vote`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  return (
    <>
      <div onClick={goBack}>Go Back</div>
      <div>
        {characterAs.label} vs {characterAgainst.label}
      </div>
      {vote !== undefined && user?.sub && (
        <VoteButtonGroup
          against={characterAgainst}
          as={characterAs}
          defaultValue={getVoteValue(vote, characterAgainst.path)}
        />
      )}
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
