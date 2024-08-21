import React, { useState } from "react";
import Input from "../shared/input";
import Button from "../shared/button";
import UploadImage from "../../modals/uploadImage";

const ProfileSettingPage = () => {
  const [isuploadmodal, setisuploadmodal] = useState(false);

  const showImageModal = () => {
    setisuploadmodal(true);
  };
  return (
    <>
      <div className="profileSetting">
        <div className="container">
          <div className="inner">
            <div className="uploadDiv relative">
              <button
                onClick={showImageModal}
                className="absolute top-[125px] left-[550px] bg-white small font-Roboto font-normal darkBlack py-1.5 w-[138px] h-[34px] flex-center rounded-lg"
              >
                Upload Banner
              </button>
              <img
                className="mt-7"
                src="/src/assets/artistsProfile/uploadImgBanner.png"
                alt=""
              />
              <button   onClick={showImageModal} className=" border-solid border-2 mx-auto mt-4 border-[#E7E7E7] bg-white small font-Roboto font-normal darkBlack py-1.5 w-[127px] h-[34px] flex-center rounded-lg">
                Upload Profile
              </button>
            </div>

            <div className="formData w-[817px] h-auto mx-auto flex flex-col gap-12">
              <div className="nftUserInfo mb-11">
                <div
                  style={{
                    width: "817px",
                    height: "58px",
                    margin: "0 auto",
                    overflow: "visible",
                  }}
                  className="relative"
                >
                  <Input
                    wrapperClass="flex items-center justify-center mx-auto"
                    placeholder="Enter your Name"
                    inputClass="medium font-normal font-Roboto lightGray mx-auto flex items-center justify-center border-gray border-solid "
                    width={817}
                    height={58}
                    type="text"
                    className="m-auto"
                    label="Display Name"
                    labelClass="mb-2 text-[20px] font-normal darkBlack font-Roboto"
                  />
                </div>
              </div>

              <div className="nftUserInfo">
                <div className="bio">
                  <p className="mb-2 text-[20px] font-normal darkBlack font-Roboto">
                    Bio
                  </p>
                  <textarea
                    className="textArea"
                    placeholder="Enter Bio"
                  ></textarea>
                </div>
              </div>

              <div className="nftUserInfo mb-11">
                <div
                  style={{
                    width: "817px",
                    margin: "0 auto",
                    overflow: "visible",
                  }}
                  className="relative"
                >
                  <Input
                    wrapperClass="flex items-center justify-center mx-auto"
                    placeholder="Enter your Name"
                    inputClass="medium font-normal font-Roboto lightGray mx-auto flex items-center justify-center border-gray border-solid "
                    width={817}
                    height={70}
                    type="text"
                    className="m-auto"
                    label="E-mail"
                    labelClass="mb-2 text-[20px] font-normal darkBlack font-Roboto"
                  />
                </div>
              </div>
            </div>

            <div className="socialLinks mt-14 w-[817px] mx-auto flex flex-col gap-5">
              <h3 className="darkBlack font-Apex font-normal pb-6">
                Social Links
              </h3>

              <div className="nftUserInfo mb-12">
                <div
                  style={{
                    width: "817px",
                    height: "58px",
                    margin: "0 auto",
                    overflow: "visible",
                  }}
                  className="relative"
                >
                  <Input
                    wrapperClass="flex items-center justify-center mx-auto"
                    placeholder="http://"
                    inputClass="medium font-normal font-Roboto lightGray mx-auto flex items-center justify-center border-gray border-solid "
                    width={817}
                    height={58}
                    type="text"
                    className="m-auto"
                    label="Website"
                    labelClass="mb-2 text-[20px] font-normal darkBlack font-Roboto"
                  />
                </div>
              </div>

              <div className="nftUserInfo mb-12">
                <div
                  style={{
                    width: "817px",
                    height: "58px",
                    margin: "0 auto",
                    overflow: "visible",
                  }}
                  className="relative"
                >
                  <Input
                    wrapperClass="flex items-center justify-center mx-auto"
                    placeholder="@username"
                    inputClass="medium font-normal font-Roboto lightGray mx-auto flex items-center justify-center border-gray border-solid "
                    width={817}
                    height={58}
                    type="text"
                    className="m-auto"
                    label="x(Twitter)"
                    labelClass="mb-2 text-[20px] font-normal darkBlack font-Roboto"
                  />

                  <button
                    style={{
                      background:
                        "linear-gradient(318deg, #FD0000 26.88%, #FF9292 105.85%)",
                    }}
                    className="absolute top-[50px] right-2  bg-primary text-white small flex-center font-normal font-Roboto w-[101px] h-[36px] flex-center gap-2"
                  >
                    Connect
                  </button>
                </div>
              </div>

              <div className="nftUserInfo mb-12">
                <div
                  style={{
                    width: "817px",
                    height: "58px",
                    margin: "0 auto",
                    overflow: "visible",
                  }}
                  className="relative"
                >
                  <Input
                    wrapperClass="flex items-center justify-center mx-auto"
                    placeholder="@username"
                    inputClass="medium font-normal font-Roboto lightGray mx-auto flex items-center justify-center border-gray border-solid "
                    width={817}
                    height={58}
                    type="text"
                    className="m-auto"
                    label="Discord"
                    labelClass="mb-2 text-[20px] font-normal darkBlack font-Roboto"
                  />

                  <button
                    style={{
                      background:
                        "linear-gradient(318deg, #FD0000 26.88%, #FF9292 105.85%)",
                    }}
                    className="absolute top-[50px] right-2  bg-primary text-white small flex-center font-normal font-Roboto w-[101px] h-[36px] flex-center gap-2"
                  >
                    Connect
                  </button>
                </div>
              </div>

              <div className="nftUserInfo mb-12">
                <div
                  style={{
                    width: "817px",
                    height: "58px",
                    margin: "0 auto",
                    overflow: "visible",
                  }}
                  className="relative"
                >
                  <Input
                    wrapperClass="flex items-center justify-center mx-auto"
                    placeholder="@username"
                    inputClass="medium font-normal font-Roboto lightGray mx-auto flex items-center justify-center border-gray border-solid "
                    width={817}
                    height={58}
                    type="text"
                    className="m-auto"
                    label="Instagram"
                    labelClass="mb-2 text-[20px] font-normal darkBlack font-Roboto"
                  />

                  <button
                    style={{
                      background:
                        "linear-gradient(318deg, #FD0000 26.88%, #FF9292 105.85%)",
                    }}
                    className="absolute top-[50px] right-2  bg-primary text-white small flex-center font-normal font-Roboto w-[101px] h-[36px] flex-center gap-2"
                  >
                    Connect
                  </button>
                </div>
              </div>

              <Button
                className="button btn-primary medium font-Roboto font-medium flex justify-center items-center"
                width={179}
                minHeight={53}
                text="Save changes"
              ></Button>
            </div>
          </div>
        </div>
      </div>
      <UploadImage
        isuploadmodal={isuploadmodal}
        setisuploadmodal={setisuploadmodal}
      />
    </>
  );
};

export default ProfileSettingPage;
