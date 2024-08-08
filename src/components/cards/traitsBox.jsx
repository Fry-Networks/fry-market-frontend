import React from "react";

const TraitsBox = ({data}) => {
  return (
    <>
      <div className="rounded-lg bg-[#F4F4F4] py-3 px-6 flex flex-col gap-1.5">
        <p className="lightGray font-normal  text-[10px]">{data.text1}</p>
        <p className="darkBlack font-medium font-Roboto  text-[10px]">
          Founders edition <span className="lightGray font-normal">{data.foundationEdition}</span>
        </p>
        <p className="lightGray font-normal  text-[10px]">Floor: {data.floor}</p>
      </div>
    </>
  );
};

export default TraitsBox;
