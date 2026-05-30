// @ts-ignore
import * as algokit from '@algorandfoundation/algokit-utils'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { AppDetails } from '@algorandfoundation/algokit-utils/types/app-client'
import algosdk, { Transaction, TransactionSigner } from 'algosdk'
import { AUCTION_ID, createFryAuctionClient } from './auctionMethod'
import { FryMarketClient } from './contracts/FryMarket'
import { getAlgodConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'
import { getCollectionByNftId } from './utils/network/helper'

// const FRY_MARKET_ID: bigint = 729430779n;
// Access environment variables
const FEE_WALLET = import.meta.env.VITE_FEE_WALLET
const FRY_TOKEN_ID = BigInt(import.meta.env.VITE_FRY_TOKEN_ID) // Testnet FRY_TOKEN_ID
const FRY_MARKET_ID = BigInt(import.meta.env.VITE_FRY_MARKET_ID)
const FRY_MARKET_ADDRESS: string = algosdk.getApplicationAddress(FRY_MARKET_ID)

const PRIMARY_FEE: number = 300 // 100 represent 1% & 10000 represent 100%
const SECONDARY_FEE: number = 100 // 100 represent 1% & 10000 represent 100%
// const FEE_WALLET: string = "TINQ25R3FHBYQ66ONTOQTHRNGKC73HTQKJCIVEJGEGPDQPVDCHAWRRPJEQ"; //Testnet
// // const FRY_TOKEN_ID: bigint = 717187263n; //Testnet
// const FEE_WALLET: string = "ATPVJYGEGP5H6GCZ4T6CG4PK7LH5OMWXHLXZHDPGO7RO6T3EHWTF6UUY6E"; // Mainnet
// // const FRY_TOKEN_ID: bigint = 2485314946n; //Mainnet
// const FRY_TOKEN_ID: bigint = 66935995n; //Testnet

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

const createFryMarketClient = async (signer: TransactionSigner, activeAddress: string, appId?: number) => {
  algokit.Config.configure({ populateAppCallResources: true })

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algorandClient: algokit.AlgorandClient = algokit.AlgorandClient.fromConfig({ algodConfig })
  algorandClient.setDefaultSigner(signer)

  const algodClient = algokit.getAlgoClient({
    server: algodConfig.server,
    port: algodConfig.port,
    token: algodConfig.token,
  })

  const marketClient = new FryMarketClient(
    {
      resolveBy: 'id',
      id: appId ?? FRY_MARKET_ID,
      sender: { addr: activeAddress!, signer },
    },
    algorandClient.client.algod,
  )

  return { marketClient, algorandClient, algodClient }
}

export const deployMarketplace = async (sender: string, signer: TransactionSigner, feePercent: number) => {
  try {
    const indexer = await getIndexerClient()

    const algodClient = await getAlgodClient()
    const appDetails = {
      resolveBy: 'creatorAndName',
      sender: { signer, addr: sender } as TransactionSignerAccount,
      creatorAddress: sender,
      findExistingUsing: indexer,
    } as AppDetails

    const marketplace = new FryMarketClient(appDetails, algodClient)

    const market = await marketplace.create
      .create({ fryId: FRY_TOKEN_ID, primaryFee: BigInt(PRIMARY_FEE), secondaryFee: BigInt(SECONDARY_FEE) })
      .then((res) => {
        // console.log(res)
        return res
      })
      .catch((e) => {
        // console.log(e)
        return e
      })

    const { marketClient, algorandClient } = await createFryMarketClient(signer, sender, market.appId)

    await algorandClient.send.payment({
      sender,
      receiver: algosdk.getApplicationAddress(market.appId),
      amount: algokit.algos(0.1 + 0.1),
      extraFee: algokit.algos(0.001),
    })
    if (market?.appId) {
      const mbrPay = await algorandClient.transactions.payment({
        sender,
        receiver: algosdk.getApplicationAddress(market?.appId),
        amount: algokit.algos(0.1),
        extraFee: algokit.algos(0.002),
        signer,
      })
      const optInAsset = await marketClient.assetOptIn({ asset: FRY_TOKEN_ID }, { sendParams: { fee: algokit.algos(0.002) } }).then((res) => { })
      // console.log('optInAsset', optInAsset)
    }
    return market
  } catch (e) {
    console.log(e)
  }
}
export const optInAsset = async (sender: string, signer: TransactionSigner) => {
  try {
    const { marketClient, algodClient } = await createFryMarketClient(signer, sender, Number(FRY_MARKET_ID))

    // Already-opted guard
    try {
      await algodClient.accountAssetInformation(FRY_MARKET_ADDRESS, Number(FRY_TOKEN_ID)).do()
      console.log('App already opted into asset', Number(FRY_TOKEN_ID))
      return true
    } catch (e: any) {
      if (e.status !== 404 && !(e.message?.includes('asset info not found'))) throw e
    }

    // Atomic group: 100k MBR payment + asset_opt_in call
    // Fee: payment 1,000 (base) + call 2,000 (self + inner AssetTransfer) = 3,000 total
    const suggestedParams = await algodClient.getTransactionParams().do()
    const atc = new algosdk.AtomicTransactionComposer()

    const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: sender,
      to: FRY_MARKET_ADDRESS,
      amount: 100000,
      suggestedParams,
    })
    atc.addTransaction({ txn: paymentTxn, signer })

    atc.addMethodCall({
      suggestedParams: { ...suggestedParams, fee: 2000, flatFee: true },
      appID: Number(FRY_MARKET_ID),
      method: marketClient.appClient.getABIMethod('asset_opt_in')!,
      methodArgs: [Number(FRY_TOKEN_ID)],
      sender,
      signer,
      appForeignAssets: [Number(FRY_TOKEN_ID)],
    })

    await atc.execute(algodClient, 4)
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

export const batchOptInAssets = async (
  sender: string,
  signer: TransactionSigner,
  assetIds: number[]
) => {
  try {
    const { marketClient, algodClient } = await createFryMarketClient(signer, sender, Number(FRY_MARKET_ID))

    // Filter already-opted assets
    const toOptIn: number[] = []
    const skipped: number[] = []
    for (const assetId of assetIds) {
      try {
        await algodClient.accountAssetInformation(FRY_MARKET_ADDRESS, assetId).do()
        skipped.push(assetId)
      } catch {
        toOptIn.push(assetId)
      }
    }

    if (toOptIn.length === 0) {
      console.log('All assets already opted in', skipped)
      return { opted: [] as number[], skipped }
    }

    // Atomic group: N × (100k MBR payment + asset_opt_in call)
    // Fee per pair: payment 1,000 (base) + call 2,000 = 3,000. Group total = N × 3,000
    const suggestedParams = await algodClient.getTransactionParams().do()
    const atc = new algosdk.AtomicTransactionComposer()

    for (const assetId of toOptIn) {
      const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender,
        to: FRY_MARKET_ADDRESS,
        amount: 100000,
        suggestedParams,
      })
      atc.addTransaction({ txn: paymentTxn, signer })

      atc.addMethodCall({
        suggestedParams: { ...suggestedParams, fee: 2000, flatFee: true },
        appID: Number(FRY_MARKET_ID),
        method: marketClient.appClient.getABIMethod('asset_opt_in')!,
        methodArgs: [assetId],
        sender,
        signer,
        appForeignAssets: [assetId],
      })
    }

    await atc.execute(algodClient, 4)
    return { opted: toOptIn, skipped }
  } catch (e) {
    console.log(e)
    return { opted: [] as number[], skipped: [] as number[], error: e }
  }
}

export const createCollection = async (sender: string, signer: TransactionSigner, collectionId: number, creator: string) => {
  try {
    const { marketClient, algorandClient, algodClient } = await createFryMarketClient(signer, sender)
    const atc = new algosdk.AtomicTransactionComposer()
    const suggestedParams = await algodClient.getTransactionParams().do()

    // MBR for collection box (prefix 'c' + 8-byte uint64 key + 32-byte address value = 41 bytes)
    const mbrPay = await algorandClient.transactions.payment({
      sender,
      signer,
      amount: algokit.microAlgos(2500 + 400 * (1 + 8 + 32)),
      receiver: FRY_MARKET_ADDRESS,
    })
    atc.addTransaction({ txn: mbrPay, signer })

    atc.addMethodCall({
      suggestedParams,
      appID: Number(FRY_MARKET_ID),
      method: marketClient.appClient.getABIMethod('create_collection')!,
      methodArgs: [collectionId, creator],
      sender,
      signer,
      boxes: [
        {
          appIndex: Number(FRY_MARKET_ID),
          name: new Uint8Array([0x63, ...algosdk.encodeUint64(collectionId)]),
        },
      ],
    })

    const result = await atc.execute(algodClient, 4)
    console.log(result)
    return result
  } catch (e) {
    console.log(e)
    return false
  }
}
//!Marketplace functions
const BOX_PRICE = 2500 + 400 * 89
export const listNft = async (sender: string, assetId: bigint, signer: TransactionSigner, price: number) => {
  try {
    // console.log(sender, assetId, signer, price)
    const { marketClient, algorandClient, algodClient } = await createFryMarketClient(signer, sender)

    const accountInfo = await algodClient.accountInformation(FRY_MARKET_ADDRESS).do()
    const hasOptedIn = accountInfo.assets.some((asset: any) => asset['asset-id'] === parseInt(assetId?.toString()))

    const atc = new algosdk.AtomicTransactionComposer()
    const suggestedParams = await algodClient.getTransactionParams().do()

    if (!hasOptedIn) {
      const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender,
        suggestedParams,
        to: FRY_MARKET_ADDRESS,
        amount: 200000,
      })
      atc.addTransaction({ txn: paymentTxn, signer: signer })

      atc.addMethodCall({
        suggestedParams: { ...suggestedParams, fee: 2000, flatFee: true },
        appID: Number(FRY_MARKET_ID),
        method: marketClient.appClient.getABIMethod('asset_opt_in')!,
        methodArgs: [Number(assetId)],
        sender: sender,
        signer: signer,
        appForeignAssets: [Number(assetId)],
      })
    }

    const assetTransferTx = await algorandClient.transactions.assetTransfer({
      sender,
      receiver: algosdk.getApplicationAddress(FRY_MARKET_ID),
      assetId: assetId,
      amount: BigInt(1),
      signer,
    })

    // Check if listing box already exists (determines MBR payment)
    const boxName = new Uint8Array([0x6C, ...algosdk.encodeUint64(assetId)])
    let boxAmount = 0
    const box = await algokit
      .getAppBoxValue(FRY_MARKET_ID, boxName, algodClient)
      .then((res) => res)
      .catch(() => {
        return null
      })
    if (!box) {
      boxAmount = BOX_PRICE
    }

    // MBR payment for box creation (separate from method call)
    if (boxAmount > 0) {
      const boxPay = await algorandClient.transactions.payment({
        sender,
        receiver: algosdk.getApplicationAddress(FRY_MARKET_ID),
        amount: algokit.microAlgos(boxAmount),
        signer,
      })
      atc.addTransaction({ txn: boxPay, signer })
    }

    atc.addMethodCall({
      suggestedParams: { ...suggestedParams, fee: 2000, flatFee: true },
      appID: Number(FRY_MARKET_ID),
      method: marketClient.appClient.getABIMethod('list_asset')!,
      methodArgs: [
        Number(assetId),
        BigInt(price),
        BigInt(0), // collection_id (default)
        BigInt(0), // is_primary (default)
        { txn: assetTransferTx, signer },
      ],
      sender: sender,
      signer: signer,
      appForeignAssets: [Number(assetId)],
      boxes: [
        {
          appIndex: Number(FRY_MARKET_ID),
          name: boxName,
        },
      ],
    })
    // console.log('before execute')
    const result = await atc.execute(algodClient, 4)

    return true
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const addCollectionRoyalty = async (sender: string, signer: TransactionSigner, royaltyBasis: number, collectionId: number) => {
  try {
    const { marketClient, algorandClient, algodClient } = await createFryMarketClient(signer, sender)
    const { auctionClient } = await createFryAuctionClient(signer, sender)
    const atc = new algosdk.AtomicTransactionComposer()
    const suggestedParams = await algodClient.getTransactionParams().do()

    // MBR for royalty box on market contract (prefix 'r' + 32-byte address = 33 bytes key, 8 bytes value)
    const marketBoxPay = await algorandClient.transactions.payment({
      sender,
      signer,
      amount: algokit.microAlgos(2500 + 400 * (33 + 8)),
      receiver: FRY_MARKET_ADDRESS,
    })
    atc.addTransaction({ txn: marketBoxPay, signer })

    atc.addMethodCall({
      suggestedParams,
      appID: Number(FRY_MARKET_ID),
      method: marketClient.appClient.getABIMethod('add_royalty')!,
      methodArgs: [collectionId, royaltyBasis * 100],
      sender: sender,
      signer: signer,
      boxes: [
        {
          appIndex: Number(FRY_MARKET_ID),
          name: new Uint8Array([0x72, ...algosdk.decodeAddress(sender).publicKey]),
        },
        {
          appIndex: Number(FRY_MARKET_ID),
          name: new Uint8Array([0x63, ...algosdk.encodeUint64(collectionId)]),
        },
      ],
    })

    // MBR for royalty box on auction contract
    const auctionBoxPay = await algorandClient.transactions.payment({
      sender,
      signer,
      amount: algokit.microAlgos(2500 + 400 * (33 + 8)),
      receiver: algosdk.getApplicationAddress(AUCTION_ID),
    })
    atc.addTransaction({ txn: auctionBoxPay, signer })

    atc.addMethodCall({
      suggestedParams,
      appID: Number(AUCTION_ID),
      method: auctionClient.appClient.getABIMethod('add_royalty')!,
      methodArgs: [collectionId, royaltyBasis * 100],
      sender: sender,
      signer: signer,
      boxes: [
        {
          appIndex: Number(AUCTION_ID),
          name: new Uint8Array([0x72, ...algosdk.decodeAddress(sender).publicKey]),
        },
        {
          appIndex: Number(AUCTION_ID),
          name: new Uint8Array([0x63, ...algosdk.encodeUint64(collectionId)]),
        },
      ],
    })

    const result = await atc.execute(algodClient, 4)
    console.log(result)
    return result
  } catch (e) {
    console.log(e)
    return false
  }
}

export const updateNftListPrice = async (sender: string, assetId: bigint, signer: TransactionSigner, newPrice: number) => {
  const { marketClient } = await createFryMarketClient(signer, sender)
  const buyTxn = await marketClient.updatePrice({ asset: assetId, newPrice: BigInt(newPrice) })
  // console.log(buyTxn.transaction)
}

export const cancelList = async (sender: string, assetId: bigint, signer: TransactionSigner) => {
  const { marketClient } = await createFryMarketClient(signer, sender)
  const cancelTxn = await marketClient.cancelList({ asset: assetId }, { sendParams: { fee: algokit.algos(0.002) } })
  // console.log(cancelTxn.transaction)
  return true
}

export const buyNftWithRoyalty = async (sender: string, assetId: bigint, signer: TransactionSigner, seller: string, price: number) => {
  try {
    const { marketClient, algorandClient, algodClient } = await createFryMarketClient(signer, sender)
    const atc = new algosdk.AtomicTransactionComposer()
    const suggestedParams = await algodClient.getTransactionParams().do()
    // Extra fee for inner txns: royalty payment + seller payment + NFT transfer = 3 inner txns
    suggestedParams.fee = 5000
    suggestedParams.flatFee = true

    const accountInfo = await algodClient.accountInformation(sender).do()
    const hasOptedIn = accountInfo.assets.some((asset: any) => asset['asset-id'] === parseInt(assetId.toString()))

    if (!hasOptedIn) {
      const opIn = await algorandClient.transactions.assetOptIn({
        assetId,
        sender,
        extraFee: algokit.algos(0.001),
      })
      atc.addTransaction({ txn: opIn, signer: signer })
    }

    // Phase 6: ALGO payment to app address — contract handles fee/royalty splits internally
    const algoPayment = await algorandClient.transactions.payment({
      sender,
      receiver: FRY_MARKET_ADDRESS,
      amount: algokit.microAlgos(price),
      signer,
    })

    // Listing box name with 'l' prefix
    const boxName = new Uint8Array([0x6C, ...algosdk.encodeUint64(assetId)])

    atc.addMethodCall({
      suggestedParams,
      appID: Number(FRY_MARKET_ID),
      method: marketClient.appClient.getABIMethod('buy_nft_royalty')!,
      methodArgs: [Number(assetId), { txn: algoPayment, signer }],
      sender: sender,
      signer: signer,
      appForeignAssets: [Number(assetId)],
      boxes: [
        {
          appIndex: Number(FRY_MARKET_ID),
          name: boxName,
        },
      ],
    })

    const result = await atc.execute(algodClient, 4)
  } catch (e) {
    console.log(e)
    throw e
  }
}

export interface Listing {
  assetId: number
  seller: string
  price: number
  status: number // 1=listed, 2=sold (box deleted on cancel)
  listTime: number
  imgUrl: string
  name: string
  isListed: boolean // derived: status === 1
  isSold: boolean // derived: status === 2
  isCancelled: boolean // always false in Phase 6 (box deleted on cancel)
  collectionData: unknown
  collection_id: number
  is_primary: number
}

export const getAllListed = async (): Promise<Listing[]> => {
  const algod = await getAlgodClient()
  const listings: Listing[] = []
  const boxes = await algokit.getAppBoxNames(FRY_MARKET_ID, algod)
  // Phase 6: listing boxes have 'l' prefix (0x6C) + 8-byte uint64 key = 9 bytes
  const filteredBoxes = boxes.filter((bx) => bx.nameRaw.byteLength == 9 && bx.nameRaw[0] === 0x6C)
  await Promise.all(
    filteredBoxes.map(async (bx) => {
      const box = await algokit.getAppBoxValue(FRY_MARKET_ID, bx.nameRaw, algod)
      const decoded = algosdk.decodeUint64(bx.nameRaw.slice(1), 'safe')
      const nftData = await algod.getAssetByID(decoded).do()
      const sellerId = algosdk.encodeAddress(box.slice(0, 32))
      const listedPrice = algosdk.decodeUint64(box.slice(32, 40), 'mixed')
      const status = Number(algosdk.decodeUint64(box.slice(40, 48), 'mixed'))
      const listTime = algosdk.decodeUint64(box.slice(48, 56), 'mixed')
      const collectionId = Number(algosdk.decodeUint64(box.slice(56, 64), 'mixed'))
      const isPrimary = Number(algosdk.decodeUint64(box.slice(64, 72), 'mixed'))
      const collectionData = await getCollectionByNftId(nftData.index)
      const listingData: Listing = {
        assetId: decoded,
        seller: sellerId,
        price: Number(listedPrice),
        status,
        listTime: Number(listTime),
        isListed: status === 1,
        isSold: status === 2,
        isCancelled: false,
        name: nftData?.params?.name,
        imgUrl: nftData?.params?.url,
        collectionData,
        collection_id: collectionId,
        is_primary: isPrimary,
      }
      listings.push(listingData)
    }),
  )

  return listings
}

export const getSingleNftlistData = async (nftId: number): Promise<Listing> => {
  const algod = await getAlgodClient()
  // Phase 6: box name = prefix 'l' (0x6C) + uint64 key
  const boxId = new Uint8Array([0x6C, ...algosdk.encodeUint64(nftId)])
  const box = await algokit.getAppBoxValue(FRY_MARKET_ID, boxId, algod)
  const nftData = await algod.getAssetByID(nftId).do()
  const sellerId = algosdk.encodeAddress(box.slice(0, 32))
  const listedPrice = algosdk.decodeUint64(box.slice(32, 40), 'mixed')
  const status = Number(algosdk.decodeUint64(box.slice(40, 48), 'mixed'))
  const listTime = algosdk.decodeUint64(box.slice(48, 56), 'mixed')
  const collectionId = Number(algosdk.decodeUint64(box.slice(56, 64), 'mixed'))
  const isPrimary = Number(algosdk.decodeUint64(box.slice(64, 72), 'mixed'))
  const collectionData = await getCollectionByNftId(nftData.index)
  const listingData: Listing = {
    assetId: nftId,
    seller: sellerId,
    price: Number(listedPrice),
    status,
    listTime: Number(listTime),
    isListed: status === 1,
    isSold: status === 2,
    isCancelled: false,
    name: nftData?.params?.name,
    imgUrl: nftData?.params?.url,
    collectionData,
    collection_id: collectionId,
    is_primary: isPrimary,
  }

  return listingData
}

export const mintMultipleNft = async (
  metaUris: any,
  sender: string,
  signer: TransactionSigner,
  signTransactions: any,
  sendTransactions: any,
  collectionAddress: any,
): Promise<Uint8Array[]> => {
  try {
    const { algorandClient } = await createFryMarketClient(signer, sender)
    const txnArray: Transaction[] = []
    for (let i = 0; i < metaUris.length; i++) {
      const mintTx = await algorandClient.transactions.assetCreate({
        assetName: `${metaUris[i].name} #${i.toString()}`,

        // unitName: metaUris[i].name,
        url: metaUris[i].image,
        decimals: 0,
        total: BigInt(1),
        manager: sender,
        reserve: sender,
        sender,
      })
      // console.log('mintTx', mintTx)
      txnArray.push(mintTx)
    }
    // console.log('txnArray', txnArray)
    const txnGroup = algosdk.assignGroupID(txnArray)
    const encodedTransaction: Uint8Array[] = []
    txnGroup.map((tx: Transaction) => {
      // console.log('tx', tx)
      const newEncodedtx = algosdk.encodeUnsignedTransaction(tx)
      // console.log('newEncodedtx', newEncodedtx)
      encodedTransaction.push(newEncodedtx)
    })

    const signedTransactions = await signTransactions(encodedTransaction)
    // console.log('signedTransactions', signedTransactions)
    const waitRoundsToConfirm = 4
    const result = await sendTransactions(signedTransactions, waitRoundsToConfirm)
    // console.log(result)
    return result
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const getAllCollectionNft = async (sender: string) => {
  const indexer = await getIndexerClient()
  const nfts: any = await algokit.lookupAccountByAddress(sender, indexer)
  const createdNft: any = nfts['created-assets']
  const collection = createdNft.length > 0 ? createdNft.filter((item: any) => item.params.decimals === 0 && item.params.total === 1) : []
  return collection
}

export const getAllNfts = async (sender: string) => {
  const indexer = await getIndexerClient()
  const nfts: any = await algokit.lookupAccountByAddress(sender, indexer)

  const createdNft: any = nfts['assets']
  const collection = createdNft.length > 0 ? createdNft.filter((item: any) => item.params.decimals === 0 && item.params.total === 1) : []
  const algod = await getAlgodClient()
  const boxes = await algokit.getAppBoxNames(FRY_MARKET_ID, algod)
  const filteredBoxes = boxes.filter((bx) => bx.nameRaw.byteLength == 9 && bx.nameRaw[0] === 0x6C)
  for (const listBox of filteredBoxes) {
    for (let i = 0; i < collection.length; i++) {
      const decoded = algosdk.decodeUint64(listBox.nameRaw.slice(1), 'safe')
      if (decoded === collection[i].index) {
        const box = await algokit.getAppBoxValue(FRY_MARKET_ID, listBox.nameRaw, algod)
        const nftData = await algod.getAssetByID(decoded).do()
        const sellerId = algosdk.encodeAddress(box.slice(0, 32))
        const listedPrice = algosdk.decodeUint64(box.slice(32, 40), 'mixed')
        const status = Number(algosdk.decodeUint64(box.slice(40, 48), 'mixed'))
        const listTime = algosdk.decodeUint64(box.slice(48, 56), 'mixed')
        const collectionId = Number(algosdk.decodeUint64(box.slice(56, 64), 'mixed'))
        const isPrimary = Number(algosdk.decodeUint64(box.slice(64, 72), 'mixed'))
        const collectionData = await getCollectionByNftId(nftData.index)

        const listingData: Listing = {
          assetId: decoded,
          seller: sellerId,
          price: Number(listedPrice),
          status,
          listTime: Number(listTime),
          isListed: status === 1,
          isSold: status === 2,
          isCancelled: false,
          name: nftData?.params?.name,
          imgUrl: nftData?.params?.url,
          collectionData,
          collection_id: collectionId,
          is_primary: isPrimary,
        }
        collection[i] = {
          ...collection[i],
          params: {
            ...collection[i].params,
            ...listingData,
          },
        }
      }
    }
  }
  return collection
}
export const getAllCollectionWListed = async (sender: string) => {
  const indexer = await getIndexerClient()
  const nfts: any = await algokit.lookupAccountByAddress(sender, indexer)
  const createdNft: any = nfts['created-assets']
  const collection = createdNft.length > 0 ? createdNft.filter((item: any) => item.params.decimals === 0 && item.params.total === 1) : []
  const algod = await getAlgodClient()
  const boxes = await algokit.getAppBoxNames(FRY_MARKET_ID, algod)
  const filteredBoxes = boxes.filter((bx) => bx.nameRaw.byteLength == 9 && bx.nameRaw[0] === 0x6C)
  for (const listBox of filteredBoxes) {
    for (let i = 0; i < collection.length; i++) {
      const decoded = algosdk.decodeUint64(listBox.nameRaw.slice(1), 'safe')
      if (decoded === collection[i].index) {
        const box = await algokit.getAppBoxValue(FRY_MARKET_ID, listBox.nameRaw, algod)
        const nftData = await algod.getAssetByID(decoded).do()
        const sellerId = algosdk.encodeAddress(box.slice(0, 32))
        const listedPrice = algosdk.decodeUint64(box.slice(32, 40), 'mixed')
        const status = Number(algosdk.decodeUint64(box.slice(40, 48), 'mixed'))
        const listTime = algosdk.decodeUint64(box.slice(48, 56), 'mixed')
        const collectionId = Number(algosdk.decodeUint64(box.slice(56, 64), 'mixed'))
        const isPrimary = Number(algosdk.decodeUint64(box.slice(64, 72), 'mixed'))
        const collectionData = await getCollectionByNftId(nftData.index)

        const listingData: Listing = {
          assetId: decoded,
          seller: sellerId,
          price: Number(listedPrice),
          status,
          listTime: Number(listTime),
          isListed: status === 1,
          isSold: status === 2,
          isCancelled: false,
          name: nftData?.params?.name,
          imgUrl: nftData?.params?.url,
          collectionData,
          collection_id: collectionId,
          is_primary: isPrimary,
        }
        collection[i] = {
          ...collection[i],
          params: {
            ...collection[i].params,
            ...listingData,
          },
        }
      }
    }
  }
  return collection
}

export const getAllListedByUser = async (user: string): Promise<Listing[]> => {
  // console.log('user', user)
  const algod = await getAlgodClient()
  const listings: Listing[] = []
  const boxes = await algokit.getAppBoxNames(FRY_MARKET_ID, algod)
  const filteredBoxes = boxes.filter((bx) => bx.nameRaw.byteLength == 9 && bx.nameRaw[0] === 0x6C)
  await Promise.all(
    filteredBoxes.map(async (bx) => {
      const decoded = algosdk.decodeUint64(bx.nameRaw.slice(1), 'safe')
      const box = await algokit.getAppBoxValue(FRY_MARKET_ID, bx.nameRaw, algod)
      const nftData = await algod.getAssetByID(decoded).do()
      const sellerId = algosdk.encodeAddress(box.slice(0, 32))
      const listedPrice = algosdk.decodeUint64(box.slice(32, 40), 'mixed')
      const status = Number(algosdk.decodeUint64(box.slice(40, 48), 'mixed'))
      const listTime = algosdk.decodeUint64(box.slice(48, 56), 'mixed')
      const collectionId = Number(algosdk.decodeUint64(box.slice(56, 64), 'mixed'))
      const isPrimary = Number(algosdk.decodeUint64(box.slice(64, 72), 'mixed'))
      const collectionData = await getCollectionByNftId(nftData.index)

      const listingData: Listing = {
        assetId: decoded,
        seller: sellerId,
        price: Number(listedPrice),
        status,
        listTime: Number(listTime),
        isListed: status === 1,
        isSold: status === 2,
        isCancelled: false,
        name: nftData?.params?.name,
        imgUrl: nftData?.params?.url,
        collectionData,
        collection_id: collectionId,
        is_primary: isPrimary,
      }
      if (listingData.seller === user && listingData.isListed === true) {
        listings.push(listingData)
      }
    }),
  )
  return listings
}

export const getMarkeGlobalState = async (): Promise<Listing[]> => {
  const algod = await getAlgodClient()
  const listings: Listing[] = []
  const boxes = await algokit.getAppGlobalState(FRY_MARKET_ID, algod)

  return listings
}

export const getRoyalty = async (collection: string) => {
  const algod = await getAlgodClient()
  const box = await algokit.getAppBoxValue(FRY_MARKET_ID, new Uint8Array([0x72, ...algosdk.decodeAddress(collection).publicKey]), algod)
  const royaltPercent = algosdk.decodeUint64(box.slice(0, 8), 'mixed')
  return royaltPercent
}

//! Transaction for fee
export const trasnferFee = async (amount: number, sender: string, signer: TransactionSigner) => {
  try {
    const { algorandClient } = await createFryMarketClient(signer, sender)
    const tx = await algorandClient.send.assetTransfer({
      sender,
      assetId: FRY_TOKEN_ID,
      receiver: FEE_WALLET,
      amount: BigInt(amount),
    })

    return tx
  } catch (e) {
    console.log(e)
    return e
  }
}

//! Get all nfts in wallet
export const getAllUserNfts = async (user: string) => {
  const indexer = await getIndexerClient()
  // console.log('user', user)
  const algodClient = await getAlgodClient()

  // const accountInfoTemp = await algodClient.accountInformation(user).do()
  // console.log("accountInfoTemp", accountInfoTemp)
  const nfts: any = await algokit.lookupAccountByAddress(user, indexer)
  // console.log('owned nfts', nfts)
  const nftsbyUnitName = nfts['created-assets'].filter((asset: any) => asset.params['unit-name'] === 'collectionName')
  // console.log('nftsbyUnitName', nftsbyUnitName)
  const assets: Asset[] = nfts.assets.filter((nft: Asset) => !nft['is-frozen'] && nft.amount === 1)
  const allNfts: Record<string, any>[] = []
  await Promise.all(
    assets.map(async (asset: Asset) => {
      const nftData: Record<string, any> = await indexer.lookupAssetByID(asset['asset-id']).do()
      allNfts.push({ nftAddress: nftData.index, ...nftData.params })
    }),
  )
  return allNfts
}

// Function to get NFTs from a group ID
export const getNFTsFromGroupId = async (id: any) => {
  try {
    // Step 1: Query transactions by group ID
    const indexer = new algosdk.Indexer('', import.meta.env.VITE_INDEXER_SERVER, '')
    const algodClient = await getAlgodClient()

    const groupTransactions = await algodClient.getBlockTxids(id).do()

    const nftDetails = []
    for (let i = 0; i < groupTransactions.blockTxids.length; i++) {
      const transactionDetails = await indexer.lookupTransactionByID(groupTransactions.blockTxids[i]).do()
      if (transactionDetails?.transaction['asset-config-transaction']?.params) {
        nftDetails.push(transactionDetails.transaction['asset-config-transaction'].params)
        nftDetails[nftDetails.length - 1]['nftAddress'] = transactionDetails.transaction['created-asset-index']
      }
    }

    // // Step 2: Filter for asset creation or transfer transactions

    return nftDetails
  } catch (error) {
    console.error('Error fetching NFTs from group ID:', error)
    return []
  }
}

// Example usage

//! get user balance

export const userFryBalance = async (user: string): Promise<number> => {
  const indexer = await getIndexerClient()
  const nfts: any = await algokit.lookupAccountByAddress(user, indexer)
  const asset: Asset = nfts.assets.filter((nft: Asset) => nft['asset-id'] === parseInt(FRY_TOKEN_ID.toString()))[0]
  return asset.amount
}

//! get fry fee for nft minting and imagegeneration

export const getImgGenFee = async (isCollection: boolean, numofimgs: number, signer: TransactionSigner, sender: string) => {
  // Ensure FEE_WALLET is loaded, it's defined at the top of your file
  if (!FEE_WALLET) {
    throw new Error('FEE_WALLET is not defined. Check your environment variables.')
  }
  if (!sender || sender === '123') {
    // Assuming "123" is a placeholder for an invalid/uninitialized sender
    throw new Error('Invalid sender address provided for fee transaction.')
  }

  const TARGET_USD_PER_IMAGE = 0.17 // Fixed USD cost per image

  // Function to get real-time FRY price in USD
  const getFryPrice = async (): Promise<number> => {
    try {
      // Using CoinGecko API for FRY token price
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=FRY&vs_currencies=usd')
      const data = await response.json()

      if (data.fry && data.fry.usd) {
        return data.fry.usd
      } else {
        throw new Error('Invalid FRY price data received')
      }
    } catch (error) {
      console.error('Error fetching FRY price:', error)
      // Fallback to a reasonable default price if API fails
      console.warn('Using fallback FRY price of $0.108635')
      return 0.108635
    }
  }

  const { algorandClient } = await createFryMarketClient(signer, sender)

  // Get sender's account information to check FRY balance
  const accountInfo = await algorandClient.account.getInformation(sender)
  const fryAsset = accountInfo.assets?.find(asset => asset.assetId === Number(FRY_TOKEN_ID))

  if (!fryAsset) {
    throw new Error('FRY token not found in wallet. Please opt-in to FRY token first.')
  }

  const fryBalance = fryAsset.amount // Balance in smallest FRY units

  try {
    const fryPrice = await getFryPrice()
    console.log(`Current FRY price: $${fryPrice}`)

    const fryPerImage = TARGET_USD_PER_IMAGE / fryPrice
    console.log(`Calculated ${fryPerImage.toFixed(6)} FRY per image (${TARGET_USD_PER_IMAGE} USD)`)

    let totalFeeInFry: number
    let totalFeeInMicroFry: bigint

    if (isCollection) {
      totalFeeInFry = fryPerImage * numofimgs
      totalFeeInMicroFry = BigInt(Math.floor(totalFeeInFry * 1000000)) // Assuming FRY has 6 decimals

      console.log(`Collection fee: ${totalFeeInFry.toFixed(6)} FRY for ${numofimgs} images`)

      if (totalFeeInMicroFry > BigInt(fryBalance)) {
        throw new Error('Not Enough FRY Balance')
      }

      // Using FRY token transfer instead of ALGO payment
      const txResult = await algorandClient.send.assetTransfer({
        sender,
        receiver: FEE_WALLET,
        assetId: FRY_TOKEN_ID,
        amount: totalFeeInMicroFry,
        note: `Image generation fee for collection: ${numofimgs} images at $${TARGET_USD_PER_IMAGE}/image (FRY)`,
      })
      return txResult
    } else {
      if (numofimgs > 1) {
        throw new Error('Please select a valid number of images for a single NFT (should be 1)')
      }

      totalFeeInFry = fryPerImage * numofimgs // numofimgs should be 1 here
      totalFeeInMicroFry = BigInt(Math.floor(totalFeeInFry * 1000000)) // Assuming FRY has 6 decimals

      console.log(`Single NFT fee: ${totalFeeInFry.toFixed(6)} FRY for ${numofimgs} image`)

      if (totalFeeInMicroFry > BigInt(fryBalance)) {
        throw new Error('Not Enough FRY Balance')
      }

      const txResult = await algorandClient.send.assetTransfer({
        sender,
        receiver: FEE_WALLET,
        assetId: FRY_TOKEN_ID,
        amount: totalFeeInMicroFry,
        note: `Image generation fee for single NFT at $${TARGET_USD_PER_IMAGE} (FRY)`,
      })
      return txResult
    }
  } catch (error) {
    console.error('Error processing fee payment:', error)

    // Fallback to fixed FRY amount if price fetching fails
    const fallbackFryAmount = 1.565 // Approximately 0.17 USD at $0.108635 per FRY
    console.warn(`Using fallback fee of ${fallbackFryAmount} FRY per image`)

    let totalFeeInFry: number
    let totalFeeInMicroFry: bigint

    if (isCollection) {
      totalFeeInFry = fallbackFryAmount * numofimgs
    } else {
      if (numofimgs > 1) {
        throw new Error('Please select a valid number of images for a single NFT (should be 1)')
      }
      totalFeeInFry = fallbackFryAmount * numofimgs
    }

    totalFeeInMicroFry = BigInt(Math.floor(totalFeeInFry * 1000000))

    if (totalFeeInMicroFry > BigInt(fryBalance)) {
      throw new Error('Not Enough FRY Balance')
    }

    const txResult = await algorandClient.send.assetTransfer({
      sender,
      receiver: FEE_WALLET,
      assetId: FRY_TOKEN_ID,
      amount: totalFeeInMicroFry,
      note: `Image generation fee (fallback FRY pricing): ${numofimgs} images`,
    })
    return txResult
  }
}

export const getImgGenFeeAmount = async (
  isCollection: boolean,
  numofimgs: number,
  signer?: TransactionSigner,
  sender?: string,
): Promise<number> => {
  // This function calculates the fee in FRY tokens for display purposes.

  const TARGET_USD_PER_IMAGE = 0.17 // Fixed USD cost per image

  // Function to get real-time FRY price in USD
  const getFryPrice = async (): Promise<number> => {
    try {
      // Using CoinGecko API for FRY token price
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=FRY&vs_currencies=usd')
      const data = await response.json()

      if (data.fry && data.fry.usd) {
        return data.fry.usd
      } else {
        throw new Error('Invalid FRY price data received')
      }
    } catch (error) {
      console.error('Error fetching FRY price:', error)
      // Fallback to a reasonable default price if API fails
      console.warn('Using fallback FRY price of $0.108635')
      return 0.108635
    }
  }

  try {
    const fryPrice = await getFryPrice()
    console.log(`Current FRY price: $${fryPrice}`)

    const fryPerImage = TARGET_USD_PER_IMAGE / fryPrice
    console.log(`Calculated ${fryPerImage.toFixed(6)} FRY per image (${TARGET_USD_PER_IMAGE} USD)`)

    if (isCollection) {
      const totalFeeInFry = fryPerImage * numofimgs
      console.log(`Collection fee: ${totalFeeInFry.toFixed(6)} FRY for ${numofimgs} images`)
      return parseFloat(totalFeeInFry.toFixed(6))
    } else {
      // For single NFT
      if (numofimgs <= 0) {
        console.warn('Number of images for single NFT is not 1, defaulting to 1 for fee calculation.')
        numofimgs = 1
      }
      if (numofimgs > 1) {
        throw new Error('For a single NFT, the number of images should be 1.')
      }

      const totalFeeInFry = fryPerImage * numofimgs // numofimgs will be 1 here
      console.log(`Single NFT fee: ${totalFeeInFry.toFixed(6)} FRY for ${numofimgs} image`)
      return parseFloat(totalFeeInFry.toFixed(6))
    }
  } catch (error) {
    console.error('Error calculating fee amount:', error)
    // Fallback to fixed FRY amount if price fetching fails
    const fallbackFryAmount = 1.565 // Approximately 0.17 USD at $0.108635 per FRY
    console.warn(`Using fallback fee of ${fallbackFryAmount} FRY per image`)

    if (isCollection) {
      return fallbackFryAmount * numofimgs
    } else {
      return fallbackFryAmount
    }
  }
}

interface Asset {
  amount: number
  'asset-id': number
  'is-frozen': boolean
}
