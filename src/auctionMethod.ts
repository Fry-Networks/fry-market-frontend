import * as algokit from '@algorandfoundation/algokit-utils';
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { AppDetails } from '@algorandfoundation/algokit-utils/types/app-client';
import { Txn } from '@txnlab/use-wallet';
import algosdk, { ABIContract, TransactionSigner } from 'algosdk';
import { FryAuctionClient } from "./contracts/FryAuction";

import { FryAuctionBiddingClient } from './contracts/FryAuctionBidding';
import { getAlgodConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs';

// export const AUCTION_ID: bigint = 729430870n;
export const AUCTION_ID: bigint = 736284880n;
const AUCTION_ADDRESS: string = algosdk.getApplicationAddress(AUCTION_ID)
const PRIMARY_FEE: number = 300;  // 100 represent 1% & 10000 represent 100%
const SECONDARY_FEE: number = 100;  // 100 represent 1% & 10000 represent 100%
const FEE_WALLET: string = "P2L3AXEUWVA3EQLGAPXE5JB7M4PNJQSNMJTRUMGCQ2TTQ7MU66SIZTCQYU"; // Testnet
const FRY_TOKEN_ID: bigint = 735549981n; //TestNet
// const FEE_WALLET: string = "ATPVJYGEGP5H6GCZ4T6CG4PK7LH5OMWXHLXZHDPGO7RO6T3EHWTF6UUY6E"; // For mainnet
// const FRY_TOKEN_ID: bigint = 2485314946n; //For Mainnet
const AUCTION_BOX_PRICE = 2500 + 400 * 136;
const BID_BOX_PRICE: number = 2500 + 400 * 48;

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
  algokit.Config.configure({ populateAppCallResources: true });

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algorandClient: algokit.AlgorandClient = algokit.AlgorandClient.fromConfig({ algodConfig })
  algorandClient.setDefaultSigner(signer);

  const algodClient = algokit.getAlgoClient({
    server: algodConfig.server,
    port: algodConfig.port,
    token: algodConfig.token,
  })

  const auctionClient = new FryAuctionClient({
    resolveBy: 'id',
    id: appId ?? AUCTION_ID,
    sender: { addr: activeAddress!, signer },
  }, algorandClient.client.algod
  )

  return { auctionClient, algorandClient, algodClient }
}

const createBiddingClient = async (signer: TransactionSigner, activeAddress: string, appId: number) => {
  algokit.Config.configure({ populateAppCallResources: true });

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algorandClient: algokit.AlgorandClient = algokit.AlgorandClient.fromConfig({ algodConfig })
  algorandClient.setDefaultSigner(signer);

  const biddingClient = new FryAuctionBiddingClient({
    resolveBy: 'id',
    id: appId,
    sender: { addr: activeAddress!, signer },
  }, algorandClient.client.algod
  )

  return { biddingClient }
}


//! Auction Functions
export const deployAuction = async (sender: string, signer: TransactionSigner) => {
  try {
    const algodClient = await getAlgodClient()
    const indexer = await getIndexerClient();

    const appDetails = {
      resolveBy: 'creatorAndName',
      sender: { signer, addr: sender } as TransactionSignerAccount,
      creatorAddress: sender,
      findExistingUsing: indexer,
    } as AppDetails

    const auctionClientDeploy = new FryAuctionClient(appDetails, algodClient)

    const auction = await auctionClientDeploy.create.initAuction({ fryId: FRY_TOKEN_ID, primaryFee: PRIMARY_FEE, secondaryFee: SECONDARY_FEE, admin: FEE_WALLET }).then((res) => {
      // console.log(res)
      return res
    }).catch((e) => {
      console.log(e)
      return e
    })

    const { auctionClient, algorandClient } = await createFryAuctionClient(signer, sender, auction.appId)

    await algorandClient.send.payment({
      sender,
      receiver: algosdk.getApplicationAddress(auction.appId),
      amount: algokit.algos(0.1 + 0.1),
      extraFee: algokit.algos(0.001)
    })
    if (auction.appId) {
      const mbrPay = await algorandClient.transactions.payment({
        sender,
        receiver: algosdk.getApplicationAddress(auction?.appId),
        amount: algokit.algos(0.1),
        extraFee: algokit.algos(0.002),
        signer
      })
      const optInAsset = await auctionClient.assetOptIn({ mbrPay, asset: FRY_TOKEN_ID }).then((res) => {
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
    const indexer = await getIndexerClient();

    const appDetails = {
      resolveBy: 'creatorAndName',
      sender: { signer, addr: sender } as TransactionSignerAccount,
      creatorAddress: sender,
      findExistingUsing: indexer,
    } as AppDetails
    console.log("appDetails", appDetails)
    console.log("algodClient", algodClient)
    const biddingClient = new FryAuctionBiddingClient(appDetails, algodClient)

    const auctionParams = {
      assetId: asset,
      bidStartAmount: BigInt(bidStartAmount),
      minBidAmount: BigInt(minBidAmount),
      biddingStartTime: BigInt(biddingStartTime),
      biddingEndTime: BigInt(biddingEndTime),
    }

    const bidding = await biddingClient.create.initBidding({ ...auctionParams, seller: sender }).then(async (res) => {

      const atc = new algosdk.AtomicTransactionComposer();
      const suggestedParams = await algodClient.getTransactionParams().do();
      const bidFunds = await algorandClient.transactions.payment({
        sender,
        receiver: algosdk.getApplicationAddress(res.confirmation?.applicationIndex!),
        amount: algokit.microAlgos(100000),
        signer
      })
      atc.addTransaction({ txn: bidFunds, signer })
      const accountInfo = await algodClient.accountInformation(AUCTION_ADDRESS).do();
      const hasOptedIn = accountInfo?.assets?.some((assetId: any) => assetId['asset-id'] === asset);
      console.log("hasOptedIn", hasOptedIn)
      if (!hasOptedIn) {
        const auctionFund = await algorandClient.transactions.payment({
          sender,
          receiver: algosdk.getApplicationAddress(AUCTION_ID),
          amount: algokit.algos(0.1 + 0.1),
          extraFee: algokit.algos(0.001)
        })
        atc.addTransaction({ txn: auctionFund, signer })

        const mbrPay = await algorandClient.transactions.payment({
          sender,
          receiver: algosdk.getApplicationAddress(AUCTION_ID),
          amount: algokit.algos(0.1),
          extraFee: algokit.algos(0.002),
          signer
        })
        console.log("mbrPay", mbrPay)

        atc.addMethodCall({
          suggestedParams,
          appID: Number(AUCTION_ID),
          method: auctionClient.appClient.getABIMethod("assetOptIn")!,
          methodArgs: [Number(asset), { txn: mbrPay, signer }],
          sender: sender,
          signer: signer,
          appForeignAssets: [Number(asset)],
        });
      }
      console.log("aseset", asset)
      const xfer = await algorandClient.transactions.assetTransfer({
        sender,
        receiver: AUCTION_ADDRESS,
        amount: BigInt(1),
        assetId: BigInt(asset),
        signer
      })

      let boxAmount = 0
      let fee = 0;
      const boxId = algosdk.encodeUint64(asset);
      const box = await algokit.getAppBoxValue(AUCTION_ID, boxId, algodClient).then((res) => res).catch((e) => { if (e) false })
      console.log(box)
      if (!box) {
        fee = (bidStartAmount * PRIMARY_FEE) / 10000
        boxAmount = AUCTION_BOX_PRICE
      } else {
        fee = (bidStartAmount * SECONDARY_FEE) / 10000
        boxAmount = 0
      }

      const boxPay = await algorandClient.transactions.payment({
        sender,
        receiver: AUCTION_ADDRESS,
        amount: algokit.microAlgos(boxAmount),
        signer
      })
      console.log("boxPay", boxPay)
      const feeAxfer = await algorandClient.transactions.assetTransfer({
        sender,
        signer,
        assetId: FRY_TOKEN_ID,
        receiver: FEE_WALLET,
        amount: BigInt(fee),
      })
      console.log("feeAxfer", feeAxfer)
      console.log(FEE_WALLET, FRY_TOKEN_ID)
      atc.addMethodCall({
        suggestedParams,
        appID: Number(AUCTION_ID),
        method: auctionClient.appClient.getABIMethod("listNftOnAuction")!,
        methodArgs: [Number(asset), auctionParams.bidStartAmount, auctionParams.minBidAmount, auctionParams.biddingStartTime, auctionParams.biddingEndTime, BigInt(res.appId), { txn: xfer, signer }, { txn: feeAxfer, signer }, { txn: boxPay, signer }],
        sender: sender,
        signer: signer,
        appForeignAssets: [Number(asset)],
        boxes: [
          {
            appIndex: Number(AUCTION_ID),
            name: algosdk.encodeUint64(asset),
          },
        ],
      });
      const result = await atc.execute(algodClient, 4);
      for (const mr of result.methodResults) {
        console.log(`${mr.returnValue}`);
      }
    }).catch((e) => {
      console.log(e)
      throw e
    })

    return true;

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
  sendTransactions: (transactions: Uint8Array[], waitRoundsToConfirm?: number) => Promise<{
    "confirmed-round": number;
    "global-state-delta": Record<string, unknown>[];
    "pool-error": string;
    txn: {
      sig: Uint8Array;
      txn: Txn;
    };
    txId: string;
    id: string;
  }>,
  previousHighestBidder: string
): Promise<string> => {
  try {
    const { auctionClient, algorandClient, algodClient } = await createFryAuctionClient(signer, sender)
    const { biddingClient } = await createBiddingClient(signer, sender, biddingAppId);
    const atc = new algosdk.AtomicTransactionComposer();
    // console.log("previous", previousHighestBidder)
    const suggestedParams = await algodClient.getTransactionParams().do();
    suggestedParams.fee = 3000;
    suggestedParams.flatFee = true
    const boxPay = await algorandClient.transactions.payment({
      sender,
      receiver: algosdk.getApplicationAddress(biddingAppId),
      amount: algokit.microAlgos(BID_BOX_PRICE),
      signer
    })
    let fee = 0;
    const boxId = algosdk.encodeUint64(asset);
    const box = await algokit.getAppBoxValue(AUCTION_ID, boxId, algodClient).then((res) => res).catch((e) => { if (e) false })
    if (box) {
      const listedCount = algosdk.decodeUint64(box.slice(120, 128), "mixed")
      // console.log("listedCount : ", listedCount)
      if (listedCount > 1) {
        fee = (bidAmount * SECONDARY_FEE) / 10000
      } else {
        fee = (bidAmount * PRIMARY_FEE) / 10000
      }
    }
    const feeAxfer = await algorandClient.transactions.assetTransfer({
      sender,
      signer,
      assetId: FRY_TOKEN_ID,
      receiver: FEE_WALLET,
      amount: BigInt(fee),
    })
    const priceTransferTx = await algorandClient.transactions.assetTransfer({
      sender,
      assetId: FRY_TOKEN_ID,
      amount: BigInt(bidAmount),
      receiver: AUCTION_ADDRESS
    })

    atc.addMethodCall({
      suggestedParams,
      appID: biddingAppId,
      method: biddingClient.appClient.getABIMethod("bid")!,
      methodArgs: [bidAmount, { txn: boxPay, signer }],
      sender: sender,
      signer: signer,
      appForeignAssets: [Number(asset)],
      boxes: [
        {
          appIndex: biddingAppId,
          name: algosdk.decodeAddress(sender).publicKey,
        },
      ],
    });
    atc.addMethodCall({
      suggestedParams,
      appID: Number(AUCTION_ID),
      method: auctionClient.appClient.getABIMethod("bid")!,
      methodArgs: [BigInt(asset), previousHighestBidder, BigInt(bidAmount), { txn: priceTransferTx, signer }, { txn: feeAxfer, signer }],
      sender: sender,
      signer: signer,
      appForeignAssets: [Number(asset), Number(FRY_TOKEN_ID)],
      appAccounts: [previousHighestBidder],
      boxes: [
        {
          appIndex: Number(AUCTION_ID),
          name: algosdk.encodeUint64(asset),
        },
      ],
    });
    const result = await atc.execute(algodClient, 4);
    for (const mr of result.methodResults) {
      // console.log(`${mr.returnValue}`);
    }

    // await biddingClient.bid({ bidAmount: BigInt(bidAmount), boxPay })
    // await auctionClient.bid({ asset: BigInt(asset), bidAmount: BigInt(bidAmount), previousBidder: previousHighestBidder, bidAxfer: priceTransferTx }, { sendParams: { fee: algokit.algos(0.003) } })

    return "Bid Placed"

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
  sendTransactions: (transactions: Uint8Array[], waitRoundsToConfirm?: number) => Promise<{
    "confirmed-round": number;
    "global-state-delta": Record<string, unknown>[];
    "pool-error": string;
    txn: {
      sig: Uint8Array;
      txn: Txn;
    };
    txId: string;
    id: string;
  }>
): Promise<string> => {
  try {
    const { auctionClient, algorandClient, algodClient } = await createFryAuctionClient(signer, sender)
    const { biddingClient } = await createBiddingClient(signer, sender, biddingAppId)

    const allBids: Bid[] = await getAllBids(biddingAppId);
    const previousBids = allBids.filter((bid) => bid.bidder != sender)

    const bids = previousBids.map(bid => bid.bidTime);
    const maxBid = Math.max(...bids);
    const previousBidder: Bid = previousBids.filter((bid) => bid.bidTime === maxBid)[0]

    await biddingClient.cancelBid({ previousHighestBidder: previousBidder.bidder }, { sendParams: { fee: algokit.algos(0.002) } })
    await auctionClient.cancelBid({ asset: BigInt(asset), previousHighestBid: BigInt(previousBidder.bidAmount), previousHighestBidder: previousBidder.bidder })

    return "Bid Canceled"
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
  sendTransactions: (transactions: Uint8Array[], waitRoundsToConfirm?: number) => Promise<{
    "confirmed-round": number;
    "global-state-delta": Record<string, unknown>[];
    "pool-error": string;
    txn: {
      sig: Uint8Array;
      txn: Txn;
    };
    txId: string;
    id: string;
  }>,
  previousHighestBidder?: string,
): Promise<string> => {
  try {
    const { auctionClient, algorandClient, algodClient } = await createFryAuctionClient(signer, sender)
    const { biddingClient } = await createBiddingClient(signer, sender, biddingAppId)


    await auctionClient.cancelNftAuction({ asset: BigInt(asset), highestBidder: previousHighestBidder! }, { sendParams: { fee: algokit.algos(0.004) } })

    return "Auction Canceled"

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

    const accountInfo = await algodClient.accountInformation(sender).do();
    const hasOptedIn = accountInfo?.assets?.some((assetId: any) => assetId['asset-id'] === asset);
    const atc = new algosdk.AtomicTransactionComposer();
    const suggestedParams = await algodClient.getTransactionParams().do();
    suggestedParams.fee = 3000
    suggestedParams.flatFee = true
    if (!hasOptedIn) {
      const opIn = await algorandClient.transactions.assetOptIn({
        assetId: BigInt(asset),
        sender,
        extraFee: algokit.algos(0.001),
      })
      atc.addTransaction({ txn: opIn, signer: signer });
    }

    let fee = 0;
    const boxId = algosdk.encodeUint64(asset);
    const box = await algokit.getAppBoxValue(AUCTION_ID, boxId, algodClient).then((res) => res).catch((e) => { if (e) false })
    if (box) {
      const listedCount = algosdk.decodeUint64(box.slice(120, 128), "mixed")
      if (listedCount > 1) {
        fee = (bidAmount * SECONDARY_FEE) / 10000
      } else {
        fee = (bidAmount * PRIMARY_FEE) / 10000
      }
    }
    const feeAxfer = await algorandClient.transactions.assetTransfer({
      sender,
      signer,
      assetId: FRY_TOKEN_ID,
      receiver: FEE_WALLET,
      amount: BigInt(fee),
    })

    const assetDetails = await algodClient.getAssetByID(Number(asset)).do();
    atc.addMethodCall({
      suggestedParams,
      appID: Number(AUCTION_ID),
      method: auctionClient.appClient.getABIMethod("claimNftRoyalty")!,
      methodArgs: [asset, FRY_TOKEN_ID, seller, { txn: feeAxfer, signer }],
      sender: sender,
      signer: signer,
      appForeignAssets: [Number(asset), Number(FRY_TOKEN_ID)],
      boxes: [
        {
          appIndex: Number(AUCTION_ID),
          name: algosdk.encodeUint64(asset),
        },
        {
          appIndex: Number(AUCTION_ID),
          name: algosdk.decodeAddress(assetDetails?.params?.creator).publicKey
        }
      ],
      appAccounts: [FEE_WALLET, assetDetails?.params?.creator]
    });

    const result = await atc.execute(algodClient, 4);
    for (const mr of result.methodResults) {
      // console.log(`${mr.returnValue}`);
    }

    // await auctionClient.claimNftRoyalty({ asset: BigInt(asset), nftSeller: seller, fryId: FRY_TOKEN_ID }, { sendParams: { fee: algokit.algos(0.006) } })

    return "nftClaimed"

  } catch (e: any) {
    // console.log(e)
    throw e.message
  }
}

export const getAllAuctions = async () => {

  const algod = await getAlgodClient()
  const listings = await algokit.getAppBoxNames(AUCTION_ID, algod);
  const filteredBoxes = listings.filter((bx) => bx.nameRaw.byteLength == 8)
  const allListings: any[] = [];
  for (let listBox of filteredBoxes) {
    const decoded = algosdk.decodeUint64(listBox.nameRaw, "safe")
    let box = await algokit.getAppBoxValue(AUCTION_ID, listBox.nameRaw, algod)
    const nftData = await algod.getAssetByID(decoded).do();
    const sellerId = algosdk.encodeAddress(box.slice(0, 32))
    const bidStartAmount = algosdk.decodeUint64(box.slice(32, 40), "mixed")
    const minBidAmount = algosdk.decodeUint64(box.slice(40, 48), "mixed")
    const biddingStartTime = algosdk.decodeUint64(box.slice(48, 56), "mixed")
    const biddingEndTime = algosdk.decodeUint64(box.slice(56, 64), "mixed")
    const highestBidder = algosdk.encodeAddress(box.slice(64, 96))
    const highestBidAmount = algosdk.decodeUint64(box.slice(96, 104), 'mixed')
    const bidContract = algosdk.decodeUint64(box.slice(104, 112), 'mixed')
    const totalBidders = algosdk.decodeUint64(box.slice(112, 120), 'mixed')
    const totalListcount = algosdk.decodeUint64(box.slice(120, 128), 'mixed')
    const isListed = algosdk.decodeUint64(box.slice(128, 136), 'mixed')
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
      totalBidders,
      totalListcount,
      isListed: isListed == 1 ? true : false,
      ...nftData.params
    }
    allListings.push(listedData)
  }
  // console.log(allListings)
  return allListings
}

export const getSingleAuction = async (nftId: number) => {
  const algod = await getAlgodClient()
  const boxId = algosdk.encodeUint64(nftId);
  const decoded = algosdk.decodeUint64(boxId, "safe")

  const box = await algokit.getAppBoxValue(AUCTION_ID, boxId, algod)
  const nftData = await algod.getAssetByID(decoded).do();
  const sellerId = algosdk.encodeAddress(box.slice(0, 32))
  const bidStartAmount = algosdk.decodeUint64(box.slice(32, 40), "mixed")
  const minBidAmount = algosdk.decodeUint64(box.slice(40, 48), "mixed")
  const biddingStartTime = algosdk.decodeUint64(box.slice(48, 56), "mixed")
  const biddingEndTime = algosdk.decodeUint64(box.slice(56, 64), "mixed")
  const highestBidder = algosdk.encodeAddress(box.slice(64, 96))
  const highestBidAmount = algosdk.decodeUint64(box.slice(96, 104), 'mixed')
  const bidContract = algosdk.decodeUint64(box.slice(104, 112), 'mixed')
  const totalBidders = algosdk.decodeUint64(box.slice(112, 120), 'mixed')
  const totalListcount = algosdk.decodeUint64(box.slice(120, 128), 'mixed')
  const isListed = algosdk.decodeUint64(box.slice(128, 136), 'mixed')
  const listedData = {
    nftAddress: decoded,
    sellerId,
    bidStartAmount,
    minBidAmount,
    biddingEndTime,
    biddingStartTime,
    highestBidder,
    highestBidAmount,
    bidContract,
    totalBidders,
    totalListcount,
    isListed: isListed == 1 ? true : false,
    ...nftData.params
  }
  return listedData
}

export const getAllBids = async (
  bidContract: number
): Promise<Bid[]> => {
  try {
    const algod = await getAlgodClient()
    const biddings = await algokit.getAppBoxNames(bidContract, algod);
    const allBids: Bid[] = [];
    for (let bid of biddings) {
      const bidder = algosdk.encodeAddress(bid.nameRaw)
      const bidData = await algokit.getAppBoxValue(bidContract, bid, algod)

      const bidAmount = algosdk.decodeUint64(bidData.slice(0, 8), "safe")
      const bidTime = algosdk.decodeUint64(bidData.slice(8, 16), "safe")

      const bidding: Bid = {
        bidder,
        bidAmount,
        bidTime
      }

      allBids.push(bidding)
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
    const auctions = await getAllAuctions();
    const claimable = auctions.filter((item) => item?.isListed).filter((item) => item.highestBidder === user && item.biddingEndTime < Math.floor(Date.now() / 1000))
    return claimable
  } catch (error) {
    return error
  }
}

export const getAllUserAuctions = async (user: string, signer: TransactionSigner) => {
  try {
    const allAuctions = await getAllAuctions();
    const userAuctions = allAuctions.filter((item) => item.sellerId === user)
    return userAuctions
  } catch (error) {
    return error
  }
}


const getMethodByName = (name: string, contract: ABIContract): algosdk.ABIMethod => {
  const m = contract.methods.find((mt: algosdk.ABIMethod) => { return mt.name == name })
  if (m === undefined)
    throw Error("Method undefined")
  return m
}

interface Bid {
  bidder: string,
  bidAmount: number,
  bidTime: number
}
