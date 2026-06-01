/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: string

  readonly VITE_ALGOD_TOKEN: string
  readonly VITE_ALGOD_SERVER: string
  readonly VITE_ALGOD_PORT: string
  readonly VITE_ALGOD_NETWORK: string

  readonly VITE_INDEXER_TOKEN: string
  readonly VITE_INDEXER_SERVER: string
  readonly VITE_INDEXER_PORT: string

  readonly VITE_KMD_TOKEN: string
  readonly VITE_KMD_SERVER: string
  readonly VITE_KMD_PORT: string
  readonly VITE_KMD_PASSWORD: string
  readonly VITE_KMD_WALLET: string

  readonly VITE_FEE_WALLET: string
  readonly VITE_FRY_TOKEN_ID: string
  readonly VITE_FRY_MARKET_ID: string
  readonly VITE_FRY_AUCTION_ID: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_FEE_ROUTER_APP_ID: string
  readonly VITE_FEE_ROUTER_ADDR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
