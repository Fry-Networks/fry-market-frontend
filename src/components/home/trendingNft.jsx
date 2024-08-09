import React from 'react';
import Button from "../../components/shared/button";
import arrowDown from "../../assets/icons/arrow-down.svg";
import CollectionsCard from '../../components/cards/collectionsCard';

import userImg1 from "../../assets/home/images/card-userImg.png";
import trendingNft1 from "../../assets/home/images/trendingNft1.png";
import trendingNft2 from "../../assets/home/images/trendingNft2.png";
import trendingNft3 from "../../assets/home/images/trendingNft3.png";
import trendingNft4 from "../../assets/home/images/trendingNft4.png";
import trendingNft5 from "../../assets/home/images/trendingNft5.png";
import trendingNft6 from "../../assets/home/images/trendingNft6.png";
import trendingNft7 from "../../assets/home/images/trendingNft7.png";
import trendingNft8 from "../../assets/home/images/trendingNft8.png";


const TrendingNft = () => {
  return (
    <div className="trendingNftWrapper my-52 md:my-20">
      <div className="container">
        <div className='flex justify-between'>
          <h2 className="font-normal font-Apex uppercase">
            Trending NFT'S
          </h2>
          <Button 
            className="button btn-secondary font-normal medium uppercase relative flex items-center justify-center gap-1"
            minWidth={220}
            height={52}
            text="Last 30 minutes"
            img={arrowDown}
            imgClass="order-1"

          />
        </div>
      
        <div className="nftWrapper mt-10 grid grid-cols-4  gap-x-10 gap-y-7">
          {trendingCard.map((data, index) => (
            <CollectionsCard key={data.id} data={data} /> // Added key prop
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingNft;

const trendingCard = [
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
    nftImg:  trendingNft4,
    price: "142.02",
  },
  {
    id: 5,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg:  trendingNft5,
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
    nftImg:  trendingNft7,
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
