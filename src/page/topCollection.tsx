import { useWallet } from '@txnlab/use-wallet'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
// import artistImage from '../../src/assets/topCollection/leftImg.webp'
import artistImage from "../assets/images/placeholder-image.webp"
import { getAllUserAuctions } from '../auctionMethod'
import ReadyForNext from '../components/home/readyForNext'
import PixacioBanner from '../components/topCollection/pixacioBanner'
import PixoNft from '../components/topCollection/pixoNft'
import { getAllListedByUser, getNFTsFromGroupId } from '../fryMarketMethods'
import { getCollectionDataByAddress } from '../utils/network/helper'
const TopCollection = () => {
  const location = useLocation()
  const params = useParams()
  const [collectionData, setCollectionData] = useState<any>(null)
  const [profileData, setProfileData] = useState<any>([])
  const [loadingBought, setLoadingBought] = useState<any>(false)
  const [loadingListed, setLoadingListed] = useState<any>(false)
  const [loadingAuctioned, setLoadingAuctioned] = useState<any>(false)
  const [nfts, setNfts] = useState<any>([])
  const [auctionedNfts, setAuctionedNfts] = useState<any>([])
  const [allBoughtNft, setAllBoughtNft] = useState<any>([])
  const { activeAccount, signer } = useWallet()
  const [totalListed, setTotalListed] = useState<any>(0)
  const [totalListedAuctioned, setTotalListedAuctioned] = useState<any>(0)

  const getAllNft = async () => {
    try {
      if (!collectionData?.wallet_address) return
      setLoadingListed(true)
      const response = await getAllListedByUser(collectionData.wallet_address)
      setNfts(response)
      setLoadingListed(false)

      setTotalListed(Array.isArray(response) ? response.length : 0)
    } catch (e) {
      console.log('e', e)
      setLoadingListed(false)
    }
  }
  const getAuctionedNft = async () => {
    if (collectionData.collection_address) {
      try {
        setLoadingAuctioned(true)
        const response: any = await getAllUserAuctions(collectionData.collection_address, signer)
        // console.log('NftAuctionedd', response)
        setAuctionedNfts(response.filter((item: any) => item?.isListed))
        setTotalListedAuctioned(response.filter((item: any) => item?.isListed).length)
        setLoadingAuctioned(false)
      } catch (e) {
        // console.log('D', e)

        setLoadingAuctioned(false)
      }
    }
  }

  const getBoughtAllNft = async () => {
    try {
      if (collectionData?.collection_address && collectionData?.minted_nfts?.length) {
        setLoadingBought(true)

        const nftDetails = []
        for (let i = 0; i < collectionData.minted_nfts.length; i++) {
          const response2 = await getNFTsFromGroupId(collectionData.minted_nfts[i])
          nftDetails.push(...response2)
        }
        setAllBoughtNft(nftDetails)
        setLoadingBought(false)
      }
    } catch (e) {
      setLoadingBought(false)
    }
  }

  useEffect(() => {
    if (params.id) {
      const getCollectionData = async () => {
        try {
          const result = await getCollectionDataByAddress(params.id || '')
          setCollectionData(result)
        } catch (e) {
          // console.log('error', e)
        }
      }
      getCollectionData()
    }
  }, [params])
  useEffect(() => {
    // console.log("Collection Data Full i", location.state);
    // if (location?.state?.collectionData) {
    //   setCollectionData(location.state.collectionData)
    // } else {
    //   navigate('/')
    // }
    if (location?.state?.profile) {
      setProfileData(location.state.profile)
    }
    // console.log("ahh");
  }, [])
  useEffect(() => {
    if (collectionData) {
      getAllNft()
      getAuctionedNft()
      getBoughtAllNft()
    }
  }, [collectionData])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <PixacioBanner
        name="Pixacio"
        image={artistImage}
        collectionData={collectionData}
        profileData={profileData}
        totalListed={totalListed}
        totalListedAuctioned={totalListedAuctioned}
      />
      <PixoNft
        nfts={nfts}
        collectionData={collectionData}
        auctionedNfts={auctionedNfts}
        allBoughtNft={allBoughtNft}
        loadingBought={loadingBought}
        loadingListed={loadingListed}
        loadingAuctioned={loadingAuctioned}
      />
      <ReadyForNext />
    </>
  )
}

export default TopCollection
