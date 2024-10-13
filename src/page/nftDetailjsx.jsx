import React, { useEffect } from "react";
import ReadyForNext from "../components/home/readyForNext";
import MoreFromThis from "../components/nftDetail/moreFromThis";
import NftDetailBanner from "../components/nftDetail/nftDetailBanner";

const baseUrl = import.meta.env.VITE_API_BASE_URL;


const NftDetail = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  
  return (
    <>
      <NftDetailBanner detail={true}/>
      <MoreFromThis />
      <ReadyForNext />
    </>
  );
};

export default NftDetail;
