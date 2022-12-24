import { Character } from "../types"
import Image from "react-bootstrap/Image"
import * as characterIcons from "../../../img"

export default function CharacterLabel(props: { character: Character }) {
  const { character } = props
  return (
    <div className="flex space-x-2">
      <div>
        <Image
          width={25}
          height={25}
          src={
            characterIcons[
              kebabToCamel(character.path) as keyof typeof characterIcons
            ]
          }
        />
      </div>
      <div>{character.label}</div>
    </div>
  )
}

function kebabToCamel(s: string) {
  return s.replace(/-./g, (x) => x[1].toUpperCase())
}
