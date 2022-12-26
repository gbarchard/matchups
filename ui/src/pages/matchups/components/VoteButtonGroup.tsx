import { useAuth0 } from "@auth0/auth0-react"
import { useState } from "react"
import { Button } from "flowbite-react"
import { Character, Vote } from "../types"

type MatchupOption = {
  label: string
  value: number
}

const MATCHUP_OPTIONS: MatchupOption[] = [
  {
    label: "-3",
    value: 20,
  },
  {
    label: "-2",
    value: 30,
  },
  {
    label: "-1",
    value: 40,
  },
  {
    label: "±0",
    value: 50,
  },
  {
    label: "+1",
    value: 60,
  },
  {
    label: "+2",
    value: 70,
  },
  {
    label: "+3",
    value: 80,
  },
]

export default function VoteButtonGroup(props: {
  as: Character
  against: Character
  defaultValue?: number | null
}) {
  const { against, as, defaultValue } = props
  const [option, setOption] = useState<MatchupOption | null | undefined>(
    MATCHUP_OPTIONS.find((o) => o.value === defaultValue)
  )
  const { user } = useAuth0()

  const isDitto = as.path === against.path

  const updateVote = (o: MatchupOption) => {
    if (!user?.sub) return
    const vote: Vote = {
      user_id: user.sub,
      data: [
        { characterId: as.path, value: o.value },
        {
          characterId: against.path,
          value: 100 - o.value,
        },
      ],
    }

    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/update-vote`, {
      method: "POST",
      body: JSON.stringify(vote),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  return (
    <Button.Group>
      {MATCHUP_OPTIONS.map((o, i) => (
        <Button
          className={o.value === option?.value ? "!bg-blue-500" : ""}
          key={i}
          disabled={isDitto}
          value={o?.value}
          color="gray"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            setOption(o)
            updateVote(o)
          }}
        >
          {o.label}
        </Button>
      ))}
    </Button.Group>
  )
}
