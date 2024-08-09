import React from "react";
import Navbar from "../components/layout/navbar";
import ReadyForNext from "../components/home/readyForNext";
import Footer from "../components/layout/footer";
import CollectionBanner from "../components/sellerCollection/collectionBanner";
import CollectionCard from "../components/sellerCollection/collectionCards";
const SellerCollection = () => {
  return (
    <>
      <Navbar />
      <CollectionBanner />
      <CollectionCard />
      <ReadyForNext />
      <Footer />
    </>
  );
};

export default SellerCollection;
