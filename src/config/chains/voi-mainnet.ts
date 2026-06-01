import { ChainConfig } from './types';

/**
 * Voi Mainnet configuration for fry.market
 * Voi is AVM-compatible — same algosdk, different endpoints and asset IDs.
 * Marketplace contracts not yet deployed on Voi — IDs are null until deploy.
 */
export const voiMainnet: ChainConfig = {
  chainId: 'voi-mainnet',
  displayName: 'Voi',
  family: 'avm',
  nativeAsset: {
    name: 'Voi',
    symbol: 'VOI',
    decimals: 6,
    id: 0,
  },
  fryTokenId: 48968653, // vFRY ASA on Voi
  usdcEquivalent: { id: 395614, symbol: 'aUSDC', decimals: 6 },
  feeRecipient: null, // TBD — set when Voi marketplace contracts deployed
  feeRouterAppId: null, // TBD — deploy FeeRouter on Voi
  feeRouterAddr: null,
  explorerBaseUrl: 'https://explorer.voi.network',
  availableDexProviders: ['nomadex', 'humble', 'snowball'],
  supportedWallets: ['kibisis', 'lute'],
  connection: {
    algodServer: import.meta.env.VITE_VOI_ALGOD_SERVER || 'https://mainnet-api.voi.nodely.dev',
    algodPort: Number(import.meta.env.VITE_VOI_ALGOD_PORT) || 443,
    algodToken: import.meta.env.VITE_VOI_ALGOD_TOKEN || '',
    indexerServer: import.meta.env.VITE_VOI_INDEXER_SERVER || 'https://mainnet-idx.voi.nodely.dev',
    indexerPort: Number(import.meta.env.VITE_VOI_INDEXER_PORT) || 443,
    indexerToken: import.meta.env.VITE_VOI_INDEXER_TOKEN || '',
  },
  features: {
    marketplace: true,
    auction: true,
    genesisNft: false, // Algorand-only per operator decision
    events: true,
    launchpad: false, // TBD — after Voi contract deployment
    feeRouter: false, // TBD — deploy FeeRouter on Voi
  },
  contracts: {
    fryMarketAppId: null, // TBD — deploy FryMarket on Voi
    fryAuctionAppId: null, // TBD — deploy FryAuction on Voi
    fryAuctionBiddingAppId: null,
  },
};
