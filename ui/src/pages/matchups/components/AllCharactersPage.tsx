import { useNavigate } from "react-router-dom"
import { Table } from "flowbite-react"
import { type Character } from "../types"
import CharacterLabel from "./CharacterLabel"
import { useFetch } from "usehooks-ts"
import TierList from "../../../components/TierList"

const TIER_MAP = {
  70: "S+",
  60: "S",
  50: "A",
  40: "B",
  30: "C",
}

export default function AllCharactersPage(props: { characters: Character[] }) {
  const { characters } = props
  const navigate = useNavigate()

  const vistCharacterPage = (path: string) => navigate(path)

  const { data } = useFetch<{ [key: string]: number }>(
    `${process.env.REACT_APP_API_BASE_URL}/api/total-scores`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const tiers: { [key: string]: Character[] } = {}

  for (const tier in TIER_MAP) {
    tiers[TIER_MAP[tier as unknown as keyof typeof TIER_MAP]] = []
  }

  for (let i = 0; i < characters.length; i++) {
    const character = characters[i]
    const average = data?.[character.id]
    if (!average) continue
    const roundedAvg = (10 *
      Math.round(average / 10)) as unknown as keyof typeof TIER_MAP
    if (!(TIER_MAP[roundedAvg] in tiers)) {
      tiers[TIER_MAP[roundedAvg]] = [character]
    } else {
      tiers[TIER_MAP[roundedAvg]].push(character)
    }
  }

  return (
    <>
      <TierList className="my-4" tiers={tiers} />
      <Table striped hoverable>
        <Table.Head>
          <Table.HeadCell>Character</Table.HeadCell>
          <Table.HeadCell>Score</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {characters.map((c) => (
            <Table.Row
              className="cursor-pointer"
              key={c.id}
              onClick={() => vistCharacterPage(c.id)}
            >
              <Table.Cell>
                <CharacterLabel character={c} />
              </Table.Cell>
              <Table.Cell>{data?.[c.id] ?? "-"}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}
