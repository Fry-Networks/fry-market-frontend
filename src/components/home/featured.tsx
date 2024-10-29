import userImg1 from "../../assets/home/images/card-userImg.png";
import nftImg1 from "../../assets/home/images/cardImg1.png";
import nftImg2 from "../../assets/home/images/cardImg2.png";
import nftImg3 from "../../assets/home/images/cardImg3.png";
import nftImg4 from "../../assets/home/images/cardImg4.png";
import featureleftIcon from "../../assets/home/images/homeImages/featureLeftArrow.svg";
import featureRighttIcon from "../../assets/home/images/homeImages/featureRightArrow.svg";
import featureTopGrid from "../../assets/home/images/homeImages/featureTopGrid.png";
import CollectionsCard from "../cards/collectionsCard";

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Featured = () => {
  return (
    <>
      <div className="featureWrapper mb-40 lg:mt-72 pt-10 relative">
        <img className="absolute top-[200px] right-0 -z-50" src={featureTopGrid} alt="" />
        <div className="container">
          <div className=" top flex justify-between">
            <div className="topLeft flex flex-col">
              <h2 className="font-normal font-Apex uppercase text-center xl:text-left ">
                Featured Collection
              </h2>
              <p className="lightGray medium font-light font-Roboto text-center xl:text-left   w-full xl:w-[750px] ">
                Explore our exclusive featured collection, showcasing innovative
                campaigns and creative storytelling from top brands around the
                world.
              </p>
            </div>
            <div className="topRight flex gap-x-2 relative z-10">
              <img
                className="cursor-pointer swiper-button-prev-custom w-[60px]"
                src={featureleftIcon}
                alt="Previous"
                onClick={() => console.log('Previous button clicked')}
              />
              <img
                className="cursor-pointer swiper-button-next-custom w-[60px]"
                src={featureRighttIcon}
                alt="Next"
              />
            </div>
          </div>

          <div className="mt-10 featureSwiper">
          <Swiper
    modules={[Navigation]}
    spaceBetween={0}
    slidesPerView={1}
    navigation={{
      nextEl: '.swiper-button-next-custom',
      prevEl: '.swiper-button-prev-custom',
    }}
    breakpoints={{
      // 200: {
      //   slidesPerView: 1,
      // },
      850: {
        slidesPerView: 1,
        centeredSlides: true, // Ensure the card is centered for 850px or below
      },
 
      900: {
        slidesPerView: 2,
      },
      1030: {
        slidesPerView: 3,
      },
      1320: {
        slidesPerView: 4,
      },
      2000: {
        slidesPerView: 4,
      },
    }}
  >
    {featureCard.map((data, index) => (
      <SwiperSlide key={index} className="mt-4 swipperSlide ps-2">
        <CollectionsCard data={data} />
      </SwiperSlide>
    ))}
  </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;

const featureCard = [
  {
    id: 1,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: nftImg1,
    price: "142.02",
  },
  {
    id: 2,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: nftImg2,
    price: "142.02",
  },
  {
    id: 3,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: nftImg3,
    price: "142.02",
  },

  {
    id: 4,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: nftImg4,
    price: "142.02",
  },
  {
    id: 5,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: nftImg2,
    price: "142.02",
  },
  {
    id: 6,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: nftImg3,
    price: "142.02",
  },

  {
    id: 7,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: nftImg4,
    price: "142.02",
  },
];
