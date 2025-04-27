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
import { addCollectionRoyalty, buyNftWithRoyalty, cancelList, getAllListed, getAllUserNfts, getImgGenFee, getMarkeGlobalState, getRoyalty, getSingleNftlistData, listNft, optInAsset, trasnferFee, updateNftListPrice, userFryBalance } from './fryMarketMethods'
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
  const [bidEndTime, setBidEndTime] = useState<any>();
  const [royaltyBasis, setRoyaltyBasis] = useState<number>(0);
  const [collectionAddress, setCollectionAddress] = useState<string>("")


  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { activeAddress, signer, sendTransactions, signTransactions, activeAccount } = useWallet()

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
        // console.log(id)
      } catch (e) {
        // console.log(e)
      }
    } catch (e) {
      // console.log(e)
    }
  }

  const getState = async () => {
    try {
      let data = await getGlobalState(marketClient);
      let promisedata = await Promise.all([data]).then((values) => values)
      // console.log(data, promisedata)
    } catch (e) {
      // console.log(e)
    }
  }

  // console.log(appId)

  const getAssetDetails = async () => {
    const data = await algorandClient.account.getAssetInformation(activeAddress!, assetId);
    // const nft = await algorandClient.client.algod.getAssetByID(parseInt(assetId.toString()))
    const nft = await algorandClient.client.algod.getAssetByID(714838839).do()

    // console.log(nft)
  }



  const baseToText = () => {
    // console.log(atob("AAAAAAAPQkA="))
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

  // console.log(activeAddress)

  const auctionInit = async () => {
    try {
      const init = await deployAuction(activeAddress!, signer)
      // console.log("init", init)
      enqueueSnackbar(`Auction Id : ${init!.appId}`, {
        variant: "success"
      })
    } catch (e: any) {
      // console.log(e)
      enqueueSnackbar(`${e.message}`, {
        variant: "error"
      })
    }
  }


  const listNftToAuction = async () => {
    try {
      const init = await listNftAuction(activeAddress!, signer, parseInt(assetId.toString()), bidAmount * 1000000, minBidAmount * 1000000, Math.floor(Date.now() / 1000), bidEndTime)
      // console.log("init", init)
      enqueueSnackbar(`listed`, {
        autoHideDuration: 3000,
        variant: "success"
      })
    } catch (e: any) {
      // console.log(e)
      enqueueSnackbar(`${e.message}`, {
        variant: "error"
      })
    }
  }


  const bid = async () => {
    const bidding = await createBid(activeAddress!, signer, selected.nftAddress, selected.bidContract, bidAmount * 1000000, signTransactions, sendTransactions, selected.highestBidder)
    // console.log(bidding)
  }

  const cancelBidding = async () => {
    const cancel = await cancelBid(activeAddress!, signer, selected.nftAddress, selected.bidContract, signTransactions, sendTransactions)
    // console.log(cancel)
  }

  const auctionCancel = async () => {
    const cancel = await cancelAuction(activeAddress!, signer, selected.nftAddress, selected.bidContract, signTransactions, sendTransactions, selected.highestBidder)
  }

  const claimAuctionNft = async () => {
    const claim = await claimNftRoyalty(activeAddress!, signer, selected.nftAddress, selected.bidContract, selected.highestBidAmount, selected.sellerId)
  }


  const feeTx = async () => {
    const tx = await trasnferFee(bidAmount * 1000000, activeAddress!, signer);
    // console.log(tx)
  }


  // Market Place Functions
  const marketInit = async () => {
    try {
      const init = await optInAsset(activeAddress!, signer, 1000)
      console.log("init", init)
      enqueueSnackbar(`Market Id : ${init}`, {
        variant: "success"
      })
    } catch (e: any) {
      // console.log(e)
      enqueueSnackbar(`${e.message}`, {
        variant: "error"
      })
    }
  }

  const listMyNft = async () => {
    await listNft(activeAddress!, assetId, signer, bidAmount * 1000000).then((res) => {
      // console.log("list response : ", res)
    })
  }

  const buyMyNft = async () => {
    await buyNftWithRoyalty(activeAddress!, assetId, signer, "3UVTPV244SYIMQ44JNQWWXCYBAYY3I7XR773BMDLRF36LRNCP6TURFHBMI", bidAmount * 1000000).then((res) => {
      // console.log("list response : ", res)
    })
  }

  const cancelMyNft = async () => {
    await cancelList(activeAddress!, assetId, signer).then((res) => {
      // console.log("list response : ", res)
    })
  }

  const updateMyNftPrice = async () => {
    await updateNftListPrice(activeAddress!, assetId, signer, bidAmount * 1000000).then((res) => {
      // console.log("list response : ", res)
    })
  }

  const getUserNfts = async () => {
    const nfts = await getAllUserNfts(activeAddress!)
    // console.log("nfts", nfts)
  }

  const getUserAuctions = async () => {
    const nfts = await getAllUserAuctions(activeAddress!, signer)
    // console.log("user Auucttion", nfts)
  }

  const getUserClaimableNfts = async () => {
    const nfts = await getAllUserClaimable(activeAddress!, signer)
    // console.log("nfts", nfts)
  }

  const initRoyalty = async () => {
    const royal = await addCollectionRoyalty(activeAddress!, signer, royaltyBasis, collectionAddress)
  }

  const getRoyalties = async () => {
    const royal = await getRoyalty(collectionAddress);
    // console.log(royal)
  }

  const imageGentx = async () => {
    const txn = await getImgGenFee(true, 13, signer, activeAddress!);
    // console.log(txn)

  }
  const getBalance = async () => {
    const bal = await userFryBalance(activeAddress!)
    // console.log("bal", bal)
  }



  const getMarketListedData = async () => {
    try {
      const data = await getAllListed()
      const globalstate = await getMarkeGlobalState();
      // console.log(data, globalstate)
    } catch (error) {
      // console.log(error)
    }
  }

  const getSingleMarketNftData = async () => {
    const data = await getSingleNftlistData(Number(assetId));
    // console.log(data)
    // console.log(data ? true : false)
  }

  const decoder = async () => {
    const encode = "LbqtopnVoDEUdniCGVwZvCA3Na3vCjrg5RMcJX3lGuI=";
    const arra = Uint8Array.from(window.atob(encode.replace(/^data[^,]+,/, '')), v => v.charCodeAt(0));
    const sellerId = algosdk.encodeAddress(arra)
    // console.log(sellerId)
  }

  function convertUnixTimestampToDate(unixTimestamp: number) {
    const date = new Date(unixTimestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Return the formatted date string
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  useEffect(() => {
    (async () => {
      // const allListings = await getSingleAuction(717753482);
      // console.log("allListings", allListings)
      const allAuctionListings = await getAllAuctions()
      setAuctions(allAuctionListings ? allAuctionListings.filter((item) => item?.isListed) : [])
      // setAuctions(allAuctionListings)
    })();
  }, [])


  useEffect(() => {
    (async () => {
      if (selected) {
        const allBiddings = await getAllBids(selected?.bidContract)
        // console.log(allBiddings)
      }
    })();
  }, [selected])
  return (
    <div className="hero min-h-screen bg-teal-400 flex flex-col items-center justify-center">

      <div className='flex gap-4'>
        {
          auctions ? auctions.map((list, index) => (
            <div onClick={() => { setSelected(list) }} key={list.nftAddress} style={{ cursor: "pointer" }} >
              <img src={list?.url?.replace('.json', '.png')} alt="nft" className='w-48' />
              <p>Auction # {index}</p>
              <p>name: {list.name}</p>
              <p>NftID: {list.nftAddress}</p>
              <p>seller: {list.sellerId.slice(0, 5) + "...." + list.sellerId.slice(-5)}</p>
              <p>highestBidAmount: {list.highestBidAmount / 1000000}</p>
              <p>highestBidder: {list.highestBidder.slice(0, 5) + "...." + list.highestBidder.slice(-5)}</p>
              <p>minBidAmount: {list.minBidAmount / 1000000}</p>
              <p>totalBidders: {list.totalBidders}</p>
              <p>bidding start time: {convertUnixTimestampToDate(list.biddingStartTime)}</p>
              <p>bidding End time: {convertUnixTimestampToDate(list.biddingEndTime)}</p>

            </div>
          )) : <p>No listed Data</p>
        }
      </div>

      <div className='flex gap-10'>
        <div className="hero-content text-center rounded-lg p-6 max-w-md bg-white mx-auto">
          <div className="max-w-md">
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
            <label htmlFor="">Royalty Basis</label>
            <input type="number" value={royaltyBasis} className='border-2 border-black rounded p-2' onChange={(e) => { setRoyaltyBasis(parseFloat(e.target.value < '0' ? '0' : e.target.value)) }} />
            <label htmlFor="">Collection Address</label>
            <input type="text" value={collectionAddress} className='border-2 border-black rounded p-2' onChange={(e) => { setCollectionAddress(e.target.value) }} />

            <button className="button btn-primary p-2 block w-full" onClick={marketInit}>Opt IN Assest</button>
            <button className="button btn-primary p-2 block w-full" onClick={initRoyalty}>Add Royalty</button>
            <button className="button btn-primary p-2 block w-full" onClick={getRoyalties}>get Royalty</button>
            <button className="button btn-primary p-2 block w-full" onClick={listMyNft}>List Nft</button>
            <button className="button btn-primary p-2 block w-full" onClick={cancelMyNft}>Cancel List</button>
            <button className="button btn-primary p-2 block w-full" onClick={updateMyNftPrice}>Update Price</button>
            <button className="button btn-primary p-2 block w-full" onClick={buyMyNft}>Buy</button>
            <button className="button btn-primary p-2 block w-full" onClick={getMarketListedData}>Get All Listed</button>
            <button className="button btn-primary p-2 block w-full" onClick={getSingleMarketNftData}>Get single Listed</button>
            <button className="button btn-primary p-2 block w-full" onClick={getUserNfts}>Get All User Nfts</button>
            <button className="button btn-primary p-2 block w-full" onClick={getBalance}>Get user Fry Balance</button>
            <button className="button btn-primary p-2 block w-full" onClick={feeTx}>Transfer Fee</button>
            <button className="button btn-primary p-2 block w-full" onClick={imageGentx}>Get Imgae Fee</button>


          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
