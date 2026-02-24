import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReadyForNext from "../components/home/readyForNext";
import MoreFromThis from "../components/nftDetail/moreFromThis";
import NftDetailBanner from "../components/nftDetail/nftDetailBanner";

const baseUrl = import.meta.env.VITE_API_BASE_URL;


const NftDetail = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

  }, [location]);


  
  return (
    <>
      <NftDetailBanner detail={true} onlyShow={location.state.onlyShow} />
      {
        !location.state.onlyShow ?
        <MoreFromThis />
        :
        ""

}
      <ReadyForNext />
    </>
  );
};

export default NftDetail;
