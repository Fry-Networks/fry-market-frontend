import { ChainConfig } from './types';

/** Algorand Mainnet configuration for fry.market */
export const algorandMainnet: ChainConfig = {
  chainId: 'algorand-mainnet',
  displayName: 'Algorand',
  family: 'avm',
  nativeAsset: {
    name: 'Algo',
    symbol: 'ALGO',
    decimals: 6,
    id: 0,
  },
  fryTokenId: Number(import.meta.env.VITE_FRY_TOKEN_ID) || 2485314946,
  usdcEquivalent: { id: 31566704, symbol: 'USDC', decimals: 6 },
  feeRecipient: import.meta.env.VITE_FEE_WALLET || 'ATPVJYGEGP5H6GCZ4T6CG4PK7LH5OMWXHLXZHDPGO7RO6T3EHWTF6UUY6E',
  feeRouterAppId: Number(import.meta.env.VITE_FEE_ROUTER_APP_ID) || 3509411111,
  feeRouterAddr: import.meta.env.VITE_FEE_ROUTER_ADDR || 'AM53XSHRSSSZMNFAMKVAJFXHPMIYYUUBOVCODJ2LQY3D27CVXAHAPIXYXQ',
  explorerBaseUrl: 'https://explorer.perawallet.app',
  availableDexProviders: ['folks-router', 'vestige', 'tinyman'],
  supportedWallets: ['pera', 'defly', 'daffi', 'exodus'],
  connection: {
    algodServer: import.meta.env.VITE_ALGOD_SERVER || 'https://mainnet-api.4160.nodely.dev',
    algodPort: Number(import.meta.env.VITE_ALGOD_PORT) || 443,
    algodToken: import.meta.env.VITE_ALGOD_TOKEN || '',
    indexerServer: import.meta.env.VITE_INDEXER_SERVER || 'https://mainnet-idx.4160.nodely.dev',
    indexerPort: Number(import.meta.env.VITE_INDEXER_PORT) || 443,
    indexerToken: import.meta.env.VITE_INDEXER_TOKEN || '',
  },
  features: {
    marketplace: true,
    auction: true,
    genesisNft: true,
    events: true,
    launchpad: true,
    feeRouter: true,
  },
  contracts: {
    fryMarketAppId: Number(import.meta.env.VITE_FRY_MARKET_ID) || 3578544406,
    fryAuctionAppId: Number(import.meta.env.VITE_FRY_AUCTION_ID) || 3578544748,
    fryAuctionBiddingAppId: null, // factory — created per auction
  },
};
