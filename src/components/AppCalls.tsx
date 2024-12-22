import * as algokit from '@algorandfoundation/algokit-utils'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { OnSchemaBreak, OnUpdate } from '@algorandfoundation/algokit-utils/types/app'
import { AppDetails } from '@algorandfoundation/algokit-utils/types/app-client'
import { useWallet } from '@txnlab/use-wallet'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { AlgoMarketClient } from '../contracts/AlgoMarket'
import { getAlgodConfigFromViteEnvironment, getIndexerConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'


interface AppCallsInterface {
  openModal: boolean
  setModalState: (value: boolean) => void
}

const AppCalls = ({ openModal, setModalState }: AppCallsInterface) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [contractInput, setContractInput] = useState<string>('')
  const [appAddress, setAppAddress] = useState<string>("T2Y46UKA44X2WLXVAQXCQFPGYXB55YEBT2EEORDO3GIPWVRP3GTCHHLSDA")
  const [appId, setAppId] = useState<number>(705392010)

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algodClient = algokit.getAlgoClient({
    server: algodConfig.server,
    port: algodConfig.port,
    token: algodConfig.token,
  })
  const indexerConfig = getIndexerConfigFromViteEnvironment()
  const indexer = algokit.getAlgoIndexerClient({
    server: indexerConfig.server,
    port: indexerConfig.port,
    token: indexerConfig.token,
  })

  const { enqueueSnackbar } = useSnackbar()
  const { signer, activeAddress, connectedAccounts, signTransactions, sendTransactions } = useWallet()

  const sendAppCall = async () => {
    setLoading(true)
    if (!activeAddress) return

    const appDetails = {
      resolveBy: 'creatorAndName',
      sender: { signer, addr: activeAddress } as TransactionSignerAccount,
      creatorAddress: activeAddress,
      findExistingUsing: indexer,
    } as AppDetails

    const appClient = new AlgoMarketClient(appDetails, algodClient)
    const deployParams = {
      onSchemaBreak: OnSchemaBreak.AppendApp,
      onUpdate: OnUpdate.AppendApp,
    }

    // const response = await appClient.create.createApplication({ assetId: BigInt(704951701), unitaryPrice: BigInt(0) }).catch((e: Error) => {
    //   enqueueSnackbar(`Error calling the contract: ${e.message}`, { variant: 'error' })
    //   setLoading(false)
    //   return
    // })

    // console.log("response", response)

    // setAppAddress(response!.appAddress)
    // setAppId(Number(response!.appId))


    // const algorandClient: algokit.AlgorandClient = algokit.AlgorandClient.fromConfig({ algodConfig })

    // const info = await appClient.getAssetInfo({}).catch((e: Error) => {
    //   enqueueSnackbar(`Error calling the contract: ${e.message}`, { variant: 'error' })
    //   setLoading(false)
    //   return
    // })

    // console.log("info",info)

    //   let newAsset = await algorandClient.send.assetCreate({
    //     total: BigInt(10),
    //     sender:activeAddress,
    //     signer
    // })
    // let asset = BigInt(newAsset.confirmation.assetIndex!)

    // console.log("asset", asset, newAsset);


    //   const mbrTxn = await algorandClient.transactions.payment({
    //     sender: activeAddress,
    //     receiver: response!.appAddress,
    //     amount: algokit.algos(0.1),
    //     extraFee: algokit.algos(0.001),
    //     signer: signer
    //   });

    //   const listresp = await appClient.listNft({ mbrPay: (mbrTxn) }, { assets: [704951701] }).catch((e: Error) => {
    //     enqueueSnackbar(`Error calling the contract: ${e.message}`, { variant: 'error' })
    //     setLoading(false)
    //     return
    //   })
    //   await algorandClient.send.assetTransfer({
    //     sender: activeAddress,
    //     assetId: BigInt(704951701),
    //     receiver: response!.appAddress,
    //     amount: BigInt(1),
    //     signer
    //   })

    //   console.log(listresp)

    //   enqueueSnackbar(`Response from the contract: ${response?.return}`, { variant: 'success' })
    //   setLoading(false)
    // }


    const sendBuyCall = async () => {
      setLoading(true)
      if (!activeAddress) return

      // Please note, in typical production scenarios,
      // you wouldn't want to use deploy directly from your frontend.
      // Instead, you would deploy your contract on your backend and reference it by id.
      // Given the simplicity of the starter contract, we are deploying it on the frontend
      // for demonstration purposes.
      const appDetails = {
        resolveBy: 'creatorAndName',
        sender: { signer, addr: activeAddress } as TransactionSignerAccount,
        creatorAddress: activeAddress,
        findExistingUsing: indexer,
      } as AppDetails

      const appClient = new AlgoMarketClient(appDetails, algodClient)
      const deployParams = {
        onSchemaBreak: OnSchemaBreak.AppendApp,
        onUpdate: OnUpdate.AppendApp,
      }
      // await appClient.deploy(deployParams).catch((e: Error) => {
      //   enqueueSnackbar(`Error deploying the contract: ${e.message}`, { variant: 'error' })
      //   setLoading(false)
      //   return
      // })

      // console.log("appClient", )

      // const suggestedParams = await algodClient.getTransactionParams().do();

      // const response = await appClient.create.createApplication({ assetId: 704441505, unitaryPrice: 0  }).catch((e: Error) => {
      //   enqueueSnackbar(`Error calling the contract: ${e.message}`, { variant: 'error' })
      //   setLoading(false)
      //   return
      // })

      // console.log("response", response)

      const algorandClient: algokit.AlgorandClient = algokit.AlgorandClient.fromConfig({ algodConfig })

      const mbrTxn = await algorandClient.transactions.payment({
        sender: activeAddress,
        receiver: appAddress,
        amount: algokit.algos(0.1 + 0.1),
        extraFee: algokit.algos(0.001),
        signer: signer
      });


      // const buyresp = await appClient.buy({ buyerTx: (mbrTxn), quantity: 10 }).catch((e: Error) => {
      //   enqueueSnackbar(`Error calling the contract: ${e.message}`, { variant: 'error' })
      //   setLoading(false)
      //   return
      // })

      // console.log(buyresp)

      // enqueueSnackbar(`Response from the contract: ${buyresp?.return}`, { variant: 'success' })
      setLoading(false)
    }
  }
  // console.log(activeAddress)


  return (
    <dialog id="appcalls_modal" className={`modal ${openModal ? 'modal-open' : ''} bg-slate-200`}>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Say hello to your Algorand smart contract</h3>
        <br />
        {/* <input
          type="text"
          placeholder="Provide input to hello function"
          className="input input-bordered w-full"
          value={contractInput}
          onChange={(e) => {
            setContractInput(e.target.value)
          }}
        /> */}
        <p>AppId : {appId ?? 0}</p>
        <p>AppAddress : {appAddress ?? ""}</p>
        <div className="modal-action ">
          <button className="btn" onClick={() => setModalState(!openModal)}>
            Close
          </button>
          <button className={`btn`} onClick={sendAppCall}>
            {loading ? <span className="loading loading-spinner" /> : 'Send application call'}
          </button>

          {/* <button className={`btn`} onClick={sendBuyCall}>
            buy
          </button> */}
        </div>
      </form>
    </dialog>
  )
}

export default AppCalls
