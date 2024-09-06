import arrowDown from "../../assets/icons/arrow-down.svg";
import CollectionsCard from '../cards/collectionsCard';
import Button from "../shared/button";

import userImg1 from "../../assets/home/images/card-userImg.png";
import trendingNft1 from "../../assets/home/images/trendingNft1.png";
import trendingNft2 from "../../assets/home/images/trendingNft2.png";
import trendingNft3 from "../../assets/home/images/trendingNft3.png";
import trendingNft4 from "../../assets/home/images/trendingNft4.png";
import trendingNft5 from "../../assets/home/images/trendingNft5.png";
import trendingNft6 from "../../assets/home/images/trendingNft6.png";
import trendingNft7 from "../../assets/home/images/trendingNft7.png";
import trendingNft8 from "../../assets/home/images/trendingNft8.png";
import colectionBack from "../../assets/home/images/topCollections/topCollectionBack.png";
import { Select } from 'antd';


const TrendingNft = () => {
  const { Option } = Select;
  return (
    <div className="trendingNftWrapper my-52 md:my-24 relative">
      <img className="absolute top-[-400px] -z-50" src={colectionBack} alt="" />
      <div className="container">
        <div className='flex inner items-center justify-between'>
          <h2 className="font-normal font-Apex uppercase">
            Trending NFT'S
          </h2>
          {/* <Button
            className="button border-2 border-solid border-[red] primary font-normal medium uppercase relative flex items-center justify-center gap-1 bg-[transparent]"
            minWidth={220}
            height={52}
            text="Last 30 minutes"
            img={arrowDown}
            imgClass="order-1"

          /> */}

<Select
    defaultValue="Last 30 minutes"
    className="border-2 border-solid rounded-lg text-rose-600 border-[red] primary relative flex items-center justify-center gap-1 bg-[transparent]"
    style={{ minWidth: 220, height: 52, fontSize:"18px", color:"red" }}
    suffixIcon={<img src={arrowDown} alt="dropdown icon" className="order-1" />} // Custom dropdown icon
  >
    <Option value="Last 30 minutes">Last 30 minutes</Option>
    <Option value="Last 1 hour">Last 1 hour</Option>
    <Option value="Last 24 hours">Last 24 hours</Option>
  </Select>
        </div>

        <div className="nftWrapper mt-10 grid grid-cols-4   gap-x-5 xxl:gap-x-10 gap-y-7 place-items-center">
          {trendingCard.map((data, index) => (
            <CollectionsCard key={data.id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingNft;

const trendingCard = [
  {
    id: 1,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft1,
    price: "142.02",
  },
  {
    id: 2,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft2,
    price: "142.02",
  },
  {
    id: 3,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft3,
    price: "142.02",
  },
  {
    id: 4,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft4,
    price: "142.02",
  },
  {
    id: 5,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft5,
    price: "142.02",
  },
  {
    id: 6,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft6,
    price: "142.02",
  },
  {
    id: 7,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft7,
    price: "142.02",
  },
  {
    id: 8,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft8,
    price: "142.02",
  },
];
