import { useWallet } from '@txnlab/use-wallet'
import axios from 'axios'
import { useEffect, useState } from 'react'
import featureTopGrid from '../../assets/auction/listGrid.webp'
import AuctionCard from '../cards/auctionCard'
const baseUrl = import.meta.env.VITE_API_BASE_URL

const LiveAuction = ({ auctionedNfts, getAuctionedNft }: any) => {
  const [collectionData, setCollectionData] = useState<any>({})
  const { activeAccount } = useWallet()

  const getCollectionData = async () => {
    try {
      // const config = {
      //   headers: { Authorization: `Bearer ${token}` }
      // };

      const response = await axios.get(`${baseUrl}/get-all-collections`)
      // console.log("Collection Data", response.data);
      if (response?.data?.length > 0) {
        let obj = {}
        response?.data?.map((collectionData: any) => {
          if (typeof collectionData.collection_address == 'string') {
            obj = {
              ...obj,
              [collectionData.collection_address]: {
                collection_name: collectionData.collection_name,
                image_url: collectionData.image_url,
                ...collectionData,
              },
            }
          }
        })
        setCollectionData(obj)
      }
    } catch (e) {
      console.log('Error Getting Collection', e)
      // toast.error("Error Creating Collection");
      setCollectionData('')
    }
  }

  useEffect(() => {
    getCollectionData()
  }, [])

  return (
    <>
      <div className="liveAuctionWrapper mb-52 relative">
        {/* <img className='absolute left-0 top-28' src={leftGlow} alt="" /> */}
        <img className="absolute top-[-260px] left-0 -z-50" src={featureTopGrid} alt="" />

        <div className="container">
          <div className="innerLiveAuction">
            <h2 className="font-normal font-Apex uppercase mb-10">LIVE AUCTION</h2>

            <div className="auctionCarContainer  mt-10 grid grid-cols-4 gap-x-10 gap-y-7 relative z-20">
              {Array.isArray(auctionedNfts) &&
                auctionedNfts.filter(
                  (data) => Number(data.biddingStartTime) * 1000 < Date.now() && Number(data.biddingEndTime) * 1000 > Date.now(),
                ).length > 0
                ? auctionedNfts
                  .filter((data) => Number(data.biddingStartTime) * 1000 < Date.now() && Number(data.biddingEndTime) * 1000 > Date.now())
                  .map((data: any, index: any) =>
                    Number(data.biddingStartTime) * 1000 < Date.now() ? (
                      <>
                        <AuctionCard
                          key={index}
                          data={data}
                          showHiddenDiv={true}
                          isAuctionPage={true}
                          getAuctionedNft={getAuctionedNft}
                          collectionData={collectionData ? collectionData[data.sellerId] : {}}
                          fromLive={true}
                        />
                      </>
                    ) : (
                      ''
                    ),
                  )
                : 'No Nfts currently listed on Auction'}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LiveAuction
