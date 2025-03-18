import { useWallet } from "@txnlab/use-wallet";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import artistImage from "../../src/assets/topCollection/leftImg.webp";
import { getAllUserAuctions } from "../auctionMethod";
import ReadyForNext from "../components/home/readyForNext";
import PixacioBanner from "../components/topCollection/pixacioBanner";
import PixoNft from "../components/topCollection/pixoNft";
import { getAllListedByUser, getAllUserNfts, getNFTsFromGroupId } from "../fryMarketMethods";

const TopCollection = () => {

  const [collectionData, setCollectionData] = useState<any>("")
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

  const location = useLocation();
  const navigate = useNavigate()
  const getAllNft = async () => {
    try {
      setLoadingListed(true)
      const response = await getAllListedByUser(collectionData.collection_address)
      console.log('NftAll', response)
      setNfts(response)
      setLoadingListed(false)

      setTotalListed(Array.isArray(response) ? response.length : 0)

    } catch (e) {

      console.log("e", e);
      setLoadingListed(false)


    }
  }
  const getAuctionedNft = async () => {
    // console.log("NftAuctionedd");

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
      console.log("NftBought", collectionData);
      if (collectionData.collection_address) {
        setLoadingBought(true);
        // const response2 = await getAllCollectionWListed(collectionData?.wallet_address)
        // console.log('NftAll', response2)

        const nftDetails = []
        const response = await getAllUserNfts(collectionData?.wallet_address)
        for (let i = 0; i < collectionData.minted_nfts.length; i++) {
          const response2 = await getNFTsFromGroupId(collectionData.minted_nfts[i])
          nftDetails.push(...response2)
        }
        // const response2 = await getNFTsFromGroupId(collectionData.minted_nfts[0])
        console.log('NftAll', response)
        console.log('nftDetails', nftDetails)
        setAllBoughtNft(nftDetails)
        setLoadingBought(false);

      }
    } catch (e) {
      setLoadingBought(false);

    }
  }
  useEffect(() => {
    // console.log("Collection Data Full i", location.state);
    if (location?.state?.collectionData) {
      setCollectionData(location.state.collectionData)
    }
    else {
      navigate("/")
    }
    if (location?.state?.profile) {
      setProfileData(location.state.profile)
    }
    // console.log("ahh");



  }, [])
  useEffect(() => {
    if (collectionData) {

      getAllNft();
      getAuctionedNft();
      getBoughtAllNft();
    }
  }, [collectionData])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>


      <PixacioBanner name="Pixacio" image={artistImage} collectionData={collectionData} profileData={profileData} totalListed={totalListed} totalListedAuctioned={totalListedAuctioned} />
      <PixoNft nfts={nfts} collectionData={collectionData} auctionedNfts={auctionedNfts} allBoughtNft={allBoughtNft} loadingBought={loadingBought} loadingListed={loadingListed} loadingAuctioned={loadingAuctioned} />
      <ReadyForNext />

    </>
  );
};

export default TopCollection;
