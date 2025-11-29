import { useWallet } from '@txnlab/use-wallet'
import axios from 'axios'
import { useEffect, useState } from 'react'
import CollectionsCard from '../components/cards/collectionsCard'
import Loader from '../components/Loader'
import { getAllListed } from '../fryMarketMethods'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const TrendingNftPage = () => {
    const [loading, setLoading] = useState(false)
    const [listedNfts, setListedNfts] = useState<any>([])
    const [collectionData, setCollectionData] = useState<any>({})
    const { activeAccount } = useWallet()

    const getCollectionData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/get-all-collections`)
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
            setCollectionData({})
        }
    }

    const getListedNft = async () => {
        try {
            setLoading(true)
            const response = await getAllListed()
            setListedNfts(response ? response.filter((item: any) => item.isListed) : [])
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCollectionData()
        getListedNft()
    }, [activeAccount])

    return (
        <div className="trendingNftPageWrapper my-32 relative min-h-screen">
            <div className="container">
                <div className="flex inner items-center justify-between mb-10">
                    <h2 className="font-normal font-Apex uppercase text-4xl">Trending NFTs</h2>
                </div>

                <div className="nftWrapper mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-7 place-items-center">
                    {loading ? (
                        <div className="w-full h-full flex justify-center items-center col-span-full">
                            <Loader />
                        </div>
                    ) : Array.isArray(listedNfts) && listedNfts.length > 0 ? (
                        listedNfts
                            .sort((data1: any, data2: any) => data1.list_count - data2.list_count)
                            .map((data: any) =>
                                data.isListed ? (
                                    <CollectionsCard key={data.assetId} data={data} label={'Buy'} collectionData={collectionData[data.seller]} />
                                ) : (
                                    ''
                                ),
                            )
                    ) : (
                        <div className="col-span-full text-center w-full">
                            <p className="text-xl">No NFTs Listed</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TrendingNftPage
