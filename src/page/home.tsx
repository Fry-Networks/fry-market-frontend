import { useWallet } from '@txnlab/use-wallet'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Auction from '../components/home/auction'
import DigitalAssets from '../components/home/digitalAssets'
import Faq from '../components/home/faq'
import Hero from '../components/home/hero'
import ListedNft from '../components/home/listedNft'
import ReadyForNext from '../components/home/readyForNext'
import TopCollections from '../components/home/topCollections'
import TopSeller from '../components/home/topSeller'
import TrendingNft from '../components/home/trendingNft'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const Home = () => {
  const [collectionData, setCollectionData] = useState<any>('')
  const [collectionDataFull, setCollectionDataFull] = useState<any>([])
  const { activeAccount } = useWallet()
  console.log("Active Account in Home", activeAccount);
  const getProfileData = async (id: any) => {
    if (id) {
      try {
        // const config = {
        //   headers: { Authorization: `Bearer ${token}` }
        // };

        const response: any = await axios.get(`${baseUrl}/get-profile-settings/${id}`)
        // console.log("Hehe", response.data);
        return response.data
        // return true;
      } catch (e) {
        // console.log("Error Updating Profile Data");
        // toast.error("Error Getting Profile Data");
        // return false
        return false
      }
    }
  }

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
            setCollectionDataFull((prev: any) => [...prev, collectionData])
          }
        })
        setCollectionData(obj)
      }
    } catch (e) {
      // console.log("Error Getting Collection", e);
      // toast.error("Error Creating Collection");
      setCollectionData('')
    }
  }

  useEffect(() => {
    getCollectionData()
  }, [])

  return (
    <div>
      <Hero />
      {/* <Featured /> */}
      <ListedNft collectionData={collectionData} />
      <Auction collectionData={collectionData} auctionText="Auction" />
      <TrendingNft collectionData={collectionData} />
      <TopSeller collectionDataFull={collectionDataFull} />
      <TopCollections collectionDataFull={collectionDataFull} />
      {/* <SoldNft /> */}
      <DigitalAssets />
      {/* <BoostNft /> */}
      <Faq />
      <ReadyForNext />

      {/* <Components /> */}
    </div>
  )
}

export default Home
