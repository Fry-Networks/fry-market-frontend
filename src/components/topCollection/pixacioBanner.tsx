
import React from "react";
// import leftImg from "../../assets/topCollection/bannerLeftImg.png";
import grid from "../../assets/nftCollection/exploreGrid.webp";
import internet from "../../assets/icons/internetIcon.png";
import twitter from "../../assets/icons/twitterTC.svg";
import discord from "../../assets/icons/discordTC.svg";
import glasses from "../../assets/icons/glasses.svg";
import topLeftGrid from "../../assets/topCollection/topLeftGrid.png";
import { Icon } from "@iconify/react";

const PixacioBanner = ({ name, image }: any) => {
  return (
    <>
      <div className="topCollectionBanner w-full h-screenlg:h-auto flex-center my-24 ">
        <img src={topLeftGrid} className="top-0  left-0 absolute" alt="" />
      <img className=" grid absolute top-[-400px] right-0 -z-50" src={grid} alt="" />
        <div className="container">
          <div className="inner flex-center gap-2">
            <div className="leftArea w-2/5">
              <img className="max-w-[482px] max-h-[461px] object-cover w-full h-full rounded-3xl border-solid border-[15px] border-[#fff]  shadow-[4px_4px_15px_0px_rgba(0,0,0,0.20)]" src={image} alt="" />
            </div>
            <div className="rightArea w-3/5 flex flex-col gap-8 ">
              <h2 className="font-normal font-Apex uppercase text-left tracking-wide darkBlack">
                {name}
              </h2>
              <div className="itemDiv flex flex-wrap gap-4 gap-y-8">
                <div
                  style={{ boxShadow: " 4px 4px 15px 0px rgba(0, 0, 0, 0.20)" }}
                  className="p-4 rounded-lg bg-white shadow-[4px_4px_15px_0_rgba(0, 0, 0, 0.2)] w-[332px] h-[48px] flex justify-between"
                >
                  <p className="small font-normal lightGray font-Roboto">
                    Items Listed
                  </p>
                  <p className="small font-bold lightGray font-Roboto">3,027</p>
                </div>

                <div
                  style={{ boxShadow: " 4px 4px 15px 0px rgba(0, 0, 0, 0.20)" }}
                  className="p-4 rounded-lg bg-white shadow-[4px_4px_15px_0_rgba(0, 0, 0, 0.2)] w-[332px] h-[48px] flex justify-between"
                >
                  <p className="small font-normal lightGray font-Roboto">
                    Nnm of Sold Items
                  </p>
                  <p className="small font-bold lightGray font-Roboto">120</p>
                </div>

                <div
                  style={{ boxShadow: " 4px 4px 15px 0px rgba(0, 0, 0, 0.20)" }}
                  className="p-4 rounded-lg bg-white shadow-[4px_4px_15px_0_rgba(0, 0, 0, 0.2)] w-[332px] h-[48px] flex justify-between"
                >
                  <p className="small font-normal lightGray font-Roboto">
                    Vol FRY
                  </p>
                  <p className="small font-bold lightGray font-Roboto">
                    18.5 FRY
                  </p>
                </div>
              </div>
              <hr className="w-[95%] h-[2px] bg-[#FE0101]" />

              <div className="socialIcons flex gap-1.5">
                <div
                  style={{ boxShadow: " 4px 4px 15px 0px rgba(0, 0, 0, 0.20)" }}
                  className=" rounded-lg p-2 flex-center cursor-pointer"
                >
                 <img src={internet} alt="" />
                </div>

                <div
                  style={{ boxShadow: " 4px 4px 15px 0px rgba(0, 0, 0, 0.20)" }}
                  className=" rounded-lg py-1.5 px-2.5 flex items-center justify-between gap-4 cursor-pointer"
                >
             <Icon icon="fa6-brands:x-twitter" width="22" height="22"  style={{color: "black"}} />
                  <div className="bg-[#FFCCCC] rounded-sm py-[7px] px-[12px] flex-center cursor-pointer">
                    <p
                      style={{ opacity: "1" }}
                      className="text-[#000] font-bold ex-small"
                    >
                      12.3k
                    </p>
                  </div>
                </div>

                <div
                  style={{ boxShadow: " 4px 4px 15px 0px rgba(0, 0, 0, 0.20)" }}
                  className=" rounded-lg p-2 flex-center cursor-pointer"
                >
                  <img src={discord} alt="" />
                </div>

                <div
                  style={{ boxShadow: " 4px 4px 15px 0px rgba(0, 0, 0, 0.20)" }}
                  className=" rounded-lg py-1.5 px-2.5 flex justify-between gap-4 cursor-pointer"
                >
                 <img
                    className="w-full h-full object-cover"
                    src={glasses}
                    alt=""
                  />
                  <div className="bg-[#FFCCCC] rounded-sm py-[7px] px-[12px] flex-center">
                    <p
                      style={{ opacity: "1" }}
                      className="text-[#000] font-bold ex-small"
                    >
                      12.3k
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-left small font-normal lightGray ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                euismod vulputate ipsum, non molestie magna facilisis a. Cras
                tincidunt sem sed lorem dapibus laoreet. Curabitur vel lectus
                purus. In gravida eros ac aliquam facilisis. Suspendisse at
                elementum metus. Proin elementum maximus placerat. Suspendisse
                sapien justo, interdum sit amet sollicitudin quis, porttitor a
                metus. In eu accumsan dolor, eu venenatis eros. Aliquam erat
                volutpat. Etiam suscipit placerat mi. Mauris diam purus,
                sagittis eu feugiat eu, sodales a quam. Cras elit enim.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PixacioBanner;
