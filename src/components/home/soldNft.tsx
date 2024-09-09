import React from 'react'
import CollectionsCard from '../cards/collectionsCard';
import arrowDown from "../../assets/icons/arrow-down.svg";
import userImg1 from "../../assets/home/images/card-userImg.png";
import soldNft1 from "../../assets/home/images/soldNft/soldNftImg1.png";
import soldNft2 from "../../assets/home/images/soldNft/soldNftImg2.png";
import soldNft3 from "../../assets/home/images/soldNft/soldNftImg3.png";
import soldNft4 from "../../assets/home/images/soldNft/soldNftImg4.png";
import soldNft5 from "../../assets/home/images/soldNft/soldNftImg5.png";
import soldNft6 from "../../assets/home/images/soldNft/soldNftImg6.png";
import soldNft7 from "../../assets/home/images/soldNft/soldNftImg7.png";
import soldNft8 from "../../assets/home/images/soldNft/soldNftImg8.png";
import glow from "../../assets/home/images/heroGlow.png";
import soldGlow from "../../assets/home/images/soldNft/soldGloww.webp";





const SoldNft = () => {
  return (
   <>
   <div className="soldNftWrapper mb-52 relative md:mb-20">
    <img className='absolute bottom-[-500px] right-[0px] -z-40' src={soldGlow} alt="" />
    <div className="container">
    <h2 className="font-normal font-Apex uppercase mb-10">
    RECENTLY SOLD
          </h2>
          <div className="soldCardContainer mt-10 grid grid-cols-4  gap-x-10 gap-y-7 relative z-50">
            {
                soldCardData.map((data,index)=>(
                    <CollectionsCard data={data} key={data.id} showLayer={true}/>
                ))
            }
          </div>
    </div>
   </div>
   </>
  )
}

export default SoldNft;


const soldCardData = [
    {
      id: 1,
      userImg: userImg1,
      userName: "STELLA NOVA",
      userEmail: "@Stella Nova",
      nftImg: soldNft1,
      price: "142.02",
    },
    {
      id: 2,
      userImg: userImg1,
      userName: "STELLA NOVA",
      userEmail: "@Stella Nova",
      nftImg: soldNft2,
      price: "142.02",
    },
    {
      id: 3,
      userImg: userImg1,
      userName: "STELLA NOVA",
      userEmail: "@Stella Nova",
      nftImg: soldNft3,
      price: "142.02",
    },
    {
      id: 4,
      userImg:userImg1,
      userName: "STELLA NOVA",
      userEmail: "@Stella Nova",
      nftImg:  soldNft4,
      price: "142.02",
    },
    {
      id: 5,
      userImg: userImg1,
      userName: "STELLA NOVA",
      userEmail: "@Stella Nova",
      nftImg:  soldNft5,
      price: "142.02",
    },
    {
      id: 6,
      userImg:userImg1,
      userName: "STELLA NOVA",
      userEmail: "@Stella Nova",
      nftImg: soldNft6,
      price: "142.02",
    },
    {
      id: 7,
      userImg: userImg1,
      userName: "STELLA NOVA",
      userEmail: "@Stella Nova",
      nftImg:  soldNft7,
      price: "142.02",
    },
    {
      id: 8,
      userImg:userImg1,
      userName: "STELLA NOVA",
      userEmail: "@Stella Nova",
      nftImg: soldNft8,
      price: "142.02",
    },
  ];