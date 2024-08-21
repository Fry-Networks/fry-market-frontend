import Input from "../shared/input";
import React from "react";
import sendIcon from "../../assets/icons/sendIcon.svg";

const ReadyForNext = () => {
  const placeholderStyle = {
    color: "red" /* Set your desired placeholder color */,
  };
  return (
    <>
      <div className="nextNftWrapper">
        <div className="container">
          <h2 className="font-bold font-Oxanium capitalize darkBlack mb-10 text-center">
            Ready for the Next NFT Drop?
          </h2>

          <div
            style={{ width: "680px", margin: "0 auto"}}
            className="relative nftDropInput"
          >
            <Input
              wrapperClass="flex items-center justify-center mx-auto z-10 border-2 border-red-500 "
              placeholder="info@gmail.com"
              inputClass="ex-large font-normal font-Roboto primary mx-auto  flex items-center justify-center custom-placeholder border-2 border-red-500"
              width={680}
              height={96}
              type="text"
              className="m-auto nftdropInput"
              
             
            />
            <button className="absolute top-[14px] right-5  bg-primary text-white medium font-bold font-Roboto py-3 px-3 flex-center gap-2 rounded-lg">
              <img
                style={{ width: "32px", height: "32px" }}
                src={sendIcon}
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadyForNext;
