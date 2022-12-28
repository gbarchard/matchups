import { Character } from "../types"
import * as characterIcons from "../../../img"

export default function CharacterLabel(props: { character?: Character }) {
  const { character } = props
  if (!character) return null
  return (
    <div className="flex space-x-2">
      <div>
        <img
          alt={`icon of ${character.label}`}
          width={25}
          height={25}
          src={
            characterIcons[
              kebabToCamel(character.id) as keyof typeof characterIcons
            ]
          }
        />
      </div>
      <span>{character.label}</span>
    </div>
  )
}

function kebabToCamel(s: string) {
  return s.replace(/-./g, (x) => x[1].toUpperCase())
}
