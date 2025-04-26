import { useWallet } from "@txnlab/use-wallet";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAllUserAuctions } from "../../auctionMethod";
import { getAllListedByUser, getAllUserNfts, userFryBalance } from "../../fryMarketMethods";
import PixacioBanner from '../topCollection/pixacioBanner';
import ProfileBanner from './profileBanner';
import ProfileNft from './profileNft';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const OtherProfilePage = () => {
  const { sellerId } = useParams(); // Extract sellerId from the URL

  const [collectionData, setCollectionData] = useState<any>({})
  const [allListedNft, setAllListedNft] = useState<any>([])
  const [allNft, setAllNft] = useState<any>([])
  const [fryBalance, setFryBalance] = useState<any>(0)
  const [profileData, setProfileData] = useState<any>({})
  const [totalListed, setTotalListed] = useState<any>(0)
  const [totalListedAuctioned, setTotalListedAuctioned] = useState<any>(0)
  const navigate = useNavigate();
  const location = useLocation();
  const { activeAccount, signer } = useWallet()

  useEffect(() => {
    // console.log("othersProfile", location.state);

  }, [])

  const getCollectionData = async (address: any) => {
    if (address) {
      try {

        // const config = {
        //   headers: { Authorization: `Bearer ${token}` }
        // };

        const response = await axios.get(`${baseUrl}/get-collection/${address}`);
        console.log("Collection Data", response.data);
        setCollectionData(response.data)

      }
      catch (e) {
        // console.log("Error Getting Collection", e);
        // toast.error("Error Creating Collection");

      }
    }
  }

  const getListedNft = async (address: any) => {
    try {

      if (address) {
        const response = await getAllListedByUser(address);
        console.log("NftLisssted", response);
        setAllListedNft(response);
        setTotalListed(Array.isArray(response) ? response.length : 0)
        // console.log("Listed", response.length);


      }
    }
    catch (e) {

    }
  }
  const getAllNft = async (address: any) => {
    try {

      if (address) {
        const response = await getAllUserNfts(address);
        console.log("NftLisssted", response);
        setAllNft(response);
      }
    }
    catch (e) {

    }
  }

  const getFryBalance = async () => {
    try {

      if (activeAccount?.address) {
        const response = await userFryBalance(activeAccount?.address);
        // console.log("Fry Balance", response / 1000000);
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

        const response: any = await axios.get(`${baseUrl}/get-profile-settings/${activeAccount?.address}`);
        // console.log("Hehe", response.data);
        setProfileData(response.data)
        // return true;

      }
      catch (e) {
        // console.log("Error Updating Profile Data");
        // toast.error("Error Getting Profile Data");
        // return false

      }
    }
  }
  const getAuctionedNft = async () => {
    // console.log("NftAuctionedd");

    if (activeAccount?.address) {
      try {
        // setLoadingAuctioned(true)
        const response: any = await getAllUserAuctions(activeAccount?.address || activeAccount?.address, signer)
        // console.log('NftAuctionedd', response)
        setTotalListedAuctioned(response.filter((item: any) => item?.isListed).length)
        // console.log("auction", response);
        // console.log("auction", response.filter((item: any) => item?.isListed).length);

        // setLoadingAuctioned(false)
      } catch (e) {
        // console.log('D', e)

        // setLoadingAuctioned(false)
      }
    }
  }

  useEffect(() => {

    if (location.state) {
      setProfileData(location.state.profileData)
      getCollectionData(sellerId);
      getListedNft(sellerId)
      // getFryBalance()
      // getProfileData()
      getAllNft(sellerId);
      getAuctionedNft()
    }
    else {
      navigate("/")
    }


  }, [activeAccount])

  return (
    <>
      <ProfileBanner fryBalance={fryBalance} profileData={profileData} length={allNft.length} />
      <PixacioBanner name={collectionData.collection_name ? collectionData.collection_name : "WONDERFUL ARTWORK"} image={collectionData.image_url ? collectionData.image_url : "https://media.tarkett-image.com/large/TH_25094225_25187225_001.jpg"} description={collectionData.description ? collectionData.description : ""} length={allListedNft.length} profileData={profileData} totalListed={totalListed} totalListedAuctioned={totalListedAuctioned} />
      <ProfileNft collectionData={collectionData} address={sellerId} />
    </>
  )
}

export default OtherProfilePage;
