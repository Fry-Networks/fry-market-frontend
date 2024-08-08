import React from 'react';
import hands from "../../assets/home/images/fingers.svg";
import heroCards from "../../assets/home/images/heroCards.png";
import leftHand from "../../assets/home/images/leftHand.png";
import rightHand from "../../assets/home/images/rightHand.png";

import glow from "../../assets/home/images/heroGlow.png";
const Hero = () => {
  return (
  <>
  <div className="heroWrapper  my-16 relaytive">
    <img className='leftHand  absolute left-[-350px] top-[600px]' src={leftHand} alt="" />
    <img className='rightHand absolute right-[-350px] top-[600px]' src={rightHand} alt="" />

    {/* <img className='absolute bottom-[-290px]' src={hands} alt="" /> */}
    <div className="container">
    <div className="inner flex-col flex justify-center items-center gap-y-5">
    <h1 className='font-normal darkBlack text-center uppercase font-Apex'>discover, create & sell artworks.</h1>
    <p className='lightGray font-light medium text-center font-Roboto'>Discover and trade unique digital art pieces on our NFT website, where creativity meets blockchain technology.</p>
    <div className='heroCards relative' >
      <img className='absolute bottom-[-230px] -z-10' src={glow} alt="" />
    <img className='mt-16' src={heroCards} alt="" />
      
    </div>
    </div>
 

    </div>
  </div>
  </>
  )
}

export default Hero