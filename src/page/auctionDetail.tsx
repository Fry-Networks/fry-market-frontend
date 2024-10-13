import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Auction from "../components/home/auction";
import ReadyForNext from "../components/home/readyForNext";
import Footer from "../components/layout/footer";
import NftDetailBanner from "../components/nftDetail/nftDetailBanner";

const baseUrl = import.meta.env.VITE_API_BASE_URL;


const AuctionDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [collectionData, setCollectionData] = useState<any>({})
  const [nftData, setNftData] = useState<any>({})
  const [profileData, setProfileData] = useState<any>({})
  const navigate = useNavigate();
  const location = useLocation();

  const getProfileData = async (id: any) => {
    console.log("dd", id);

    if (id) {

      try {

        // const config = {
        //   headers: { Authorization: `Bearer ${token}` }
        // };

        const response: any = await axios.get(`${baseUrl}/get-profile-settings/${id}`);
        console.log("Hehehe", response.data);
        setProfileData(response.data)
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
    if (location.state) {
      console.log("Location Auction", location.state);
      if (location.state.collectionData && location.state.data) {
        setCollectionData(location.state.collectionData)
        setNftData(location.state.data)
        getProfileData(location.state.collectionData.collection_address)
      }

    }

  }, [location])



  return (
    <>
      <NftDetailBanner detail={false} collectionData={collectionData} nftData={nftData} profileData={profileData}
      />

      <Auction collectionData={{ [collectionData["collection_address"]]: collectionData }} nftData={nftData} auctionText="More from this collection" moreByUser={true} />
      <ReadyForNext />
      <Footer />

    </>
  )
}

export default AuctionDetail