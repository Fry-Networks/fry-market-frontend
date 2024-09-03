import * as algokit from '@algorandfoundation/algokit-utils';
import algosdk, { Transaction, TransactionSigner } from 'algosdk';
import { FryMarketClient } from './contracts/FryMarket';
import { getAlgodConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs';

const FRY_MARKET_ID: bigint = 717737375n;
const FRY_MARKET_ADDRESS: string = algosdk.getApplicationAddress(FRY_MARKET_ID)
const FEE_PERCENT: number = 5000;  // 100 represent 1% & 10000 represent 100%
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

const createFryMarketClient = async (signer: TransactionSigner, activeAddress: string) => {
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
        id: FRY_MARKET_ID,
        sender: { addr: activeAddress!, signer },
    }, algorandClient.client.algod
    )

    return { marketClient, algorandClient, algodClient }
}

//!Marketplace functions
const BOX_PRICE = 2500 + 400 * 81
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
    newPrice: bigint
) => {
    const { marketClient } = await createFryMarketClient(signer, sender)
    const buyTxn = await marketClient.updatePrice({ asset: assetId, price: newPrice });
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

    const buyNft = await marketClient.buyNft({ asset: assetId, xfer, xferFee: xfer_fee }, { sendParams: { fee: algokit.algos(0.002) } });
    console.log(buyNft.transaction)
}

export interface Listing {
    assetId: number,
    seller: string,
    price: number,
    list_count: number,
    listTime: number,
    listed: boolean,
    imgUrl: string,
    name: string
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
        const listed = algosdk.decodeUint64(box.slice(-1), "safe")

        let listingData: Listing = {
            assetId: decoded,
            seller: sellerId,
            price: listedPrice,
            list_count: listedCount,
            listTime: listTime,
            listed: listed == 1 ? true : false,
            name: nftData?.params?.name,
            imgUrl: nftData?.params?.url
        }
        listings.push(listingData)
    }))

    return listings
}


export const mintMultipleNft = async (metaUris: string[], sender: string, signer: TransactionSigner, name: string, signTransactions: any, sendTransactions: any): Promise<Uint8Array[]> => {
    try {
        const { marketClient, algorandClient, algodClient } = await createFryMarketClient(signer, sender)

        let txnArray: Transaction[] = []
        for (let i = 0; i < metaUris.length; i++) {
            const mintTx = await algorandClient.transactions.assetCreate({
                assetName: `${name} #` + i.toString(),
                unitName: name,
                url: metaUris[i],
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