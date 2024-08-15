import React, { useEffect } from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import ReadyForNext from "../components/home/readyForNext";
import PixacioBanner from "../components/topCollection/pixacioBanner";
import PixoNft from "../components/topCollection/pixoNft";
import artistImage from "../../src/assets/topCollection/bannerLeftImg.png"

const TopCollection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
   
    
      <PixacioBanner name="Pixico" image={artistImage} />
      <PixoNft/>
      <ReadyForNext />
 
    </>
  );
};

export default TopCollection;
