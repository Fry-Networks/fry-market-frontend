import * as algokit from '@algorandfoundation/algokit-utils';
import algosdk from 'algosdk';
import { CreateCollectionClient } from "./contracts/CreateCollection";


export function createCollection(
    nftsClient: CreateCollectionClient,
    name: string,
    collSupply: bigint,
    roayltyContract: bigint
) {
    return async () => {
        try {
            let create = await nftsClient.create.initCollection({ name: name, supply: collSupply, royaltyContract: algosdk.getApplicationAddress(roayltyContract) })
            // console.log(create)
        } catch (e) {
            // console.log(e)
        }
    }
}

export function mintNft(
    algorand: algokit.AlgorandClient,
    nftsClient: CreateCollectionClient,
    sender: string,
    appId: bigint
) {
    return async () => {
        // await algorand.send.payment({
        //     sender,
        //     receiver: algosdk.getApplicationAddress(appId),
        //     amount: algokit.algos(0.2),
        // })

        // const mint = await nftsClient.mintNft({ name: "y00t #2", unitName: "YOOT", url: "ipfs://QmUJn6YMnv1WRBDsKS4tLTbFTyDDDroJcS5WStD9fdmSdi#arc3", note: "" },
        //     { sendParams: { fee: algokit.algos(0.002) } }).then((res) => res.return)

        // console.log(mint)

        // console.log(algosdk.getApplicationAddress(appId))

        const userOptin = await algorand.transactions.assetTransfer({
            sender,
            receiver: sender,
            amount: BigInt(0),
            assetId: 716171034n
        })

        const axferTx = await nftsClient.transferNft({ assetId: 716171034n, assetOptIn: userOptin }, { sendParams: { fee: algokit.algos(0.002) } })
        // console.log(axferTx)
    }
}


export function burnNft(
    algorand: algokit.AlgorandClient,
    nftsClient: CreateCollectionClient,
    sender: string,
    assetId: bigint
) {
    return async () => {

        // console.log("first")
        await algorand.send.assetDestroy({
            sender,
            assetId
        })
    }
}


export function createNft(
    algorand: algokit.AlgorandClient,
    nftsClient: CreateCollectionClient,
    sender: string,
    assetId: bigint
) {
    return async () => {

        // console.log("first")
        const axfer = await algorand.send.assetCreate({
            sender,
            unitName: "yoot",
            assetName: "yoot 2",
            url: "ipfs://QmUJn6YMnv1WRBDsKS4tLTbFTyDDDroJcS5WStD9fdmSdi#arc3",
            decimals: 0,
            defaultFrozen: true,
            total: BigInt(1),
            manager: "3SAODKBSNOH5VWLRGQR7FTNKZ4PIY4DW4HR3CWPMYCN2LVVFEHTYUO4ZPE",
            clawback: "3SAODKBSNOH5VWLRGQR7FTNKZ4PIY4DW4HR3CWPMYCN2LVVFEHTYUO4ZPE",
            freeze: "3SAODKBSNOH5VWLRGQR7FTNKZ4PIY4DW4HR3CWPMYCN2LVVFEHTYUO4ZPE",
            reserve: "3SAODKBSNOH5VWLRGQR7FTNKZ4PIY4DW4HR3CWPMYCN2LVVFEHTYUO4ZPE"
        })

        // console.log(axfer)
    }
}

export function transferAlgo(
    algorand: algokit.AlgorandClient,
    nftsClient: CreateCollectionClient,
    sender: string,
    assetId: bigint
) {
    return async () => {
        algorand.send.payment({
            sender,
            receiver: "ZZYLJFGQXOKGSECNW7DUTDRZWU4WFZRESEFTMZDGFS3BBD3NU53FIJG7J4",
            amount: algokit.algos(0.2),
        })
    }
}


export function burnMyNft(
    algorand: algokit.AlgorandClient,
    nftsClient: CreateCollectionClient,
    sender: string,
    assetId: bigint
) {
    return async () => {
        algorand.send.assetDestroy({
            assetId,
            sender,
        })
    }
}

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

const metadata3 = {
    'name': 'NK 0002',
    'image': 'ipfs://QmSkeC63sueYme1VedEHgy1QpsEc7r4sZXcwYDrtev3mk2',
    'decimals': 0,
    'unitName': 'NK 0002',
    'assetName': 'NK 0002',
    'properties': {
        'arc69': {
            'standard': 'arc69',
            'attributes': [
                { 'value': 'eggshell blue', 'trait_type': 'backgrounds' },
                { 'value': 'honey skin', 'trait_type': 'skintone' },
                { 'value': 'blank', 'trait_type': 'neck' },
                { 'value': 'blue nks hoodie', 'trait_type': 'clothing' },
                { 'value': 'brown short afro', 'trait_type': 'hair' },
                { 'value': 'handz3', 'trait_type': 'headsets' },
                { 'value': 'smoking mouth', 'trait_type': 'mouth' }
            ]
        },
        'creator': { 'name': 'Node Keepers', 'address': 'CB3KEWUQUTDHQ3TC4P65UQLHC3S7KNBWPTHOFAL7CV4QCDUPDNVY5J3BT4', 'description': '' },
        'keyWords': [],
        'publisher': 'dartroom.xyz',
        'royalties': [{ 'addr': 'CB3KEWUQUTDHQ3TC4P65UQLHC3S7KNBWPTHOFAL7CV4QCDUPDNVY5J3BT4', 'name': 'creator', 'share': 5 }],
        'collection': { 'name': 'NODE KEEPERS' },
        'numberOfItems': 1,
        'itemListElement': 1
    },
    'description': 'Protecting decentralization since 2029. Join the rebellion!',
    'image_mimetype': 'image/png',
    'image_integrity': 'sha256-n7p5sKNOyQMi6XcNH2qLz5fT6QOYN9kM3NquTnT9wmY='
}

const metadata4 = {
    'name': 'y00t #2',
    'image': 'https://metadata.y00ts.com/y/7518.png',
    'decimals': 0,
    'unitName': 'y00t #2',
    'assetName': 'y00t #2',
    'properties': {
        'arc3': {
            'standard': 'arc3',
            "attributes": [
                {
                    "trait_type": "Background",
                    "value": "Buttercream"
                },
                {
                    "trait_type": "Fur",
                    "value": "Pewter"
                },
                {
                    "trait_type": "Face",
                    "value": "Chill"
                },
                {
                    "trait_type": "Clothes",
                    "value": "Bear Coat"
                },
                {
                    "trait_type": "Eyewear",
                    "value": "Windsors (blackout)"
                },
                {
                    "trait_type": "Head",
                    "value": "W Visor"
                },
                {
                    "trait_type": "1/1",
                    "value": "None"
                }
            ]
        },
        'royalties': [{ 'addr': 'FW5K3IUZ2WQDCFDWPCBBSXAZXQQDONNN54FDVYHFCMOCK7PFDLROPGTTWM', 'name': 'creator', 'share': 5 }],
        'collection': { 'name': 'Y00ts' },
    },
    'description': 'y00ts is a generative art project of 15,000 NFTs. y00topia is a curated community of builders and creators.',
    'image_mimetype': 'image/png',
}