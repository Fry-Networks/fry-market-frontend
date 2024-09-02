import { DownOutlined, FilterOutlined,  ReloadOutlined } from '@ant-design/icons';
import { TreeSelect } from 'antd';
import { useRef, useState } from 'react';
import trendingNft1 from "../../assets/home/images/auction/auctionImg1.png";
import trendingNft2 from "../../assets/home/images/auction/auctionImg2.png";
import trendingNft3 from "../../assets/home/images/auction/auctionImg3.png";
import trendingNft4 from "../../assets/home/images/auction/auctionImg4.png";
import trendingNft5 from "../../assets/home/images/auction/auctionImg5.png";
import trendingNft6 from "../../assets/home/images/auction/auctionImg6.png";
import trendingNft7 from "../../assets/home/images/auction/auctionImg7.png";
import trendingNft8 from "../../assets/home/images/auction/auctionImg8.png";
import userImg1 from "../../assets/home/images/card-userImg.png";
import '../../style/page/auction/topListed.scss';
import AuctionCard from '../cards/auctionCard';
import "../../style/page/auction/topListed.scss";
import rightGlow from "../../assets/auction/rightGlow.png";
import { Collapse } from "antd";
import filter from "../../assets/icons/filter.svg";
import Button from "../shared/button";
import search from "../../assets/icons/search.svg";
import refresh from "../../assets/icons/refresh.svg";




const TopListed = () => {
  const [value, setValue] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(true); // Initially open
  const selectRef = useRef(null);
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness.
`;
  const onChange = (newValue: any) => {
    setValue(newValue);
  };
  const handleRefresh = () => {

    console.log("Refresh button clicked!");

  };
  const itemsNest = [
    {
      key: "1",
      label: "This is panel nest panel",
      children: <p>{text}</p>,
    },
  ];
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownVisibleChange = (open: any) => {
    if (open) {
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  };
  const onTopList = (key :any) => {
    console.log(key);
  };
  return (
    <>
      <div className="topListedSection relative mb-52 mt-14">
      <img className="absolute right-0 top-32 -z-20" src={rightGlow} alt="" />
        <div className="absolute top-0 left-0 w-[200px] z-30 collapseDiv">
      

          <Collapse
           defaultActiveKey={['1']}
            onChange={onTopList}
            items={[
              {
                key: "1",
                id: "first-element",
                label: (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <span className="flex items-center">
                        <img src={filter} className="mr-2" alt="" />
                      </span>
                    </div>
                    {/* <hr className="h-[2px] bg-black w-[97%] mx-auto" /> */}
                  </>
                ),
                children: (
                  <Collapse
                 
                
                    items={[
                      {
                        key: "1-1",
                        label: (
                          <div className="flex items-center justify-between">
                            <span>Popular</span>
                            <span className="count">15</span>
                          </div>
                        ),
                        children: (
                          <>
                            {/* <p>{text}</p> */}
                           
                          </>
                        ),
                      },
                      {
                        key: "1-2",
                        label: "price",
                        children: (
                          <>
                          <div className="w-full flex items-center justify-center gap-2 mt-3">
                            <input type="number"  placeholder='Min' className="bg-black border-solid border-[3px] border-solid rounded-lg border-[red] text-white flex-center w-[76px] h-[44px] flex justify-center items-center ps-6" />
                           
                            <p>to</p>
                            <input type="number"  placeholder='Max' className="bg-black border-solid border-[3px] border-solid rounded-lg border-[red] text-white flex-center w-[76px] h-[44px] flex justify-center items-center ps-6" />

                          </div>
                         <div className="mt-5 w-full flex-center">
                         <Button
                  className="button btn-primary font-Roboto text-[15px] font-medium"
                  minWidth={197}
                  minHeight={41}
                  text="Apply"
           
                />
                         </div>
                          </>
                        )
                      },

                      {
                        key: "1-3",
                        label: (
                          <div className="flex items-center justify-between">
                            <span>Background</span>
                            <span className="count">20</span>
                          </div>
                        ),
                        children: (
                          <>
                        <div className="w-full flex justify-start gap-2 items-center  border-solid border-2 border-[#E7E7E7] py-2.5 px-3.5 rounded-lg">
                        <img src={search} alt="" />
                          <input 
                           type="search" className="w-full lightGray text-[16px] font-Roboto font-normal" placeholder="Search" />
                       
                        </div>

                        <div className="nftBg w-full flex flex-col gap-3 mt-3">
                          <div className="whiteClr flex justify-between items-center">
                            <div className="leftPart flex items-center gap-2">
                              <div className="box w-[44px] h-[44px] border-solid border-2 border-[#E7E7E7]  rounded-lg"></div>
                              <p className="darkBlack medium font-Roboto font-normal">White</p>
                            </div>
                            <div className="rightPart">
                              <p className="darkBlack medium font-Roboto font-normal ">37</p>
                            </div>

                          </div>


                          <div className="whiteClr flex justify-between items-center">
                            <div className="leftPart flex items-center gap-2">
                              <div className="box w-[44px] h-[44px] border-solid border-2 border-[#E7E7E7] bg-[red]  rounded-lg"></div>
                              <p className="darkBlack medium font-Roboto font-normal">Red</p>
                            </div>
                            <div className="rightPart">
                              <p className="darkBlack medium font-Roboto font-normal ">5</p>
                            </div>

                          </div>




                          <div className="whiteClr flex justify-between items-center">
                            <div className="leftPart flex items-center gap-2">
                              <div className="box w-[44px] h-[44px] border-solid border-2 border-[#E7E7E7] bg-blue-400  rounded-lg"></div>
                              <p className="darkBlack medium font-Roboto font-normal">Light Blue</p>
                            </div>
                            <div className="rightPart">
                              <p className="darkBlack medium font-Roboto font-normal ">10</p>
                            </div>

                          </div>
                        </div>
                           
                          </>
                        ),
                      },


                      {
                        key: "1-4",
                        label: (
                          <div className="flex items-center justify-between">
                            <span>Clothing</span>
                            <span className="count">110</span>
                          </div>
                        ),
                        children: (
                          <>
                        <div className="w-full flex justify-start gap-2 items-center  border-solid border-2 border-[#E7E7E7] py-2.5 px-3.5 rounded-lg">
                        <img src={search} alt="" />
                          <input 
                           type="search" className="w-full lightGray text-[16px] font-Roboto font-normal" placeholder="Search" />
                       
                        </div>

                        <div className="nftBg w-full flex flex-col gap-3 mt-3">
                          <div className="whiteClr flex justify-between items-center">
                            <div className="leftPart flex items-center gap-2">
                              <div className="box w-[44px] h-[44px] border-solid border-2 border-[#E7E7E7]  rounded-lg"></div>
                              <p className="darkBlack medium font-Roboto font-normal">White</p>
                            </div>
                            <div className="rightPart">
                              <p className="darkBlack medium font-Roboto font-normal ">37</p>
                            </div>

                          </div>


                          <div className="whiteClr flex justify-between items-center">
                            <div className="leftPart flex items-center gap-2">
                              <div className="box w-[44px] h-[44px] border-solid border-2 border-[#E7E7E7] bg-[red]  rounded-lg"></div>
                              <p className="darkBlack medium font-Roboto font-normal">Red</p>
                            </div>
                            <div className="rightPart">
                              <p className="darkBlack medium font-Roboto font-normal ">5</p>
                            </div>

                          </div>




                          <div className="whiteClr flex justify-between items-center">
                            <div className="leftPart flex items-center gap-2">
                              <div className="box w-[44px] h-[44px] border-solid border-2 border-[#E7E7E7] bg-blue-400  rounded-lg"></div>
                              <p className="darkBlack medium font-Roboto font-normal">Light Blue</p>
                            </div>
                            <div className="rightPart">
                              <p className="darkBlack medium font-Roboto font-normal ">10</p>
                            </div>

                          </div>
                        </div>
                           
                          </>
                        ),
                      },


                      {
                        key: "1-5",
                        label: (
                          <div className="flex items-center justify-between">
                            <span>Eye</span>
                            <span className="count">2</span>
                          </div>
                        ),
                        children: (
                          <>
                        <div className="w-full flex justify-start gap-2 items-center  border-solid border-2 border-[#E7E7E7] py-2.5 px-3.5 rounded-lg">
                        <img src={search} alt="" />
                          <input 
                           type="search" className="w-full lightGray text-[16px] font-Roboto font-normal" placeholder="Search" />
                       
                        </div>

                        <div className="nftBg w-full flex flex-col gap-3 mt-3">
                          <div className="whiteClr flex justify-between items-center">
                            <div className="leftPart flex items-center gap-2">
                              <div className="box w-[44px] h-[44px] border-solid border-2 border-[#E7E7E7]  rounded-lg"></div>
                              <p className="darkBlack medium font-Roboto font-normal">White</p>
                            </div>
                            <div className="rightPart">
                              <p className="darkBlack medium font-Roboto font-normal ">37</p>
                            </div>

                          </div>


                          <div className="whiteClr flex justify-between items-center">
                            <div className="leftPart flex items-center gap-2">
                              <div className="box w-[44px] h-[44px] border-solid border-2 border-[#E7E7E7] bg-[red]  rounded-lg"></div>
                              <p className="darkBlack medium font-Roboto font-normal">Red</p>
                            </div>
                            <div className="rightPart">
                              <p className="darkBlack medium font-Roboto font-normal ">5</p>
                            </div>

                          </div>




                          <div className="whiteClr flex justify-between items-center">
                            <div className="leftPart flex items-center gap-2">
                              <div className="box w-[44px] h-[44px] border-solid border-2 border-[#E7E7E7] bg-blue-400  rounded-lg"></div>
                              <p className="darkBlack medium font-Roboto font-normal">Light Blue</p>
                            </div>
                            <div className="rightPart">
                              <p className="darkBlack medium font-Roboto font-normal ">10</p>
                            </div>

                          </div>
                        </div>
                           
                          </>
                        ),
                      },

                      {
                        key: "1-6",
                        label: (
                          <div className="flex items-center justify-between">
                            <span>Body Color</span>
                            <span className="count">11</span>
                          </div>
                        ),
                        children: (
                          <>
                        <div className="w-full flex justify-start gap-2 items-center  border-solid border-2 border-[#E7E7E7] py-2.5 px-3.5 rounded-lg">
                        <img src={search} alt="" />
                          <input 
                           type="search" className="w-full lightGray text-[16px] font-Roboto font-normal" placeholder="Search" />
                       
                        </div>

                        <div className="nftBg w-full flex flex-col gap-3 mt-3">
                          <div className="whiteClr flex justify-between items-center">
                            <div className="leftPart flex items-center gap-2">
                              <div className="box w-[44px] h-[44px] border-solid border-2 border-[#E7E7E7]  rounded-lg"></div>
                              <p className="darkBlack medium font-Roboto font-normal">White</p>
                            </div>
                            <div className="rightPart">
                              <p className="darkBlack medium font-Roboto font-normal ">37</p>
                            </div>

                          </div>


                          <div className="whiteClr flex justify-between items-center">
                            <div className="leftPart flex items-center gap-2">
                              <div className="box w-[44px] h-[44px] border-solid border-2 border-[#E7E7E7] bg-[red]  rounded-lg"></div>
                              <p className="darkBlack medium font-Roboto font-normal">Red</p>
                            </div>
                            <div className="rightPart">
                              <p className="darkBlack medium font-Roboto font-normal ">5</p>
                            </div>

                          </div>




                          <div className="whiteClr flex justify-between items-center">
                            <div className="leftPart flex items-center gap-2">
                              <div className="box w-[44px] h-[44px] border-solid border-2 border-[#E7E7E7] bg-blue-400  rounded-lg"></div>
                              <p className="darkBlack medium font-Roboto font-normal">Light Blue</p>
                            </div>
                            <div className="rightPart">
                              <p className="darkBlack medium font-Roboto font-normal ">10</p>
                            </div>

                          </div>
                        </div>
                           
                          </>
                        ),
                      },

                      {
                        key: "1-6",
                        label: (
                          <div className="flex items-center justify-between">
                            <span>Head</span>
                            <span className="count">33</span>
                          </div>
                        ),
                        children: (
                          <>
                        <div className="w-full flex justify-start gap-2 items-center  border-solid border-2 border-[#E7E7E7] py-2.5 px-3.5 rounded-lg">
                        <img src={search} alt="" />
                          <input 
                           type="search" className="w-full lightGray text-[16px] font-Roboto font-normal" placeholder="Search" />
                       
                        </div>

                        <div className="nftBg w-full flex flex-col gap-3 mt-3">
                          <div className="whiteClr flex justify-between items-center">
                            <div className="leftPart flex items-center gap-2">
                              <div className="box w-[44px] h-[44px] border-solid border-2 border-[#E7E7E7]  rounded-lg"></div>
                              <p className="darkBlack medium font-Roboto font-normal">White</p>
                            </div>
                            <div className="rightPart">
                              <p className="darkBlack medium font-Roboto font-normal ">37</p>
                            </div>

                          </div>


                          <div className="whiteClr flex justify-between items-center">
                            <div className="leftPart flex items-center gap-2">
                              <div className="box w-[44px] h-[44px] border-solid border-2 border-[#E7E7E7] bg-[red]  rounded-lg"></div>
                              <p className="darkBlack medium font-Roboto font-normal">Red</p>
                            </div>
                            <div className="rightPart">
                              <p className="darkBlack medium font-Roboto font-normal ">5</p>
                            </div>

                          </div>




                          <div className="whiteClr flex justify-between items-center">
                            <div className="leftPart flex items-center gap-2">
                              <div className="box w-[44px] h-[44px] border-solid border-2 border-[#E7E7E7] bg-blue-400  rounded-lg"></div>
                              <p className="darkBlack medium font-Roboto font-normal">Light Blue</p>
                            </div>
                            <div className="rightPart">
                              <p className="darkBlack medium font-Roboto font-normal ">10</p>
                            </div>

                          </div>
                        </div>
                           
                          </>
                        ),
                      },
                    ]}
                  />
                ),
              },
             
            ]}
          />
        </div>
        <div className="container">
        <div className="topListedInner flex justify-between items-center mb-10">
    <h2 className="font-normal font-Apex uppercase ">TOP LISTED</h2>
    <button className="flex items-center font-normal ex-small lightGray font-Roboto">
      <img onClick={handleRefresh}  src={refresh} className="mr-4"/> Refreshed A While Ago
    </button>
  </div>
  <div className="auctionCarContainer mt-10 grid grid-cols-4 grid-rows-3 gap-x-10 gap-y-7 relative z-20">
    {auctionData.map((data) => (
      <AuctionCard key={data.id} data={data} showHiddenDiv={true} isAuctionPage={true} />
    ))}
  </div>
        </div>
      </div>
    </>
  );
};

export default TopListed;

const auctionData = [
  {
    id: 1,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft1,
    price: "142.02",
  },
  {
    id: 2,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft2,
    price: "142.02",
  },
  {
    id: 3,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft3,
    price: "142.02",
  },
  {
    id: 4,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft4,
    price: "142.02",
  },
  {
    id: 5,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft5,
    price: "142.02",
  },
  {
    id: 6,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft6,
    price: "142.02",
  },
  {
    id: 7,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft7,
    price: "142.02",
  },
  {
    id: 8,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft8,
    price: "142.02",
  },
  {
    id: 9,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft2,
    price: "142.02",
  },
  {
    id: 10,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft5,
    price: "142.02",
  },
  {
    id: 11,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft8,
    price: "142.02",
  },
  {
    id: 12,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendingNft3,
    price: "142.02",
  },
];
