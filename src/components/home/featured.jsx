import React from "react";
import CollectionsCard from "../cards/collectionsCard";
import userImg1 from "../../assets/home/images/card-userImg.png";
import nftImg1 from "../../assets/home/images/cardImg1.png";
import nftImg2 from "../../assets/home/images/cardImg2.png";
import nftImg3 from "../../assets/home/images/cardImg3.png";
import nftImg4 from "../../assets/home/images/cardImg4.png";

const Featured = () => {
  return (
    <>
      <div className="featureWrapper mb-40 mt-72 pt-10">
        <div className="container">
          <h2 className="font-normal font-Apex uppercase lg:text-center">
            Featured Collection
          </h2>
          <p className="lightGray medium font-light font-Roboto text-left w-[750px] ">
            Explore our exclusive featured collection, showcasing innovative
            campaigns and creative storytelling from top brands around the
            world.
          </p>

          <div className="featureCardContainer mt-10 flex justify-center gap-4 ">
            {featureCard.map((data, index) => (
              <CollectionsCard data={data} />
            ))}
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
];
