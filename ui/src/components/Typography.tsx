import { PropsWithChildren } from "react"

export function Typography(props: PropsWithChildren<{ className?: string }>) {
  const { children, className } = props
  return (
    <div className={"format dark:format-invert " + className}>{children}</div>
  )
}
