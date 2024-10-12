import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Auction from "../components/home/auction";
import ReadyForNext from "../components/home/readyForNext";
import Footer from "../components/layout/footer";
import NftDetailBanner from "../components/nftDetail/nftDetailBanner";


const AuctionDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [collectionData, setCollectionData] = useState<any>({})
  const [nftData, setNftData] = useState<any>({})
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      console.log("Location Auction", location.state);
      if (location.state.collectionData && location.state.data) {
        setCollectionData(location.state.collectionData)
        setNftData(location.state.data)
      }

    }

  }, [location])

  return (
    <>
      <NftDetailBanner />
      <Auction collectionData={collectionData} nftData={nftData} auctionText="More from this collection" />
      <ReadyForNext />
      <Footer />

    </>
  )
}

export default AuctionDetail
