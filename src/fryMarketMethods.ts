import * as algokit from '@algorandfoundation/algokit-utils';
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { AppDetails } from '@algorandfoundation/algokit-utils/types/app-client';
import algosdk, { Transaction, TransactionSigner } from 'algosdk';
import { AUCTION_ID, createFryAuctionClient } from './auctionMethod';
import { FryMarketClient } from './contracts/FryMarket';
import { getAlgodConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs';

// const FRY_MARKET_ID: bigint = 724678047n;
const FRY_MARKET_ID: bigint = 729430779n;
const FRY_MARKET_ADDRESS: string = algosdk.getApplicationAddress(FRY_MARKET_ID)
const PRIMARY_FEE: number = 300;  // 100 represent 1% & 10000 represent 100%
const SECONDARY_FEE: number = 100;  // 100 represent 1% & 10000 represent 100%
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

export const deployMarketplace = async (sender: string, signer: TransactionSigner, feePercent: number) => {
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

        const market = await marketplace.create.initMarket({ fryId: FRY_TOKEN_ID, primaryFee: BigInt(PRIMARY_FEE), secondaryFee: BigInt(SECONDARY_FEE), admin: FEE_WALLET }).then((res) => {
            console.log(res)
            return res
        }).catch((e) => {
            console.log(e)
            return e
        })


        const { marketClient, algorandClient } = await createFryMarketClient(signer, sender, market.appId)


        await algorandClient.send.payment({
            sender,
            receiver: algosdk.getApplicationAddress(market.appId),
            amount: algokit.algos(0.1 + 0.1),
            extraFee: algokit.algos(0.001)
        })
        if (market?.appId) {
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
        const hasOptedIn = accountInfo.assets.some((asset: any) => asset['asset-id'] === parseInt(assetId?.toString()));

        const atc = new algosdk.AtomicTransactionComposer();
        const suggestedParams = await algodClient.getTransactionParams().do();

        if (!hasOptedIn) {
            const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: sender,
                suggestedParams,
                to: FRY_MARKET_ADDRESS,
                amount: 200000,
            });
            atc.addTransaction({ txn: paymentTxn, signer: signer });


            const mbrPay = await algorandClient.transactions.payment({
                sender,
                receiver: algosdk.getApplicationAddress(FRY_MARKET_ID),
                amount: algokit.algos(0.1),
                extraFee: algokit.algos(0.002),
                signer
            })

            atc.addMethodCall({
                suggestedParams,
                appID: Number(FRY_MARKET_ID),
                method: marketClient.appClient.getABIMethod("optInAsset")!,
                methodArgs: [{ txn: mbrPay, signer }, Number(assetId)],
                sender: sender,
                signer: signer,
                appForeignAssets: [Number(assetId)],
            });
        }

        const assetTransferTx = await algorandClient.transactions.assetTransfer({
            sender,
            receiver: algosdk.getApplicationAddress(FRY_MARKET_ID),
            assetId: assetId,
            amount: BigInt(1),
            signer
        })

        let fee = 0;
        let boxAmount = 0;
        const boxId = algosdk.encodeUint64(assetId);
        const box = await algokit.getAppBoxValue(FRY_MARKET_ID, boxId, algodClient).then((res) => res).catch((e) => { if (e) false })
        console.log(box)
        if (!box) {
            fee = (price * PRIMARY_FEE) / 10000
            boxAmount = BOX_PRICE;
        } else {
            fee = (price * SECONDARY_FEE) / 10000
            boxAmount = 0
        }

        console.log("box asmoasfda", boxAmount)

        const feeAxfer = await algorandClient.transactions.assetTransfer({
            sender,
            signer,
            assetId: FRY_TOKEN_ID,
            receiver: FEE_WALLET,
            amount: BigInt(fee),
        })

        const boxPay = await algorandClient.transactions.payment({
            sender,
            receiver: algosdk.getApplicationAddress(FRY_MARKET_ID),
            amount: algokit.microAlgos(boxAmount),
            extraFee: algokit.algos(0.001),
            signer
        })

        atc.addMethodCall({
            suggestedParams,
            appID: Number(FRY_MARKET_ID),
            method: marketClient.appClient.getABIMethod("listAsset")!,
            methodArgs: [{ txn: boxPay, signer }, { txn: assetTransferTx, signer }, BigInt(price), BigInt(Math.floor(Date.now() / 1000)), { txn: feeAxfer, signer }],
            sender: sender,
            signer: signer,
            appForeignAssets: [Number(assetId)],
            boxes: [
                {
                    appIndex: Number(FRY_MARKET_ID),
                    name: algosdk.encodeUint64(assetId),
                },
            ],
        });

        const result = await atc.execute(algodClient, 4);
        for (const mr of result.methodResults) {
            console.log(`${mr.returnValue}`);
        }

        return true
    } catch (e) {
        console.log(e)
        throw e

    }
}

export const addCollectionRoyalty = async (
    sender: string,
    signer: TransactionSigner,
    royaltyBasis: number,
    collectionAddress: string
) => {
    const { marketClient, algorandClient, algodClient } = await createFryMarketClient(signer, sender)
    const { auctionClient } = await createFryAuctionClient(signer, sender)
    const atc = new algosdk.AtomicTransactionComposer();
    const suggestedParams = await algodClient.getTransactionParams().do();

    const boxPay = await algorandClient.transactions.payment({
        sender,
        signer,
        amount: algokit.microAlgos(2500 + 400 * 8),
        receiver: FRY_MARKET_ADDRESS
    })
    atc.addMethodCall({
        suggestedParams,
        appID: Number(FRY_MARKET_ID),
        method: marketClient.appClient.getABIMethod("addRoyalty")!,
        methodArgs: [royaltyBasis * 100, collectionAddress, { txn: boxPay, signer }],
        sender: sender,
        signer: signer,
        boxes: [
            {
                appIndex: Number(FRY_MARKET_ID),
                name: algosdk.decodeAddress(collectionAddress).publicKey
            }
        ],
    });

    const aucitonboxPay = await algorandClient.transactions.payment({
        sender,
        signer,
        amount: algokit.microAlgos(2500 + 400 * 8),
        receiver: algosdk.getApplicationAddress(AUCTION_ID)
    })


    atc.addMethodCall({
        suggestedParams,
        appID: Number(AUCTION_ID),
        method: auctionClient.appClient.getABIMethod("addRoyalty")!,
        methodArgs: [royaltyBasis * 100, collectionAddress, { txn: aucitonboxPay, signer }],
        sender: sender,
        signer: signer,
        boxes: [
            {
                appIndex: Number(AUCTION_ID),
                name: algosdk.decodeAddress(collectionAddress).publicKey
            }
        ],
    });


    const result = await atc.execute(algodClient, 4);
    for (const mr of result.methodResults) {
        console.log(`${mr.returnValue}`);
    }
}

export const updateNftListPrice = async (
    sender: string,
    assetId: bigint,
    signer: TransactionSigner,
    newPrice: number
) => {
    const { marketClient } = await createFryMarketClient(signer, sender)
    const buyTxn = await marketClient.updatePrice({ asset: assetId, price: BigInt(newPrice) });
    // console.log(buyTxn.transaction)
}

export const cancelList = async (
    sender: string,
    assetId: bigint,
    signer: TransactionSigner
) => {
    const { marketClient } = await createFryMarketClient(signer, sender)
    const cancelTxn = await marketClient.cancelList({ asset: assetId }, { sendParams: { fee: algokit.algos(0.002) } });
    // console.log(cancelTxn.transaction)
    return true;
}

export const buyNftWithRoyalty = async (
    sender: string,
    assetId: bigint,
    signer: TransactionSigner,
    seller: string,
    price: number
) => {

    try {

        const { marketClient, algorandClient, algodClient } = await createFryMarketClient(signer, sender);
        const atc = new algosdk.AtomicTransactionComposer();
        const suggestedParams = await algodClient.getTransactionParams().do();
        suggestedParams.fee = 5000;



        const accountInfo = await algodClient.accountInformation(sender).do();
        const hasOptedIn = accountInfo.assets.some((asset: any) => asset['asset-id'] === parseInt(assetId.toString()));

        if (!hasOptedIn) {
            const opIn = await algorandClient.transactions.assetOptIn({
                assetId,
                sender,
                extraFee: algokit.algos(0.001),
            })
            atc.addTransaction({ txn: opIn, signer: signer });
        }

        let fee = 0;
        const boxId = algosdk.encodeUint64(assetId);
        const box: any = await algokit.getAppBoxValue(FRY_MARKET_ID, boxId, algodClient).then((res) => res).catch((e) => { if (e) false })
        if (box) {
            const listedCount = algosdk.decodeUint64(box.slice(40, 48), "mixed")
            if (listedCount > 1) {
                fee = (price * SECONDARY_FEE) / 10000
            } else {
                fee = (price * PRIMARY_FEE) / 10000
            }
        }
        const xfer = await algorandClient.transactions.assetTransfer({
            sender,
            assetId: FRY_TOKEN_ID,
            receiver: FRY_MARKET_ADDRESS,
            amount: BigInt(price + fee),
            extraFee: algokit.algos(0.001),
            signer
        })
        const assetDetails = await algodClient.getAssetByID(Number(assetId)).do();
        atc.addMethodCall({
            suggestedParams,
            appID: Number(FRY_MARKET_ID),
            method: marketClient.appClient.getABIMethod("buyNftRoyalty")!,
            methodArgs: [assetId, FRY_TOKEN_ID, seller, FEE_WALLET, { txn: xfer, signer }],
            sender: sender,
            signer: signer,
            appForeignAssets: [Number(assetId)],
            appAccounts: [assetDetails?.params?.creator],
            boxes: [
                {
                    appIndex: Number(FRY_MARKET_ID),
                    name: algosdk.encodeUint64(assetId),
                },
                {
                    appIndex: Number(FRY_MARKET_ID),
                    name: algosdk.decodeAddress(assetDetails?.params?.creator).publicKey
                }
            ],
        });

        const result = await atc.execute(algodClient, 4);
        for (const mr of result.methodResults) {
            console.log(`${mr.returnValue}`);
        }

    } catch (e) {
        console.log(e)
        throw e
    }
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
    const filteredBoxes = boxes.filter((bx) => bx.nameRaw.byteLength == 8)
    console.log(filteredBoxes)
    await Promise.all(filteredBoxes.map(async (bx) => {
        let box = await algokit.getAppBoxValue(FRY_MARKET_ID, bx.nameRaw, algod)
        console.log("box", box)
        const decoded = algosdk.decodeUint64(bx.nameRaw, "safe")
        const nftData = await algod.getAssetByID(decoded).do();
        const sellerId = algosdk.encodeAddress(box.slice(0, 32))
        const listedPrice = algosdk.decodeUint64(box.slice(32, 40), "mixed")
        const listedCount = algosdk.decodeUint64(box.slice(40, 48), "mixed")
        const listTime = algosdk.decodeUint64(box.slice(48, 56), "mixed")
        const listed = algosdk.decodeUint64(box.slice(56, 64), "mixed")
        const sold = algosdk.decodeUint64(box.slice(64, 72), "mixed")
        const canceled = algosdk.decodeUint64(box.slice(72, 80), "mixed")

        let listingData: Listing = {
            assetId: decoded,
            seller: sellerId,
            price: Number(listedPrice),
            list_count: Number(listedCount),
            listTime: Number(listTime),
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


export const getSingleNftlistData = async (nftId: number): Promise<Listing> => {
    const algod = await getAlgodClient()
    const boxId = algosdk.encodeUint64(nftId);
    const decoded = algosdk.decodeUint64(boxId, "safe")
    let box = await algokit.getAppBoxValue(FRY_MARKET_ID, boxId, algod)
    const nftData = await algod.getAssetByID(decoded).do();
    const sellerId = algosdk.encodeAddress(box.slice(0, 32))
    const listedPrice = algosdk.decodeUint64(box.slice(32, 40), "mixed")
    const listedCount = algosdk.decodeUint64(box.slice(40, 48), "mixed")
    const listTime = algosdk.decodeUint64(box.slice(48, 56), "mixed")
    const listed = algosdk.decodeUint64(box.slice(56, 64), "mixed")
    const sold = algosdk.decodeUint64(box.slice(64, 72), "mixed")
    const canceled = algosdk.decodeUint64(box.slice(72, 80), "mixed")

    let listingData: Listing = {
        assetId: decoded,
        seller: sellerId,
        price: Number(listedPrice),
        list_count: Number(listedCount),
        listTime: Number(listTime),
        isListed: listed == 1 ? true : false,
        isSold: sold == 1 ? true : false,
        isCancelled: canceled == 1 ? true : false,
        name: nftData?.params?.name,
        imgUrl: nftData?.params?.url
    }

    return listingData
}

export const mintMultipleNft = async (metaUris: any, sender: string, signer: TransactionSigner, signTransactions: any, sendTransactions: any): Promise<Uint8Array[]> => {
    try {
        const { algorandClient } = await createFryMarketClient(signer, sender)

        let txnArray: Transaction[] = []
        for (let i = 0; i < metaUris.length; i++) {
            const mintTx = await algorandClient.transactions.assetCreate({
                assetName: `${metaUris[i].name} #` + i.toString(),
                // unitName: metaUris[i].name,
                url: metaUris[i].metadata,
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
                const listedPrice = algosdk.decodeUint64(box.slice(32, 40), "mixed")
                const listedCount = algosdk.decodeUint64(box.slice(40, 48), "mixed")
                const listTime = algosdk.decodeUint64(box.slice(48, 56), "mixed")
                const listed = algosdk.decodeUint64(box.slice(56, 64), "mixed")
                const sold = algosdk.decodeUint64(box.slice(64, 72), "mixed")
                const canceled = algosdk.decodeUint64(box.slice(72, 80), "mixed")

                let listingData: Listing = {
                    assetId: decoded,
                    seller: sellerId,
                    price: Number(listedPrice),
                    list_count: Number(listedCount),
                    listTime: Number(listTime),
                    isListed: listed == 1 ? true : false,
                    isSold: sold == 1 ? true : false,
                    isCancelled: canceled == 1 ? true : false,
                    name: nftData?.params?.name,
                    imgUrl: nftData?.params?.url
                }
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
                const listedPrice = algosdk.decodeUint64(box.slice(32, 40), "mixed")
                const listedCount = algosdk.decodeUint64(box.slice(40, 48), "mixed")
                const listTime = algosdk.decodeUint64(box.slice(48, 56), "mixed")
                const listed = algosdk.decodeUint64(box.slice(56, 64), "mixed")
                const sold = algosdk.decodeUint64(box.slice(64, 72), "mixed")
                const canceled = algosdk.decodeUint64(box.slice(72, 80), "mixed")

                let listingData: Listing = {
                    assetId: decoded,
                    seller: sellerId,
                    price: Number(listedPrice),
                    list_count: Number(listedCount),
                    listTime: Number(listTime),
                    isListed: listed == 1 ? true : false,
                    isSold: sold == 1 ? true : false,
                    isCancelled: canceled == 1 ? true : false,
                    name: nftData?.params?.name,
                    imgUrl: nftData?.params?.url
                }
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
        const listedPrice = algosdk.decodeUint64(box.slice(32, 40), "mixed")
        const listedCount = algosdk.decodeUint64(box.slice(40, 48), "mixed")
        const listTime = algosdk.decodeUint64(box.slice(48, 56), "mixed")
        const listed = algosdk.decodeUint64(box.slice(56, 64), "mixed")
        const sold = algosdk.decodeUint64(box.slice(64, 72), "mixed")
        const canceled = algosdk.decodeUint64(box.slice(72, 80), "mixed")

        let listingData: Listing = {
            assetId: decoded,
            seller: sellerId,
            price: Number(listedPrice),
            list_count: Number(listedCount),
            listTime: Number(listTime),
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

export const getRoyalty = async (collection: string) => {
    const algod = await getAlgodClient()
    let box = await algokit.getAppBoxValue(FRY_MARKET_ID, algosdk.decodeAddress(collection).publicKey, algod)
    const royaltPercent = algosdk.decodeUint64(box.slice(0, 8), "mixed")
    return royaltPercent
}


//! Transaction for fee
export const trasnferFee = async (amount: number, sender: string, signer: TransactionSigner) => {
    try {
        const { algorandClient } = await createFryMarketClient(signer, sender);
        const tx = await algorandClient.send.assetTransfer({
            sender,
            assetId: FRY_TOKEN_ID,
            receiver: FEE_WALLET,
            amount: BigInt(amount)
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
    const nfts: any = await algokit.lookupAccountByAddress(user, indexer);
    const assets: Asset[] = nfts.assets.filter((nft: Asset) => !nft["is-frozen"] && nft.amount === 1)
    const allNfts: Record<string, any>[] = [];
    await Promise.all(assets.map(async (asset: Asset) => {
        const nftData: Record<string, any> = await indexer.lookupAssetByID(asset["asset-id"]).do()
        allNfts.push({ nftAddress: nftData.index, ...nftData.params })
    }))
    return allNfts
}

//! get user balance

export const userFryBalance = async (user: string): Promise<number> => {
    const indexer = await getIndexerClient()
    const nfts: any = await algokit.lookupAccountByAddress(user, indexer);
    const asset: Asset = nfts.assets.filter((nft: Asset) => nft["asset-id"] === parseInt(FRY_TOKEN_ID.toString()))[0]
    return asset.amount
}


//! get fry fee for nft minting and imagegeneration

export const getImgGenFee = async (isCollection: boolean, numofimgs: number, signer: TransactionSigner, sender: string) => {
    // const res = await axios.get("https://api.coingecko.com/api/v3/coins/fryscrypto").then((res) => res.data)
    // const tokenPrice = res?.market_data?.current_price?.usd; //$  dollars
    const tokenPrice = 0.0336; //$  dollars
    console.log("tokenPrice", tokenPrice)
    const { algorandClient } = await createFryMarketClient(signer, sender);
    const bal = await userFryBalance(sender)
    if (isCollection) {
        const pricePerImg = 0.05   //$  dollars
        const amountInFry = pricePerImg / tokenPrice;
        if ((Math.floor(amountInFry * numofimgs) * 1000000) > bal) {
            throw new Error("Not Enough Balance")
        }
        const tx = await algorandClient.send.assetTransfer({
            assetId: FRY_TOKEN_ID,
            receiver: FEE_WALLET,
            sender,
            amount: BigInt(Math.floor(amountInFry * numofimgs) * 1000000)
        })
        return tx
    } else {
        if (numofimgs > 1) {
            throw new Error("Please select valid number of images")
        }
        const pricePerImg = 1   //$  dollars
        const amountInFry = pricePerImg / tokenPrice;
        if ((Math.floor(amountInFry * numofimgs) * 1000000) > bal) {
            throw new Error("Not Enough Balance")
        }
        const tx = await algorandClient.send.assetTransfer({
            assetId: FRY_TOKEN_ID,
            receiver: FEE_WALLET,
            sender,
            amount: BigInt(Math.floor(amountInFry * numofimgs) * 1000000)
        })
        return tx
    }
}


interface Asset {
    "amount": number,
    "asset-id": number,
    "is-frozen": boolean,
}