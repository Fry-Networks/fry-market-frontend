import React from 'react';
import CollectionsCard from '../../components/cards/collectionsCard';

import userImg1 from "../../assets/home/images/card-userImg.png";
import collectNft1 from "../../assets/nftDetail/collectPic1.png";
import collectNft2 from "../../assets/nftDetail/coolectPic2.png";
import collectNft3 from "../../assets/nftDetail/collectPic3.png";
import collectNft4 from "../../assets/nftDetail/collectPic4.png";
import collectNft5 from "../../assets/nftDetail/collectPic5.png";
import collectNft6 from "../../assets/nftDetail/collectPic6.png";
import collectNft7 from "../../assets/nftDetail/collectPic7.png";
import collectNft8 from "../../assets/nftDetail/collectPic8.png";
import leftGlow from "../../assets/nftCollection/redGloww.webp";
import grid from "../../assets/nftCollection/exploreGrid.webp";

const MoreFromThis = () => {


    const trendingCard = [
        {
          id: 1,
          userImg: userImg1,
          userName: "STELLA NOVA",
          userEmail: "@Stella Nova",
          nftImg: collectNft1,
          price: "142.02",
        },
        {
          id: 2,
          userImg: userImg1,
          userName: "STELLA NOVA",
          userEmail: "@Stella Nova",
          nftImg: collectNft2,
          price: "142.02",
        },
        {
          id: 3,
          userImg: userImg1,
          userName: "STELLA NOVA",
          userEmail: "@Stella Nova",
          nftImg: collectNft3,
          price: "142.02",
        },
        {
          id: 4,
          userImg: userImg1,
          userName: "STELLA NOVA",
          userEmail: "@Stella Nova",
          nftImg:  collectNft4,
          price: "142.02",
        },
        {
          id: 5,
          userImg: userImg1,
          userName: "STELLA NOVA",
          userEmail: "@Stella Nova",
          nftImg:  collectNft5,
          price: "142.02",
        },
        {
          id: 6,
          userImg: userImg1,
          userName: "STELLA NOVA",
          userEmail: "@Stella Nova",
          nftImg: collectNft6,
          price: "142.02",
        },
        {
          id: 7,
          userImg: userImg1,
          userName: "STELLA NOVA",
          userEmail: "@Stella Nova",
          nftImg:  collectNft7,
          price: "142.02",
        },
        {
          id: 8,
          userImg: userImg1,
          userName: "STELLA NOVA",
          userEmail: "@Stella Nova",
          nftImg: collectNft8,
          price: "142.02",
        },
      ];
      
  return (
   <>
   <div className="moreFromThisWrapper my-52 relative">
    <img src={leftGlow} className='absolute left-0 top-[-100px] -z-10' alt="" />
    <img src={grid} className='absolute right-0 top-[-100px] -z-10' alt="" />

    <div className="container">
    <h2 className="font-bold font-Apex uppercase tracking-wide darkBlack mb-10">
    More from this collection
        </h2>
        <div className="collectionContainer my-10 grid grid-cols-4  gap-x-10 gap-y-7">
        {trendingCard.map((data, index) => (
            <CollectionsCard key={data.id} data={data} /> // Added key prop
          ))}
        </div>
    </div>
   </div>
   </>

  )
}

export default MoreFromThis;


