import React from "react";
import seller from "../../assets/images/sellerCollection/sellerHeader.png";
import banerGlow from "../../assets/images/topSellers/bannerGlow.png";

const CollectionBanner = () => {
  return (
    <>
    {/* <div className=" relative colectionBanner mb-36">
    <img className="absolute top-[-190px] left-0" src={banerGlow} alt="" />
    <div className="container">
 
        <div className="sellerHeader mt-[50px] h-[85vh]">
          <div className="relative">
            <div className="absolute top-32">
              <img src={seller} alt="" />
            </div>
            <div className="flex flex-col items-center ">
              <h1 className="font-bold font-Apex primary">JACOB JONES</h1>
              <h2 className="font-bold font-Apex darkBlack">COLLECTIONS</h2>
            </div>
          </div>
        </div>
      </div>
    </div> */}
  <div className="collectionBanner relative mb-12">
  <img className="absolute top-[-190px] left-0" src={banerGlow} alt="" />
  <div className="container">
<div className="inner flex flex-col mt-14">
  <div className="topArea flex flex-col items-center -mb-20">
  <h1 className="font-bold font-Apex primary">JACOB JONES</h1>
  <h2 className="font-bold font-Apex darkBlack">COLLECTIONS</h2>
  </div>

  <div className="bottomArea">
  <img className="max-w-[1320px]  w-full h-full object-cover" src={seller} alt="" />
  </div>
</div>
  </div>
  </div>
    </>
  );
};

export default CollectionBanner;
