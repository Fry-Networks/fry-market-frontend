import { useWallet } from "@txnlab/use-wallet";
import axios from "axios";
import { useEffect, useState } from "react";
import artistImage from "../../assets/artistsProfile/leftImg.webp";
import PixacioBanner from '../topCollection/pixacioBanner';
import ProfileBanner from './profileBanner';
import ProfileNft from './profileNft';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ProfilePage = () => {

  const [collectionData, setCollectionData] = useState<any>({})
  const { activeAccount } = useWallet()

  const getCollectionData = async () => {
    if (activeAccount?.address) {
      try {

        // const config = {
        //   headers: { Authorization: `Bearer ${token}` }
        // };

        const response = await axios.get(`${baseUrl}/get-collection/${activeAccount?.address}`);
        console.log("Collection Data", response.data);
        setCollectionData(response.data)

      }
      catch (e) {
        console.log("Error Getting Collection", e);
        // toast.error("Error Creating Collection");

      }
    }
  }

  useEffect(() => {
    getCollectionData();

  }, [activeAccount])

  return (
    <>
      <ProfileBanner />
      <PixacioBanner name={collectionData.collection_name ? collectionData.collection_name : "WONDERFUL ARTWORK"} image={collectionData.image_url ? collectionData.image_url : artistImage} description={collectionData.description ? collectionData.description : ""} />
      <ProfileNft />
    </>
  )
}

export default ProfilePage;