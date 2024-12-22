import { useWallet } from "@txnlab/use-wallet";
import { useEffect, useState } from "react";
import { getAllAuctions } from "../auctionMethod";
import AuctionBanner from "../components/auction/auctionBanner";
import LiveAuction from "../components/auction/liveAuction";

const Auction = () => {

  const [auctionedNfts, setAuctionedNfts] = useState<any>([]);
  const [loading, setLoading] = useState<any>();
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()


  const getAuctionedNft: any = async () => {



    try {


      setLoading(true);
      const response = await getAllAuctions();
      // console.log("NftAuctioned", response);
      setAuctionedNfts(response.filter((item) => item?.isListed));
      setLoading(false)

    }
    catch (e) {
      setLoading(false);
    }

  }

  useEffect(() => {
    // console.log("heeh");


    getAuctionedNft();


  }, [])



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
