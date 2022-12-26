import { PropsWithChildren } from "react"

export function Typography(props: PropsWithChildren<{ className?: string }>) {
  const { children, className } = props
  return (
    <div className={"format dark:format-invert lg:format-lg " + className}>
      {children}
    </div>
  )
}
