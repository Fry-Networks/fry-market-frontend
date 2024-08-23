import React, { useState } from "react";
import rightGlow from "../../assets/topCollection/rightGlow.webp";
import bannerImg from "../../assets/artistsProfile/bannerImg.png";
const ProfileBanner = () => {
  return (
    <>
      <div className="profileBanner relative">
        <img className="absolute top-[-600px] right-0" src={rightGlow} alt="" />
        <div className="container">
          <div className="inner  ">
            <img
              className="mt-10 w-full"
              src={bannerImg}
              alt=""
            />
            <div className="profileContent flex flex-col gap-5 justify-center items-center">
              <h3 className="darkBlack font-Apex font-normal tracking-[1.6px] ">
                WILLIAM AKARANA
              </h3>
              <div className="followerDiv flex gap-4">
                <div className="part1 flex items-center gap-1">
                  <p className="darkBlack font-Roboto font-bold text-[20px]">
                    99
                  </p>
                  <p className="lightGray text-[16px] font-normal ">
                    Followers
                  </p>
                </div>

                <div className="part1 flex items-center gap-1">
                  <p className="darkBlack font-Roboto font-bold text-[20px]">
                    26
                  </p>
                  <p className="lightGray text-[16px] font-normal ">
                    Following
                  </p>
                </div>

                <div className="part1 flex items-center gap-1">
                  <p className="darkBlack font-Roboto font-bold text-[20px]">
                    12
                  </p>
                  <p className="lightGray text-[16px] font-normal ">Items</p>
                </div>
              </div>
              <button className="profileBtn darkBlack  font-Roboto medium font-normal mt-3  w-[162px] h-[53px] flex-center gap-3 rounded-[15px] border-3 border-solid border-[#E7E7E7]">
                <img src="/src/assets/icons/foldedRed.svg" alt="" />
                10.89 FRY
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBanner;
