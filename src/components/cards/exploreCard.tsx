import { useWallet } from "@txnlab/use-wallet";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import icontick from "../../assets/icons/purplr-bg-tick.svg";
import bodyImg4 from "../../assets/nftCollection/bodyImg4.png";
import { getAllUserAuctions } from "../../auctionMethod";
import { getAllListedByUser } from "../../fryMarketMethods";
import { formatPrice } from "../../utils/getImageFromJson";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ExploreCard = ({ data }: any) => {
  const [profile, setProfile] = useState<any>({})
  const [totalListed, setTotalListed] = useState<any>(0)
  const [totalListedAuctioned, setTotalListedAuctioned] = useState<any>(0)
  const { activeAccount, signer } = useWallet()
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/top-collection", { state: { profile: profile, collectionData: data } });
  };

  const getProfileData = async (id: any) => {
    if (id) {

      try {

        // const config = {
        //   headers: { Authorization: `Bearer ${token}` }
        // };

        const response: any = await axios.get(`${baseUrl}/get-profile-settings/${id}`);
        // console.log("Hehe", response.data);
        setProfile(response.data)
        return (response.data)
        // return true;

      }
      catch (e) {
        // console.log("Error Updating Profile Data");
        // toast.error("Error Getting Profile Data");
        // return false
        return false

      }
    }
  }

  const getAllNft = async () => {
    try {

      const response = await getAllListedByUser(data.collection_address)
      // console.log('NftAll', response)
      setTotalListed(Array.isArray(response) ? response.length : 0)

    } catch (e) {
      // console.log("e", e);

    }
  }
  const getAuctionedNft = async () => {
    // console.log("NftAuctionedd");

    if (data.collection_address || activeAccount?.address) {
      try {
        // setLoadingAuctioned(true)
        const response: any = await getAllUserAuctions(data.collection_address || activeAccount?.address, signer)
        // console.log('NftAuctionedd', response)
        setTotalListedAuctioned(response.filter((item: any) => item?.isListed).length)
        // setLoadingAuctioned(false)
      } catch (e) {
        // console.log('D', e)

        // setLoadingAuctioned(false)
      }
    }
  }

  useEffect(() => {
    if (data.collection_address) {

      getAllNft();
      getAuctionedNft()
    }
  }, [data.collection_address])

  useEffect(() => {
    getProfileData(data.collection_address)
  }, [])

  return (
    <>
      <div className="cursor-pointer exploreCard w-[417px] h-[276px] rounded-2xl p-2.5 outline outline-2 outline-[#E7E7E7]" onClick={handleClick}>

        <div className="inner flex flex-col gap-3 max-w-[417px] max-h-[276px] w-full h-full">
          <div className="headerArea flex justify-start items-center gap-3 w-full">
            <div className="max-w-[65px] h-[65px] object-cover rounded-3xl w-full flex items-center justify-center">
              <img className="max-w-[65px] max-h-[65px] object-cover rounded-xl w-full h-full" src={data.image_url} alt="" />

            </div>
            <div className='flex flex-col gap-2'>
              <p className='medium font-Roboto font-bold darkBlack'>{data.collection_name ? data.collection_name : "WONDERFUL ARTWORK"}</p>
              <div className='flex gap-2'>
                <p className='small font-Roboto font-normal lightGray'>Created by <span className='font-bold'>{profile.display_name ? profile.display_name : "Unknown"} </span> </p>
                <img src={icontick} alt="" />
              </div>

            </div>
          </div>
          <div className="bodyArea w-full relative" >
            <div className='grayDiv absolute py-[8px] px-[17px] bg-[#E7E7E7] rounded-lg bottom-0 left-[38%] ex-small font-normal lightGray'> Items  &nbsp;
              <span className="itemBox darkBlack font-bold">{formatPrice(totalListed + totalListedAuctioned)}</span>
            </div>
            <img className="max-w-[397px] max-h-[178px] h-full w-full object-cover" src={profile.banner_image ? profile.banner_image : bodyImg4} alt="" />
          </div>

        </div>
      </div>

    </>
  )
}

export default ExploreCard;

