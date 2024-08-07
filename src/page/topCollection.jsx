import React from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import ReadyForNext from "../components/home/readyForNext";
import PixacioBanner from "../components/topCollection/pixacioBanner";
import PixoNft from "../components/topCollection/pixoNft";

const TopCollection = () => {
  return (
    <>
      <Navbar />
      <PixacioBanner/>
      <PixoNft/>
      <ReadyForNext />
      <Footer />
    </>
  );
};

export default TopCollection;
