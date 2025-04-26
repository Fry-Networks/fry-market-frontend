import { useWallet } from "@txnlab/use-wallet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllListed, getAllListedByUser } from "../../fryMarketMethods";
import CollectionsCard from "../cards/collectionsCard";
import Loader from "../Loader";
import Button from "../shared/button";

const ListedNft = ({ collectionData, listedText, moreByUser }: any) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listedNfts, setListedNfts] = useState<any>([]);
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet();

  const getListedNft = async () => {
    try {
      setLoading(true);
      const response = await getAllListed();
      setListedNfts(response ? response.filter((item) => item.isListed) : []);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const getListedNftByUser = async () => {
    try {
      setLoading(true);
      const response = await getAllListedByUser(collectionData[Object.keys(collectionData)[0]].collection_address);
      setListedNfts(response);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (moreByUser) {
      getListedNftByUser();
    } else {
      getListedNft();
    }
  }, [activeAccount]);

  const goToExplorePage = () => {
    navigate("/explore-listed-nfts", { state: { listedNfts: listedNfts } });
  };

  return (
    <div className="trendingNftWrapper my-52 md:my-20">
      <div className="container">
        <div className="flex inner items-center justify-between">
          <h2 className="font-normal font-Apex uppercase">
            {listedText ? listedText : "Listed NFT'S"}
          </h2>
        </div>

        <div className="nftWrapper mt-10 grid grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 xxl:grid-cols-4 gap-x-5 xxl:gap-x-10 gap-y-7 place-items-center">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center col-span-4">
              <Loader />
            </div>
          ) : (
            Array.isArray(listedNfts) &&
              listedNfts.length > 0 ? (
              // Only show first 15 NFTs
              listedNfts.slice(0, 15).map((data: any, index: any) =>
                data.isListed ? (
                  <CollectionsCard
                    key={data.assetId}
                    data={data}
                    label={"Buy"}
                    collectionData={collectionData[data.seller]}
                  />
                ) : (
                  "Loading"
                )
              )
            ) : (
              <p>No NFTs Listed</p>
            )
          )}
        </div>

        <Button
          className="button btn-primary large font-medium flex items-center justify-center gap-2 m-auto mt-16"
          minWidth={228}
          minHeight={58}
          text="Explore More"
          onClick={goToExplorePage}
        />
      </div>
    </div>
  );
};

export default ListedNft;
