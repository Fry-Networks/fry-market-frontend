import React from 'react';
import CollectionsCard from '../cards/collectionsCard';
import userImg1 from "../../assets/home/images/card-userImg.png";
import trendingNft1 from "../../assets/home/images/auction/auctionImg1.png";
import trendingNft2 from "../../assets/home/images/auction/auctionImg2.png";
import trendingNft3 from "../../assets/home/images/auction/auctionImg3.png";
import trendingNft4 from "../../assets/home/images/auction/auctionImg4.png";
import trendingNft5 from "../../assets/home/images/auction/auctionImg5.png";
import trendingNft6 from "../../assets/home/images/auction/auctionImg6.png";
import trendingNft7 from "../../assets/home/images/auction/auctionImg7.png";
import trendingNft8 from "../../assets/home/images/auction/auctionImg8.png";
import Button from "../shared/button";
import moreUp from "../../assets/icons/moreUpArrow.svg";
import auctionBack from "../../assets/home/images/auction/auctionBack.png";

const Auction = () => {
  return (
    <>
      <div className="auctionWrapper mb-52 relative md:mb-20">
        <img className='absolute left-[300px] -z-10' src={auctionBack} alt="" />
        <div className="container">
          <h2 className="font-normal font-Apex uppercase mb-10">
            AUCTION
          </h2>

          <div className="nftWrapper mt-10 grid grid-cols-4 gap-x-10 gap-y-7 relative z-20">
            {auctionCard.map((data, index) => (
              <CollectionsCard key={data.id} data={data} showHiddenDiv={true} isAuctionPage={true}  />
            ))}
          </div>

          <Button
              className="button btn-primary large font-medium flex items-center justify-center gap-2 m-auto mt-16"
              minWidth={228}
              minHeight={58}
              text="Explore More"
                img={moreUp}
            imgClass="order-1"
            ></Button>
        </div>
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
