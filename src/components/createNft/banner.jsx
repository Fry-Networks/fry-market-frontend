import React, { useState } from "react";
import Input from "../shared/input";
import generateIcon from "../../assets/icons/generateIcon.svg";
import { Select, InputNumber } from "antd";
import  AddStyleModal from "../../modals/addStyleModal";
import GenerateNft from "../../modals/generateNft";
const Banner = () => {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onSupply = (value) => {
    console.log("changed", value);
  };
  const [isstylemodal, setisstylemodal] = useState(false);

  const showAddStyleModal = () => {
    setisstylemodal(true);
  };




  const [isgeneratemodal, setisgeneratemodal] = useState(false);

  const showGenerateNftModal = () => {
    setisgeneratemodal(true);
  };
  return (
    <>
      <div className="bannerWrapper mb-44">
        <div className="container">
          <div className="inner">
            <h2 className="font-normal font-Apex uppercase darkBlack text-center mt-20">
              Create your own <span className="primary">masterpiece</span>
            </h2>
            <img
              className="mt-10 w-full"
              src="/src/assets/createNft/bannerImg.png"
              alt=""
            />
            <div>
              <div className="earnMoneyDiv flex flex-col justify-center items-center gap-5">
                <div className="part1">
                  <p className="lightGray text-[16px] font-normal font-Roboto">
                    get onboard and earn money like a pro
                  </p>
                </div>
                <div className="part2">
                  <div
                    style={{ width: "1002px", margin: "0 auto" }}
                    className="relative"
                  >
                    <Input
                      wrapperClass="flex items-center justify-center mx-auto z-10 "
                      placeholder="Fantasy Creature holding a sword..."
                      inputClass="medium font-normal font-Roboto lightGray mx-auto flex items-center justify-center"
                      width={1002}
                      height={70}
                      type="text"
                      className="m-auto"
                    />
                    <button onClick={showGenerateNftModal} className="absolute top-[14px] right-2  bg-primary text-white medium font-bold font-Roboto py-3 px-3 flex-center gap-2">
                      Generate
                      <img src={generateIcon} alt="" />
                    </button>
                  </div>
                </div>

                <div className="part3 my-6 flex-center gap-16">
                  <div className="slectDiv">
                    <Select
                      showSearch
                      placeholder="Collection"
                      optionFilterProp="label"
                      onChange={onChange}
                      onSearch={onSearch}
                      options={[
                        {
                          value: "single",
                          label: "Single NFT Image",
                        },
                        {
                          value: "multiple",
                          label: "Multi-NFT Collection",
                        },
                      ]}
                    />
                  </div>
                  <div className="supplyDiv flex-center gap-4">
                    <p className="medium font-normal font-Roboto lightGray">Supply</p>
                    <InputNumber
                      min={1}
                      max={99999999999}
                      defaultValue={3}
                      onChange={onSupply}
                    />
                  </div>
                  <div className="addStyle flex justify-between items-center cursor-pointer" onClick={showAddStyleModal}>
                    <p className="lightGray font-normal medium font-Roboto">Add Styles</p>
                    <img src="/src/assets/icons/plus.svg" alt="" />
                  </div>



                  {/* <div className="addStyle flex justify-between items-center">
                    <p className="lightGray font-normal medium font-Roboto">Add Traits</p>
                    <img src="/src/assets/icons/plus.svg" alt="" />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddStyleModal
           isstylemodal={isstylemodal}
            setisstylemodal={setisstylemodal}
            />


<GenerateNft
           isgeneratemodal={ isgeneratemodal}
           setisgeneratemodal={ setisgeneratemodal}
            />
    </>
  );
};

export default Banner;
