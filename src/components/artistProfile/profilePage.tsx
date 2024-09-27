import { useWallet } from "@txnlab/use-wallet";
import axios from "axios";
import { useEffect, useState } from "react";
import artistImage from "../../assets/artistsProfile/leftImg.webp";
import { getAllListedByUser, userFryBalance } from "../../fryMarketMethods";
import PixacioBanner from '../topCollection/pixacioBanner';
import ProfileBanner from './profileBanner';
import ProfileNft from './profileNft';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ProfilePage = () => {

  const [collectionData, setCollectionData] = useState<any>({})
  const [allListedNft, setAllListedNft] = useState<any>([])
  const [fryBalance, setFryBalance] = useState<any>(0)
  const [profileData, setProfileData] = useState<any>({})

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

  const getListedNft = async () => {
    try {

      if (activeAccount?.address) {
        const response = await getAllListedByUser(activeAccount?.address);
        console.log("NftLisssted", response);
        setAllListedNft(response);
      }
    }
    catch (e) {

    }
  }

  const getFryBalance = async () => {
    try {

      if (activeAccount?.address) {
        const response = await userFryBalance(activeAccount?.address);
        console.log("Fry Balance", response / 1000000);
        setFryBalance(response / 1000000);
      }
    }
    catch (e) {

    }
  }

  const getProfileData = async () => {
    if (activeAccount?.address) {

      try {

        // const config = {
        //   headers: { Authorization: `Bearer ${token}` }
        // };

        const response: any = await axios.post(`${baseUrl}/get-profile-settings/${activeAccount?.address}`);
        console.log("Hehe", response.data);
        // return true;

      }
      catch (e) {
        console.log("Error Updating Profile Data");
        // toast.error("Error Getting Profile Data");
        // return false

      }
    }
  }

  useEffect(() => {
    getCollectionData();
    getListedNft()
    getFryBalance()
    getProfileData()

  }, [activeAccount])

  return (
    <>
      <ProfileBanner fryBalance={fryBalance} />
      <PixacioBanner name={collectionData.collection_name ? collectionData.collection_name : "WONDERFUL ARTWORK"} image={collectionData.image_url ? collectionData.image_url : artistImage} description={collectionData.description ? collectionData.description : ""} length={allListedNft.length} />
      <ProfileNft />
    </>
  )
}

export default ProfilePage;