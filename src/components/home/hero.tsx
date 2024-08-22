import React from 'react';
import hands from "../../assets/home/images/fingers.svg";
import heroCards from "../../assets/home/images/heroCards.png";
import leftHand from "../../assets/home/images/leftHand.png";
import rightHand from "../../assets/home/images/rightHand.png";
import homeCard1 from "../../assets/home/images/homeImages/homeCardImg1.png";
import homeCard2 from "../../assets/home/images/homeImages/homeCardImg2.png";
import homeCard3 from "../../assets/home/images/homeImages/homeCardImg3.png";
import homeCard4 from "../../assets/home/images/homeImages/homeCardImg4.png";
import homeCard5 from "../../assets/home/images/homeImages/homeCardImg5.png";


import glow from "../../assets/home/images/heroGlow.png";
const Hero = () => {
  return (
  <>
  <div className="heroWrapper  my-16 relaytive">
    <img className='leftHand  absolute left-[0px] top-[65%]' src={leftHand} alt="" />
    <img className='rightHand absolute right-[0px] top-[65%]' src={rightHand} alt="" />

    {/* <img className='absolute bottom-[-290px]' src={hands} alt="" /> */}
    <div className="container">
    <div className="inner flex-col flex justify-center items-center gap-y-5">
    <h1 className='font-normal darkBlack text-center uppercase font-Apex'>discover, create & sell artworks.</h1>
    <p className='lightGray font-light medium text-center font-Roboto'>Discover and trade unique digital art pieces on our NFT website, where creativity meets blockchain technology.</p>
    <div className='heroCards relative' >
      <img className='absolute bottom-[-230px] -z-10' src={glow} alt="" />
    <img className='mt-16 heroCardsw' src={heroCards} alt="" />
      <div className='nft-singleItem hidden'>
<img src={homeCard1} alt="" />
<img src={homeCard2} alt="" />
<img src={homeCard3} alt="" />
<img src={homeCard4} alt="" />
<img src={homeCard5} alt="" />

        
      </div>
    </div>
    </div>
 

    </div>
  </div>
  </>
  )
}

export default Hero