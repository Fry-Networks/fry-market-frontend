import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import nft1 from "../assets/images/createNft/profilepic.png";
import Button from "../components/shared/button";
import Input from "../components/shared/input";
import Textarea from "../components/shared/textarea";
import nftColGlow from "../assets/artistsProfile/createGlow.png";

const CreateNftCollection = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/create-nft");
  };
  return (
    <>

      <div>
        <div className="nftCollection mt-[107px] h-[110vh] relative">
          <img className=" nftGlow absolute top-[-200px] -z-40" src={nftColGlow} alt="" />
          <div className="container">
            <div className="inner flex gap-8">
              <div className="backBtnContainer flex flex-col  items-start">
                <Button
                  className="btn-white !text-[20px] flex items-center gap-4 !px-5 mb-9"
                  text="Back"
                  onClick={handleClick}
                  icon={
                    <Icon
                      icon="material-symbols:door-back-outline"
                      width="24px"
                      height="24px"
                      style={{ color: "#2b2b2b" }}
                    />
                  }
                />

                <div className="selectedNft p-[20px] bg-white flex justify-center rounded-[20px] box-shadow mt-3 ">
                  <img src={nft1} alt="profile image" />
                </div>
                <Button
                  className="btn-gray w-32 darkGray mt-7"
                  text="Choose File"
                  onClick={handleClick}
                />
              </div>

              <div className="rightContent w-[992px]">
                <div className="rightText">
                <div className="singleNftBtn flex gap-3 items-center">
                  <Button
                    className="btn-gray w-32 lightGray"
                    text="Collection"
                  />
                  {/* <Button
                    className="btn-gray w-32 lightGray "
                    text="100 Items"
                  /> */}
                </div>
                <div className=" nftDetails py-4 px-[89px] bg-white box-shadow rounded-[20px] mt-[59px]">
                  <h2 className="text-center font-normal text-[40px] font-Apex darkBlack mb-24 uppercase">
                    create a collection
                  </h2>
                  <form action="" className="flex flex-col gap-7">
                    <div>
                      <Input
                        type="text"
                        label="Collection Name*"
                        placeholder="Name your Collection"
                        className="w-full input-nft"
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        label="Token Symbol*"
                        placeholder="$ CGPT, for example"
                        className="w-full input-nft"
                      />
                    </div>
                    <div>createNftCollection.tsx:99 hello



                      <Textarea
                        // label="Description "
                        label={
                          <>
                            <div className="flex flex-col gap-2 mt-9">
                              <span>Description</span>
                              <span className="medium mb-3">
                                The description will be included on the item's
                                detail page underneath its image.
                              </span>
                            </div>
                          </>
                        }
                        rows={6}
                        placeholder="Provide a detailed description of your item"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        className="btn-primary px-8 py-4 mb-5"
                        text="Continue"
                        onClick={(e: any) => { e.preventDefault(); console.log("hello"); navigate("/select-nft") }}
                      />
                    </div>
                  </form>
                </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNftCollection;
