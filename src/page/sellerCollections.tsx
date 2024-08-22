import { useEffect } from "react";
import ReadyForNext from "../components/home/readyForNext";
import CollectionBanner from "../components/sellerCollection/collectionBanner";
import CollectionCard from "../components/sellerCollection/collectionCards";
const SellerCollection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>

      <CollectionBanner />
      <CollectionCard />
      <ReadyForNext />

    </>
  );
};

export default SellerCollection;
