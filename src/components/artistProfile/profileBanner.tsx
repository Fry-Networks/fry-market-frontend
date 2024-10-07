import { useEffect } from "react";
import banner from "../../assets/artistsProfile/banner.webp";
import bannerProfile from "../../assets/artistsProfile/bannerUserIcon.webp";
import foldedRed from "../../assets/icons/foldedRed.svg";
import Button from "../../components/shared/button";
const ProfileBanner = ({ fryBalance, profileData, length }: any) => {

  useEffect(() => {
    console.log("ss", profileData);

  }, [])


  return (
    <>
      <div className="profileBanner mb-14 relative">

        {/* <img style={{ zIndex: "-9999" }} className="absolute top-[-270px] right-0" src={glow} alt="" /> */}
        <div className="container">
          <div className="inner relative ">

            <div className="relative mainn">
              <img className="absolute w-full max-w-[118px] max-h-[118px] h-full object-cover rounded-full bottom-[-50px] left-[45%] bannerProfilePic" src={profileData?.profile_image ? profileData?.profile_image : bannerProfile} alt="" />
              <img
                className="profilebanner mt-10 w-full z-90 max-h-[305px] h-full object-cover "
                src={profileData?.banner_image ? profileData?.banner_image : banner}
                alt=""
              />
              <Button
                className="btnFollow button btn-primary medium font-semibold font-Roboto absolute top-3 right-3"
                width={103}
                minHeight={53}
                text="Follow"
              >
              </Button>
            </div>

            {/* <img
              className="profilebanner mt-10 w-full z-90"
              src={bannerImg}
              alt=""
            /> */}
            {/* <Button
              className="btnFollow button btn-primary medium font-semibold font-Roboto absolute top-3 right-3"
              width={103}
              minHeight={53}
              text="Follow"
            >
            </Button> */}


            <div className="profileContent flex flex-col gap-5 justify-center items-center mt-14">
              <h3 className="darkBlack font-Apex font-normal tracking-[1.6px] ">
                {profileData?.display_name ? profileData?.display_name : "WILLIAM AKARANA"}
              </h3>
              <div className="followerDiv flex gap-4">
                {/* <div className="part1 flex items-center gap-1">
                  <p className="darkBlack font-Roboto font-bold text-[20px]">
                    99
                  </p>
                  <p className="lightGray text-[16px] font-normal ">
                    Followers
                  </p>
                </div>

                <div className="part1 flex items-center gap-1">
                  <p className="darkBlack font-Roboto font-bold text-[20px]">
                    26
                  </p>
                  <p className="lightGray text-[16px] font-normal ">
                    Following
                  </p>
                </div> */}

                <div className="part1 flex items-center gap-1">
                  <p className="darkBlack font-Roboto font-bold text-[20px]">
                    {length ? length : 0}
                  </p>
                  <p className="lightGray text-[16px] font-normal ">Items</p>
                </div>
              </div>
              <button className="profileBtn darkBlack  font-Roboto medium font-normal mt-3  w-[162px] h-[53px] flex-center gap-3 rounded-[15px] border-3 border-solid border-[#E7E7E7]">
                <img src={foldedRed} alt="" />
                {fryBalance ? fryBalance : 0} FRY
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBanner;
