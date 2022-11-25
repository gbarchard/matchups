import { createContext, PropsWithChildren, useContext } from "react"

export type AppContextState = {}

export function useAppConfigState() {
  return {}
}

export const AppContext = createContext<AppContextState | null>(null)

export function useAppContextIfAvailable() {
  return useContext(AppContext)
}

export function useAppContext() {
  const context = useAppContextIfAvailable()
  if (context == null) {
    throw new Error("No app context provided")
  }
  return context
}

export function AppContextProvider(
  props: PropsWithChildren<{ state: AppContextState }>
) {
  return (
    <AppContext.Provider value={props.state}>
      {props.children}
    </AppContext.Provider>
  )
}
