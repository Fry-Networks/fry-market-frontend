import { useWallet } from "@txnlab/use-wallet";
import axios from "axios";
import { useEffect, useState } from "react";
import Auction from "../components/home/auction";
import BoostNft from "../components/home/boostNft";
import DigitalAssets from "../components/home/digitalAssets";
import Faq from "../components/home/faq";
import Hero from "../components/home/hero";
import ListedNft from "../components/home/listedNft";
import ReadyForNext from "../components/home/readyForNext";
import SoldNft from "../components/home/soldNft";
import TopCollections from "../components/home/topCollections";
import TopSeller from "../components/home/topSeller";
import TrendingNft from "../components/home/trendingNft";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Home = () => {

  const [collectionData, setCollectionData] = useState<any>("")
  const { activeAccount } = useWallet();

  const getCollectionData = async () => {
    if (activeAccount?.address) {
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
              obj = { ...obj, [collectionData.collection_address]: { collection_name: collectionData.collection_name, image_url: collectionData.image_url } }
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
  }

  useEffect(() => {
    getCollectionData();
  }, [activeAccount])

  return (
    <div>

      <Hero />
      {/* <Featured /> */}
      <ListedNft collectionData={collectionData} />
      <TrendingNft collectionData={collectionData} />
      <TopSeller />
      <Auction collectionData={collectionData} />
      <TopCollections />
      <SoldNft />
      <DigitalAssets />
      <BoostNft />
      <Faq />
      <ReadyForNext />

      {/* <Components /> */}
    </div>
  );
};

export default Home;
