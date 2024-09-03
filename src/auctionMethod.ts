import * as algokit from '@algorandfoundation/algokit-utils';
import algosdk, { TransactionSigner } from 'algosdk';
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