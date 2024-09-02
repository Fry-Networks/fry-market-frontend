import React from 'react';
import bannerImg from "../../assets/nftCollection/bannerImg.webp";
import leftGlow from "../../assets/nftCollection/redGloww.webp";
import rightGrid from "../../assets/nftCollection/heroRightGrid.webp";
import topGrid from "../../assets/nftCollection/topGrid.webp";


const NftCollectBanner = () => {
  return (
<>
<div className="nftBanner h-screen relative">
<img src={leftGlow}  className='leftGlow absolute top-[-100px] left-0 -z-10' alt="" />
<img src={rightGrid}  className='rightGrid absolute bottom-0 right-0 -z-10' alt="" />
<img src={topGrid} className=' absolute top-[-130px] left-0 -z-20' alt="" />
    <div className="container">
        <div className="inner flex-center gap-3">
            <div  className="leftArea w-2/5 flex flex-col items-center h-screen justify-center">
            <h2 className= ' collection font-bold font-Apex darkBlack'><span className='nft primary text-[220px] '>NFT </span>COLLECTIONS</h2>
          
            </div>
            <div className="rightArea w-3/5 h-full">
            <img className=' max-w-[714px] max-h-[687px] h-full w-full object-cover' src={bannerImg} alt="" /></div>

        </div>
    </div>
</div>
</>
  )
}

export default NftCollectBanner;