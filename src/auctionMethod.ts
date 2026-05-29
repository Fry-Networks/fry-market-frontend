import * as algokit from '@algorandfoundation/algokit-utils'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { AppDetails } from '@algorandfoundation/algokit-utils/types/app-client'
import { Txn } from '@txnlab/use-wallet'
import algosdk, { TransactionSigner } from 'algosdk'
import { FryAuctionClient } from './contracts/FryAuction'

import { FryAuctionBiddingClient } from './contracts/FryAuctionBidding'
import { BIDDING_APPROVAL_PROGRAM, BIDDING_CLEAR_PROGRAM } from './contracts/FryAuctionBiddingTeal'
import { getAlgodConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'
import { getCollectionByNftId } from './utils/network/helper'

// export const AUCTION_ID: bigint = 729430870n;
export const AUCTION_ID: bigint = BigInt(import.meta.env.VITE_FRY_AUCTION_ID)
const AUCTION_ADDRESS: string = algosdk.getApplicationAddress(AUCTION_ID)
const PRIMARY_FEE: number = 300 // 100 represent 1% & 10000 represent 100%
const SECONDARY_FEE: number = 100 // 100 represent 1% & 10000 represent 100%
const FEE_WALLET: string = import.meta.env.VITE_FEE_WALLET // Testnet
const FRY_TOKEN_ID: bigint = BigInt(import.meta.env.VITE_FRY_TOKEN_ID) //TestNet
// const FEE_WALLET: string = "ATPVJYGEGP5H6GCZ4T6CG4PK7LH5OMWXHLXZHDPGO7RO6T3EHWTF6UUY6E"; // For mainnet
// const FRY_TOKEN_ID: bigint = 2485314946n; //For Mainnet
const AUCTION_BOX_PRICE = 2500 + 400 * 136
const BID_BOX_PRICE: number = 2500 + 400 * 48

const getAlgodClient = async (): Promise<algosdk.Algodv2> => {
  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algodClient = algokit.getAlgoClient({
    server: algodConfig.server,
    port: algodConfig.port,
    token: algodConfig.token,
  })

  return algodClient
}

const getIndexerClient = async (): Promise<algosdk.Indexer> => {
  const algodConfig = getAlgodConfigFromViteEnvironment()
  const indexer = algokit.getAlgoIndexerClient({
    server: algodConfig.server,
    port: algodConfig.port,
    token: algodConfig.token,
  })

  return indexer
}

export const createFryAuctionClient = async (signer: TransactionSigner, activeAddress: string, appId?: number) => {
  algokit.Config.configure({ populateAppCallResources: true })

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algorandClient: algokit.AlgorandClient = algokit.AlgorandClient.fromConfig({ algodConfig })
  algorandClient.setDefaultSigner(signer)

  const algodClient = algokit.getAlgoClient({
    server: algodConfig.server,
    port: algodConfig.port,
    token: algodConfig.token,
  })

  const auctionClient = new FryAuctionClient(
    {
      resolveBy: 'id',
      id: appId ?? AUCTION_ID,
      sender: { addr: activeAddress!, signer },
    },
    algorandClient.client.algod,
  )

  return { auctionClient, algorandClient, algodClient }
}

const createBiddingClient = async (signer: TransactionSigner, activeAddress: string, appId: number) => {
  algokit.Config.configure({ populateAppCallResources: true })

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algorandClient: algokit.AlgorandClient = algokit.AlgorandClient.fromConfig({ algodConfig })
  algorandClient.setDefaultSigner(signer)

  const biddingClient = new FryAuctionBiddingClient(
    {
      resolveBy: 'id',
      id: appId,
      sender: { addr: activeAddress!, signer },
    },
    algorandClient.client.algod,
  )

  return { biddingClient }
}

//! Auction Functions
export const deployAuction = async (sender: string, signer: TransactionSigner) => {
  try {
    const algodClient = await getAlgodClient()
    const indexer = await getIndexerClient()

    const appDetails = {
      resolveBy: 'creatorAndName',
      sender: { signer, addr: sender } as TransactionSignerAccount,
      creatorAddress: sender,
      findExistingUsing: indexer,
    } as AppDetails

    const auctionClientDeploy = new FryAuctionClient(appDetails, algodClient)

    const auction = await auctionClientDeploy.create
      .create({ fryId: FRY_TOKEN_ID, primaryFee: PRIMARY_FEE, secondaryFee: SECONDARY_FEE })
      .then((res) => {
        // console.log(res)
        return res
      })
      .catch((e) => {
        console.log(e)
        return e
      })

    const { auctionClient, algorandClient } = await createFryAuctionClient(signer, sender, auction.appId)

    await algorandClient.send.payment({
      sender,
      receiver: algosdk.getApplicationAddress(auction.appId),
      amount: algokit.algos(0.1 + 0.1),
      extraFee: algokit.algos(0.001),
    })
    if (auction.appId) {
      const optInAsset = await auctionClient.assetOptIn({ asset: FRY_TOKEN_ID }, { sendParams: { fee: algokit.algos(0.002) } }).then((res) => {
        // console.log(res)
      })
    }

    // console.log("auction", auction)
    return auction
  } catch (e) {
    console.log(e)
  }
}

export const listNftAuction = async (
  sender: string,
  signer: TransactionSigner,
  asset: number,
  bidStartAmount: number,
  minBidAmount: number,
  biddingStartTime: number,
  biddingEndTime: number,
) => {
  try {
    const { auctionClient, algorandClient, algodClient } = await createFryAuctionClient(signer, sender)

    const atc = new algosdk.AtomicTransactionComposer()
    const suggestedParams = await algodClient.getTransactionParams().do()

    // Check if auction app has opted in to asset
    const accountInfo = await algodClient.accountInformation(AUCTION_ADDRESS).do()
    const hasOptedIn = accountInfo?.assets?.some((assetId: any) => assetId['asset-id'] === asset)
    if (!hasOptedIn) {
      const auctionFund = await algorandClient.transactions.payment({
        sender,
        receiver: algosdk.getApplicationAddress(AUCTION_ID),
        amount: algokit.algos(0.1 + 0.1),
        extraFee: algokit.algos(0.001),
      })
      atc.addTransaction({ txn: auctionFund, signer })

      atc.addMethodCall({
        suggestedParams: { ...suggestedParams, fee: 2000, flatFee: true },
        appID: Number(AUCTION_ID),
        method: auctionClient.appClient.getABIMethod('asset_opt_in')!,
        methodArgs: [Number(asset)],
        sender: sender,
        signer: signer,
        appForeignAssets: [Number(asset)],
      })
    }

    // NFT transfer to auction app
    const xfer = await algorandClient.transactions.assetTransfer({
      sender,
      receiver: AUCTION_ADDRESS,
      amount: BigInt(1),
      assetId: BigInt(asset),
      signer,
    })

    // Box MBR — prefix 'a' (0x61) + encodeUint64(asset) = 9 bytes key
    let boxAmount = 0
    const boxName = new Uint8Array([0x61, ...algosdk.encodeUint64(asset)])
    const box = await algokit
      .getAppBoxValue(AUCTION_ID, boxName, algodClient)
      .then((res) => res)
      .catch(() => null)
    if (!box) {
      boxAmount = AUCTION_BOX_PRICE
    }

    if (boxAmount > 0) {
      const boxPay = await algorandClient.transactions.payment({
        sender,
        receiver: AUCTION_ADDRESS,
        amount: algokit.microAlgos(boxAmount),
        signer,
      })
      atc.addTransaction({ txn: boxPay, signer })
    }

    // Phase 6: list_nft_on_auction(asset, bid_start_amount, min_bid_amount, bidding_start_time, bidding_end_time, collection_id, nft_axfer, bidding_approval, bidding_clear)
    // Contract creates bidding app via inner txn using factory TEAL bytes
    atc.addMethodCall({
      suggestedParams: { ...suggestedParams, fee: 5000, flatFee: true },
      appID: Number(AUCTION_ID),
      method: auctionClient.appClient.getABIMethod('list_nft_on_auction')!,
      methodArgs: [
        Number(asset),
        BigInt(bidStartAmount),
        BigInt(minBidAmount),
        BigInt(biddingStartTime),
        BigInt(biddingEndTime),
        0n, // collection_id
        { txn: xfer, signer },
        BIDDING_APPROVAL_PROGRAM,
        BIDDING_CLEAR_PROGRAM,
      ],
      sender: sender,
      signer: signer,
      appForeignAssets: [Number(asset)],
      boxes: [
        {
          appIndex: Number(AUCTION_ID),
          name: boxName,
        },
      ],
    })
    const result = await atc.execute(algodClient, 4)
    for (const mr of result.methodResults) {
      // console.log(`${mr.returnValue}`)
    }

    return true
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const createBid = async (
  sender: string,
  signer: TransactionSigner,
  asset: number,
  biddingAppId: number,
  bidAmount: number,
  signTransactions: (transactions: Uint8Array[] | Uint8Array[][], indexesToSign?: number[], returnGroup?: boolean) => Promise<Uint8Array[]>,
  sendTransactions: (
    transactions: Uint8Array[],
    waitRoundsToConfirm?: number,
  ) => Promise<{
    'confirmed-round': number
    'global-state-delta': Record<string, unknown>[]
    'pool-error': string
    txn: {
      sig: Uint8Array
      txn: Txn
    }
    txId: string
    id: string
  }>,
  previousHighestBidder: string,
): Promise<string> => {
  try {
    const { algorandClient, algodClient } = await createFryAuctionClient(signer, sender)
    const { biddingClient } = await createBiddingClient(signer, sender, biddingAppId)

    // Phase 6: bid(pay) — single ALGO payment to bidding app. Contract handles all state updates.
    const payTxn = await algorandClient.transactions.payment({
      sender,
      receiver: algosdk.getApplicationAddress(biddingAppId),
      amount: algokit.microAlgos(bidAmount),
      signer,
    })

    await biddingClient.bid(
      { payment: payTxn },
      { sendParams: { fee: algokit.algos(0.003) } },
    )

    return 'Bid Placed'
  } catch (e: any) {
    // console.log(e)
    throw e.message
  }
}

export const cancelBid = async (
  sender: string,
  signer: TransactionSigner,
  asset: number,
  biddingAppId: number,
  signTransactions: (transactions: Uint8Array[] | Uint8Array[][], indexesToSign?: number[], returnGroup?: boolean) => Promise<Uint8Array[]>,
  sendTransactions: (
    transactions: Uint8Array[],
    waitRoundsToConfirm?: number,
  ) => Promise<{
    'confirmed-round': number
    'global-state-delta': Record<string, unknown>[]
    'pool-error': string
    txn: {
      sig: Uint8Array
      txn: Txn
    }
    txId: string
    id: string
  }>,
): Promise<string> => {
  try {
    const { biddingClient } = await createBiddingClient(signer, sender, biddingAppId)

    // Phase 6: cancel_bid() — no args. Contract handles refund via inner txns.
    await biddingClient.cancelBid({}, { sendParams: { fee: algokit.algos(0.003) } })

    return 'Bid Canceled'
  } catch (e: any) {
    // console.log(e)
    return e.message
  }
}

export const cancelAuction = async (
  sender: string,
  signer: TransactionSigner,
  asset: number,
  biddingAppId: number,
  signTransactions: (transactions: Uint8Array[] | Uint8Array[][], indexesToSign?: number[], returnGroup?: boolean) => Promise<Uint8Array[]>,
  sendTransactions: (
    transactions: Uint8Array[],
    waitRoundsToConfirm?: number,
  ) => Promise<{
    'confirmed-round': number
    'global-state-delta': Record<string, unknown>[]
    'pool-error': string
    txn: {
      sig: Uint8Array
      txn: Txn
    }
    txId: string
    id: string
  }>,
  previousHighestBidder?: string,
): Promise<string> => {
  try {
    const { auctionClient, algorandClient, algodClient } = await createFryAuctionClient(signer, sender)
    const { biddingClient } = await createBiddingClient(signer, sender, biddingAppId)

    // Phase 6: cancel_nft_auction(uint64 asset) — no highestBidder arg
    await auctionClient.cancelNftAuction(
      { asset: BigInt(asset) },
      { sendParams: { fee: algokit.algos(0.004) } },
    )

    return 'Auction Canceled'
  } catch (e: any) {
    // console.log(e)
    return e.message
  }
}

export const claimNftRoyalty = async (
  sender: string,
  signer: TransactionSigner,
  asset: number,
  biddingAppId: number,
  bidAmount: number,
  seller: string,
): Promise<string> => {
  try {
    const { auctionClient, algorandClient, algodClient } = await createFryAuctionClient(signer, sender)

    const accountInfo = await algodClient.accountInformation(sender).do()
    const hasOptedIn = accountInfo?.assets?.some((assetId: any) => assetId['asset-id'] === asset)
    const atc = new algosdk.AtomicTransactionComposer()
    const suggestedParams = await algodClient.getTransactionParams().do()
    suggestedParams.fee = 5000
    suggestedParams.flatFee = true
    if (!hasOptedIn) {
      const opIn = await algorandClient.transactions.assetOptIn({
        assetId: BigInt(asset),
        sender,
        extraFee: algokit.algos(0.001),
      })
      atc.addTransaction({ txn: opIn, signer: signer })
    }

    // Phase 6: claim_nft_royalty(uint64 asset, uint64 bidding_app) — contract handles fees/royalties internally
    const boxName = new Uint8Array([0x61, ...algosdk.encodeUint64(asset)])
    atc.addMethodCall({
      suggestedParams,
      appID: Number(AUCTION_ID),
      method: auctionClient.appClient.getABIMethod('claim_nft_royalty')!,
      methodArgs: [asset, biddingAppId],
      sender: sender,
      signer: signer,
      appForeignAssets: [Number(asset)],
      boxes: [
        {
          appIndex: Number(AUCTION_ID),
          name: boxName,
        },
      ],
    })

    const result = await atc.execute(algodClient, 4)
    for (const mr of result.methodResults) {
      // console.log(`${mr.returnValue}`);
    }

    return 'nftClaimed'
  } catch (e: any) {
    // console.log(e)
    throw e.message
  }
}

export const getAllAuctions = async () => {
  const algod = await getAlgodClient()
  const listings = await algokit.getAppBoxNames(AUCTION_ID, algod)
  // Phase 6: auction box key = prefix 'a' (0x61) + encodeUint64(asset) = 9 bytes
  const filteredBoxes = listings.filter((bx) => bx.nameRaw.byteLength === 9 && bx.nameRaw[0] === 0x61)
  const allListings: any[] = []
  for (const listBox of filteredBoxes) {
    const decoded = algosdk.decodeUint64(listBox.nameRaw.slice(1), 'safe')
    const box = await algokit.getAppBoxValue(AUCTION_ID, listBox.nameRaw, algod)
    const nftData = await algod.getAssetByID(decoded).do()
    // Phase 6 auction box layout (136 bytes):
    const sellerId = algosdk.encodeAddress(box.slice(0, 32))
    const assetId = algosdk.decodeUint64(box.slice(32, 40), 'mixed')
    const bidStartAmount = algosdk.decodeUint64(box.slice(40, 48), 'mixed')
    const minBidAmount = algosdk.decodeUint64(box.slice(48, 56), 'mixed')
    const bidContract = algosdk.decodeUint64(box.slice(56, 64), 'mixed')
    const highestBidder = algosdk.encodeAddress(box.slice(64, 96))
    const highestBidAmount = algosdk.decodeUint64(box.slice(96, 104), 'mixed')
    const biddingStartTime = algosdk.decodeUint64(box.slice(104, 112), 'mixed')
    const biddingEndTime = algosdk.decodeUint64(box.slice(112, 120), 'mixed')
    const status = algosdk.decodeUint64(box.slice(120, 128), 'mixed')
    const collectionId = algosdk.decodeUint64(box.slice(128, 136), 'mixed')
    const collectionData = await getCollectionByNftId(nftData.index)
    const listedData = {
      nftAddress: decoded,
      sellerId,
      bidStartAmount: Number(bidStartAmount),
      minBidAmount: Number(minBidAmount),
      biddingEndTime,
      biddingStartTime,
      highestBidder,
      highestBidAmount: Number(highestBidAmount),
      bidContract,
      status: Number(status),
      collectionId: Number(collectionId),
      // Backward compat
      isListed: status === 1n || status === 1,
      totalBidders: 0,
      totalListcount: 0,
      ...nftData.params,
      collectionData,
    }
    allListings.push(listedData)
  }
  return allListings
}

export const getSingleAuction = async (nftId: number) => {
  const algod = await getAlgodClient()
  // Phase 6: prefix 'a' (0x61) + encodeUint64(nftId)
  const boxName = new Uint8Array([0x61, ...algosdk.encodeUint64(nftId)])

  const box = await algokit.getAppBoxValue(AUCTION_ID, boxName, algod)
  const nftData = await algod.getAssetByID(nftId).do()
  // Phase 6 auction box layout
  const sellerId = algosdk.encodeAddress(box.slice(0, 32))
  const assetId = algosdk.decodeUint64(box.slice(32, 40), 'mixed')
  const bidStartAmount = algosdk.decodeUint64(box.slice(40, 48), 'mixed')
  const minBidAmount = algosdk.decodeUint64(box.slice(48, 56), 'mixed')
  const bidContract = algosdk.decodeUint64(box.slice(56, 64), 'mixed')
  const highestBidder = algosdk.encodeAddress(box.slice(64, 96))
  const highestBidAmount = algosdk.decodeUint64(box.slice(96, 104), 'mixed')
  const biddingStartTime = algosdk.decodeUint64(box.slice(104, 112), 'mixed')
  const biddingEndTime = algosdk.decodeUint64(box.slice(112, 120), 'mixed')
  const status = algosdk.decodeUint64(box.slice(120, 128), 'mixed')
  const collectionId = algosdk.decodeUint64(box.slice(128, 136), 'mixed')
  const listedData = {
    nftAddress: nftId,
    sellerId,
    bidStartAmount,
    minBidAmount,
    biddingEndTime,
    biddingStartTime,
    highestBidder,
    highestBidAmount,
    bidContract,
    status: Number(status),
    collectionId: Number(collectionId),
    isListed: status === 1n || status === 1,
    totalBidders: 0,
    totalListcount: 0,
    ...nftData.params,
  }
  return listedData
}

export const getAllBids = async (bidContract: number): Promise<Bid[]> => {
  try {
    const algod = await getAlgodClient()
    const biddings = await algokit.getAppBoxNames(bidContract, algod)
    const allBids: Bid[] = []
    for (const bid of biddings) {
      // Phase 6: bid box key = prefix 'b' (0x62) + address (32 bytes) = 33 bytes
      if (bid.nameRaw.byteLength === 33 && bid.nameRaw[0] === 0x62) {
        const bidder = algosdk.encodeAddress(bid.nameRaw.slice(1))
        const bidData = await algokit.getAppBoxValue(bidContract, bid.nameRaw, algod)

        const bidAmount = algosdk.decodeUint64(bidData.slice(0, 8), 'safe')
        const bidTime = algosdk.decodeUint64(bidData.slice(8, 16), 'safe')

        const bidding: Bid = {
          bidder,
          bidAmount,
          bidTime,
        }

        allBids.push(bidding)
      }
    }
    return allBids
  } catch (e) {
    // console.log(e)
    return []
  }
}

//! ger user claimable nfts from auction
export const getAllUserClaimable = async (user: string, signer: TransactionSigner) => {
  try {
    const auctions = await getAllAuctions()
    // Phase 6: status 1 = active auction
    const claimable = auctions
      .filter((item) => item?.status === 1 || item?.isListed)
      .filter((item) => item.highestBidder === user && item.biddingEndTime < Math.floor(Date.now() / 1000))
    return claimable
  } catch (error) {
    return error
  }
}

export const getAllUserAuctions = async (user: string, signer: TransactionSigner) => {
  try {
    const allAuctions = await getAllAuctions()
    const userAuctions = allAuctions.filter((item) => item.sellerId === user)
    return userAuctions
  } catch (error) {
    return error
  }
}

interface Bid {
  bidder: string
  bidAmount: number
  bidTime: number
}
