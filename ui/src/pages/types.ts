export type Page = {
  /** Title that will display in nav bar */
  name: string,
  /** Url path */
  path: string,
  /** React component to render */
  component: JSX.Element
}