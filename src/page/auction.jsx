import React, { useEffect } from "react";
import Navbar from "../components/layout/navbar";
import AuctionBanner from "../components/auction/auctionBanner";
import TopListed from "../components/auction/topListed";
import LiveAuction from "../components/auction/liveAuction";
import ReadyForNext from "../components/home/readyForNext";
import Footer from "../components/layout/footer";

const Auction = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
     
      <AuctionBanner />
    <TopListed/>
        <LiveAuction/>
      <ReadyForNext />
     
    </div>
  );
};

export default Auction;
