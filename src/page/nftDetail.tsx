import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ListedNft from '../components/home/listedNft'
import ReadyForNext from '../components/home/readyForNext'
import NftDetailBanner from '../components/nftDetail/nftDetailBanner'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const NftDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  console.log('NftDetail')
  const [collectionData, setCollectionData] = useState<any>({})
  const [nftData, setNftData] = useState<any>({})
  const [profileData, setProfileData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { assetId } = useParams<{ assetId: string }>()

  const getProfileData = async (id: any) => {
    if (id) {
      try {
        const response: any = await axios.get(`${baseUrl}/get-profile-settings/${id}`)
        console.log('Hehehe', response.data)
        setProfileData(response.data)
        // return true;
      } catch (e) {
        console.log(e)
      }
    }
  }

  const fetchNftByAssetId = async (assetId: string) => {
    try {
      setLoading(true)
      // Fetch NFT data by asset ID
      const nftResponse = await axios.get(`${baseUrl}/get-nft-by-asset-id/${assetId}`)
      if (nftResponse.data) {
        setNftData(nftResponse.data)

        // Fetch collection data if available
        if (nftResponse.data.collection_address) {
          const collectionResponse = await axios.get(`${baseUrl}/get-collection/${nftResponse.data.collection_address}`)
          if (collectionResponse.data) {
            setCollectionData(collectionResponse.data)
            getProfileData(collectionResponse.data.collection_address)
          }
        }
      }
    } catch (error) {
      console.error('Error fetching NFT:', error)
      // If NFT not found, redirect to 404 or home
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // If we have an assetId from URL params, fetch NFT data
    if (assetId) {
      fetchNftByAssetId(assetId)
    }
    // Otherwise, use location.state (for backward compatibility)
    else if (location.state) {
      console.log('Location', location.state)
      if (location.state.collectionData && location.state.data) {
        setCollectionData(location.state.collectionData)
        setNftData(location.state.data)
        getProfileData(location.state.collectionData.collection_address)
      }
    }
    // If neither assetId nor location.state, redirect to home
    else {
      navigate('/')
    }
  }, [assetId, location])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading NFT details...</div>
      </div>
    )
  }
  return (
    <>
      <NftDetailBanner
        detail={true}
        nftData={nftData}
        collectionData={collectionData}
        profileData={profileData}
        onlyShow={location?.state?.onlyShow}
        forList={location?.state?.forList}
        forClaim={location?.state?.forClaim}
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
