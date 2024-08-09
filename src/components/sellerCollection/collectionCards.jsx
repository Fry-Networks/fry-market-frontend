import React from "react";
import card1 from "../../assets/images/sellerCollection/nft1.png";
import card2 from "../../assets/images/sellerCollection/nft2.png";
import card3 from "../../assets/images/sellerCollection/nft3.png";
import { Link } from "react-router-dom";

const CollectionCard = () => {
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
      img: card1,
    },
    {
      id: 5,
      title: "WONDERFUL ARTWORK",
      items: "Items",
      value: "1.5k",
      img: card2,
    },
    {
      id: 6,
      title: "WONDERFUL ARTWORK",
      items: "Items",
      value: "1.5k",
      img: card3,
    },
    {
      id: 7,
      title: "WONDERFUL ARTWORK",
      items: "Items",
      value: "1.5k",
      img: card1,
    },
    {
      id: 8,
      title: "WONDERFUL ARTWORK",
      items: "Items",
      value: "1.5k",
      img: card2,
    },
    {
      id: 9,
      title: "WONDERFUL ARTWORK",
      items: "Items",
      value: "1.5k",
      img: card3,
    },
    {
      id: 10,
      title: "WONDERFUL ARTWORK",
      items: "Items",
      value: "1.5k",
      img: card1,
    },
  ];

  return (
    <>
      <div className="container">
        <div>
          <h2 className="font-bold font-Apex darkBlack mb-6">COLLECTIONS</h2>
        </div>
        <div className="grid grid-cols-3 gap-9 mb-[200px]">
          {cards.map((card) => (
            <Link to="/top-collection">
                <div key={card.id} className="card flex flex-col items-start gap-1" >
                  <p className="font-Roboto font-bold darkBlack ">{card.title}</p>
                  <p className="small font-Roboto grayOpacity font-normal">
                    {card.items}
                    <span className="ml-2 darkBlack font-bold">{card.value}</span>
                  </p>
                  <img src={card.img} alt={card.title} className="mt-3" />
                </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CollectionCard;
