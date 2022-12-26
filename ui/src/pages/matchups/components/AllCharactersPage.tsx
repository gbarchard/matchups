import { useNavigate } from "react-router-dom"
import { Table } from "flowbite-react"
import { type Character } from "../types"
import CharacterLabel from "./CharacterLabel"
import { useFetch } from "usehooks-ts"

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

  return (
    <Table striped hoverable>
      <Table.Head>
        <Table.HeadCell>Character</Table.HeadCell>
        <Table.HeadCell>Score</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {characters.map((c) => (
          <Table.Row
            className="cursor-pointer"
            key={c.path}
            onClick={() => vistCharacterPage(c.path)}
          >
            <Table.Cell>
              <CharacterLabel character={c} />
            </Table.Cell>
            <Table.Cell>{data?.[c.path] ?? "-"}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
