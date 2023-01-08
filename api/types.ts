declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_DOMAIN?: string
      MONGO_URL: string
      MONGO_DB?: string
      port?: number
    }
  }
}

export {}
