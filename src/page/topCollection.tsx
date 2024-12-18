import { useWallet } from "@txnlab/use-wallet";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import artistImage from "../../src/assets/topCollection/leftImg.webp";
import { getAllUserAuctions } from "../auctionMethod";
import ReadyForNext from "../components/home/readyForNext";
import PixacioBanner from "../components/topCollection/pixacioBanner";
import PixoNft from "../components/topCollection/pixoNft";
import { getAllListedByUser } from "../fryMarketMethods";

const TopCollection = () => {

  const [collectionData, setCollectionData] = useState<any>("")
  const [profileData, setProfileData] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [nfts, setNfts] = useState<any>([])
  const { activeAccount, signer } = useWallet()
  const [totalListed, setTotalListed] = useState<any>(0)
  const [totalListedAuctioned, setTotalListedAuctioned] = useState<any>(0)

  const location = useLocation();
  const navigate = useNavigate()
  const getAllNft = async () => {
    try {

      const response = await getAllListedByUser(collectionData.collection_address)
      console.log('NftAll', response)
      setNfts(response)
      setTotalListed(Array.isArray(response) ? response.length : 0)

    } catch (e) {
      console.log("e", e);

    }
  }
  const getAuctionedNft = async () => {
    console.log("NftAuctionedd");

    if (collectionData.collection_address || activeAccount?.address) {
      try {
        // setLoadingAuctioned(true)
        const response: any = await getAllUserAuctions(collectionData.collection_address || activeAccount?.address, signer)
        console.log('NftAuctionedd', response)
        setTotalListedAuctioned(response.filter((item: any) => item?.isListed).length)
        // setLoadingAuctioned(false)
      } catch (e) {
        console.log('D', e)

        // setLoadingAuctioned(false)
      }
    }
  }
  useEffect(() => {
    console.log("Collection Data Full i", location.state);
    if (location?.state?.collectionData) {
      setCollectionData(location.state.collectionData)
    }
    else {
      navigate("/")
    }
    if (location?.state?.profile) {
      setProfileData(location.state.profile)
    }
    console.log("ahh");



  }, [])
  useEffect(() => {
    if (collectionData) {

      getAllNft();
      getAuctionedNft()
    }
  }, [collectionData])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>


      <PixacioBanner name="Pixacio" image={artistImage} collectionData={collectionData} profileData={profileData} totalListed={totalListed} totalListedAuctioned={totalListedAuctioned} />
      <PixoNft nfts={nfts} collectionData={collectionData} />
      <ReadyForNext />

    </>
  );
};

export default TopCollection;
