import { useNavigate } from "react-router-dom"
import { Table } from "flowbite-react"
import { type Character } from "../types"
import CharacterLabel from "./CharacterLabel"
import { useFetch } from "usehooks-ts"
import TierList from "../../../components/TierList"

export default function AllCharactersPage(props: { characters: Character[] }) {
  const { characters } = props
  const navigate = useNavigate()

  const vistCharacterPage = (path: string) => navigate(path)

  const { data } = useFetch<{ id: string; value: number; tier: string }[]>(
    `${process.env.REACT_APP_API_BASE_URL}/api/total-scores`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const tiers: { [key: string]: Character[] } = {}

  if (!data) return null

  data.forEach((character) => {
    if (!tiers[character.tier]) {
      tiers[character.tier] = []
    }
    const c = characters.find((c) => c.id === character.id)

    if (c) {
      tiers[character.tier].push(c)
    }
  })

  return (
    <>
      <TierList className="my-4" tiers={tiers} />
      <Table striped hoverable>
        <Table.Head>
          <Table.HeadCell>Character</Table.HeadCell>
          <Table.HeadCell>Score</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {data.map((row) => (
            <Table.Row
              className="cursor-pointer"
              key={row.id}
              onClick={() => vistCharacterPage(row.id)}
            >
              <Table.Cell>
                <CharacterLabel
                  character={characters.find((c) => c.id === row.id)}
                />
              </Table.Cell>
              <Table.Cell>{row.value}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}
