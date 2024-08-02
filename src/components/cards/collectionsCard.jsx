import React from "react";
import userImg from "../../assets/home/images/card-userImg.png";
import cardFeatImg1 from "../../assets/home/images/cardImg1.png";
import cardFearImg2 from "../../assets/home/images/cardImg2.png";
import cardFearImg3 from "../../assets/home/images/cardImg2.png";
import cardFearImg4 from "../../assets/home/images/cardImg2.png";

import Button from "../../components/shared/button";
import timeIcon from "../../assets/icons/timeIcon.svg";

const CollectionsCard = ({data}) => {
  return (
    <>
      <div className="collectionCardd flex flex-col gap-2">
        <div className="topArea flex justify-start gap-2">
          <div className="t-left-part w-1/5">
            <img src={data.userImg} alt="" />
          </div>
          <div className="t-right-part w-4/5">
            <p className="medium font-Apex font-light darkBlack ">
            {data.userName}
            </p>
            <p className="ex-small font-light font-Roboto lightGray opacity-80">
             {data.userEmail}
            </p>
          </div>
        </div>
        <div className="BottomArea relative">
          <div className="absolute p-3 bottom-0 flex justify-between items-center w-full">
            <Button
              className="button btn-primary large font-medium ex-small"
              minWidth={56}
              minHeight={36}
              text="Buy"
            ></Button>
            <button className="p-3 bg-white flex gap-2 items-center">
              <span className="ex-small darkBlack fw-medium">Price:</span>
              <div className="flex gap-1">
                {" "}
                <img src={timeIcon} alt="" />
                <span className=" ex-small lightGray font-medium">{data.price}</span>
              </div>
            </button>
          </div>
          <img src={data.nftImg} alt="" />
        </div>
      </div>
    </>
  );
};

export default CollectionsCard;
