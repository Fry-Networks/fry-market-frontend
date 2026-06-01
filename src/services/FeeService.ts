import axios from 'axios'
import algosdk, { TransactionSigner } from 'algosdk'

const API_BASE = import.meta.env.VITE_API_BASE_URL
const FEE_ROUTER_APP_ID = Number(import.meta.env.VITE_FEE_ROUTER_APP_ID) || 3509411111
const FEE_ROUTER_ADDR = import.meta.env.VITE_FEE_ROUTER_ADDR || 'AM53XSHRSSSZMNFAMKVAJFXHPMIYYUUBOVCODJ2LQY3D27CVXAHAPIXYXQ'
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

/**
 * Marketplace fee config — fetched from backend /feeconfig endpoint.
 * Marketplace-specific: covers listing fees, transaction fees, image gen,
 * collection creation. On-chain primary/secondary fees remain in the
 * smart contract (FryMarket App 3578544406).
 */
export interface MarketplaceFeeConfig {
  /** Fee charged when listing an NFT (percentage of price, 0 = free) */
  listingFeePercent: number
  /** Platform fee on successful sales (percentage of sale price) */
  transactionFeePercent: number
  /** Fee for AI image generation (USD per image, converted to FRY dynamically) */
  imageGenFeeUsd: number
  /** Fee for collection creation (0 = free) */
  collectionCreationFeePercent: number
  /** Wallet address that receives fees (used for direct transfer fallback) */
  feeRecipient: string
  /** FeeRouter app ID for on-chain fee routing */
  feeRouterAppId: number
  /** FeeRouter application address */
  feeRouterAddr: string
  /** Chain ID this config applies to */
  chainId: string
}

export interface FeeCalculation {
  feePercent: number
  baseAmount: number
  feeAmount: number
  netAmount: number
  feeRecipient: string
}

// Module-level cache
let cachedConfig: MarketplaceFeeConfig | null = null
let cacheTimestamp = 0

const ACTION_TYPE_MAP: Record<string, keyof MarketplaceFeeConfig> = {
  listing: 'listingFeePercent',
  transaction: 'transactionFeePercent',
  collectionCreation: 'collectionCreationFeePercent',
}

/**
 * Fetch marketplace fee config from backend. Caches for 5 minutes.
 */
export async function fetchFeeConfig(): Promise<MarketplaceFeeConfig> {
  const now = Date.now()
  if (cachedConfig && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedConfig
  }
  const res = await axios.get(`${API_BASE}/feeconfig?_t=${Date.now()}`)
  cachedConfig = res.data.data as MarketplaceFeeConfig
  cacheTimestamp = now
  return cachedConfig
}

/**
 * Calculate fee for a marketplace action.
 * Returns fee amount in microunits (6 decimals).
 */
export function calculateFeeSimple(
  actionType: string,
  baseAmountMicro: number,
  feeConfig: MarketplaceFeeConfig,
  feeRecipientOverride?: string | null,
): FeeCalculation {
  const configKey = ACTION_TYPE_MAP[actionType]
  if (!configKey) throw new Error(`Unknown action type: ${actionType}`)

  const feePercent = (feeConfig[configKey] as number) ?? 0
  const feeAmount = Math.floor((baseAmountMicro * feePercent) / 100)
  const netAmount = baseAmountMicro - feeAmount

  return {
    feePercent,
    baseAmount: baseAmountMicro,
    feeAmount,
    netAmount,
    feeRecipient: feeRecipientOverride || feeConfig.feeRecipient || FEE_ROUTER_ADDR,
  }
}

/**
 * Route a fee through the on-chain FeeRouter contract.
 * Constructs atomic group: [ASA transfer / ALGO payment] + [app call route_*_fee].
 * FeeRouter splits fees between pool (Genesis NFT holders) and treasury.
 */
export async function routeFeeViaRouter(
  sender: string,
  signer: TransactionSigner,
  feeAmount: number,
  feeTokenId: number,
  algodClient: algosdk.Algodv2,
): Promise<{ txId: string }> {
  const sp = await algodClient.getTransactionParams().do()
  const baseFee = Math.max(sp.fee, 1000)

  const atc = new algosdk.AtomicTransactionComposer()

  if (feeTokenId === 0) {
    // ALGO: PaymentTxn + AppCallTxn(route_algo_fee)
    const selector = new Uint8Array(Buffer.from('7b260fc0', 'hex'))
    const payTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: sender,
      to: FEE_ROUTER_ADDR,
      amount: BigInt(feeAmount),
      suggestedParams: sp,
    })
    payTxn.fee = baseFee

    const appCallTxn = algosdk.makeApplicationNoOpTxnFromObject({
      from: sender,
      suggestedParams: sp,
      appIndex: FEE_ROUTER_APP_ID,
      appArgs: [selector],
    })
    appCallTxn.fee = baseFee * 3

    atc.addTransaction({ txn: payTxn, signer })
    atc.addTransaction({ txn: appCallTxn, signer })
  } else {
    // ASA: AssetTransferTxn + AppCallTxn(route_asa_fee)
    const selector = new Uint8Array(Buffer.from('f9d8a6a7', 'hex'))
    const axferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: sender,
      to: FEE_ROUTER_ADDR,
      amount: BigInt(feeAmount),
      assetIndex: feeTokenId,
      suggestedParams: sp,
    })
    axferTxn.fee = baseFee

    const appCallTxn = algosdk.makeApplicationNoOpTxnFromObject({
      from: sender,
      suggestedParams: sp,
      appIndex: FEE_ROUTER_APP_ID,
      appArgs: [selector],
      foreignAssets: [feeTokenId],
    })
    appCallTxn.fee = baseFee * 3

    atc.addTransaction({ txn: axferTxn, signer })
    atc.addTransaction({ txn: appCallTxn, signer })
  }

  const result = await atc.execute(algodClient, 4)
  const txId = result.txIDs[0] ?? result.txIDs[1]
  if (!txId) throw new Error('FeeRouter group did not return a txID')
  return { txId }
}

export { FEE_ROUTER_ADDR, FEE_ROUTER_APP_ID }
