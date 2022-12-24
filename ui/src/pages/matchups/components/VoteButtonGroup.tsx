import { useAuth0 } from "@auth0/auth0-react"
import { useState } from "react"
import { ButtonGroup, ToggleButton } from "react-bootstrap"
import { Character, Vote } from "../types"

type MatchupOption = {
  label: string
  value: number
}

const MATCHUP_OPTIONS: MatchupOption[] = [
  {
    label: "-3",
    value: 0.2,
  },
  {
    label: "-2",
    value: 0.3,
  },
  {
    label: "-1",
    value: 0.4,
  },
  {
    label: "±0",
    value: 0.5,
  },
  {
    label: "+1",
    value: 0.6,
  },
  {
    label: "+2",
    value: 0.7,
  },
  {
    label: "+3",
    value: 0.8,
  },
]

export default function VoteButtonGroup(props: {
  as: Character
  against: Character
  defaultValue?: number
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
          value: Math.round((1 - o.value) * 10) / 10,
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
    <ButtonGroup>
      {MATCHUP_OPTIONS.map((o, i) => (
        <ToggleButton
          key={i}
          disabled={isDitto}
          value={o?.value}
          type="radio"
          variant="outline-secondary"
          checked={isDitto ? o.value === 0.5 : o.value === option?.value}
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            setOption(o)
            updateVote(o)
          }}
        >
          {o.label}
        </ToggleButton>
      ))}
    </ButtonGroup>
  )
}
