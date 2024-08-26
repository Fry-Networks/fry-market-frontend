import React from 'react';
import bannerImg from "../../assets/nftCollection/bannerImg.webp";

const NftCollectBanner = () => {
  return (
<>
<div className="nftBanner h-screen">
    <div className="container">
        <div className="inner flex-center gap-3">
            <div  className="leftArea w-2/5 flex flex-col items-center h-screen justify-center">
            <h2 className= 'font-bold font-Apex darkBlack'><span className=' primary text-[220px] '>NFT </span>COLLECTIONS</h2>
          
            </div>
            <div className="rightArea w-3/5 h-full">
            <img className='h-full w-full object-cover' src={bannerImg} alt="" /></div>

        </div>
    </div>
</div>
</>
  )
}

export default NftCollectBanner;