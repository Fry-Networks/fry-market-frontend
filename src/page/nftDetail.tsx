import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ListedNft from '../components/home/listedNft'
import ReadyForNext from '../components/home/readyForNext'
import NftDetailBanner from '../components/nftDetail/nftDetailBanner'
import { getSingleNftlistData } from '../fryMarketMethods'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const NftDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [collectionData, setCollectionData] = useState<any>({})
  const [nftData, setNftData] = useState<any>({})
  const [profileData, setProfileData] = useState<any>({})
  const [isUnlisted, setIsUnlisted] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { assetId } = useParams<{ assetId: string }>()

  const getProfileData = async (id: any) => {
    if (id) {
      try {
        const response: any = await axios.get(`${baseUrl}/get-profile-settings/${id}`)
        setProfileData(response.data)
      } catch (e) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    if (location.state) {
      if (location.state.collectionData && location.state.data) {
        setCollectionData(location.state.collectionData)
        setNftData(location.state.data)
        setIsUnlisted(false)
        getProfileData(location.state.collectionData.collection_address)
      }
    } else if (assetId) {
      const loadFromChain = async () => {
        try {
          const listing = await getSingleNftlistData(Number(assetId))
          if (listing && listing.seller && listing.isListed) {
            setNftData(listing)
            setIsUnlisted(false)
            if (listing.collectionData) {
              setCollectionData(listing.collectionData)
            }
            getProfileData(listing.seller)
          } else {
            setNftData({ assetId: Number(assetId), isUnlisted: true })
            setIsUnlisted(true)
          }
        } catch {
          setNftData({ assetId: Number(assetId), isUnlisted: true })
          setIsUnlisted(true)
        }
      }
      loadFromChain()
    }
  }, [location, assetId])
  return (
    <>
      <NftDetailBanner
        detail={true}
        nftData={nftData}
        collectionData={collectionData}
        profileData={profileData}
        onlyShow={location?.state?.onlyShow || isUnlisted}
        forList={location?.state?.forList}
        forClaim={location?.state?.forClaim}
        isUnlisted={isUnlisted}
      />
      {!location?.state?.onlyShow ? (
        <ListedNft
          collectionData={{ [collectionData['collection_address']]: collectionData }}
          nftData={nftData}
          listingText={'More from this collection'}
          moreByUser={true}
          onlyShow={location?.state?.onlyShow}
        />
      ) : (
        ''
      )}
      {/* <MoreFromThis /> */}
      <ReadyForNext />
    </>
  )
}

export default NftDetail
