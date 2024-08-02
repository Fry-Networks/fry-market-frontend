import React from "react";
import Hero from "../components/home/hero";
import Components from "../components/components";
import Navbar from "../components/layout/navbar";
import Featured from "../components/home/featured";
import TrendingNft from "../components/home/trendingNft";
 

const Home = () => {
  return (
    <div>
    <Navbar/>
      <Hero />
      <Featured/>
      <TrendingNft/>
      {/* <Components /> */}
    </div>
  );
};

export default Home;
