import React from "react";
import seller from "../../assets/images/sellerCollection/sellerHeader.png";

const CollectionBanner = () => {
  return (
    <>
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
    </>
  );
};

export default CollectionBanner;
