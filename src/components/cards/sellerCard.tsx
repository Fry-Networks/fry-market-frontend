import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const SellerCard = ({ data }: any) => {

  const [profile, setProfile] = useState<any>("")

  const navigate = useNavigate();

  const getProfileData = async (id: any) => {
    if (id) {

      try {

        // const config = {
        //   headers: { Authorization: `Bearer ${token}` }
        // };

        const response: any = await axios.get(`${baseUrl}/get-profile-settings/${id}`);
        console.log("Hehe", response.data);
        setProfile(response.data)
        return (response.data)
        // return true;

      }
      catch (e) {
        console.log("Error Updating Profile Data");
        // toast.error("Error Getting Profile Data");
        // return false
        return false

      }
    }
  }

  useEffect(() => {
    getProfileData(data.collection_address)
  }, [])

  return (

    <>
      {profile ?
        <div className="sellerCardContainer mb-7 cursor-pointer" onClick={() => navigate("/artist-profile-others", { state: { profileData: profile } })}>
          <div className="inner flex gap-3">
            <div className="leftArea">
              <img className="max-w-[116px] max-h-[116px] w-full h-full object-cover rounded-2xl" src={profile.profile_image ? profile.profile_image : data.sellerImg} alt="" />
            </div>
            <div className="rightArea flex flex-col justify-end pb-3 gap-2">
              <p className="large font-bold font-Roboto darkBlack ">
                {profile.display_name ? profile.display_name : data.sellerName}
              </p>
              <p className="small font-bold lightGray">{data.rate}</p>
            </div>
          </div>
        </div>
        :

        ""}

    </>
  );
};

export default SellerCard;
