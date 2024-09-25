import * as algokit from '@algorandfoundation/algokit-utils';
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { AppDetails } from '@algorandfoundation/algokit-utils/types/app-client';
import algosdk, { Transaction, TransactionSigner } from 'algosdk';
import { FryMarketClient } from './contracts/FryMarket';
import { getAlgodConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs';

// const FRY_MARKET_ID: bigint = 717737375n;  // previous working market
const FRY_MARKET_ID: bigint = 722259757n;
const FRY_MARKET_ADDRESS: string = algosdk.getApplicationAddress(FRY_MARKET_ID)
const FEE_PERCENT: number = 3000;  // 100 represent 1% & 10000 represent 100%
const FEE_WALLET: string = "TINQ25R3FHBYQ66ONTOQTHRNGKC73HTQKJCIVEJGEGPDQPVDCHAWRRPJEQ";
const FRY_TOKEN_ID: bigint = 717187263n;

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
    algokit.Config.configure({ populateAppCallResources: true });

    const algodConfig = getAlgodConfigFromViteEnvironment()
    const algorandClient: algokit.AlgorandClient = algokit.AlgorandClient.fromConfig({ algodConfig })
    algorandClient.setDefaultSigner(signer);

    const algodClient = algokit.getAlgoClient({
        server: algodConfig.server,
        port: algodConfig.port,
        token: algodConfig.token,
    })

    const marketClient = new FryMarketClient({
        resolveBy: 'id',
        id: appId ?? FRY_MARKET_ID,
        sender: { addr: activeAddress!, signer },
    }, algorandClient.client.algod
    )

    return { marketClient, algorandClient, algodClient }
}


export const deployMarketplace = async (sender: string, signer: TransactionSigner, royaltyBasis: number, feePercent: number) => {
    try {
        const indexer = await getIndexerClient();

        const algodClient = await getAlgodClient()
        const appDetails = {
            resolveBy: 'creatorAndName',
            sender: { signer, addr: sender } as TransactionSignerAccount,
            creatorAddress: sender,
            findExistingUsing: indexer,
        } as AppDetails

        const marketplace = new FryMarketClient(appDetails, algodClient)

        const market = await marketplace.create.initMarket({ fryId: FRY_TOKEN_ID, feePercent: BigInt(feePercent), admin: FEE_WALLET, royaltyBasis: BigInt(royaltyBasis) }).then((res) => {
            console.log(res)
            return res
        }).catch((e) => {
            console.log(e)
            return e
        })

        console.log(market.appId)

        const { marketClient, algorandClient } = await createFryMarketClient(signer, sender, market.appId)


        await algorandClient.send.payment({
            sender,
            receiver: algosdk.getApplicationAddress(market.appId),
            amount: algokit.algos(0.1 + 0.1),
            extraFee: algokit.algos(0.001)
        })
        if (market.appId) {
            const mbrPay = await algorandClient.transactions.payment({
                sender,
                receiver: algosdk.getApplicationAddress(market?.appId),
                amount: algokit.algos(0.1),
                extraFee: algokit.algos(0.002),
                signer
            })
            const optInAsset = await marketClient.optInAsset({ mbrPay, asset: FRY_TOKEN_ID }).then((res) => {
                console.log(res)
            })
        }

        console.log("market", market)
        return market

    } catch (e) { console.log(e) }
}

//!Marketplace functions
const BOX_PRICE = 2500 + 400 * 88
export const listNft = async (
    sender: string,
    assetId: bigint,
    signer: TransactionSigner,
    price: number,

) => {
    try {
        const { marketClient, algorandClient, algodClient } = await createFryMarketClient(signer, sender)

        const accountInfo = await algodClient.accountInformation(FRY_MARKET_ADDRESS).do();
        const hasOptedIn = accountInfo.assets.some((asset: any) => asset['asset-id'] === parseInt(assetId.toString()));

        if (!hasOptedIn) {
            await algorandClient.send.payment({
                sender,
                receiver: algosdk.getApplicationAddress(FRY_MARKET_ID),
                amount: algokit.algos(0.1 + 0.1),
                extraFee: algokit.algos(0.001)
            })

            console.log(algosdk.getApplicationAddress(FRY_MARKET_ID))
            const mbrPay = await algorandClient.transactions.payment({
                sender,
                receiver: algosdk.getApplicationAddress(FRY_MARKET_ID),
                amount: algokit.algos(0.1),
                extraFee: algokit.algos(0.002),
                signer
            })
            const optInAsset = await marketClient.optInAsset({ mbrPay, asset: assetId })
            console.log("optin Asset", optInAsset)
        }

        console.log("BOX_PRICE", BOX_PRICE)
        const boxPay = await algorandClient.transactions.payment({
            sender,
            receiver: algosdk.getApplicationAddress(FRY_MARKET_ID),
            amount: algokit.microAlgos(BOX_PRICE),
            extraFee: algokit.algos(0.001),
            signer
        })

        const assetTransferTx = await algorandClient.transactions.assetTransfer({
            sender,
            receiver: algosdk.getApplicationAddress(FRY_MARKET_ID),
            assetId: assetId,
            amount: BigInt(1),
            signer
        })

        const listNft = await marketClient.listAsset({ boxPay: boxPay, xfer: assetTransferTx, price: BigInt(price), listTime: BigInt(Math.floor(Date.now() / 1000)) })

        console.log("list nft", listNft)
    } catch (e) {
        console.log(e)
        throw e

    }
    // }
}

export const updateNftListPrice = async (
    sender: string,
    assetId: bigint,
    signer: TransactionSigner,
    newPrice: number
) => {
    const { marketClient } = await createFryMarketClient(signer, sender)
    const buyTxn = await marketClient.updatePrice({ asset: assetId, price: BigInt(newPrice) });
    console.log(buyTxn.transaction)
}

export const cancelList = async (
    sender: string,
    assetId: bigint,
    signer: TransactionSigner
) => {
    const { marketClient } = await createFryMarketClient(signer, sender)
    const cancelTxn = await marketClient.cancelList({ asset: assetId }, { sendParams: { fee: algokit.algos(0.002) } });
    console.log(cancelTxn.transaction)
}

export const buyNft = async (
    sender: string,
    assetId: bigint,
    signer: TransactionSigner,
    seller: string,
    price: number
) => {
    const { marketClient, algorandClient, algodClient } = await createFryMarketClient(signer, sender)

    const fee = (price * FEE_PERCENT) / 10000

    const accountInfo = await algodClient.accountInformation(sender).do();
    const hasOptedIn = accountInfo.assets.some((asset: any) => asset['asset-id'] === parseInt(assetId.toString()));

    if (!hasOptedIn) {
        await algorandClient.send.assetTransfer({
            sender,
            receiver: sender,
            assetId: assetId,
            amount: BigInt(0)
        })
    }


    const xfer = await algorandClient.transactions.assetTransfer({
        sender,
        assetId: FRY_TOKEN_ID,
        receiver: seller,
        amount: BigInt(price),
        signer
    })

    const xfer_fee = await algorandClient.transactions.assetTransfer({
        sender,
        assetId: FRY_TOKEN_ID,
        receiver: FEE_WALLET,
        amount: BigInt(fee),
        signer
    })

    const buyNftTx = await marketClient.buyNft({ asset: assetId, xfer, xferFee: xfer_fee }, { sendParams: { fee: algokit.algos(0.002) } });
    console.log(buyNftTx.transaction)
}

export const buyNftWithRoyalty = async (
    sender: string,
    assetId: bigint,
    signer: TransactionSigner,
    seller: string,
    price: number
) => {

    console.log(sender);
    console.log(assetId);
    console.log(signer);
    console.log(seller);
    console.log(price);

    const { marketClient, algorandClient, algodClient } = await createFryMarketClient(signer, sender)

    const fee = (price * FEE_PERCENT) / 10000

    const accountInfo = await algodClient.accountInformation(sender).do();
    const hasOptedIn = accountInfo.assets.some((asset: any) => asset['asset-id'] === parseInt(assetId.toString()));

    if (!hasOptedIn) {
        console.log("HIHI");

        await algorandClient.send.assetTransfer({
            sender,
            receiver: sender,
            assetId: assetId,
            amount: BigInt(0)
        })
    }


    const xfer = await algorandClient.transactions.assetTransfer({
        sender,
        assetId: FRY_TOKEN_ID,
        receiver: FRY_MARKET_ADDRESS,
        amount: BigInt(price + fee),
        signer
    })

    const buyNft = await marketClient.buyNftRoyalty({ asset: assetId, admin: FEE_WALLET, seller: seller, fryId: FRY_TOKEN_ID, xfer }, { sendParams: { fee: algokit.algos(0.005) } });
    console.log(buyNft.transaction)
}

export interface Listing {
    assetId: number,
    seller: string,
    price: number,
    list_count: number,
    listTime: number,
    imgUrl: string,
    name: string,
    isListed: boolean,
    isSold: boolean,
    isCancelled: boolean
}

export const getAllListed = async (): Promise<Listing[]> => {
    const algod = await getAlgodClient()
    const listings: Listing[] = [];
    const boxes = await algokit.getAppBoxNames(FRY_MARKET_ID, algod);
    await Promise.all(boxes.map(async (bx) => {
        const decoded = algosdk.decodeUint64(bx.nameRaw, "safe")
        let box = await algokit.getAppBoxValue(FRY_MARKET_ID, bx.nameRaw, algod)
        const nftData = await algod.getAssetByID(decoded).do();
        const sellerId = algosdk.encodeAddress(box.slice(0, 32))
        const listedPrice = algosdk.decodeUint64(box.slice(32, 40), "safe")
        const listedCount = algosdk.decodeUint64(box.slice(40, 48), "safe")
        const listTime = algosdk.decodeUint64(box.slice(48, 56), "safe")
        const listed = algosdk.decodeUint64(box.slice(56, 64), "safe")
        const sold = algosdk.decodeUint64(box.slice(64, 72), "mixed")
        const canceled = algosdk.decodeUint64(box.slice(72, 80), "safe")

        let listingData: Listing = {
            assetId: decoded,
            seller: sellerId,
            price: listedPrice,
            list_count: listedCount,
            listTime: listTime,
            isListed: listed == 1 ? true : false,
            isSold: sold == 1 ? true : false,
            isCancelled: canceled == 1 ? true : false,
            name: nftData?.params?.name,
            imgUrl: nftData?.params?.url
        }
        listings.push(listingData)
    }))

    return listings
}


export const mintMultipleNft = async (metaUris: any, sender: string, signer: TransactionSigner, signTransactions: any, sendTransactions: any): Promise<Uint8Array[]> => {
    try {
        const { marketClient, algorandClient, algodClient } = await createFryMarketClient(signer, sender)
        console.log("merta URIs", metaUris);

        let txnArray: Transaction[] = []
        for (let i = 0; i < metaUris.length; i++) {
            const mintTx = await algorandClient.transactions.assetCreate({
                assetName: `${metaUris[i].name} #` + i.toString(),
                // unitName: metaUris[i].name,
                url: metaUris[i].image,
                decimals: 0,
                total: BigInt(1),
                manager: sender,
                reserve: sender,
                sender
            })
            txnArray.push(mintTx);
        }

        const txnGroup = algosdk.assignGroupID(txnArray);
        let encodedTransaction: Uint8Array[] = [];
        txnGroup.map((tx: Transaction) => {
            let newEncodedtx = algosdk.encodeUnsignedTransaction(tx);

            encodedTransaction.push(newEncodedtx)
        })

        const signedTransactions = await signTransactions(encodedTransaction)
        const waitRoundsToConfirm = 4
        const { id } = await sendTransactions(signedTransactions, waitRoundsToConfirm)
        //   console.log(id)

        return id
    } catch (e) {
        console.log(e)
        throw e
    }
}

export const getAllCollectionNft = async (sender: string) => {
    const indexer = await getIndexerClient()
    const nfts: any = await algokit.lookupAccountByAddress(sender, indexer)
    const createdNft: any = nfts["created-assets"]
    const collection = createdNft.length > 0 ? createdNft.filter((item: any) => item.params.decimals === 0 && item.params.total === 1) : []
    return collection
}

export const getAllNfts = async (sender: string) => {
    const indexer = await getIndexerClient()
    const nfts: any = await algokit.lookupAccountByAddress(sender, indexer);
    console.log("well", nfts);

    const createdNft: any = nfts["assets"]
    const collection = createdNft.length > 0 ? createdNft.filter((item: any) => item.params.decimals === 0 && item.params.total === 1) : []
    const algod = await getAlgodClient()
    const boxes = await algokit.getAppBoxNames(FRY_MARKET_ID, algod);
    for (let listBox of boxes) {
        for (let i = 0; i < collection.length; i++) {
            const decoded = algosdk.decodeUint64(listBox.nameRaw, "safe")
            if (decoded === collection[i].index) {
                let box = await algokit.getAppBoxValue(FRY_MARKET_ID, listBox.nameRaw, algod)
                const nftData = await algod.getAssetByID(decoded).do();
                const sellerId = algosdk.encodeAddress(box.slice(0, 32))
                const listedPrice = algosdk.decodeUint64(box.slice(32, 40), "safe")
                const listedCount = algosdk.decodeUint64(box.slice(40, 48), "safe")
                const listTime = algosdk.decodeUint64(box.slice(48, 56), "safe")
                const listed = algosdk.decodeUint64(box.slice(56, 64), "safe")
                const sold = algosdk.decodeUint64(box.slice(64, 72), "safe")
                const canceled = algosdk.decodeUint64(box.slice(72, 80), "safe")

                let listingData: Listing = {
                    assetId: decoded,
                    seller: sellerId,
                    price: listedPrice,
                    list_count: listedCount,
                    listTime: listTime,
                    isListed: listed == 1 ? true : false,
                    isSold: sold == 1 ? true : false,
                    isCancelled: canceled == 1 ? true : false,
                    name: nftData?.params?.name,
                    imgUrl: nftData?.params?.url
                }
                console.log(listingData)
                collection[i] = {
                    ...collection[i],
                    params: {
                        ...collection[i].params,
                        ...listingData
                    }
                }
            }
        }
    }
    return collection
}
export const getAllCollectionWListed = async (sender: string) => {
    const indexer = await getIndexerClient()
    const nfts: any = await algokit.lookupAccountByAddress(sender, indexer);
    const createdNft: any = nfts["created-assets"]
    const collection = createdNft.length > 0 ? createdNft.filter((item: any) => item.params.decimals === 0 && item.params.total === 1) : []
    const algod = await getAlgodClient()
    const boxes = await algokit.getAppBoxNames(FRY_MARKET_ID, algod);
    for (let listBox of boxes) {
        for (let i = 0; i < collection.length; i++) {
            const decoded = algosdk.decodeUint64(listBox.nameRaw, "safe")
            if (decoded === collection[i].index) {
                let box = await algokit.getAppBoxValue(FRY_MARKET_ID, listBox.nameRaw, algod)
                const nftData = await algod.getAssetByID(decoded).do();
                const sellerId = algosdk.encodeAddress(box.slice(0, 32))
                const listedPrice = algosdk.decodeUint64(box.slice(32, 40), "safe")
                const listedCount = algosdk.decodeUint64(box.slice(40, 48), "safe")
                const listTime = algosdk.decodeUint64(box.slice(48, 56), "safe")
                const listed = algosdk.decodeUint64(box.slice(56, 64), "safe")
                const sold = algosdk.decodeUint64(box.slice(64, 72), "safe")
                const canceled = algosdk.decodeUint64(box.slice(72, 80), "safe")

                let listingData: Listing = {
                    assetId: decoded,
                    seller: sellerId,
                    price: listedPrice,
                    list_count: listedCount,
                    listTime: listTime,
                    isListed: listed == 1 ? true : false,
                    isSold: sold == 1 ? true : false,
                    isCancelled: canceled == 1 ? true : false,
                    name: nftData?.params?.name,
                    imgUrl: nftData?.params?.url
                }
                console.log(listingData)
                collection[i] = {
                    ...collection[i],
                    params: {
                        ...collection[i].params,
                        ...listingData
                    }
                }
            }
        }
    }
    return collection
}

export const getAllListedByUser = async (user: string): Promise<Listing[]> => {
    const algod = await getAlgodClient()
    const listings: Listing[] = [];
    const boxes = await algokit.getAppBoxNames(FRY_MARKET_ID, algod);
    await Promise.all(boxes.map(async (bx) => {
        const decoded = algosdk.decodeUint64(bx.nameRaw, "safe")
        let box = await algokit.getAppBoxValue(FRY_MARKET_ID, bx.nameRaw, algod)
        const nftData = await algod.getAssetByID(decoded).do();
        const sellerId = algosdk.encodeAddress(box.slice(0, 32))
        const listedPrice = algosdk.decodeUint64(box.slice(32, 40), "safe")
        const listedCount = algosdk.decodeUint64(box.slice(40, 48), "safe")
        const listTime = algosdk.decodeUint64(box.slice(48, 56), "safe")
        const listed = algosdk.decodeUint64(box.slice(56, 64), "safe")
        const sold = algosdk.decodeUint64(box.slice(64, 72), "safe")
        const canceled = algosdk.decodeUint64(box.slice(72, 80), "safe")

        let listingData: Listing = {
            assetId: decoded,
            seller: sellerId,
            price: listedPrice,
            list_count: listedCount,
            listTime: listTime,
            isListed: listed == 1 ? true : false,
            isSold: sold == 1 ? true : false,
            isCancelled: canceled == 1 ? true : false,
            name: nftData?.params?.name,
            imgUrl: nftData?.params?.url
        }
        if (listingData.seller === user && listingData.isListed === true) {
            listings.push(listingData)
        }


    }))
    return listings
}


export const getMarkeGlobalState = async (): Promise<Listing[]> => {
    const algod = await getAlgodClient()
    const listings: Listing[] = [];
    const boxes = await algokit.getAppGlobalState(FRY_MARKET_ID, algod);
    console.log(boxes)
    // await Promise.all(boxes.map(async (bx) => {
    //     const decoded = algosdk.decodeUint64(bx.nameRaw, "safe")
    //     let box = await algokit.getAppBoxValue(FRY_MARKET_ID, bx.nameRaw, algod)
    //     const nftData = await algod.getAssetByID(decoded).do();
    //     const sellerId = algosdk.encodeAddress(box.slice(0, 32))
    //     const listedPrice = algosdk.decodeUint64(box.slice(32, 40), "safe")
    //     const listedCount = algosdk.decodeUint64(box.slice(40, 48), "safe")
    //     const listTime = algosdk.decodeUint64(box.slice(48, 56), "safe")
    //     const listed = algosdk.decodeUint64(box.slice(56, 64), "safe")
    //     const sold = algosdk.decodeUint64(box.slice(64, 72), "safe")
    //     const canceled = algosdk.decodeUint64(box.slice(72, 80), "safe")

    //     let listingData: Listing = {
    //         assetId: decoded,
    //         seller: sellerId,
    //         price: listedPrice,
    //         list_count: listedCount,
    //         listTime: listTime,
    //         isListed: listed == 1 ? true : false,
    //         isSold: sold == 1 ? true : false,
    //         isCancelled: canceled == 1 ? true : false,
    //         name: nftData?.params?.name,
    //         imgUrl: nftData?.params?.url
    //     }
    //     if (listingData.seller === user && listingData.isListed === true) {
    //         listings.push(listingData)
    //     }


    // }))
    return listings
}