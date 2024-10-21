import * as algokit from '@algorandfoundation/algokit-utils';
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { AppDetails } from '@algorandfoundation/algokit-utils/types/app-client';
import { Txn } from '@txnlab/use-wallet';
import algosdk, { ABIContract, TransactionSigner } from 'algosdk';
import { FryAuctionClient } from "./contracts/FryAuction";

import { FryAuctionBiddingClient } from './contracts/FryAuctionBidding';
import { getAlgodConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs';

const AUCTION_ID: bigint = 724678215n;
const AUCTION_ADDRESS: string = algosdk.getApplicationAddress(AUCTION_ID)
const FEE_PERCENT: number = 5000;  // 100 represent 1% & 10000 represent 100%
const ROYALTY_BASIS: number = 1000;  // 100 represent 1% & 10000 represent 100%
const FEE_WALLET: string = "TINQ25R3FHBYQ66ONTOQTHRNGKC73HTQKJCIVEJGEGPDQPVDCHAWRRPJEQ";
const FRY_TOKEN_ID: bigint = 717187263n;
const AUCTION_BOX_PRICE = 2500 + 400 * 128;
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

const createFryAuctionClient = async (signer: TransactionSigner, activeAddress: string, appId?: number) => {
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

        const auction = await auctionClientDeploy.create.initAuction({ fryId: FRY_TOKEN_ID, feePercent: FEE_PERCENT, admin: FEE_WALLET, royaltyBasis: ROYALTY_BASIS }).then((res) => {
            console.log(res)
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
                console.log(res)
            })
        }

        console.log("auction", auction)
        return auction

    } catch (e) { console.log(e) }
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

        const biddingClient = new FryAuctionBiddingClient(appDetails, algodClient)

        const auctionParams = {
            assetId: BigInt(asset),
            bidStartAmount: BigInt(bidStartAmount),
            minBidAmount: BigInt(minBidAmount),
            biddingStartTime: BigInt(biddingStartTime),
            biddingEndTime: BigInt(biddingEndTime),
        }



        const bidding = await biddingClient.create.initBidding({ ...auctionParams, seller: sender }).then((res) => {
            return res
        }).catch((e) => {
            console.log(e)
            throw e
        })
        await algorandClient.send.payment({
            sender,
            receiver: algosdk.getApplicationAddress(bidding.confirmation?.applicationIndex!),
            amount: algokit.microAlgos(100000),
            signer
        })
        const accountInfo = await algodClient.accountInformation(AUCTION_ADDRESS).do();
        const hasOptedIn = accountInfo?.assets?.some((assetId: any) => assetId['asset-id'] === asset);

        if (!hasOptedIn) {
            await algorandClient.send.payment({
                sender,
                receiver: algosdk.getApplicationAddress(AUCTION_ID),
                amount: algokit.algos(0.1 + 0.1),
                extraFee: algokit.algos(0.001)
            })

            console.log(algosdk.getApplicationAddress(AUCTION_ID))
            const mbrPay = await algorandClient.transactions.payment({
                sender,
                receiver: algosdk.getApplicationAddress(AUCTION_ID),
                amount: algokit.algos(0.1),
                extraFee: algokit.algos(0.002),
                signer
            })
            const optInAsset = await auctionClient.assetOptIn({ asset: asset, mbrPay })
            console.log("optin Asset", optInAsset)
        }

        const boxPay = await algorandClient.transactions.payment({
            sender,
            receiver: AUCTION_ADDRESS,
            amount: algokit.microAlgos(AUCTION_BOX_PRICE),
            signer
        })


        const xfer = await algorandClient.transactions.assetTransfer({
            sender,
            receiver: AUCTION_ADDRESS,
            amount: BigInt(1),
            assetId: BigInt(asset),
            signer
        })


        await auctionClient.listNftOnAuction({ ...auctionParams, biddingContract: BigInt(bidding!.appId), xfer, boxPay }).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })

        return true;

    } catch (e) {
        return undefined;

        console.log(e)
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
    previousHighestBidder: string,
): Promise<string> => {
    try {
        console.log(previousHighestBidder)
        const { auctionClient, algorandClient, algodClient } = await createFryAuctionClient(signer, sender)
        const { biddingClient } = await createBiddingClient(signer, sender, biddingAppId)
        const boxPay = await algorandClient.transactions.payment({
            sender,
            receiver: algosdk.getApplicationAddress(biddingAppId),
            amount: algokit.microAlgos(BID_BOX_PRICE),
            signer
        })
        const fee = (bidAmount * FEE_PERCENT) / 10000
        const priceTransferTx = await algorandClient.transactions.assetTransfer({
            sender,
            assetId: FRY_TOKEN_ID,
            amount: BigInt(bidAmount + fee),
            receiver: AUCTION_ADDRESS
        })

        await biddingClient.bid({ bidAmount: BigInt(bidAmount), boxPay })
        await auctionClient.bid({ asset: BigInt(asset), bidAmount: BigInt(bidAmount), previousBidder: previousHighestBidder, bidAxfer: priceTransferTx }, { sendParams: { fee: algokit.algos(0.003) } })

        return "Bid Placed"

    } catch (e: any) {
        console.log(e)
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
        console.log(e)
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
        console.log(e)
        return e.message
    }
}

export const claimNft = async (
    sender: string,
    signer: TransactionSigner,
    asset: number,
    biddingAppId: number,
    bidAmount: number,
    seller: string,
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

        const accountInfo = await algodClient.accountInformation(sender).do();
        const hasOptedIn = accountInfo?.assets?.some((assetId: any) => assetId['asset-id'] === asset);

        if (!hasOptedIn) {
            await algorandClient.send.assetTransfer({
                sender,
                receiver: sender,
                assetId: BigInt(asset),
                amount: BigInt(0)
            })
        }


        const priceTransferTx = await algorandClient.transactions.assetTransfer({
            sender,
            assetId: FRY_TOKEN_ID,
            amount: BigInt(bidAmount),
            receiver: seller
        })

        await auctionClient.claimNft({ asset: BigInt(asset), nftSeller: seller, buyTx: priceTransferTx }, { sendParams: { fee: algokit.algos(0.004) } })

        return "nftClaimed"

    } catch (e: any) {
        console.log(e)
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
        // const fee = (bidAmount * FEE_PERCENT) / 10000

        if (!hasOptedIn) {
            await algorandClient.send.assetTransfer({
                sender,
                receiver: sender,
                assetId: BigInt(asset),
                amount: BigInt(0)
            })
        }


        // const priceTransferTx = await algorandClient.transactions.assetTransfer({
        //     sender,
        //     assetId: FRY_TOKEN_ID,
        //     amount: BigInt(bidAmount + fee),
        //     receiver: AUCTION_ADDRESS
        // })

        await auctionClient.claimNftRoyalty({ asset: BigInt(asset), nftSeller: seller, fryId: FRY_TOKEN_ID }, { sendParams: { fee: algokit.algos(0.006) } })

        return "nftClaimed"

    } catch (e: any) {
        console.log(e)
        return e.message
    }
}

export const getAllAuctions = async () => {

    const algod = await getAlgodClient()
    const listings = await algokit.getAppBoxNames(AUCTION_ID, algod);
    console.log("listings", listings)
    const allListings: any[] = [];
    for (let listBox of listings) {
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
            ...nftData.params
        }
        allListings.push(listedData)
    }
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
        console.log(e)
        return []
    }
}


//! ger user claimable nfts from auction
export const getAllUserClaimable = async (user: string, signer: TransactionSigner) => {
    try {
        const auctions = await getAllAuctions();
        const claimable = auctions.filter((item) => item.highestBidder === user && item.biddingEndTime < Math.floor(Date.now() / 1000))
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