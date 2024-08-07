import React from 'react';
import Navbar from "../components/layout/navbar";
import NftCollectBanner from '../components/nftCollection/nftCollectBanner';
import Explore from '../components/nftCollection/explore';
import Footer from "../components/layout/footer";
import ReadyForNext from "../components/home/readyForNext";

const NftCollection = () => {
  return (
    <div>
         <Navbar />
         <NftCollectBanner/>
         <Explore/>
         <ReadyForNext />
         <Footer />
    </div>
  )
}

export default NftCollection;