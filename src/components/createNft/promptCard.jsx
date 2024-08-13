import React from "react";

const PromptCard = ({ data }) => {
  return (
    <>
      <div
        style={{ border: "3px solid #E7E7E7" }}
        className="promptCard  rounded-3xl p-4 outline outline-[#E7E7E7] flex-center gap-11 relative "
      >
        <img
          className="absolute top-[100px] left-[280px]"
          src="/src/assets/createNft/copy.png"
          alt=""
        />
        <div className="leftSide w-1/2 h-full">
          <img className="w-full h-full" src={data.nftImg} alt="" />
        </div>
        <div className="rightSide w-2/5 flex flex-col gap-3  justify-start  h-full">
          <p className="font-Apex large font-normal darkBlack">{data.title}</p>
          <p className="lightGray font-Roboto small opacity-80">
            {data.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default PromptCard;
