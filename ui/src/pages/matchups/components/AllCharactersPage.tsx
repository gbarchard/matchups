import { useNavigate } from "react-router-dom"
import { Table } from "react-bootstrap"
import { type Character } from "../types"
import CharacterLabel from "./CharacterLabel"

export default function AllCharactersPage(props: { characters: Character[] }) {
  const { characters } = props
  const navigate = useNavigate()

  const vistCharacterPage = (path: string) => navigate(path)

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Character</th>
        </tr>
      </thead>
      <tbody>
        {characters.map((c) => (
          <tr
            className="cursor-pointer"
            key={c.path}
            onClick={() => vistCharacterPage(c.path)}
          >
            <td>
              <CharacterLabel character={c} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
