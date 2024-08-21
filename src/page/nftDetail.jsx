import React, { useEffect } from "react";
import Navbar from "../components/layout/navbar";
import NftDetailBanner from "../components/nftDetail/nftDetailBanner";
import Footer from "../components/layout/footer";
import ReadyForNext from "../components/home/readyForNext";
import MoreFromThis from "../components/nftDetail/moreFromThis";

const NftDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NftDetailBanner />
      {/* <MoreFromThis /> */}
      <ReadyForNext />
    </>
  );
};

export default NftDetail;
