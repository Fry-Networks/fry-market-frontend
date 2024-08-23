import { useEffect } from "react";
import AuctionBanner from "../components/auction/auctionBanner";
import LiveAuction from "../components/auction/liveAuction";
import TopListed from "../components/auction/topListed";
import ReadyForNext from "../components/home/readyForNext";

const Auction = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>

      <AuctionBanner />
      <TopListed />
      <LiveAuction />
      <ReadyForNext />

    </div>
  );
};

export default Auction;
