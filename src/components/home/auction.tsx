import { useWallet } from '@txnlab/use-wallet';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auctionBack from "../../assets/home/images/auction/auctionBack.webp";
import moreUp from "../../assets/icons/moreUpArrow.svg";
import { getAllAuctions } from '../../auctionMethod';
import AuctionCard from '../cards/auctionCard';
import Button from "../shared/button";

const Auction = ({ collectionData = {}, auctionText, moreByUser }: any) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("i", collectionData);

  })
  const goToAuction = () => {

    navigate('/auction', { state: { collectionData: collectionData } });
  };

  const [auctionedNfts, setAuctionedNfts] = useState<any>([]);
  const [loading, setLoading] = useState<any>();
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()

  const getAuctionedNft = async () => {
    // if (activeAccount?.address) {


    try {


      setLoading(true);
      const response = await getAllAuctions();
      console.log("NftAuctionedh", response);
      if (moreByUser) {
        setAuctionedNfts(response.filter((item) => item?.isListed).filter((item) => item.sellerId == collectionData[Object.keys(collectionData)[0]].collection_address))
      }
      else {

        setAuctionedNfts(response.filter((item) => item?.isListed));
      }
      setLoading(false)

    }
    catch (e) {
      console.log("Error Getting Auctioned Nft", e);
      setLoading(false);
    }
    // }
  }

  useEffect(() => {
    console.log("heeh", auctionedNfts);

    // if (activeAccount?.address) {
    getAuctionedNft();
    // }

  }, [activeAccount])
  return (
    <>
      <div className="auctionWrapper mb-52 relative">
        {/* <img className=' auctionBack absolute left-[300px] -z-20' src={auctionBack} alt="" /> */}
        <div className="container">
          <h2 className="font-normal font-Apex uppercase mb-10">
            {auctionText}
          </h2>

          <div className="nftWrapper mt-10 grid grid-cols-4 gap-x-10 gap-y-9 relative z-20">
            {/* {auctionCard.map((data, index) => (
              <AuctionCard key={data.id} data={data} showHiddenDiv={true} isAuctionPage={true} />
            ))} */}
            {Array.isArray(auctionedNfts) && auctionedNfts.filter((data) => Number(data.biddingStartTime) * 1000 < Date.now() && Number(data.biddingEndTime) * 1000 > Date.now()).length > 0 ? auctionedNfts.filter((data) => Number(data.biddingStartTime) * 1000 < Date.now() && Number(data.biddingEndTime) * 1000 > Date.now()).map((data: any, index: any) => (


              Number(data.biddingStartTime) * 1000 < Date.now() ?
                <>
                  < AuctionCard key={index} data={data} showHiddenDiv={true} isAuctionPage={true} getAuctionedNft={getAuctionedNft} collectionData={collectionData[data?.sellerId ? data?.sellerId : 0]} />
                </>
                :
                ""
            ))
              :

              "No Nfts currently listed on Auction"
            }
          </div>

          <Button
            className="button btn-primary large font-medium flex items-center justify-center gap-2 m-auto mt-16"
            minWidth={228}
            minHeight={58}
            text="Explore More"
            img={moreUp}
            imgClass="order-1"
            onClick={goToAuction}
          ></Button>
        </div>

        <img className='auctionBack absolute left-[0] top-[-150px] -z-10 w-full' src={auctionBack} alt="" />
      </div>
    </>
  );
}

export default Auction;


