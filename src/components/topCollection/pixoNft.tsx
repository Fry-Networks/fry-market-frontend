import { useNavigate } from "react-router-dom";
import userImg1 from "../../assets/home/images/card-userImg.png";
import search from "../../assets/icons/search.svg";
import trendNft1 from "../../assets/topCollection/nftImg1.png";
import trendNft10 from "../../assets/topCollection/nftImg10.png";
import trendNft11 from "../../assets/topCollection/nftImg11.png";
import trendNft12 from "../../assets/topCollection/nftImg12.png";
import trendNft13 from "../../assets/topCollection/nftImg13.png";
import trendNft14 from "../../assets/topCollection/nftImg14.png";
import trendNft2 from "../../assets/topCollection/nftImg2.png";
import trendNft3 from "../../assets/topCollection/nftImg3.png";
import trendNft4 from "../../assets/topCollection/nftImg4.png";
import trendNft5 from "../../assets/topCollection/nftImg5.png";
import trendNft6 from "../../assets/topCollection/nftImg6.png";
import trendNft7 from "../../assets/topCollection/nftImg7.png";
import trendNft8 from "../../assets/topCollection/nftImg8.png";
import trendNft9 from "../../assets/topCollection/nftImg9.png";
import CollectionsCard from "../cards/collectionsCard";
import Input from "../shared/input";





const PixoNft = () => {

  const navigate = useNavigate(); // Initialize useNavigate

  const handleCardClick = () => {
    navigate("/nft-detail"); // Redirect to nft-detail page
  };
  return (
    <>
      <div className="pixoNftContainer mb-52">
        <div className="container">
          <div className="inner">
            <div className="searchDiv w-auto flex justify-end items-center mb-7">
              <Input
                wrapperClass="flex items-center justify-center border-2 border[#243c5a] "
                icon={search}
                placeholder="Search by name"
                inputClass="medium font-normal font-Roboto flex items-center justify-center lightGray  border-2 border[#243c5a]"
                width={613}
                height={55}
                type="text"
                className="lightGray  border-2 border[#243c5a]"

              />
            </div>

            <div className="cardsWrap grid grid-cols-4 gap-6">
              {trendingCard.map((data) => (
                <div key={data.id} onClick={handleCardClick} className="cursor-pointer">
                  <CollectionsCard data={data} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PixoNft;

const trendingCard = [
  {
    id: 1,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft1,
    price: "142.02",
  },
  {
    id: 2,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft2,
    price: "142.02",
  },
  {
    id: 3,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft3,
    price: "142.02",
  },
  {
    id: 4,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft4,
    price: "142.02",
  },
  {
    id: 5,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft5,
    price: "142.02",
  },
  {
    id: 6,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft6,
    price: "142.02",
  },
  {
    id: 7,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft7,
    price: "142.02",
  },
  {
    id: 8,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft8,
    price: "142.02",
  },
  {
    id: 9,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft9,
    price: "142.02",
  },
  {
    id: 10,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft10,
    price: "142.02",
  },
  {
    id: 11,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft11,
    price: "142.02",
  },
  {
    id: 12,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft12,
    price: "142.02",
  },
  {
    id: 13,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft13,
    price: "142.02",
  },
  {
    id: 14,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft14,
    price: "142.02",
  },

];
