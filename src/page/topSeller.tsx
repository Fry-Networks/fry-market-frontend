import { useWallet } from '@txnlab/use-wallet'
import { Table } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bannerback from '../assets/home/images/topSeller/bannerBack.webp'
import ts2 from '../assets/images/topSellers/ts2.jpg'
import ts3 from '../assets/images/topSellers/ts3.jpg'
import ts1 from '../assets/images/topSellers/tss1.webp'
import leftGlow from '../assets/nftCollection/redGlow.webp'
import ReadyForNext from '../components/home/readyForNext'
import BackButton from '../components/shared/backButton'
import { truncateString } from '../utils/getImageFromJson'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const TopSeller = () => {
  const [profileData, setProfileData] = useState<any>({})
  const { activeAccount } = useWallet()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleRowClick = (record: any) => {
    console.log("Clicked profile:", record?.allProfileData);

    if (activeAccount?.address == record?.allProfileData?.wallet_address) {
      navigate('/artist-profile')
    } else {
      // Fixed: Changed 'artist-profile-other' to 'artist-profile-others'
      navigate(`/artist-profile-others/${record.allProfileData.wallet_address}`, {
        state: { profileData: record.allProfileData }
      })
    }
  }
  const getProfileData = async () => {
    try {
      // const config = {
      //   headers: { Authorization: `Bearer ${token}` }
      // };

      const response: any = await axios.get(`${baseUrl}/get-all-profiles`)
      console.log("All Profiles", response.data);
      setProfileData(response.data)
      // return true;
    } catch (e) {
      // console.log("Error Updating Profile Data");
      // toast.error("Error Getting Profile Data");
      // return false
    }
  }

  useEffect(() => {
    getProfileData()
  }, [])

  interface DataType {
    key: string
    collection: string
    volume: number
    follower: number
    percentage: string
    price: string
    items: string
    image: string
  }

  const columns = [
    {
      title: 'Profile',
      dataIndex: 'image',
      key: 'image',
      width: '330px',
      render: (_: any, record: any, index: number) => (
        <div className="flex items-center">
          {/* <span className="mr-4">{String(index + 1).padStart(2, '0')}</span> */}
          <img src={record.image} alt={record.collection} className="mr-4 w-10 h-10 object-cover rounded-full" />
          <span>{record.collection}</span>
        </div>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: '156px',

      render: (text: any) => (
        <div className="flex items-center">
          {/* <img src={logo} alt="icon" className="mr-2" /> */}
          <span>{text}</span>
        </div>
      ),
    },
    // {
    //   title: "Followers",
    //   dataIndex: "follower",
    //   key: "follower",
    //   width: "172px",
    // },
    // {
    //   title: "24%",
    //   dataIndex: "percentage",
    //   key: "percentage",
    //   width: "172px",
    // },
    // {
    //   title: "Floor Price",
    //   dataIndex: "price",
    //   key: "price",
    //   width: "156px",
    //   render: (text: any) => (
    //     <div className="flex items-center">
    //       <img src={logo} alt="icon" className="mr-2" />
    //       <span>{text}</span>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Items",
    //   dataIndex: "items",
    //   key: "items",
    //   width: "100px",
    // },
  ]

  const handleChange = (value: any) => {
    // console.log(`selected ${value}`);
  }

  // console.log(data);

  return (
    <>
      <div className="topSell relative overflow-hidden">
        <img
          className="bannerBack absolute top-[-80px] left-0 -z-10 w-full max-w-full object-cover"
          src={bannerback}
          alt=""
          style={{ maxWidth: '100vw' }}
        />
        <img className="absolute left-0 bottom-0 -z-10" src={leftGlow} alt="" />
        <div className="container">
          {/* Back Button */}
          <div className="backButtonSection pt-6 mb-6">
            <BackButton />
          </div>

          <div className="flex bannerWrapper  gap-[146px] items-center h-[80vh]">
            <div className="headingDiv w-1/2">
              <h2 className="font-bold font-Apex darkBlack">
                {/* TOP <br /> */}
                <span className="primary text-[128px]"> SELLERS</span>
              </h2>
            </div>
            <div className="relative sellerImages w-1/2">
              <img
                src={ts1}
                alt="image"
                className=" tsImage max-w-[362px] max-h-[397px] w-full h-full object-cover rounded-3xl z-30 relative"
              />
              <img
                src={ts3}
                alt="image"
                className="tsImage  max-w-[362px] max-h-[397px] w-full h-full object-cover rounded-3xl absolute left-24 top-0 rotate-[20deg]"
              />
              <img
                src={ts2}
                alt="image"
                className="tsImage max-w-[362px] max-h-[397px] w-full h-full object-cover rounded-3xl absolute left-11 top-0 rotate-[10deg]"
              />
            </div>
          </div>



          <div className="collectionTable relative">
            <Table
              columns={columns}
              dataSource={
                profileData.length > 0
                  ? profileData
                    .filter((data: any) => (data.wallet_address ? true : false))
                    .map((profileData: any, index: any) => ({
                      image:
                        profileData.profile_image ||
                        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                      collection: profileData.display_name || 'Unknown',
                      address: truncateString(profileData.wallet_address),
                      allProfileData: profileData,
                    }))
                  : []
              }
              pagination={false}
              rowClassName="cursor-pointer"
              onRow={(record) => ({
                onClick: () => handleRowClick(record),
              })}
              className="mb-[199px] sellerTable"
            />
          </div>
        </div>
      </div>

      <ReadyForNext />
    </>
  )
}

export default TopSeller
