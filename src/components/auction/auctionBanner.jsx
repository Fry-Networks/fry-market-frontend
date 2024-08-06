import React from 'react';
import bannerImg1 from "../../assets/auction/bannerImg1.png";
import bannerImg2 from "../../assets/auction/bannerImg2.png";
import bannerImg3 from "../../assets/auction/bannerImg3.png";
import bannerImg4 from "../../assets/auction/bannerImg4.png";


const AuctionBanner = () => {
  return (
 <>
 <div className="auctionBannerWrapper h-screen">
<div className="container">
    <div className="bannerInner flex flex-col items-center justify-center h-screen gap-3">
        <h1 className='text-[150px] primary font-bold font-Apex text-center tracking-[6px]'>AUCTION</h1>
        <div className="nftDiv flex items-end gap-2">
            <img src={bannerImg1} alt="" />
            <img src={bannerImg2} alt="" />

            <img src={bannerImg3} alt="" />

            <img src={bannerImg4} alt="" />

        </div>
    </div>
</div>
 </div>
 </>
  )
}

export default AuctionBanner;