import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const TopCollectionCard = ({ data }: any) => {
  const [profile, setProfile] = useState<any>({})
  const getProfileData = async (id: any) => {
    if (id) {
      try {
        const response: any = await axios.get(`${baseUrl}/get-profile-settings/${id}`)
        setProfile(response.data)
        return response.data
        // return true;
      } catch (e) {
        return false
      }
    }
  }

  useEffect(() => {
    getProfileData(data.collection_address)
  }, [])
  const navigate = useNavigate()
  return (
    <>
      <div
        style={{ border: '2px solid #E7E7E7' }}
        className="cardWrap p-2.5 flex flex-col gap-4 bg-white rounded-lg border-2 border-gray-700 max-w-[300px] w-full"
      >
        <div
          onClick={() => navigate(`/collection/${data?.collection_address}`, { state: { profile: profile, collectionData: data } })}
          className="cardBtm flex flex-col justify-start items-center gap-3 max-w-[300px] w-full cursor-pointer"
        >
          <div className="max-w-[300px] h-[130px] w-full  object-cover rounded-2xl flex justify-center items-center">
            <img
              className="max-w-[300px] max-h-[130px] w-full h-full object-cover rounded-2xl"
              src={data.image_url ? data.image_url : '../../assets/home/images/topCollections/card3BtmImg.png'}
              alt=""
            />
            {/* <img className="max-w-[65px] max-h-[65px] w-full h-full object-cover rounded-2xl" src={imdd} alt="" /> */}
          </div>
          <div className="flex flex-col justify-start items-start gap-1 w-full">
            <p className="medium font-Roboto font-bold darkBlack">{data.collection_name ? data.collection_name : ''} </p>
            <p className="small font-Roboto font-normal lightGray ">
              Created by <span className="font-bold">{profile.display_name ? profile.display_name : 'Unknown'} </span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default TopCollectionCard
