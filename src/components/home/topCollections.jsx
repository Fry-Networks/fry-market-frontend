import React from "react";
import TopCollectionCard from "../cards/topCollectionCard";
import React from "react";
import TopCollectionCard from "../cards/topCollectionCard";
import card1BodyImg1 from "../../assets/home/images/topCollections/cardBodyImg1.png";
import card1BodyImg2 from "../../assets/home/images/topCollections/cardBodyImg2.png";
import card1BodyImg3 from "../../assets/home/images/topCollections/cardBodyImg3.png";
import card1BodyImg4 from "../../assets/home/images/topCollections/cardBodyImg4.png";
import card1BodyImg5 from "../../assets/home/images/topCollections/cardBodyImg5.png";
import card1BodyImg6 from "../../assets/home/images/topCollections/cardBodyImg6.png";
import card1BtmImg from "../../assets/home/images/topCollections/cardBtmImg1.png";
import card2BodyImg1 from "../../assets/home/images/topCollections/card2BodyImg1.png";
import card2BodyImg2 from "../../assets/home/images/topCollections/card2BodyImg2.png";
import card2BodyImg3 from "../../assets/home/images/topCollections/card2BodyImg3.png";
import card2BodyImg4 from "../../assets/home/images/topCollections/card2BodyImg4.png";
import card2BodyImg5 from "../../assets/home/images/topCollections/card2BodyImg5.png";
import card2BodyImg6 from "../../assets/home/images/topCollections/card2BodyImg6.png";
import card2BtmImg from "../../assets/home/images/topCollections/card2BtmImg.png";
import card3BodyImg1 from "../../assets/home/images/topCollections/card3BodyImg1.png";
import card3BodyImg2 from "../../assets/home/images/topCollections/card3BodyImg2.png";
import card3BodyImg3 from "../../assets/home/images/topCollections/card3BodyImg3.png";
import card3BodyImg4 from "../../assets/home/images/topCollections/card3BodyImg4.png";
import card3BodyImg5 from "../../assets/home/images/topCollections/card3BodyImg5.png";
import card3BodyImg6 from "../../assets/home/images/topCollections/card3BodyImg6.png";
import card3BtmImg from "../../assets/home/images/topCollections/card3BtmImg.png";
import colectionBack from "../../assets/home/images/topCollections/topCollectionBack.png";
import { useNavigate } from "react-router-dom";

const TopCollections = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="topCollectionWrapper mb-52 relative">
        <img
          className="absolute top-[-400px] -z-10"
          src={colectionBack}
          alt=""
        />
        <div className="container">
          <div className="flex justify-between items-center">
            <h2 className="font-normal font-Apex uppercase mb-10">
              Top collections
            </h2>
            <p
              onClick={() => {
                navigate("/nft-collection");
              }}
              className="primary large font-medium font-Roboto cursor-pointer"
            >
              View More Collection
            </p>
          </div>
          <div className="nftCardContainer flex items-center justify-center gap-8 mt-12">
            {topCollectionData.map((data, index) => (
              <TopCollectionCard data={data} key={data.id}   />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopCollections;

const topCollectionData = [
  {
    id: 1,
    cardBodyImg1: card1BodyImg1,
    cardBodyImg2: card1BodyImg2,
    cardBodyImg3: card1BodyImg3,
    cardBodyImg4: card1BodyImg4,
    cardBodyImg5: card1BodyImg5,
    cardBodyImg6: card1BodyImg6,
    cardBtmImg: card1BtmImg,
    art: "Wonderful ARTWORK ",
    artistName: "Jacob Jones",
  },
  {
    id: 2,
    cardBodyImg1: card2BodyImg1,
    cardBodyImg2: card2BodyImg2,
    cardBodyImg3: card2BodyImg3,
    cardBodyImg4: card2BodyImg4,
    cardBodyImg5: card2BodyImg5,
    cardBodyImg6: card2BodyImg6,
    cardBtmImg: card2BtmImg,
    art: "Wonderful ARTWORK ",
    artistName: "Jacob Jones",
  },
  {
    id: 3,
    cardBodyImg1: card3BodyImg1,
    cardBodyImg2: card3BodyImg2,
    cardBodyImg3: card3BodyImg3,
    cardBodyImg4: card3BodyImg4,
    cardBodyImg5: card3BodyImg5,
    cardBodyImg6: card3BodyImg6,
    cardBtmImg: card3BtmImg,
    art: "Wonderful ARTWORK ",
    artistName: "Jacob Jones",
  },
];
