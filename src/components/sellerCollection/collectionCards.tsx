import { Link } from "react-router-dom";
import arrowDown from "../../assets/icons/redDownArw.svg";
import card1 from "../../assets/images/sellerCollection/nft1.png";
import card2 from "../../assets/images/sellerCollection/nft2.png";
import card3 from "../../assets/images/sellerCollection/nft3.png";
import card4 from "../../assets/artistsProfile/artistPic4.png";
import card5 from "../../assets/artistsProfile/artistPic5.png";
import card6 from "../../assets/artistsProfile/artistPic6.png";
import card7 from "../../assets/artistsProfile/artistPic7.png";
import card8 from "../../assets/artistsProfile/artistPic8.png";
import Button from "../shared/button";
import sellerCollectGlow  from '../../assets/images/topSellers/collectionGlow.png';
import bannerGlow from "../../assets/artistsProfile/settingBanerGlow.png";

const CollectionCard = ({ isArtistProfile }: any) => {
  const cards = [
    {
      id: 1,
      title: "WONDERFUL ARTWORK",
      items: "Items",
      value: "1.5k",
      img: card1,
    },
    {
      id: 2,
      title: "WONDERFUL ARTWORK",
      items: "Items",
      value: "1.5k",
      img: card2,
    },
    {
      id: 3,
      title: "WONDERFUL ARTWORK",
      items: "Items",
      value: "1.5k",
      img: card3,
    },
    {
      id: 4,
      title: "WONDERFUL ARTWORK",
      items: "Items",
      value: "1.5k",
      img: card4,
    },
    {
      id: 5,
      title: "WONDERFUL ARTWORK",
      items: "Items",
      value: "1.5k",
      img: card5,
    },
    {
      id: 6,
      title: "WONDERFUL ARTWORK",
      items: "Items",
      value: "1.5k",
      img: card6,
    },
    {
      id: 7,
      title: "WONDERFUL ARTWORK",
      items: "Items",
      value: "1.5k",
      img: card7,
    },
    {
      id: 8,
      title: "WONDERFUL ARTWORK",
      items: "Items",
      value: "1.5k",
      img: card8,
    },
    
  ];

  return (
    <>
    <div className="relative sellerColectCard mt-24">
      <img src={bannerGlow} className="absolute right-0 top-[-50px] -z-50" alt="" />
      {/* <img className="absolute top-[-50px] -z-50" src={sellerCollectGlow} alt="" /> */}
    <div className="container">
        <div className="condition">
          {isArtistProfile ? (
            <div className=" colectbtns mt-12 my-6 w-full flex justify-between  ">
              <Button
                className="button btn-secondary medium font-normal font-Roboto"
                minWidth={140}
                minHeight={50}
                text="Collections"
             
              />
              <Button
                className="button btn-secondary medium font-normal font-Roboto relative flex items-center justify-center gap-1"
                minWidth={140}
                minHeight={50}
                text="Newest"
                img={arrowDown}
                imgClass="order-1"
              />
            </div>
          ) : (
            <h2 className="font-bold font-Apex darkBlack mb-6">COLLECTIONS</h2>
          )}
        </div>
        <div className="grid grid-cols-3 gap-9 mb-[200px] cardContainer">
          {cards.map((card) => (
            <Link to="/top-collection" key={card.id}>
              <div className="max-w-[417px] max-h-[285px] w-full h-full card flex flex-col items-start gap-1">
                <p className="font-Roboto font-bold darkBlack">{card.title}</p>
                <p className="small font-Roboto grayOpacity font-normal">
                  {card.items}
                  <span className="ml-2 darkBlack font-bold">{card.value}</span>
                </p>
                <img src={card.img} alt={card.title} className="mt-3 w-full max-w-[387px] max-h-[191px] h-full " />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
   
    </>
  );
};

export default CollectionCard;
