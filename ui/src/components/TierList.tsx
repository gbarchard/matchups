import { Character } from "../pages/matchups/types"
import * as characterIcons from "../img"
import { Avatar, Tooltip } from "flowbite-react"
import { useNavigate } from "react-router-dom"

interface TierListProps {
  className?: string
  tiers: { [key: string]: Character[] }
}

export default function TierList(props: TierListProps) {
  const { className, tiers } = props

  return (
    <div className={"rounded-lg overflow-hidden shadow-md " + className}>
      {Object.keys(tiers).map((tier, idx) => (
        <Tier characters={tiers[tier]} label={tier} key={idx} index={idx} />
      ))}
    </div>
  )
}

const TIER_COLORS = [
  "bg-red-700",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-purple-500",
]

function Tier(props: {
  index: number
  label: string
  characters: TierListProps["tiers"][string]
}) {
  const { characters, label, index } = props
  const navigate = useNavigate()
  return (
    <div className="flex">
      <div
        className={
          "flex flex-col justify-center text-center px-1 w-12 min-h-[4rem] overflow-hidden " +
          TIER_COLORS[index]
        }
      >
        {label}
      </div>
      <div
        className={
          "flex-1 p-2 flex flex-wrap gap-2 " +
          (index % 2 === 0 ? "dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700")
        }
      >
        {characters.map((character, idx) => (
          <Tooltip content={character.label} key={idx}>
            <Avatar
              className="cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 w-12 h-12 rounded-full"
              onClick={() => navigate(character.id)}
              alt={`icon of ${character.label}`}
              rounded
              img={
                characterIcons[
                  kebabToCamel(character.id) as keyof typeof characterIcons
                ]
              }
            />
          </Tooltip>
        ))}
      </div>
    </div>
  )
}

function kebabToCamel(s: string) {
  return s.replace(/-./g, (x) => x[1].toUpperCase())
}
