import { useWallet } from "@txnlab/use-wallet";
import axios from "axios";
import { useEffect, useState } from "react";
import leftGlow from "../../assets/auction/leftGlow.webp";
import featureTopGrid from "../../assets/auction/listGrid.webp";
import trendingNft1 from "../../assets/home/images/auction/auctionImg1.png";
import trendingNft2 from "../../assets/home/images/auction/auctionImg2.png";
import trendingNft3 from "../../assets/home/images/auction/auctionImg3.png";
import trendingNft4 from "../../assets/home/images/auction/auctionImg4.png";
import trendingNft5 from "../../assets/home/images/auction/auctionImg5.png";
import trendingNft6 from "../../assets/home/images/auction/auctionImg6.png";
import trendingNft7 from "../../assets/home/images/auction/auctionImg7.png";
import trendingNft8 from "../../assets/home/images/auction/auctionImg8.png";
import userImg1 from "../../assets/home/images/card-userImg.png";
import AuctionCard from '../cards/auctionCard';
const baseUrl = import.meta.env.VITE_API_BASE_URL;


const LiveAuction = ({ auctionedNfts, getAuctionedNft }: any) => {

  const [collectionData, setCollectionData] = useState<any>({})
  const { activeAccount } = useWallet();

  const getCollectionData = async () => {

    try {

      // const config = {
      //   headers: { Authorization: `Bearer ${token}` }
      // };

      const response = await axios.get(`${baseUrl}/get-all-collections`);
      console.log("Collection Data", response.data);
      if (response?.data?.length > 0) {
        let obj = {};
        response?.data?.map((collectionData: any) => {
          if (typeof (collectionData.collection_address) == "string") {
            obj = { ...obj, [collectionData.collection_address]: { collection_name: collectionData.collection_name, image_url: collectionData.image_url, ...collectionData } }
          }
        }
        )
        setCollectionData(obj)
        console.log("well", obj);

      }


    }
    catch (e) {
      console.log("Error Getting Collection", e);
      // toast.error("Error Creating Collection");
      setCollectionData("")

    }

  }

  useEffect(() => {
    getCollectionData();
  }, [])

  return (
    <>
      <div className="liveAuctionWrapper mb-52 relative">
        <img className='absolute left-0 top-28' src={leftGlow} alt="" />
        <img className="absolute top-[-260px] left-0 -z-50" src={featureTopGrid} alt="" />

        <div className="container">
          <div className="innerLiveAuction">
            <h2 className="font-normal font-Apex uppercase mb-10">
              LIVE AUCTION
            </h2>

            <div className="auctionCarContainer  mt-10 grid grid-cols-4 gap-x-10 gap-y-7 relative z-20">
              {/* {auctionCard.map((data, index) => (
                <AuctionCard key={data.id} data={data} showHiddenDiv={true} isAuctionPage={true} />

              ))} */}

              {auctionedNfts.map((data: any, index: any) => (
                data.biddingStartTime / 1000 < Date.now() &&
                <AuctionCard key={index} data={data} showHiddenDiv={true} isAuctionPage={true} getAuctionedNft={getAuctionedNft} collectionData={collectionData ? collectionData[data.sellerId] : {}} fromLive={true} />
              ))}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LiveAuction;


const auctionCard = [
  {
    id: 1,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft6,
    price: "142.02",
  },
  {
    id: 2,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft4,
    price: "142.02",
  },
  {
    id: 3,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft1,
    price: "142.02",
  },
  {
    id: 4,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft7,
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
    nftImg: trendingNft2,
    price: "142.02",
  },
  {
    id: 7,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft8,
    price: "142.02",
  },
  {
    id: 8,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft3,
    price: "142.02",
  },
  {
    id: 9,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft4,
    price: "142.02",
  },

  {
    id: 10,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft3,
    price: "142.02",
  },

  {
    id: 11,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft7,
    price: "142.02",
  },


  {
    id: 12,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft5,
    price: "142.02",
  },

];
