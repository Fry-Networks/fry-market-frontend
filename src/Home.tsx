// src/components/Home.tsx
import * as algokit from '@algorandfoundation/algokit-utils'
import { useWallet } from '@txnlab/use-wallet'
import algosdk, { Transaction } from 'algosdk'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { cancelAuction, cancelBid, claimNftRoyalty, createBid, deployAuction, getAllAuctions, getAllBids, getAllUserAuctions, getAllUserClaimable, listNftAuction } from './auctionMethod'
import ConnectWallet from './components/ConnectWallet'
import Transact from './components/Transact'
import { AlgoMarketClient } from './contracts/AlgoMarket'
import { CreateCollectionClient } from './contracts/CreateCollection'
import { buyNftWithRoyalty, cancelList, deployMarketplace, getAllListed, getAllUserNfts, getMarkeGlobalState, listNft, updateNftListPrice, userFryBalance } from './fryMarketMethods'
import { getGlobalState, testingTxn } from './methods'
import { getAlgodConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'

interface HomeProps { }

const Home: React.FC<HomeProps> = () => {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false)
  const [appCallsDemoModal, setAppCallsDemoModal] = useState<boolean>(false)
  const [appId, setAppId] = useState<bigint>(0n)
  const [collAppId, setCollAppId] = useState<bigint>()
  const [assetId, setAssetId] = useState<bigint>(0n)
  const [auctions, setAuctions] = useState<any[]>([])
  const [selected, setSelected] = useState<any>()
  const [bidAmount, setBidAmount] = useState<number>(0)
  const [minBidAmount, setMinBidAmount] = useState<number>(0)
  const [bidEndTime, setBidEndTime] = useState<any>()


  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { activeAddress, signer, sendTransactions, signTransactions } = useWallet()

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }
  algokit.Config.configure({ populateAppCallResources: true });

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const indexer = algokit.getAlgoIndexerClient({
    server: algodConfig.server,
    port: algodConfig.port,
    token: algodConfig.token,
  })
  const algodClient = algokit.getAlgoClient({
    server: algodConfig.server,
    port: algodConfig.port,
    token: algodConfig.token,
  })
  const algorandClient: algokit.AlgorandClient = algokit.AlgorandClient.fromConfig({ algodConfig })
  algorandClient.setDefaultSigner(signer);

  const marketClient = new AlgoMarketClient({
    resolveBy: 'id',
    id: appId,
    sender: { addr: activeAddress!, signer },
  }, algorandClient.client.algod
  )

  const collectionClient = new CreateCollectionClient({
    resolveBy: 'id',
    id: collAppId || 0,
    sender: { addr: activeAddress!, signer },
  }, algorandClient.client.algod
  )



  const clickme = async () => {
    try {
      let txn: Transaction[] = await testingTxn(algorandClient, activeAddress!, algodClient, signer, appId, marketClient);
      const txnGroup = algosdk.assignGroupID(txn);

      let encodedTransaction: Uint8Array[] = [];
      txnGroup.map((tx: Transaction) => {
        let newEncodedtx = algosdk.encodeUnsignedTransaction(tx);
        encodedTransaction.push(newEncodedtx)
      })

      const signedTransactions = await signTransactions(encodedTransaction)

      const waitRoundsToConfirm = 4

      try {
        const { id } = await sendTransactions(signedTransactions, waitRoundsToConfirm)
        console.log(id)
      } catch (e) {
        console.log(e)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getState = async () => {
    try {
      let data = await getGlobalState(marketClient);
      let promisedata = await Promise.all([data]).then((values) => values)
      console.log(data, promisedata)
    } catch (e) {
      console.log(e)
    }
  }

  console.log(appId)

  const getAssetDetails = async () => {
    const data = await algorandClient.account.getAssetInformation(activeAddress!, assetId);
    // const nft = await algorandClient.client.algod.getAssetByID(parseInt(assetId.toString()))
    const nft = await algorandClient.client.algod.getAssetByID(714838839).do()

    console.log(nft)
  }



  const baseToText = () => {
    console.log(atob("AAAAAAAPQkA="))
  }

  // useEffect(() => {
  //   marketClient.getGlobalState().then((globalstate) => {
  //     setUnitaryPrice(globalstate.unitaryPrice?.asBigInt() || 0n)
  //     let id = globalstate.assetId?.asBigInt || 0n;
  //     setAssetId(id)
  //     algorandClient.account.getAssetInformation(algosdk.getApplicationAddress(appId), Number(id)).then((info) => {
  //       setUnitsLeft(info.balance)
  //     })
  //   }).catch(() => {
  //     setUnitaryPrice(0n)
  //     setAssetId(0n)
  //   })
  // }, [appId])

  console.log(activeAddress)

  const auctionInit = async () => {
    try {
      const init = await deployAuction(activeAddress!, signer)
      console.log("init", init)
      enqueueSnackbar(`${init!.appId}`, {
        variant: "success"
      })
    } catch (e: any) {
      console.log(e)
      enqueueSnackbar(`${e.message}`, {
        variant: "error"
      })
    }
  }


  const listNftToAuction = async () => {
    try {
      const init = await listNftAuction(activeAddress!, signer, parseInt(assetId.toString()), bidAmount * 1000000, minBidAmount * 1000000, Math.floor(Date.now() / 1000), bidEndTime)
      console.log("init", init)
      enqueueSnackbar(`listed`, {
        autoHideDuration: 3000,
        variant: "success"
      })
    } catch (e: any) {
      console.log(e)
      enqueueSnackbar(`${e.message}`, {
        variant: "error"
      })
    }
  }


  const bid = async () => {
    const bidding = await createBid(activeAddress!, signer, selected.nftAddress, selected.bidContract, bidAmount * 1000000, signTransactions, sendTransactions)
    console.log(bidding)
  }

  const cancelBidding = async () => {
    const cancel = await cancelBid(activeAddress!, signer, selected.nftAddress, selected.bidContract, signTransactions, sendTransactions)
    console.log(cancel)
  }

  const auctionCancel = async () => {
    const cancel = await cancelAuction(activeAddress!, signer, selected.nftAddress, selected.bidContract, signTransactions, sendTransactions)
  }

  const claimAuctionNft = async () => {
    const claim = await claimNftRoyalty(activeAddress!, signer, selected.nftAddress, selected.bidContract, selected.highestBidAmount, selected.sellerId)
  }




  // Market Place Functions 
  const marketInit = async () => {
    try {
      const init = await deployMarketplace(activeAddress!, signer, 1000, 3000)
      console.log("init", init)
      enqueueSnackbar(`${init!.appId}`, {
        variant: "success"
      })
    } catch (e: any) {
      console.log(e)
      enqueueSnackbar(`${e.message}`, {
        variant: "error"
      })
    }
  }


  const listMyNft = async () => {
    await listNft(activeAddress!, assetId, signer, bidAmount * 1000000).then((res) => {
      console.log("list response : ", res)
    })
  }

  const buyMyNft = async () => {
    await buyNftWithRoyalty(activeAddress!, assetId, signer, "QAA3WI7G4YAJJQHEODF6H224PBXPB6K4KWGINPJNHJOXJL66YUNFLZSPEI", bidAmount * 1000000).then((res) => {
      console.log("list response : ", res)
    })
  }

  const cancelMyNft = async () => {
    await cancelList(activeAddress!, assetId, signer).then((res) => {
      console.log("list response : ", res)
    })
  }

  const updateMyNftPrice = async () => {
    await updateNftListPrice(activeAddress!, assetId, signer, bidAmount * 1000000).then((res) => {
      console.log("list response : ", res)
    })
  }


  const getUserNfts = async () => {
    const nfts = await getAllUserNfts(activeAddress!)
    console.log("nfts", nfts)
  }


  const getUserAuctions = async () => {
    const nfts = await getAllUserAuctions(activeAddress!, signer)
    console.log("user Auucttion", nfts)
  }


  const getUserClaimableNfts = async () => {
    const nfts = await getAllUserClaimable(activeAddress!, signer)
    // console.log("nfts", nfts)
  }

  const getBalance = async () => {
    const bal = await userFryBalance(activeAddress!)
    console.log("bal", bal)
  }



  const getMarketListedData = async () => {
    try {
      const data = await getAllListed()
      const globalstate = await getMarkeGlobalState();
      console.log(data, globalstate)
    } catch (error) {
      console.log(error)
    }
  }

  const decoder = async () => {
    const encode = "LbqtopnVoDEUdniCGVwZvCA3Na3vCjrg5RMcJX3lGuI=";
    const arra = Uint8Array.from(window.atob(encode.replace(/^data[^,]+,/, '')), v => v.charCodeAt(0));
    const sellerId = algosdk.encodeAddress(arra)
    console.log(sellerId)
  }

  useEffect(() => {
    (async () => {
      const allAuctionListings = await getAllAuctions(activeAddress!, signer)
      setAuctions(allAuctionListings)
      if (selected) {
        const allBiddings = await getAllBids(selected?.bidContract, activeAddress!, signer)
        console.log(allBiddings)
      }
    })();
  }, [selected])

  console.log(bidEndTime)
  return (
    <div className="hero min-h-screen bg-teal-400 flex flex-col items-center justify-center">

      <div className='flex gap-4'>
        {
          auctions ? auctions.map((list, index) => (
            <div onClick={() => { setSelected(list) }} key={list.nftAddress} >
              <img src={list.url} alt="nft" className='w-48' />
              <p>Auction # {index}</p>
              <p>name: {list.name}</p>
              <p>NftID: {list.nftAddress}</p>
              <p>seller: {list.sellerId.slice(0, 5) + "...." + list.sellerId.slice(-5)}</p>
              <p>highestBidAmount: {list.highestBidAmount / 1000000}</p>
              <p>highestBidder: {list.highestBidder.slice(0, 5) + "...." + list.highestBidder.slice(-5)}</p>
              <p>minBidAmount: {list.minBidAmount / 1000000}</p>
              <p>totalBidders: {list.totalBidders}</p>
            </div>
          )) : <p>No listed Data</p>
        }
      </div>

      <div className='flex gap-10'>
        <div className="hero-content text-center rounded-lg p-6 max-w-md bg-white mx-auto">
          <div className="max-w-md">
            {/* <h1 className="text-4xl">
            Welcome to <div className="font-bold">AlgoKit 🙂</div>
          </h1>
          <p className="py-6">
            This starter has been generated using official AlgoKit React template. Refer to the resource below for next steps.
          </p> */}

            {/* <div className='divider' />
          <label className='label'>Enter App Id here</label>
          <input type="number" className='input input-bordered' value={appId.toString()} onChange={(e) => { setAppId(BigInt(e.currentTarget.valueAsNumber || 0)) }} />

          <label className='label'>Enter Collection App Id here</label>
          <input type="number" className='input input-bordered' value={collAppId ? collAppId.toString() : 0} onChange={(e) => { setCollAppId(BigInt(e.currentTarget.valueAsNumber || 0)) }} />

          <label className='label'>Asset Amount</label>
          <input type="number" className='input input-bordered' value={quantity.toString()} onChange={(e) => { setQuantity(BigInt(e.currentTarget.valueAsNumber || 0)) }} />

          <div className='divider' /> */}
            {/* {activeAddress && appId === 0 && (
            <div>
              <label className='label'>Price per unit</label>
              <input type="number" className='input input-bordered' value={(unitaryPrice / BigInt(10e6)).toString()} onChange={(e) => { setUnitaryPrice(BigInt(e.currentTarget.valueAsNumber) * BigInt(10e6)) }} />
              <MethodCall methodFunction={create(algorandClient, marketClient, assetId, 1n, 1n, activeAddress!, setAppId)} text='create' />
            </div>
          )} */}
            {/* <div className='divider' /> */}
            {/* 
          {activeAddress && parseInt(appId.toString()) !== 0 && (
            <div>
              <label className='label'>Asset Id</label>
              <input type="number" className='input input-bordered' value={assetId.toString()} onChange={(e) => { setAssetId(BigInt(parseInt(e.target.value))) }} />
              <label className='label'>Units Left</label>
              <input type="number" className='input input-bordered' value={Number(unitsLeft)} readOnly />
            </div>
          )} */}


            {/* {activeAddress && appId !== 0 && (
            <div>
              <label className='label'>Quantity to Buy</label>
              <input type="number" className='input input-bordered' value={(quantity).toString()} onChange={(e) => { setQuantity(BigInt(e.currentTarget.valueAsNumber)) }} />
              <MethodCall methodFunction={buy(algorandClient, marketClient, activeAddress, algosdk.getApplicationAddress(appId), quantity, unitaryPrice, setUnitsLeft)} text={`Buy ${quantity} for ${unitaryPrice * quantity / BigInt(10e6)}`} />
            </div>
          )} */}

            {/* {activeAddress && parseInt(appId.toString()) !== 0 && (
            <div>
              <label className='label'>Quantity to Buy</label>
              <input type="number" className='input input-bordered' value={(quantity).toString()} onChange={(e) => { setQuantity(BigInt(e.currentTarget.valueAsNumber)) }} />
              <MethodCall methodFunction={mint(algorandClient, marketClient, activeAddress, algosdk.getApplicationAddress(appId), algodClient)} text={`Mint token`} />
            </div>
          )} */}
            {/* 
          {activeAddress && (
            <div>
              <label className='label'>Opt Out Id</label>
              <input type="number" className='input input-bordered' value={optOutId} onChange={(e) => { setOptOutId(parseFloat(e.target.value)) }} />

              <MethodCall methodFunction={optout(algorandClient, marketClient, activeAddress, optOutId)} text={`opt out`} />
            </div>
          )} */}


            {/* {activeAddress && parseInt(appId.toString()) !== 0 && (
            <div>
              <label className='label'>Get Box</label>
              <MethodCall methodFunction={getBoxValues(algorandClient, BigInt(appId), assetId.toString(), algodClient)} text={`Get Box`} />
            </div>
          )} */}

            {/* {activeAddress && appId && (
            <div>
              <label className='label'>Get Collection Nfts</label>
              <input type="number" className='input input-bordered' value={optOutId} onChange={(e) => { setOptOutId(parseFloat(e.target.value)) }} />

              <MethodCall methodFunction={fetchCollection(algosdk.getApplicationAddress(appId), indexer)} text={`Get Nfts`} />
            </div>
          )}

          {activeAddress && appId && (
            <div>
              <label className='label'>Get Collection Nfts</label>
              <input type="number" className='input input-bordered' value={optOutId} onChange={(e) => { setOptOutId(parseFloat(e.target.value)) }} />

              <MethodCall methodFunction={fetchCollection(algosdk.getApplicationAddress(appId), indexer)} text={`Get Nfts`} />
            </div>
          )} */}


            {/* <div>
            <button className="btn mt-2" onClick={() => { setCreateColl(!createColl) }}>
              Create Collection
            </button>
          </div> */}

            {/* <div>
            <button className="btn mt-2" onClick={baseToText}>
              Base ^4
            </button>
          </div> */}

            {/* create collection values */}
            {/* {createColl && <div className='my-5'>
            <div className='divider' />
            <h1 className='font-bold mt-3'>Create Collection</h1>
            <label className='label'>Collection Name</label>
            <input type="text" className='input input-bordered' value={collName} onChange={(e) => { setCollName(e.target.value) }} />
            <label className='label'>Collection Supply</label>
            <input type="number" className='input input-bordered' value={collSupply.toString()} onChange={(e) => { setCollSupply(BigInt(parseInt(e.target.value))) }} />
            <label className='label'>Royalty Contract</label>
            <input type="number" className='input input-bordered' value={royaltyId.toString()} onChange={(e) => { setRoyaltyId(BigInt(parseInt(e.target.value))) }} />

            <MethodCall methodFunction={createCollection(collectionClient, collName, collSupply, royaltyId)} text={`Init Collection`} />
            <div className='divider' />
          </div>} */}

            {/* mint nfts
          {collAppId ? <div>
            <MethodCall methodFunction={mintNft(algorandClient, collectionClient, activeAddress!, collAppId || 0n)} text={`Mint Contract Collection Nft`} />
          </div> : null} */}



            {/* <button className='py-2 px-5 my-3 bg-gray-200 border rounded border-black font-bold' onClick={() => { listNft(algorandClient, marketClient, BigInt(appId), activeAddress!, BigInt(704441505)) }}>List Nft</button> */}
            {/* <MethodCall methodFunction={listNft(algorandClient, marketClient, BigInt(appId), activeAddress!, BigInt(assetId), signer)} text={`List Nft`} />
          <MethodCall methodFunction={cancelList(algorandClient, marketClient, BigInt(appId), activeAddress!, BigInt(assetId), signer)} text={`Cancel List`} />
          <MethodCall methodFunction={buyNft(algorandClient, marketClient, BigInt(appId), activeAddress!, BigInt(assetId), signer, BigInt(1000000))} text={`Buy Nft`} />
          <MethodCall methodFunction={checkwallet(algorandClient, marketClient, BigInt(appId), activeAddress!, BigInt(assetId), signer, BigInt(1000000))} text={`check`} /> */}


            {/* collection and nft creation */}
            {/* <MethodCall methodFunction={mintNft(algorandClient, collectionClient, activeAddress!, appId)} text={`mint`} />
          <MethodCall methodFunction={burnNft(algorandClient, collectionClient, activeAddress!, assetId)} text={`Burn`} /> */}


            {/* <MethodCall methodFunction={createNft(algorandClient, collectionClient, activeAddress!, assetId)} text={`Create royal nft`} />
          <MethodCall methodFunction={burnMyNft(algorandClient, collectionClient, activeAddress!, assetId)} text={`burn`} />
          <MethodCall methodFunction={transferAlgo(algorandClient, collectionClient, activeAddress!, assetId)} text={`Transfer Algos`} /> */}


            {/* <p className='my-3'>Royality Nft Marketplace</p>
          <MethodCall methodFunction={listRoyalNft(algorandClient, marketClient, BigInt(appId), activeAddress!, BigInt(assetId), signer)} text={`List Royal Nft`} />
          <MethodCall methodFunction={buyRoyalNft(algorandClient, marketClient, BigInt(appId), activeAddress!, BigInt(assetId), signer)} text={`Buy Royal Nft`} />

          <MethodCall methodFunction={getBoxValues(algorandClient, BigInt(appId), "", algodClient)} text={`Get listing`} /> */}



            {/* <button className="btn mt-2" onClick={getAssetDetails}>
            Get Asset details
          </button> */}

            {/* <div>
            <button className="btn mt-2" onClick={getState}>
              Get contract state
            </button>
          </div> */}

            {/* <button className="btn mt-2" onClick={() => { getNfts(algorandClient, BigInt(appId), assetId) }}>Get data</button>
          <div className="grid">
            <a
              data-test-id="getting-started"
              className="btn btn-primary m-2"
              target="_blank"
              href="https://github.com/algorandfoundation/algokit-cli"
            >
              Getting started
            </a>

            <div className="divider" />
            <button data-test-id="connect-wallet" className="btn m-2" onClick={toggleWalletModal}>
              Wallet Connection
            </button> */}

            {/* {activeAddress && (
              <button data-test-id="transactions-demo" className="btn m-2" onClick={toggleDemoModal}>
                Transactions Demo
              </button>
            )}

            {activeAddress && (
              <button data-test-id="appcalls-demo" className="btn m-2" onClick={toggleAppCallsModal}>
                Contract Interactions Demo
              </button>
            )} */}
            {/* </div> */}

            <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
            <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
          </div>
          {/* Auction Function Call starts here */}
          <p className="text-lg">
            Auction
          </p>

          <div className='flex flex-col items-center gap-3'>
            <label htmlFor="">AssetId</label>
            <input type="number" value={assetId.toString()} className='border-2 border-black rounded p-2' onChange={(e) => { setAssetId(BigInt(parseInt(e.target.value < '0' ? '0' : e.target.value))) }} />
            <label htmlFor="">Bid Amount</label>
            <input type="number" value={bidAmount} className='border-2 border-black rounded p-2' onChange={(e) => { setBidAmount(parseFloat(e.target.value < '0' ? '0' : e.target.value)) }} />
            <label htmlFor="">Min Bid Amount</label>
            <input type="number" value={minBidAmount} className='border-2 border-black rounded p-2' onChange={(e) => { setMinBidAmount(parseFloat(e.target.value < '0' ? '0' : e.target.value)) }} />
            <label htmlFor="">Bid End Time</label>
            <input type="date" className='border-2 border-black rounded p-2 w-full' onChange={(e) => { setBidEndTime(Math.floor(new Date(e.target.value).getTime() / 1000)) }} />
            <button className="button btn-primary p-2 block w-full" onClick={auctionInit}>Init Auction</button>
            <button className="button btn-primary p-2 block w-full" onClick={listNftToAuction}>List Nft on Auction</button>
            <button className="button btn-primary p-2 block w-full" onClick={bid}>Bid</button>
            <button className="button btn-primary p-2 block w-full" onClick={cancelBidding}>Cancel Bid</button>
            <button className="button btn-primary p-2 block w-full" onClick={auctionCancel}>Cancel Auction</button>
            <button className="button btn-primary p-2 block w-full" onClick={claimAuctionNft}>Claim Nft</button>
            <button className="button btn-primary p-2 block w-full" onClick={getUserClaimableNfts}>Get User Claimable nFts</button>
            <button className="button btn-primary p-2 block w-full" onClick={getUserAuctions}>Get All User Auctions</button>

          </div>
        </div>
        <div className="hero-content text-center rounded-lg p-6 max-w-md bg-white mx-auto">
          <div className="max-w-md">
            <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
            <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
          </div>
          <p className="text-lg">
            Market Place
          </p>

          <div className='flex flex-col items-center gap-3'>
            <label htmlFor="">AssetId</label>
            <input type="number" value={assetId.toString()} className='border-2 border-black rounded p-2' onChange={(e) => { setAssetId(BigInt(parseInt(e.target.value < '0' ? '0' : e.target.value))) }} />
            <label htmlFor="">List Price</label>
            <input type="number" value={bidAmount} className='border-2 border-black rounded p-2' onChange={(e) => { setBidAmount(parseFloat(e.target.value < '0' ? '0' : e.target.value)) }} />

            <button className="button btn-primary p-2 block w-full" onClick={marketInit}>Deploy Marketplace</button>
            <button className="button btn-primary p-2 block w-full" onClick={listMyNft}>List Nft</button>
            <button className="button btn-primary p-2 block w-full" onClick={cancelMyNft}>Cancel List</button>
            <button className="button btn-primary p-2 block w-full" onClick={updateMyNftPrice}>Update Price</button>
            <button className="button btn-primary p-2 block w-full" onClick={buyMyNft}>Buy</button>
            <button className="button btn-primary p-2 block w-full" onClick={getMarketListedData}>Get All Listed</button>
            <button className="button btn-primary p-2 block w-full" onClick={getUserNfts}>Get All User Nfts</button>
            <button className="button btn-primary p-2 block w-full" onClick={getBalance}>Get user Fry Balance</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
