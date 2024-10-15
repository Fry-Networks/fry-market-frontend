import { useWallet } from "@txnlab/use-wallet";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import artistImage from "../../src/assets/topCollection/leftImg.webp";
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

  const location = useLocation();

  const getAllNft = async () => {
    try {

      const response = await getAllListedByUser(collectionData.collection_address)
      console.log('NftAll', response)
      setNfts(response)


    } catch (e) {

    }
  }

  useEffect(() => {
    console.log("Collection Data Full i", location.state);
    if (location?.state?.collectionData) {
      setCollectionData(location.state.collectionData)
    }
    if (location?.state?.profile) {
      setProfileData(location.state.profile)
    }
    console.log("ahh");



  }, [])
  useEffect(() => {
    if (collectionData) {

      getAllNft();
    }
  }, [collectionData])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>


      <PixacioBanner name="Pixacio" image={artistImage} collectionData={collectionData} />
      <PixoNft nfts={nfts} collectionData={collectionData} />
      <ReadyForNext />

    </>
  );
};

export default TopCollection;
