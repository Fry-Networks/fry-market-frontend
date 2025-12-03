import { useState } from 'react'
import AuctionCard from '../cards/auctionCard'
import Loader from '../Loader'

interface AuctionData {
  assetId?: string
  biddingStartTime: string | number
  biddingEndTime: string | number
  name?: string
  url?: string
  collectionData?: Record<string, unknown>
  [key: string]: unknown
}

interface LiveAuctionProps {
  auctionedNfts: AuctionData[]
  getAuctionedNft: () => void
}

const LiveAuction = ({ auctionedNfts, getAuctionedNft }: LiveAuctionProps) => {
  const [_loading, _setLoading] = useState(false)

  // Filter auctions that are currently active (between start and end time)
  const activeAuctions =
    auctionedNfts?.filter((auction: AuctionData) => {
      const now = Date.now()
      const startTime = Number(auction.biddingStartTime) * 1000
      const endTime = Number(auction.biddingEndTime) * 1000
      return startTime <= now && endTime > now
    }) || []

  return (
    <div className="liveAuctionWrapper mb-52 relative">
      <div className="container">
        <h2 className="font-normal font-Apex uppercase mb-10">LIVE AUCTIONS</h2>

        {_loading ? (
          <div className="w-full h-full flex justify-center items-center col-span-4">
            <Loader />
          </div>
        ) : activeAuctions.length > 0 ? (
          <div className="auctionGrid mt-10 grid lg:grid-cols-4 gap-x-10 gap-y-9 relative z-20">
            {activeAuctions.map((auction: AuctionData, index: number) => (
              <AuctionCard
                key={auction.assetId || index}
                data={auction}
                getAuctionedNft={getAuctionedNft}
                collectionData={auction.collectionData || {}}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No live auctions currently available</p>
            <p className="text-sm text-gray-400 mt-2">Check back later for upcoming auctions</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LiveAuction
