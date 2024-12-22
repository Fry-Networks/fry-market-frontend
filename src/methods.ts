import * as algokit from '@algorandfoundation/algokit-utils';
import algosdk, { Transaction, TransactionSigner } from 'algosdk';
import AlgodClient from 'algosdk/dist/types/client/v2/algod/algod';
import IndexerClient from 'algosdk/dist/types/client/v2/indexer/indexer';
import * as abi from "./contracts/AlgoMarket";
import { AlgoMarketClient } from './contracts/AlgoMarket';
import * as royaltyAbi from "./contracts/ARC18";

// export function create(
//     algorand: algokit.AlgorandClient,
//     marketclient: AlgoMarketClient,
//     assetBeingSold: bigint,
//     unitaryPrice: bigint,
//     quantity: bigint,
//     sender: string,
//     setAppId: (id: number) => void
// ) {
//     return async () => {
//         let asset = assetBeingSold;
//         // if (asset === 0n) {
//         //     let newAsset = await algorand.send.assetCreate({
//         //         total: quantity,
//         //         sender
//         //     })
//         //     asset = BigInt(newAsset.confirmation.assetIndex!)
//         // }
//         const createApp = await marketclient.create.createApplication({ assetId: asset, unitaryPrice: unitaryPrice })

//         const mbrTxn = await algorand.transactions.payment({
//             sender,
//             receiver: createApp.appAddress,
//             amount: algokit.algos(0.1 + 0.1),
//             extraFee: algokit.algos(0.001)
//         });

//         await marketclient.listNft({ mbrPay: mbrTxn });

//         await algorand.send.assetTransfer({
//             sender,
//             assetId: asset,
//             receiver: createApp.appAddress,
//             amount: quantity
//         })

//         setAppId(Number(createApp.appId))
//     }
// }

// export function buy(
//     algorand: algokit.AlgorandClient,
//     marketclient: AlgoMarketClient,
//     sender: string,
//     appAddress: string,
//     quantity: bigint,
//     unitaryPrice: bigint,
//     setUnitsLeft: (units: bigint) => void
// ) {
//     return async () => {
//         let paymentTxn = await algorand.transactions.payment({
//             sender,
//             receiver: appAddress,
//             amount: algokit.microAlgos(Number(quantity * unitaryPrice)),
//             extraFee: algokit.algos(0.001)
//         })

//         await marketclient.buy({ buyerTx: paymentTxn, quantity })

//         const state = await marketclient.getGlobalState();

//         const info = await algorand.account.getAssetInformation(appAddress, state.assetId!.asBigInt())

//         setUnitsLeft(info.balance)
//     }
// }

// export function deleteApp(
//     algorand: algokit.AlgorandClient,
//     marketclient: AlgoMarketClient,
//     setAppId: (id: number) => void
// ) {
//     return async () => {
//         await marketclient.delete.delete({});
//         setAppId(0)
//     }
// }

// export function mint(
//     algorand: algokit.AlgorandClient,
//     marketclient: AlgoMarketClient,
//     sender: string,
//     appAddress: string,
//     quantity: bigint,
//     unitaryPrice: bigint,
//     setUnitsLeft: (units: bigint) => void
// ) {
//     return async () => {
//         let paymentTxn = await algorand.transactions.payment({
//             sender,
//             receiver: appAddress,
//             amount: algokit.microAlgos(Number(quantity * unitaryPrice)),
//             extraFee: algokit.algos(0.001)
//         })

//         await marketclient.mintAsset({ name: "y00t #0", unitName: "YOU", url: "https://gateway.pinata.cloud/ipfs/QmQVwV5cJxphBx2VevjNzzNECWNjQcQyuXErhB2QiqMNjx" })

//         const state = await marketclient.getGlobalState();

//         const info = await algorand.account.getAssetInformation(appAddress, state.assetId!.asBigInt())

//         setUnitsLeft(info.balance)
//     }
// }


// export function mint(
//     algorand: algokit.AlgorandClient,
//     marketclient: AlgoMarketClient,
//     sender: string,
//     appAddress: string,
//     appId: number,
//     algodClient: AlgodClient,
//     signer: TransactionSigner
// ) {
//     return async () => {



//         let payment = await algorand.send.payment({
//             sender,
//             receiver: appAddress,
//             amount: algokit.microAlgos(200000),
//             extraFee: algokit.algos(0.001)
//         })

//         let mintingtx = await marketclient.mintAsset({ name: "y00t #1", unitName: "YOU", url: "https://arweave.net/Y__Qhbjg8Lhrug43HfZ-YzN9Pe5EGCHOwy1eO56xLuc", note: JSON.stringify(metadata2) }, { sendParams: { fee: algokit.algos(0.2) } })

//         console.log("mintingtx:", mintingtx)
//         let innertxn = mintingtx?.confirmation?.innerTxns;
//         let asset;
//         if (innertxn) {
//             asset = innertxn[0].assetIndex;
//         }

//         console.log(asset?.toString())

//         await algorand.send.assetTransfer({
//             sender,
//             receiver: sender,
//             assetId: BigInt(asset ?? 0),
//             amount: BigInt(0)
//         })

//         let transferTx = await marketclient.transferNft({ assetId: BigInt(asset ?? 0) }, { sendParams: { fee: algokit.algos(0.2) } })

//         console.log("transferTx", transferTx)

//         const contract = new algosdk.ABIContract(abi.APP_SPEC.contract)

//         function getMethodByName(name: string): algosdk.ABIMethod {
//             const m = contract.methods.find((mt: algosdk.ABIMethod) => { return mt.name == name })
//             if (m === undefined)
//                 throw Error("Method undefined")
//             return m
//         }

//         // let groupTx = [payment, mintingtx]
//         // const info = await algorand.account.getAssetInformation(appAddress, state.assetId!.asBigInt())

//         // setUnitsLeft(info.balance

//         const sp = await algodClient.getTransactionParams().do()
//         const transferTxn = await algosdk.makeApplicationNoOpTxn(
//             sender,
//             sp,
//             123,
//             [new Uint8Array([1, 2])]
//         )
//         const comp = new algosdk.AtomicTransactionComposer();
//         comp.addMethodCall({
//             appID: 123,
//             method: getMethodByName("creaate"),
//             methodArgs: [],
//             sender,
//             suggestedParams: sp,
//             signer
//         })

//     }
// }
const contract = new algosdk.ABIContract(royaltyAbi.APP_SPEC.contract)
function getMethodByName(name: string): algosdk.ABIMethod {
    const m = contract.methods.find((mt: algosdk.ABIMethod) => { return mt.name == name })
    if (m === undefined)
        throw Error("Method undefined")
    return m
}

//!Marketplace functions
const BOX_PRICE = 2500 + 400 * 72
export function listNft(
    algorand: algokit.AlgorandClient,
    marketclient: AlgoMarketClient,
    appId: bigint,
    sender: string,
    assetId: bigint,
    signer: TransactionSigner
) {
    return async () => {
        try {

            // const isOptin = await algorand.account.getAssetInformation(algosdk.getApplicationAddress(appId), assetId);

            // if (!isOptin) {

            // await algorand.send.payment({
            //     sender,
            //     receiver: algosdk.getApplicationAddress(appId),
            //     amount: algokit.algos(0.1 + 0.1),
            //     extraFee: algokit.algos(0.001)
            // })

            // console.log(algosdk.getApplicationAddress(appId))
            // const mbrPay = await algorand.transactions.payment({
            //     sender,
            //     receiver: algosdk.getApplicationAddress(appId),
            //     amount: algokit.algos(0.1),
            //     extraFee: algokit.algos(0.002),
            //     signer
            // })
            // const optInAsset = await marketclient.optInAsset({ mbrPay, asset: assetId })
            // console.log("optin Asset", optInAsset)
            // }

            // console.log("BOX_PRICE", BOX_PRICE)
            const boxPay = await algorand.transactions.payment({
                sender,
                receiver: algosdk.getApplicationAddress(appId),
                amount: algokit.microAlgos(BOX_PRICE),
                extraFee: algokit.algos(0.001),
                signer
            })

            const assetTransferTx = await algorand.transactions.assetTransfer({
                sender,
                receiver: algosdk.getApplicationAddress(appId),
                assetId: assetId,
                amount: BigInt(1000000),
                signer
            })

            const listNft = await marketclient.listAsset({ mbrPay: boxPay, xfer: assetTransferTx, price: BigInt(1000000) })

            // console.log("list nft", listNft)
        } catch (e) {
            // console.log(e)
        }
    }
}

export function cancelList(
    algorand: algokit.AlgorandClient,
    marketclient: AlgoMarketClient,
    appId: bigint,
    sender: string,
    assetId: bigint,
    signer: TransactionSigner
) {
    return async () => {
        const cancelTxn = await marketclient.cancelList({ asset: assetId }, { sendParams: { fee: algokit.algos(0.003) } });
        // console.log(cancelTxn)
    }
}

export function buyNft(
    algorand: algokit.AlgorandClient,
    marketclient: AlgoMarketClient,
    appId: bigint,
    sender: string,
    assetId: bigint,
    signer: TransactionSigner,
    amount: bigint
) {
    return async () => {


        // algorand.send.assetTransfer({
        //     sender,
        //     receiver: sender,
        //     closeAssetTo: sender,
        //     assetId: assetId,
        //     amount: BigInt(0)
        // })


        const xfer = await algorand.transactions.assetTransfer({
            sender,
            assetId,
            receiver: "FW5K3IUZ2WQDCFDWPCBBSXAZXQQDONNN54FDVYHFCMOCK7PFDLROPGTTWM",
            amount: amount,
            signer
        })

        const xfer_fee = await algorand.transactions.assetTransfer({
            sender,
            assetId,
            receiver: "TINQ25R3FHBYQ66ONTOQTHRNGKC73HTQKJCIVEJGEGPDQPVDCHAWRRPJEQ",
            amount: amount,
            signer
        })

        const buyNft = await marketclient.buyNft({ asset: assetId, xfer, xferFee: xfer_fee }, { sendParams: { fee: algokit.algos(0.002) } });
        // console.log(buyNft)
    }
}

export function checkwallet(
    algorand: algokit.AlgorandClient,
    marketclient: AlgoMarketClient,
    appId: bigint,
    sender: string,
    assetId: bigint,
    signer: TransactionSigner,
    amount: bigint
) {
    return async () => {

        const xfer = await algorand.transactions.assetTransfer({
            sender,
            assetId,
            receiver: "TINQ25R3FHBYQ66ONTOQTHRNGKC73HTQKJCIVEJGEGPDQPVDCHAWRRPJEQ",
            amount: amount,
            signer
        })

        const xfer_fee = await algorand.transactions.assetTransfer({
            sender,
            assetId,
            receiver: "TINQ25R3FHBYQ66ONTOQTHRNGKC73HTQKJCIVEJGEGPDQPVDCHAWRRPJEQ",
            amount: amount,
            signer
        })

        // const check = await marketclient.checkWallet({ xfer: xfer_fee }, { sendParams: { fee: algokit.algos(0.001) } });
        // console.log(check)
    }
}

interface Listing {
    assetId: number,
    seller: string,
    price: number,
    list_count: number
}

export function getBoxValues(
    algorand: algokit.AlgorandClient,
    appId: bigint,
    boxId: string,
    algod: algosdk.Algodv2
) {
    return async () => {
        // console.log(boxId)
        const listings: Listing[] = [];
        const boxes = await algokit.getAppBoxNames(appId, algod);
        await Promise.all(boxes.map(async (bx) => {
            const decoded = algosdk.decodeUint64(bx.nameRaw, "safe")
            let box = await algokit.getAppBoxValue(appId, bx.nameRaw, algod)
            const sellerId = algosdk.encodeAddress(box.slice(0, 32))
            const listedPrice = algosdk.decodeUint64(box.slice(32, 40), "safe")
            const listedCount = algosdk.decodeUint64(box.slice(-8), "safe")
            // console.log(box)

            let listingData: Listing = {
                assetId: decoded,
                seller: sellerId,
                price: listedPrice,
                list_count: listedCount
            }
            listings.push(listingData)
        }))

        // console.log("listings", listings)
    }
}

export function optout(
    algorand: algokit.AlgorandClient,
    marketclient: AlgoMarketClient,
    sender: string,
    assetId: number
) {
    return async () => {

        algorand.send.assetTransfer({
            sender,
            receiver: sender,
            closeAssetTo: sender,
            assetId: BigInt(assetId),
            amount: BigInt(0)
        })
    }
}

export function fetchCollection(
    appAddress: string,
    indexerClient: IndexerClient
) {
    return async () => {
        let accounts = await algokit.lookupAccountByAddress(appAddress, indexerClient);
        // console.log(accounts)
    }
}


export const testingTxn = async (
    algorand: algokit.AlgorandClient,
    sender: string,
    algodClient: AlgodClient,
    signer: TransactionSigner,
    appId: bigint,
    marketclient: AlgoMarketClient
): Promise<Transaction[]> => {
    const contract = new algosdk.ABIContract(abi.APP_SPEC.contract)

    function getMethodByName(name: string): algosdk.ABIMethod {
        const m = contract.methods.find((mt: algosdk.ABIMethod) => { return mt.name == name })
        if (m === undefined)
            throw Error("Method undefined")
        return m
    }

    // await algorand.send.payment({
    //     sender,
    //     receiver: algosdk.getApplicationAddress(appId),
    //     amount: algokit.algos(0.2),
    // })


    let newtx: Transaction[] = await algorand.transactions.methodCall({
        sender,
        appId: BigInt(appId),
        method: getMethodByName("mintAsset"),
        args: ["y00t #1", "YOU", "https://arweave.net/Y__Qhbjg8Lhrug43HfZ-YzN9Pe5EGCHOwy1eO56xLuc", JSON.stringify(metadata2)],
        signer,
        rekeyTo: algosdk.getApplicationAddress(appId),
        assetReferences: [BigInt(706213335)],
        extraFee: algokit.algos(0.004),
    })

    // console.log("tx1", newtx, newtx.length)

    let trstx: Transaction[] = await algorand.transactions.methodCall({
        sender,
        appId: BigInt(appId),
        method: getMethodByName("transferFee"),
        args: ["TINQ25R3FHBYQ66ONTOQTHRNGKC73HTQKJCIVEJGEGPDQPVDCHAWRRPJEQ"],
        signer,
        rekeyTo: algosdk.getApplicationAddress(appId),
        accountReferences: ["TINQ25R3FHBYQ66ONTOQTHRNGKC73HTQKJCIVEJGEGPDQPVDCHAWRRPJEQ"],
        assetReferences: [BigInt(706213335)],
        extraFee: algokit.algos(0.002),
    })


    // let transfertx: Transaction = await algorand.transactions.payment({
    //     sender,
    //     amount: algokit.algos(1),
    //     receiver: "QAA3WI7G4YAJJQHEODF6H224PBXPB6K4KWGINPJNHJOXJL66YUNFLZSPEI",
    // })

    // console.log("tx2", transfertx)
    // newtx.push(transfertx)
    // newtx.push(paymenttx)
    // console.log("tx3", newtx, newtx.length)
    return trstx
}


export const getGlobalState = async (marketClient: AlgoMarketClient) => {
    try {
        let encode = algosdk.decodeAddress("TINQ25R3FHBYQ66ONTOQTHRNGKC73HTQKJCIVEJGEGPDQPVDCHAWRRPJEQ");
        // console.log("dncoe", encode)
        const data = await marketClient.getGlobalState();
        return data
    } catch (e) {
        // console.log(e)
        return e
    }
}

export const getNfts = async (algorandClient: algokit.AlgorandClient, appId: bigint, assetId: bigint) => {
    const nft = await algorandClient.account.getAssetInformation(algosdk.getApplicationAddress(appId), assetId);
    // console.log(nft)
}

// !royality market place
export function listRoyalNft(
    algorand: algokit.AlgorandClient,
    marketclient: AlgoMarketClient,
    appId: bigint,
    sender: string,
    assetId: bigint,
    signer: TransactionSigner
) {
    return async () => {
        try {

            await algorand.send.payment({
                sender,
                receiver: algosdk.getApplicationAddress(appId),
                amount: algokit.microAlgos(100000),
                extraFee: algokit.algos(0.001),
                signer
            })

            // console.log("BOX_PRICE", BOX_PRICE)
            const boxPay = await algorand.transactions.payment({
                sender,
                receiver: algosdk.getApplicationAddress(appId),
                amount: algokit.microAlgos(BOX_PRICE),
                extraFee: algokit.algos(0.001),
                signer
            })

            const listNft = await marketclient.listRoyaltyAsset({ asset: assetId, mbrPay: boxPay, price: BigInt(1000000) })

            // console.log("list nft", listNft)
        } catch (e) {
            // console.log(e)
        }
    }
}

export function buyRoyalNft(
    algorand: algokit.AlgorandClient,
    marketclient: AlgoMarketClient,
    appId: bigint,
    sender: string,
    assetId: bigint,
    signer: TransactionSigner
) {
    return async () => {
        try {


            // await algorand.send.assetTransfer({
            //     assetId,
            //     sender,
            //     receiver: sender,
            //     amount: 0n
            // })

            // console.log("BOX_PRICE", BOX_PRICE)
            const buyPriceTx = await algorand.transactions.payment({
                sender,
                receiver: algosdk.getApplicationAddress(appId),
                amount: algokit.microAlgos(1000000),
                extraFee: algokit.algos(0.001),
                signer
            })

            let result = (500 * 1000000) / 10000

            // console.log(result, buyPriceTx.amount)

            // const axfer_tx = await algorand.transactions.methodCall({
            //     appId: BigInt(716174498),
            //     method: getMethodByName("transferAsset"),
            //     args: [assetId, "7Z7X2AL3X5EZ72XFMZRN7XCKSB2NRVOANVYLLSWIVSEYCBAA2BP6TD4QDA", sender, "TINQ25R3FHBYQ66ONTOQTHRNGKC73HTQKJCIVEJGEGPDQPVDCHAWRRPJEQ", BigInt(500), BigInt(result), BigInt(1000000)],
            //     sender,
            // })
            // console.log(axfer_tx)


            const buyNfts = await marketclient.buyRoyaltyAsset(
                {
                    asset: assetId,
                    mbrPay: buyPriceTx,
                    seller: "FW5K3IUZ2WQDCFDWPCBBSXAZXQQDONNN54FDVYHFCMOCK7PFDLROPGTTWM",
                    buyer: sender,
                    royaltyReceiver: "TINQ25R3FHBYQ66ONTOQTHRNGKC73HTQKJCIVEJGEGPDQPVDCHAWRRPJEQ",
                    royaltySfbp: BigInt(500),
                    royaltyId: BigInt(716399969),
                },
                {
                    sendParams: {
                        fee: algokit.algos(0.006)
                    }
                }
            )

            // console.log("list nft", buyNfts)
        } catch (e) {
            // console.log(e)
        }
    }
}

export function transferNftToWallet(
    algorand: algokit.AlgorandClient,
    marketclient: AlgoMarketClient,
    appId: bigint,
    sender: string,
    assetId: bigint,
    signer: TransactionSigner
) {
    return async () => {
        try {

            // console.log("BOX_PRICE", BOX_PRICE)
            const boxPay = await algorand.transactions.payment({
                sender,
                receiver: algosdk.getApplicationAddress(appId),
                amount: algokit.microAlgos(1000000),
                extraFee: algokit.algos(0.001),
                signer
            })

            let result = (500 / 10000) * 1000000

            // console.log(result)

            const axfer_tx = await algorand.transactions.methodCall({
                appId: BigInt(715530060),
                method: getMethodByName("transferAsset"),
                args: [assetId, "7Z7X2AL3X5EZ72XFMZRN7XCKSB2NRVOANVYLLSWIVSEYCBAA2BP6TD4QDA", sender, "TINQ25R3FHBYQ66ONTOQTHRNGKC73HTQKJCIVEJGEGPDQPVDCHAWRRPJEQ", BigInt(500), BigInt(result), BigInt(1000000)],
                sender,
            })
            // console.log(axfer_tx)

            const buyNfts = await marketclient.buyRoyaltyAsset(
                {
                    asset: assetId,
                    mbrPay: boxPay,
                    seller: "FW5K3IUZ2WQDCFDWPCBBSXAZXQQDONNN54FDVYHFCMOCK7PFDLROPGTTWM",
                    buyer: sender,
                    royaltyReceiver: "TINQ25R3FHBYQ66ONTOQTHRNGKC73HTQKJCIVEJGEGPDQPVDCHAWRRPJEQ",
                    royaltySfbp: BigInt(500),
                    royaltyId: BigInt(715530060),
                    // dapp: axfer_tx[0]
                },
                {
                    sendParams: {
                        fee: algokit.algos(0.005)
                    }
                }
            )

            // console.log("list nft", buyNfts)
        } catch (e) {
            // console.log(e)
        }
    }
}





let metadata = {
    "standard": "arc69",
    "properties": {
        "Background": "Solitary Star",
        "Fur": "Pewter",
        "Face": "Smirk",
        "Clothes": "Orange Hoodie",
        "Head": "Beanie (blackout)",
        "Eyewear": "Windsors (blackout)"
    },
    "description": "y00ts is a generative art project of 15,000 NFTs. y00topia is a curated community of builders and creators.",
    "image_mime_type": "image/png",
};

let metadata2 = {
    "standard": "arc69",
    "properties": {
        "Background": "Powder Puff",
        "Fur": "Tumbleweed",
        "Face": "Wholesome",
        "Clothes": "Football Jersey",
        "Head": "Money Bands",
        "Eyewear": "Pollocks"
    },
    "description": "y00ts is a generative art project of 15,000 NFTs. y00topia is a curated community of builders and creators.",
    "image_mime_type": "image/png",
};