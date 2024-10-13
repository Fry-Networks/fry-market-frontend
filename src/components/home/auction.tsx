import { useWallet } from '@txnlab/use-wallet';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auctionBack from "../../assets/home/images/auction/auctionBack.webp";
import trendingNft1 from "../../assets/home/images/auction/auctionImg1.png";
import trendingNft2 from "../../assets/home/images/auction/auctionImg2.png";
import trendingNft3 from "../../assets/home/images/auction/auctionImg3.png";
import trendingNft4 from "../../assets/home/images/auction/auctionImg4.png";
import trendingNft5 from "../../assets/home/images/auction/auctionImg5.png";
import trendingNft6 from "../../assets/home/images/auction/auctionImg6.png";
import trendingNft7 from "../../assets/home/images/auction/auctionImg7.png";
import trendingNft8 from "../../assets/home/images/auction/auctionImg8.png";
import userImg1 from "../../assets/home/images/card-userImg.png";
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
    if (activeAccount?.address) {


      try {


        setLoading(true);
        const response = await getAllAuctions(activeAccount?.address, signer);
        console.log("NftAuctioned", response);
        if (moreByUser) {
          setAuctionedNfts(response.filter((item) => item.sellerId == collectionData[Object.keys(collectionData)[0]].collection_address))
        }
        else {

          setAuctionedNfts(response);
        }
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
            {Array.isArray(auctionedNfts) && auctionedNfts.length > 0 ? auctionedNfts.map((data: any, index: any) => (
              <AuctionCard key={index} data={data} showHiddenDiv={true} isAuctionPage={true} getAuctionedNft={getAuctionedNft} collectionData={collectionData[data?.sellerId ? data?.sellerId : 0]} />
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

const auctionCard = [
  {
    id: 1,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft1,
    price: "142.02",
  },
  {
    id: 2,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft2,
    price: "142.02",
  },
  {
    id: 3,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft3,
    price: "142.02",
  },
  {
    id: 4,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft4,
    price: "142.02",
  },
  {
    id: 5,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft5,
    price: "142.02",
  },
  {
    id: 6,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft6,
    price: "142.02",
  },
  {
    id: 7,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft7,
    price: "142.02",
  },
  {
    id: 8,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft8,
    price: "142.02",
  },
];
