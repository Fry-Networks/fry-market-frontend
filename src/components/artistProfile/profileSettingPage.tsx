import { Icon } from "@iconify/react";
import { useWallet } from "@txnlab/use-wallet";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import midGlow from "../../assets/artistsProfile/midGlow.webp";
import settingBanerGlow from "../../assets/artistsProfile/settingBanerGlow.webp";
import UploadImage from "../../modals/uploadImage";
import Button from "../shared/button";
import Input from "../shared/input";
const baseUrl = import.meta.env.VITE_API_BASE_URL;


const ProfileSettingPage = ({ setIsPfpChange }: any) => {
  const [isuploadmodal, setisuploadmodal] = useState(false);
  const [bannerImage, setBannerImage] = useState<any>();
  const [profileImage, setProfileImage] = useState<any>();
  const [profileData, setProfileData] = useState<any>({});
  const [currentImage, setCurrentImage] = useState<any>({});
  const [loading, setLoading] = useState<any>(false);
  const [anyChange, setAnyChange] = useState<any>(false)
  const { activeAccount } = useWallet()
  const getProfileData = async () => {
    if (activeAccount?.address) {

      try {

        // const config = {
        //   headers: { Authorization: `Bearer ${token}` }
        // };
        setLoading(true);
        const response: any = await axios.get(`${baseUrl}/get-profile-settings/${activeAccount?.address}`);
        // console.log("Hehed", response.data);
        setProfileData(response.data)
        setProfileImage(response.data.profile_image
        )
        setBannerImage(response.data.banner_image)
        setLoading(false);

        // return true;

      }
      catch (e) {
        // console.log("Error Updating Profile Data");
        // toast.error("Error Getting Profile Data");
        // return false
        setLoading(false);


      }
    }
  }
  const showImageModal = () => {
    setisuploadmodal(true);
  };
  const validation = () => {
    // console.log("Dd", activeAccount?.address);

    if (profileData.display_name.replace(/\s+/g, '').length != 0 && profileData.bio.replace(/\s+/g, '').length != 0 && profileData.email.replace(/\s+/g, '').length != 0 && profileData.website_link.replace(/\s+/g, '').length != 0 && profileData.twitter.replace(/\s+/g, '').length != 0 && profileData.discord.replace(/\s+/g, '').length != 0 && profileData.instagram.replace(/\s+/g, '').length != 0 && (profileData.banner_image || bannerImage) && (profileData.profile_image || profileImage)) {
      return true
    }
    else {
      return false
    }
  }
  const uploadImages = async () => {

    try {
      return new Promise(async (resolve, reject) => {

        // if (!token) {

        //   reject(false);
        // }
        try {

          setLoading(true);
          const formDataForImage = new FormData;
          if ((bannerImage || profileImage) && (typeof (bannerImage) != "string" || typeof (profileImage) != "string")) {

            let bannerImageUpload = false;
            let profileImageUpload = false;

            if (bannerImage && typeof (bannerImage) != "string") {
              formDataForImage.append("images", bannerImage);
              bannerImageUpload = true;
            }
            if (profileImage && typeof (profileImage) != "string") {

              formDataForImage.append("images", profileImage);
              profileImageUpload = true;
              setIsPfpChange((prev: any) => !prev)
            }

            const response = await axios.post(`${baseUrl}/upload-images`, formDataForImage);
            // console.log("Response in upload Image", response.data);

            // setFormData(prev => ({ ...prev, image_url: response.data?.image_urls[0] }))
            if (response.data?.image_urls[0]) {

              if (await handleContinue(response.data?.image_urls, bannerImageUpload, profileImageUpload)) {
                setLoading(false);
                setAnyChange(false);
                resolve(true);
              }
              else {
                setLoading(false);

                reject(false);
              }
            }
            else {
              // console.log("Some Error Occured while uploading image. Please try again.");
              setLoading(false);

              reject(false);

            }
          }
          else {
            if (await handleContinue([])) {
              setLoading(false);
              setAnyChange(false);

              resolve(true);
            }
            else {
              setLoading(false);

              reject(false);
            }
          }

        }
        catch (e) {
          setLoading(false);
          // console.log("e", e);

          reject(false)
        }




      })

    }
    catch (e) {
      // console.log("Error Uploading Image", e);
      return e;


    }


  }

  const handleContinue = async (imageUrl: any, bannerImageUpload?: any, profileImageUpload?: any) => {
    try {

      // const config = {
      //   headers: { Authorization: `Bearer ${token}` }
      // };
      if (imageUrl.length > 0) {
        // console.log("h");
        // console.log("h", bannerImageUpload);
        // console.log("h", profileImageUpload);


        const response: any = await axios.post(
          `${baseUrl}/profile-settings`,
          new URLSearchParams({
            ...profileData,
            wallet_address: activeAccount?.address || '0', // Default to '0' if no address is found
            banner_image: (bannerImageUpload && profileImageUpload) || (bannerImageUpload) ? imageUrl[0] : profileData.banner_image,
            profile_image: (bannerImageUpload && profileImageUpload) ? imageUrl[1] : profileImageUpload ? imageUrl[0] : profileData.profile_image,
          }).toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded', // Specify content type
            }
          }
        );
        // console.log("Hehe", response.data);
        return true;
      }
      else {
        const response: any = await axios.post(`${baseUrl}/profile-settings`, { ...profileData, wallet_address: activeAccount?.address ? activeAccount?.address : 0 });
        // console.log("Hehe", response.data);
        return true;
      }

    }
    catch (e) {
      // console.log("Error Updating Profile Data");
      // toast.error("Error Creating Collection");
      return false

    }
  }

  const handleProfileDataChange = (e: any) => {
    setAnyChange(true);
    setProfileData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))

  }
  useEffect(() => {
    // console.log("dd", bannerImage);
    // console.log("dd", profileImage);
    // console.log("dd", profileData);

  }, [bannerImage, profileImage, profileData])

  useEffect(() => {
    getProfileData()
  }, [activeAccount])

  return (
    <>
      <div className="profileSetting relative mb-20">
        <img className="absolute top-[-180px] w-full -z-50 " src={settingBanerGlow} alt="" />
        <img className="absolute bottom-[-100px] right-0 w-full -z-50" src={midGlow} alt="" />

        <div className="container">
          <div className="inner">
            <div className="uploadDiv relative w-full h-[305px] bg-[#D9D9D9]  rounded-2xl mt-5">
              <label htmlFor="bannerImage">
                <input type="file" className="hidden" name="" id="bannerImage" onChange={(e: any) => {
                  setAnyChange(true);
                  setBannerImage(e.target.files[0])
                }
                } />
                {
                  bannerImage &&
                  <img className="w-full h-full object-cover" src={typeof (bannerImage) == "string" ? bannerImage : URL.createObjectURL(bannerImage)} alt="" />
                }



                <div

                  className="absolute top-[45%] left-[46%] bg-white small font-Roboto font-normal darkBlack py-1.5 w-[138px] h-[34px] flex-center rounded-lg cursor-pointer"
                >

                  Upload Banner <span style={{ color: "#FD0000", cursor: "pointer" }}>&nbsp;*</span>
                </div>
              </label>

              {/* </div> */}

              <label htmlFor="profileImage">
                <input type="file" className="hidden" name="" id="profileImage" onChange={(e: any) => {
                  setAnyChange(true);
                  setProfileImage(e.target.files[0])
                }} />

                <div className="absolute w-[100px] h-[100px] rounded-full border-dashed border-[2px] border-[#6B6B6B] bg-[#D9D9D9] bottom-[-60px] left-[47%] cursor-pointer plusIcon flex items-center justify-center" >

                  {
                    profileImage ? <div style={{ position: "relative" }}>
                      <img className="w-full h-full object-cover rounded-full" src={typeof (profileImage) == "string" ? profileImage : URL.createObjectURL(profileImage)} alt="" />
                      <Icon icon="iconoir:plus" width="32" height="32" style={{ color: "#000000", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
                    </div>
                      :
                      <Icon icon="iconoir:plus" width="32" height="32" style={{ color: "#6B6B6B" }} />
                  }
                </div>
              </label>
            </div>


            <div className="formData mt-20 w-[817px] h-auto mx-auto flex flex-col gap-12">
              <div className="nftUserInfo mb-11">
                <div

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
                  // asterisk="*"

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
                    placeholder="Enter your Email"
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
                  // asterisk="*"
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
                  // asterisk="*"
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
                    placeholder="http://"
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
                  // asterisk="*"

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
                    placeholder="http://"
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
                  // asterisk="*"

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
                    placeholder="http://"
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
                  // asterisk="*"

                  />


                </div>
              </div>

              <Button
                className=" saveBtn button btn-primary medium font-Roboto font-medium flex justify-center items-center"
                width={179}
                minHeight={53}
                text="Save changes"
                onClick={() => {
                  if (anyChange) {

                    if (!/^[a-zA-Z]+$/.test(profileData.display_name)) {
                      console.log("name", profileData.display_name);
                      toast.error("Invalid Display Name");
                      return;
                    }
                    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(profileData.email)) {
                      toast.error("Invalid Email");
                      return;
                    }
                    const webLinks = [profileData.website_link, profileData.twitter, profileData.discord, profileData.instagram];

                    if (webLinks.some((link) => {
                      // Only validate non-empty links
                      return link && !(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/[^\s]*)?$/.test(link));
                    })) {
                      toast.error("Invalid Links");
                      return;
                    }

                    toast.promise(
                      uploadImages(),
                      {
                        pending: "Updating profile data",
                        error: "There was an error while updating profile data",
                        success: "Profile data updated successfully"

                      }
                    )
                  }
                  else {
                    toast.error("Already Updated", { toastId: "alreadyUpdatedTost" })
                  }


                }}
                disabled={loading}
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
