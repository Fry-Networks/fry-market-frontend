import glow from "../../assets/home/images/heroGlow.webp";
import heroleftGrid from "../../assets/home/images/homeImages/heroLeftGrid.webp";
import homeCard1 from "../../assets/home/images/homeImages/homeCardImg1.png";
import homeCard2 from "../../assets/home/images/homeImages/homeCardImg2.png";
import homeCard3 from "../../assets/home/images/homeImages/homeCardImg3.png";
import homeCard4 from "../../assets/home/images/homeImages/homeCardImg4.png";
import homeCard5 from "../../assets/home/images/homeImages/homeCardImg5.png";
import leftImg1 from "../../assets/home/images/homeImages/leftImg1.webp";
import leftImg2 from "../../assets/home/images/homeImages/leftImg2.webp";
import rightImg1 from "../../assets/home/images/homeImages/rightImg1.webp";
import rightImg2 from "../../assets/home/images/homeImages/rightImg2.webp";
import leftHand from "../../assets/home/images/leftHand.png";
import rightHand from "../../assets/home/images/rightHand.png";
const Hero = () => {
  return (
    <>
      <div className="heroWrapper  my-16 mb-72 relaytive">
        <img className='leftHand  absolute left-[0px] top-[90%]' src={leftHand} alt="" />
        <img className='rightHand absolute right-[0px] top-[90%]' src={rightHand} alt="" />
        <img className='absolute top-0 left-0 -z-50' src={heroleftGrid} alt="" />

        {/* <img className='absolute bottom-[-290px]' src={hands} alt="" /> */}
        <div className="container">
          <div style={{ overflowY: "hidden" }} className="inner pb-28 h-full flex-col flex justify-center items-center gap-y-5">
            <h1 className='font-normal darkBlack text-center uppercase font-Apex'>discover, create & sell artworks.</h1>
            <p className='lightGray font-light medium text-center font-Roboto'>Discover and trade unique digital art pieces on our NFT website, where creativity meets blockchain technology.</p>
            <div className='heroCards relative' >
              <img className='absolute bottom-[-230px] -z-10' src={glow} alt="" />
              <div className="heroCardContainer flex mt-[50px]">
                <img className='mr-[-115px] mb-6 heroImg1' src={leftImg2} alt="" />
                <img className='mr-[-125px] heroImg2' src={leftImg1} alt="" />
                <img className='heroImg3' src={homeCard1} alt="" />
                <img className='ml-[-125px] -z-10 heroImg4' src={rightImg1} alt="" />
                <img className='ml-[-115px] -z-20 mb-5 heroImg5' src={rightImg2} alt="" />
              </div>


              {/* <img className='mt-16 heroCardsw' src={heroCards} alt="" /> */}
              {/* <div className='videoContainer'>
<video loop autoPlay playsInline muted className=''>
              <source src={nftVideo} type="video/mp4" />
            </video>
</div> */}

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