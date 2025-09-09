import CollectionsCard from '../cards/collectionsCard'

import { useWallet } from '@txnlab/use-wallet'
import { Select } from 'antd'
import { useEffect, useState } from 'react'
import colectionBack from '../../assets/home/images/topCollections/topCollectionBackk.webp'
import { getAllListed } from '../../fryMarketMethods'
import Loader from '../Loader'

const TrendingNft = ({ collectionData }: any) => {
  const { Option } = Select
  const [loading, setLoading] = useState(false)
  // console.log('collectionData', collectionData)

  const [listedNfts, setListedNfts] = useState<any>([])
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()

  const getListedNft = async () => {
    try {
      setLoading(true)
      const response = await getAllListed()
      setListedNfts(response ? response.filter((item) => item.isListed) : [])
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }
  // console.log('listedNfts', listedNfts)
  useEffect(() => {
    getListedNft()
  }, [activeAccount])

  return (
    <div className="trendingNftWrapper my-52 md:my-24 relative">
      <img className="absolute top-[-400px] right-0 left-0 -z-50" src={colectionBack} alt="" />
      <div className="container">
        <div className="flex inner items-center justify-between">
          <h2 className="font-normal font-Apex uppercase">Trending NFTs</h2>
        </div>

        <div className="nftWrapper mt-10 grid grid-cols-4   gap-x-5 xxl:gap-x-10 gap-y-7 place-items-center">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center col-span-4">
              <Loader></Loader>
            </div>
          ) : Array.isArray(listedNfts) && listedNfts.length > 0 ? (
            listedNfts
              .sort((data1: any, data2: any) => data1.list_count - data2.list_count)
              .map((data: any, index: any) =>
                data.isListed ? (
                  <CollectionsCard key={data.assetId} data={data} label={'Buy'} collectionData={collectionData[data.seller]} />
                ) : (
                  ''
                ),
              )
          ) : (
            <p>No NFTs Listed</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TrendingNft
