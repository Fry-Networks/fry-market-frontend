import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Switch } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import newCollect from "../assets/artistsProfile/newCollect.png";
import collect1 from "../assets/createNft/collect1.webp";
import collect2 from "../assets/createNft/collect2.webp";
import collect3 from "../assets/createNft/collect3.webp";
import collect4 from "../assets/createNft/collect4.webp";
import plus from "../assets/icons/plus.svg";
import nft1 from "../assets/images/createNft/profilepic.png";
import Button from "../components/shared/button";
import Input from "../components/shared/input";
import Textarea from "../components/shared/textarea";
import AddTraits from "../modals/addTraits";
import MintNft from "../modals/mintNft";
import selectNftGlow from "../assets/createNft/selectedNftGlow.png";

const SelectedNft = () => {
  const [showOriginalContent, setShowOriginalContent] = useState(true);
  const onSwitch = (checked: any) => {
    console.log(`switch to ${checked}`);
  };
  const [value, setValue] = useState("blue: fox");
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClearClick = () => {
    setValue("");
  };
  const handleBackClick = () => {
    if (!showOriginalContent) {
      setShowOriginalContent(true); // Go back to the original content
    } else {
      navigate("/create-nft"); // Redirect to /create-nft when showing original content
    }
  };

  const handleChooseFromExistedClick = () => {
    setShowOriginalContent(false); // Show different content
  };
  const navigate = useNavigate();




  const [istraitmodal, setistraitmodal] = useState(false);

  const showAddTraitModal = () => {
    setistraitmodal(true);
  };

  const [ismintmodal, setismintmodal] = useState(false);

  const showMintModal = () => {
    setismintmodal(true);
  };
  return (
    <>
      <div>
        <div className="nftCollection mt-[107px] h-[110vh] relative">
          <img className="nftGlow absolute top-[-200px] -z-50" src={selectNftGlow} alt="" />
          <div className="container">
            <div className="inner flex gap-8">
              <div className="backBtnContainer flex flex-col  items-start">
                <Button
                  className="btn-white !text-[20px] flex items-center gap-4 !px-5 mb-9"
                  text="Back"
                  onClick={handleBackClick}
                  icon={
                    <Icon
                      icon="material-symbols:door-back-outline"
                      width="24px"
                      height="24px"
                      style={{ color: "#2b2b2b" }}
                    />
                  }
                />

                {showOriginalContent && (
                  <div className=" selectedNft p-[20px] bg-white flex justify-center rounded-[20px] box-shadow">
                    <div className="relative overlay">
                      <img src={nft1} alt="profile image" />
                      <p className="font-normal font-Apex text-[20px] white absolute top-[50%] left-[30%]">
                        SELECTED
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-[992px] rightContent">
                {showOriginalContent ? (
                  <div className="rightText">
                    <div className="singleNftBtn">
                      <Button
                        className="btn-gray w-32 lightGray"
                        text="Single NFT"
                      />
                    </div>
                    <div className=" nftDetails py-4 px-[89px] bg-white box-shadow rounded-[20px] mt-[59px] ">
                      <h2 className="text-center font-normal text-[40px] font-Apex darkBlack mb-24">
                        MINT YOUR NFT
                      </h2>
                      <form action="" className="flex flex-col gap-7">
                        <div>
                          <Input
                            type="text"
                            label="Item Name*"
                            placeholder="Name your NFT"
                            className="w-full input-nft medium"
                          labelClass="darkBlack font-Roboto font-bold medium"
                          />
                        </div>
                        <div>
                          <Input
                            type="text"
                            label="Token Symbol*"
                            placeholder="$ CGPT, for example"
                            className="w-full input-nft  medium"

                          />
                        </div>
                        <div>
                          <Textarea
                            label={
                              <>
                                <div className="flex flex-col gap-2">
                                  <span className="mb-1 font-medium">
                                    Description
                                  </span>
                                  <span className="medium ">
                                    The description will be included on the
                                    item's detail page underneath its image.
                                  </span>
                                </div>
                              </>
                            }
                            rows={6}
                            placeholder="Provide a detailed description of your item"
                          />
                        </div>

                        <div className="chooseCollection my-3">
                          <div className=" chooseContent w-full flex justify-between items-center">
                            <p className="darkBlack large font-medium font-Roboto">
                              Choose Collection
                            </p>
                            <p
                              className="underline lightGray medium font-normal cursor-pointer"
                              onClick={handleChooseFromExistedClick}
                            >
                              Choose From Existed
                            </p>
                          </div>

                          <p className="itemAppear lightGray text-[16px] font-Roboto font-normal mt-2">
                            (this is the collection where your item will appear)
                          </p>
                          <div className="newCollectionDiv flex gap-4 mt-4">
                            <div className="createNewCollection rounded-xl border-solid border-[#E7E7E7] border-2 p-[15px] flex justify-start gap-3 w-1/2">
                              <div className="grayDiv p-[16px] bg-[#E7E7E7] flex-center rounded-xl">
                                <img src={plus} alt="" />
                              </div>
                              <div className="rightContnt flex flex-col justify-center">
                                <p className="darkBlack medium font-medium font-Roboto">
                                  Create new collection
                                </p>
                                <p className="lightGray small font-Roboto font-normal mt-2">
                                  Type to create
                                </p>
                              </div>
                            </div>
                            <div className="createNewCollection rounded-xl border-solid border-[#E7E7E7] border-2 p-[15px] flex justify-start gap-3 w-1/2">
                              <div className="grayDiv bg-[#E7E7E7] flex-center rounded-xl">
                                <img src={newCollect} alt="" />
                              </div>
                              <div className="rightContnt flex flex-col justify-center">
                                <p className="darkBlack medium font-medium font-Roboto">
                                  Wonderful Artwork
                                </p>
                                <p className="lightGray small font-Roboto font-normal mt-2">
                                  Items{" "}
                                  <span className="font-medium darkBlack">
                                    1.5k
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="addTraits flex flex-col gap-3">
                          <p className="darkBlack large font-medium font-Roboto">
                            Add Traits
                          </p>
                          <p className="darkBlack font-Roboto medium font-normal">
                            Traits describe attributes of your item. They appear
                            as filters inside your collection page and are also
                            listed out inside your item page.
                          </p>

                          <div className="relative">
                            <Input
                              type="text"
                              value={value}
                              onChange={(e: any) => setValue(e.target.value)}
                              placeholder="blue: fox"
                              className="w-full"
                              inputClass={`w-full  bg-[#F4F4F4] border-none pl-4 pr-12 ${isEditing ? "outline-none focus:ring-2" : ""
                                }`}
                              readOnly={!isEditing}
                            />
                            <div className="absolute inset-y-0 right-5 top-2 flex items-center space-x-8 pr-2">
                              <EditOutlined
                                className="text-gray-500 cursor-pointer"
                                onClick={() => { handleEditClick(); showAddTraitModal(); }}
                              />
                              <div className="h-[24px] w-[1px] bg-gray-400"></div>
                              <CloseOutlined
                                className="text-gray-500 cursor-pointer"
                                onClick={handleClearClick}
                              />
                            </div>
                          </div>
                          <hr className="w-full h-[2px] bg-[#E7E7E7]" />
                        </div>

                        <div
                          onClick={showAddTraitModal}
                          className="flex w-[195px] h-[58px] justify-center gap-2 border-2 border-[#E7E7E7] border-solid items-center rounded-2xl"
                        >
                          <p className="lightGray font-normal medium font-Roboto">
                            Add Traits
                          </p>
                          <img src="/src/assets/icons/plus.svg" alt="" />
                        </div>
                        <div className="royality flex flex-col gap-5">
                          <p className="darkBlack font-Roboto large font-medium">
                            Royalties
                          </p>
                          <Switch
                            className="w-[60px]"
                            defaultChecked
                            onChange={onSwitch}
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button
                            className="btn-primary px-8 py-4 mb-5"
                            text="Mint NFT"
                            onClick={showMintModal}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      boxShadow: " 4px 4px 15px 0px rgba(0, 0, 0, 0.20)",
                    }}
                    className="choseCollectionBox py-4 px-[89px] w-[11] bg-white box-shadow rounded-[20px] mt-[59px] "
                  >
                    <div className="chooseCollection my-3">
                      <div className="w-full flex justify-center items-center">
                        <h2 className="heading text-center font-normal text-[40px] font-Apex darkBlack mb-24">
                          Choose collection
                        </h2>
                      </div>
                      <div className="artWorkContainer lightGray text-[16px] font-Roboto font-normal mt-2 flex flex-col gap-6">
                        <div className="artWork w-[626px] mx-auto p-3.5 border-2 border-solid border-[#E7E7E7] rounded-xl flex justify-between items-center ">
                          <div className="leftSide flex gap-3">
                            <div className="part1">
                              <img src={collect1} alt="" />
                            </div>
                            <div className="part2 flex flex-col gap-3">
                              <p className="darkBlack font-Roboto medium font-mrdium">
                                Wonderful Artwork
                              </p>
                              <p className="lightGray small font-normal font-Roboto">
                                Items{" "}
                                <span className="darkBlack font-medium">
                                  1.5k
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="rightSide">
                            <Button
                              className="button btn-grayDark medium font-medium darkBlack"
                              minWidth={115}
                              minHeight={51}
                              text="Select"
                            />
                          </div>
                        </div>

                        <div className="artWork p-3.5 border-2 border-solid border-[#E7E7E7] rounded-xl flex  w-[626px] mx-auto justify-between items-center ">
                          <div className="leftSide flex gap-3">
                            <div className="part1">
                              <img src={collect2} alt="" />
                            </div>
                            <div className="part2 flex flex-col gap-3">
                              <p className="darkBlack font-Roboto medium font-mrdium">
                                Wonderful Artwork
                              </p>
                              <p className="lightGray small font-normal font-Roboto">
                                Items{" "}
                                <span className="darkBlack font-medium">
                                  1.5k
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="rightSide">
                            <Button
                              className="button btn-grayDark medium font-medium darkBlack"
                              minWidth={115}
                              minHeight={51}
                              text="Select"
                            />
                          </div>
                        </div>

                        <div className="artWork p-3.5 border-2 border-solid border-[#E7E7E7] rounded-xl flex  w-[626px] mx-auto justify-between items-center ">
                          <div className="leftSide flex gap-3">
                            <div className="part1">
                              <img src={collect3} alt="" />
                            </div>
                            <div className="part2 flex flex-col gap-3">
                              <p className="darkBlack font-Roboto medium font-mrdium">
                                Wonderful Artwork
                              </p>
                              <p className="lightGray small font-normal font-Roboto">
                                Items{" "}
                                <span className="darkBlack font-medium">
                                  1.5k
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="rightSide">
                            <Button
                              className="button btn-grayDark medium font-medium darkBlack"
                              minWidth={115}
                              minHeight={51}
                              text="Select"
                            />
                          </div>
                        </div>

                        <div className="artWork p-3.5 border-2 border-solid border-[#E7E7E7] rounded-xl flex  w-[626px] mx-auto justify-between items-center ">
                          <div className="leftSide flex gap-3">
                            <div className="part1">
                              <img src={collect4} alt="" />
                            </div>
                            <div className="part2 flex flex-col gap-3">
                              <p className="darkBlack font-Roboto medium font-mrdium">
                                Wonderful Artwork
                              </p>
                              <p className="lightGray small font-normal font-Roboto">
                                Items{" "}
                                <span className="darkBlack font-medium">
                                  1.5k
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="rightSide">
                            <Button
                              className="button btn-grayDark medium font-medium darkBlack"
                              minWidth={115}
                              minHeight={51}
                              text="Select"
                            />
                          </div>
                        </div>
                        <div className="w-full flex justify-end">
                          <Button
                            className="button btn-primary medium font-Roboto font-medium mt-4"
                            minWidth={102}
                            minHeight={53}
                            text="Next"

                          />
                        </div>
                      </div>
                      {/* Add your existing collections display logic here */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddTraits
        istraitmodal={istraitmodal}
        setistraitmodal={setistraitmodal}
      />

      <MintNft
        ismintmodal={ismintmodal}
        setismintmodal={setismintmodal}
      />
    </>
  );
};

export default SelectedNft;
