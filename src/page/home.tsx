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

const Home = () => {
  return (
    <div>

      <Hero />
      {/* <Featured /> */}
      <ListedNft />
      <TrendingNft />
      <TopSeller />
      <Auction />
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
