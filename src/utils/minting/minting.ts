import * as algokit from '@algorandfoundation/algokit-utils';
import algosdk, { Transaction, TransactionSigner } from 'algosdk';


export const mintMultipleNft = async (algorand: algokit.AlgorandClient, metaUris: string[], sender: string, signer: TransactionSigner): Promise<Uint8Array[]> => {
    try {

        let txnArray: Transaction[] = []
        for (let i = 0; i < metaUris.length; i++) {
            const mintTx = await algorand.transactions.assetCreate({
                assetName: "Shiba #" + i.toString(),
                unitName: "SHIBA",
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
        return encodedTransaction
    } catch (e) {
        // console.log(e)
        return []
    }
}