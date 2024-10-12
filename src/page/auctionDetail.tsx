import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      console.log("Location Auction", location.state);
    }
  }, [location])

  return (
    <>
      <NftDetailBanner />
      <Auction collectionData={collectionData} auctionText="More from this collection" />
      <ReadyForNext />
      <Footer />

    </>
  )
}

export default AuctionDetail
