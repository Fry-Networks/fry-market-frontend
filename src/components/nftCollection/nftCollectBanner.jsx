import React from 'react';
import bannerImg from "../../assets/nftCollection/bannerImg.png"

const NftCollectBanner = () => {
  return (
<>
<div className="nftBanner h-screen">
    <div className="container">
        <div className="inner flex-center gap-3">
            <div  className="leftArea w-2/5 flex flex-col items-center  justify-start">
            <h2 className= 'nft primary text-[220px] font-bold font-Apex '>NFT</h2>
            <h2 className='collection darkBlack font-Apex font-bold text-left'>Collection</h2>
          
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