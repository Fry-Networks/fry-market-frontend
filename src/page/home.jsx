import React from "react";
import Hero from "../components/home/hero";
import Components from "../components/components";
import Navbar from "../components/layout/navbar";
import Featured from "../components/home/featured";
import TrendingNft from "../components/home/trendingNft";
import TopSeller from "../components/home/topSeller";
import Auction from "../components/home/auction";
import TopCollections from "../components/home/topCollections";
import SoldNft from "../components/home/soldNft";
import DigitalAssets from "../components/home/digitalAssets";
import BoostNft from "../components/home/boostNft";
import Faq from "../components/home/faq";
import Footer from "../components/layout/footer";
import ReadyForNext from "../components/home/readyForNext";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Featured />
      <TrendingNft />
      <TopSeller />
      <Auction />
      <TopCollections />
      <SoldNft />
      <DigitalAssets />
      <BoostNft />
      <Faq />
      <ReadyForNext />
      <Footer />
      {/* <Components /> */}
    </div>
  );
};

export default Home;
