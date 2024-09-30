import { useWallet } from "@txnlab/use-wallet";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import midGlow from "../../assets/artistsProfile/midGlow.webp";
import plusIcon from "../../assets/artistsProfile/plusIcon.png";
import settingBanerGlow from "../../assets/artistsProfile/settingBanerGlow.webp";
import uploadBanner from "../../assets/artistsProfile/uploadImgBanner.png";
import UploadImage from "../../modals/uploadImage";
import Button from "../shared/button";
import Input from "../shared/input";

const baseUrl = import.meta.env.VITE_API_BASE_URL;


const ProfileSettingPage = () => {
  const [isuploadmodal, setisuploadmodal] = useState(false);
  const [bannerImage, setBannerImage] = useState<any>();
  const [profileImage, setProfileImage] = useState<any>();
  const [profileData, setProfileData] = useState<any>({});
  const [currentImage, setCurrentImage] = useState<any>({});
  const { activeAccount } = useWallet()

  const showImageModal = () => {
    setisuploadmodal(true);
  };

  const uploadImages = async () => {

    try {
      return new Promise(async (resolve, reject) => {
        // if (!token) {

        //   reject(false);
        // }
        try {
          const formDataForImage = new FormData;

          formDataForImage.append("images", bannerImage);
          formDataForImage.append("images", profileImage);
          if (bannerImage && profileImage) {

            const response = await axios.post(`${baseUrl}/upload-images`, formDataForImage);
            console.log("Response in upload Image", response.data);

            // setFormData(prev => ({ ...prev, image_url: response.data?.image_urls[0] }))
            if (response.data?.image_urls[0]) {

              if (await handleContinue(response.data?.image_urls)) {
                resolve(true);
              }
              else {
                reject(false);
              }
            }
            else {
              console.log("Some Error Occured while uploading image. Please try again.");
              reject(false);

            }
          }
          else {
            if (await handleContinue([])) {
              resolve(true);
            }
            else {
              reject(false);
            }
          }

        }
        catch (e) {
          reject(false)
        }




      })

    }
    catch (e) {
      console.log("Error Uploading Image", e);
      return e;


    }


  }

  const handleContinue = async (imageUrl: any) => {
    try {

      // const config = {
      //   headers: { Authorization: `Bearer ${token}` }
      // };
      if (imageUrl.length > 0) {

        const response: any = await axios.post(`${baseUrl}/profile-settings`, { ...profileData, wallet_address: activeAccount?.address ? activeAccount?.address : 0, banner_image: imageUrl[0], profile_image: imageUrl[1] });
        console.log("Hehe", response.data);
        return true;
      }
      else {
        const response: any = await axios.post(`${baseUrl}/profile-settings`, { ...profileData, wallet_address: activeAccount?.address ? activeAccount?.address : 0 });
        console.log("Hehe", response.data);
        return true;
      }

    }
    catch (e) {
      console.log("Error Updating Profile Data");
      // toast.error("Error Creating Collection");
      return false

    }
  }

  const handleProfileDataChange = (e: any) => {

    setProfileData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))

  }
  useEffect(() => {
    console.log("dd", bannerImage);
    console.log("dd", profileImage);
    console.log("dd", profileData);

  }, [bannerImage, profileImage, profileData])

  return (
    <>
      <div className="profileSetting relative mb-20">
        <img className="absolute top-[-180px] w-full -z-50 " src={settingBanerGlow} alt="" />
        <img className="absolute bottom-[-100px] right-0 w-full -z-30" src={midGlow} alt="" />

        <div className="container">
          <div className="inner">
            <div className="uploadDiv relative">
              <button
                onClick={() => {
                  setCurrentImage("banner")
                  showImageModal()
                }}
                className="absolute top-[125px] left-[570px] bg-white small font-Roboto font-normal darkBlack py-1.5 w-[138px] h-[34px] flex-center rounded-lg"
              >
                Upload Banner
              </button>
              <img className="absolute bottom-[40px] left-[590px] cursor-pointer w-[118px] h-[118px] rounded-full object-cover" src={profileImage ? URL.createObjectURL(profileImage) : plusIcon} alt="" onClick={() => {
                setCurrentImage("profileImage")
                showImageModal()
              }} />
              <img
                className="my-7 mb-16"
                src={bannerImage ? URL.createObjectURL(bannerImage) : uploadBanner}
                alt=""
              />
              <button onClick={() => {
                setCurrentImage("profileImage")
                showImageModal()
              }} className=" border-solid border-2 mx-auto mt-4 border-[#E7E7E7] bg-white small font-Roboto font-normal darkBlack py-1.5 w-[127px] h-[34px] flex-center rounded-lg">
                Upload Profile
              </button>
            </div>

            <div className="formData mt-12 w-[817px] h-auto mx-auto flex flex-col gap-12">
              <div className="nftUserInfo mb-11">
                <div
                  // style={{
                  //   width: "817px",
                  //   height: "58px",
                  //   margin: "0 auto",
                  //   overflow: "visible",
                  // }}
                  className="relative displayDiv "
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
                    value={profileData.display_name}
                    onChange={handleProfileDataChange}
                    name="display_name"

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
                    value={profileData.bio}
                    onChange={handleProfileDataChange}
                    name="bio"
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
                  className="relative emailInput"
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
                    value={profileData.email}
                    onChange={handleProfileDataChange}
                    name="email"
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
                  className="relative emailInput"
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
                    value={profileData.website_link}
                    onChange={handleProfileDataChange}
                    name="website_link"
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
                  className="relative emailInput"
                >
                  <Input
                    wrapperClass="flex items-center justify-center mx-auto"
                    placeholder="@username"
                    inputClass="medium font-normal font-Roboto lightGray mx-auto flex items-center justify-center border-gray border-solid "
                    width={817}
                    height={58}
                    type="text"
                    className="m-auto"
                    label="X(Twitter)"
                    labelClass="mb-1 text-[20px] font-normal darkBlack font-Roboto"
                    value={profileData.twitter}
                    onChange={handleProfileDataChange}
                    name="twitter"
                  />

                  {/* <button
                    style={{
                      background:
                        "linear-gradient(318deg, #FD0000 26.88%, #FF9292 105.85%)",
                    }}
                    className="absolute top-[45px] right-3  bg-primary text-white small flex-center font-normal font-Roboto w-[101px] h-[36px] flex-center gap-2"
                  >
                    Connect
                  </button> */}
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
                  className="relative emailInput"
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
                    labelClass="mb-1 text-[20px] font-normal darkBlack font-Roboto"
                    value={profileData.discord}
                    onChange={handleProfileDataChange}
                    name="discord"
                  />

                  {/* <button
                    style={{
                      background:
                        "linear-gradient(318deg, #FD0000 26.88%, #FF9292 105.85%)",
                    }}
                    className="absolute top-[45px] right-3  bg-primary text-white small flex-center font-normal font-Roboto w-[101px] h-[36px] flex-center gap-2"
                  >
                    Connect
                  </button> */}
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
                  className="relative emailInput"
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
                    labelClass="mb-1 text-[20px] font-normal darkBlack font-Roboto"
                    value={profileData.instagram}
                    onChange={handleProfileDataChange}
                    name="instagram"
                  />

                  {/* <button
                    style={{
                      background:
                        "linear-gradient(318deg, #FD0000 26.88%, #FF9292 105.85%)",
                    }}
                    className="absolute top-[45px] right-3  bg-primary text-white small flex-center font-normal font-Roboto w-[101px] h-[36px] flex-center gap-2"
                  >
                    Connect
                  </button> */}
                </div>
              </div>

              <Button
                className=" saveBtn button btn-primary medium font-Roboto font-medium flex justify-center items-center"
                width={179}
                minHeight={53}
                text="Save changes"
                onClick={() => {
                  toast.promise(
                    uploadImages(),
                    {
                      pending: "Updating proiile data",
                      error: "There was an error while updating profile data",
                      success: "profile data updated successfully"

                    }
                  )


                }}
              ></Button>
            </div>
          </div>
        </div>
      </div>
      <UploadImage
        isuploadmodal={isuploadmodal}
        setisuploadmodal={setisuploadmodal}
        setProfileImage={setProfileImage}
        setBannerImage={setBannerImage}
        currentImage={currentImage}
      />
    </>
  );
};

export default ProfileSettingPage;
