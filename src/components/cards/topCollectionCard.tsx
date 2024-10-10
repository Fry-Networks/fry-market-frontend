import axios from "axios";
import { useEffect, useState } from "react";


const baseUrl = import.meta.env.VITE_API_BASE_URL;

const TopCollectionCard = ({ data }: any) => {
  const [profile, setProfile] = useState<any>({})
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
      <div style={{ border: "2px solid #E7E7E7" }} className="cardWrap p-2.5 flex flex-col gap-4 bg-white rounded-lg border-2 border-gray-700">
        {/* <div className="cardBody graybg p-2.5 grid gap-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <img className="max-w-[181px] max-h-[95px] w-full h-full object-cover rounded-2xl" src={data.cardBodyImg1} alt="" />
            <img className="max-w-[181px] max-h-[95px] w-full h-full object-cover rounded-2xl" src={data.cardBodyImg2} alt="" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <img className="max-w-[83px] max-h-[73px] w-full h-full object-cover rounded-2xl" src={data.cardBodyImg3} alt="" />
            <img className="max-w-[83px] max-h-[73px] w-full h-full object-cover rounded-2xl" src={data.cardBodyImg4} alt="" />
            <img className="max-w-[83px] max-h-[73px] w-full h-full object-cover rounded-2xl" src={data.cardBodyImg5} alt="" />
            <img className="max-w-[83px] max-h-[73px] w-full h-full object-cover rounded-2xl" src={data.cardBodyImg6} alt="" />
          </div>
        </div> */}
        <div className="cardBtm flex justify-start items-center gap-3  ">
          <div className="max-w-[65px] h-[65px] w-full  object-cover rounded-2xl flex justify-center items-center">
            <img className="max-w-[65px] max-h-[65px] w-full h-full object-cover rounded-2xl" src={data.image_url ? data.image_url : "../../assets/home/images/topCollections/card3BtmImg.png"} alt="" />
            {/* <img className="max-w-[65px] max-h-[65px] w-full h-full object-cover rounded-2xl" src={imdd} alt="" /> */}
          </div>
          <div className='flex flex-col gap-1'>
            <p className='medium font-Roboto font-bold darkBlack'>{data.collection_name ? data.collection_name : ""} </p>
            <p className='small font-Roboto font-normal lightGray '>Created by <span className='font-bold'>{profile.display_name ? profile.display_name : "Unknown"} </span></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default TopCollectionCard;