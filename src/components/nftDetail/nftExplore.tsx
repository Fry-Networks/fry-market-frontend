import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import bannerGrid from "../../assets/auction/auctionGrid.png";
import auctionTopGrid from "../../assets/auction/auctionTopGrid.webp";
import bannerImg1 from "../../assets/auction/bannerImg1.webp";
import bannerImg2 from "../../assets/auction/bannerImg2.png";
import bannerImg3 from "../../assets/auction/bannerImg3.png";
import bannerImg4 from "../../assets/auction/bannerImg4.png";
import CollectionsCard from '../cards/collectionsCard';
const ExploreListedNfts = () => {
  const location = useLocation();
  const { listedNfts } = location.state || {}; // Get the listed NFTs passed via state
  useEffect(() => {
    // Scroll to the top when this component is mounted
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="exploreWrapper ">
      <div className="container">
        <div className="auctionBannerWrapper my-40 relative pb-7">
          <img className='bannergrid absolute right-[0px] bottom-[-300px] -z-10' src={bannerGrid} alt="" />
          <img className='bannergrid absolute left-[0px] top-[-100px] -z-10' src={auctionTopGrid} alt="" />

          <div className="container">
            <div className="bannerInner flex flex-col items-center justify-start gap-6">
              <h1 className='text-[150px] primary font-bold font-Apex text-center tracking-[6px]'>LISTING</h1>
              <div className="nftDiv flex items-end gap-4">
                <img className='max-w-[273px] max-h-[273px] w-full h-full object-cover rounded-3xl border-solid border-[10px] border-[#fff]  shadow-[4px_4px_15px_0px_rgba(0,0,0,0.20)]' src={bannerImg1} alt="" />
                <img className='max-w-[273px] max-h-[162px] w-full h-full object-cover rounded-3xl border-solid border-[10px] border-[#fff]  shadow-[4px_4px_15px_0px_rgba(0,0,0,0.20)]' src={bannerImg2} alt="" />

                <img className='max-w-[273px] max-h-[162px] w-full h-full object-cover rounded-3xl border-solid border-[10px] border-[#fff]  shadow-[4px_4px_15px_0px_rgba(0,0,0,0.20)]' src={bannerImg3} alt="" />


                <img className='max-w-[273px] max-h-[273px] w-full h-full object-cover rounded-3xl border-solid border-[10px] border-[#fff]  shadow-[4px_4px_15px_0px_rgba(0,0,0,0.20)]' src={bannerImg4} alt="" />


              </div>
            </div>
          </div>
        </div>
        <div className="nftWrapper mt-10 grid grid-cols-4 gap-x-10 gap-y-9">
          {Array.isArray(listedNfts) && listedNfts.length > 0 ? (
            listedNfts.map((data: any, index: any) =>
              data.isListed ? (
                <CollectionsCard
                  key={data.assetId}
                  data={data}
                  label={"Buy"}
                  collectionData={data.seller} // You may want to adjust this for the collection data
                />
              ) : (
                "Loading"
              )
            )
          ) : (
            <p>No NFTs Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreListedNfts;
