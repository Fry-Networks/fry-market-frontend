import { useWallet } from "@txnlab/use-wallet";
import { useEffect, useState } from "react";
import { getAllAuctions } from "../auctionMethod";
import AuctionBanner from "../components/auction/auctionBanner";
import LiveAuction from "../components/auction/liveAuction";

const Auction = () => {

  const [auctionedNfts, setAuctionedNfts] = useState<any>([]);
  const [loading, setLoading] = useState<any>();
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()

  const getAuctionedNft = async () => {
    if (activeAccount?.address) {


      try {


        setLoading(true);
        const response = await getAllAuctions(activeAccount?.address, signer);
        console.log("NftAuctioned", response);
        setAuctionedNfts(response);
        setLoading(false)

      }
      catch (e) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    console.log("heeh");

    if (activeAccount?.address) {
      getAuctionedNft();
    }

  }, [activeAccount])



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <div>

      <AuctionBanner />
      {/* <TopListed /> */}
      <LiveAuction auctionedNfts={auctionedNfts} getAuctionedNft={getAuctionedNft} />
      {/* <ReadyForNext /> */}

    </div>
  );
};

export default Auction;
