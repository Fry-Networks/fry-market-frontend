import { useWallet } from "@txnlab/use-wallet";
import { Tabs } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userImg1 from "../../assets/home/images/card-userImg.png";
import search from "../../assets/icons/search.svg";
import trendNft1 from "../../assets/topCollection/nftImg1.png";
import trendNft10 from "../../assets/topCollection/nftImg10.png";
import trendNft11 from "../../assets/topCollection/nftImg11.png";
import trendNft12 from "../../assets/topCollection/nftImg12.png";
import trendNft13 from "../../assets/topCollection/nftImg13.png";
import trendNft14 from "../../assets/topCollection/nftImg14.png";
import trendNft2 from "../../assets/topCollection/nftImg2.png";
import trendNft3 from "../../assets/topCollection/nftImg3.png";
import trendNft4 from "../../assets/topCollection/nftImg4.png";
import trendNft5 from "../../assets/topCollection/nftImg5.png";
import trendNft6 from "../../assets/topCollection/nftImg6.png";
import trendNft7 from "../../assets/topCollection/nftImg7.png";
import trendNft8 from "../../assets/topCollection/nftImg8.png";
import trendNft9 from "../../assets/topCollection/nftImg9.png";
import AuctionProfileCard from "../cards/auctionProfileCard";
import CollectionsCard from "../cards/collectionsCard";
import Loader from "../Loader";
import Input from "../shared/input";





const PixoNft = ({ nfts, collectionData, auctionedNfts, allBoughtNft, loadingBought, loadingListed, loadingAuctioned }: any) => {
  const [activeKey, setActiveKey] = useState(`1`)
  const { activeAccount, signer } = useWallet()

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/nft-detail");
  };

  const onTopList = (key: any) => {
    console.log(key);
  };

  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  const handleSearchChange = (event: any) => {
    console.log("dd", event.target.value);

    setSearchTerm(event.target.value);
  };


  const filteredCards = trendingCard.filter(card =>
    card.userName.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const onChange = (key: any) => {
    setActiveKey(key)
    console.log(key)
  }
  return (
    <>
      <div className="pixoNftContainer mb-52 relative">

        {/* <div className="absolute top-0 left-0 w-[200px] z-50 collapseDiv">


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
                    <hr className="h-[2px] bg-black w-[97%] mx-auto" />
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
                        key: "1-2",
                        label: "price",
                        children: (
                          <>
                            <div className="w-full flex items-center justify-center  gap-3 mt-3">
                              <input type="number" placeholder='Min' className="bg-black  border-[3px] border-solid rounded-lg border-[red] text-white flex-center w-[76px] h-[44px] flex justify-center items-center ps-6" />

                              <p>to</p>
                              <input type="number" placeholder='Max' className="bg-black border-[3px] border-solid rounded-lg border-[red] text-white flex-center w-[76px] h-[44px] flex justify-center items-center ps-6" />

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
                        key: "1-7",
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
        <img src={rightGlow} className="absolute right-0 top-[200px] -z-50" alt="" />
        <img src={leftGlow} className="absolute left-0 bottom-[-400px] -z-50" alt="" />
        <img src={pixoGrid} className='absolute right-0 bottom-[-150px] -z-50' alt="" /> */}

        <div className="container">
          <div className="inner">
            <div className="searchDiv w-auto flex justify-end items-center mb-14">
              <Input
                wrapperClass="flex items-center justify-center border-2 border-solid border[#243c5a] bg-trasparent"
                icon={search}
                placeholder="Search by name"
                inputClass="medium font-normal bg-transparent font-Roboto flex items-center justify-center lightGray  border-2 border[#243c5a]"
                width={613}
                height={55}
                type="text"
                className="lightGray  border-2  border[#243c5a] bg-transparent"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div className="container">
              <div className="nftContainer">
                <Tabs className="collectionTab" defaultActiveKey="1" activeKey={activeKey} onChange={onChange} tabBarStyle={{ padding: 0 }}>

                  <Tabs.TabPane tab="Owned" key="1">
                    {loadingBought ? (
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Loader></Loader>
                      </div>
                    ) : (
                      <>

                        {allBoughtNft.length > 0 ?
                          (
                            <div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
                              {allBoughtNft.map((data: any, index: any) => (
                                searchTerm ? data.name.toUpperCase().includes(searchTerm.toUpperCase()) ?
                                  <CollectionsCard
                                    // data={{ index: data.nftAddress, params: data }} 
                                    data={{ ...data, imgUrl: data.url }}
                                    // otherList={address ? true : false} 
                                    otherList={true}
                                    profileOwned={false}
                                    otherAuctionData={data}
                                    label={activeAccount?.address ? "" : "List"} collectionData={collectionData} />
                                  :
                                  index == allBoughtNft.length - 1 ? allBoughtNft.filter((data: any) => data.name.toUpperCase().includes(searchTerm.toUpperCase())).length > 0 ? "" : "No Result Found" : ""
                                  :
                                  <CollectionsCard
                                    // data={{ index: data.nftAddress, params: data }} 
                                    data={{ ...data, imgUrl: data.url }}
                                    // otherList={address ? true : false} 
                                    otherList={true}
                                    profileOwned={false}
                                    otherAuctionData={data}
                                    label={activeAccount?.address ? "" : "List"} collectionData={collectionData} />

                              ))}
                            </div>
                          ) : (
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>No Nft Owned yet.</div>
                          )}

                      </>
                    )
                    }



                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Listed" key="2">


                    {loadingListed ? (
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Loader></Loader>
                      </div>
                    ) : (
                      <>
                        {nfts.length > 0 ? (
                          <div className="cardsWrap grid grid-cols-4 gap-6">
                            {/* {filteredCards.map((data) => (
                    <div key={data.id} onClick={handleCardClick} className="cursor-pointer">
                      <CollectionsCard data={data} />
                    </div>
                  ))} */}
                            {nfts.length > 0 ? nfts.map((data: any, index: any) => {
                              console.log("ss", searchTerm);
                              // console.log("ss", data.name.includes(searchTerm));

                              return (
                                searchTerm ? data.name.toUpperCase().includes(searchTerm.toUpperCase()) ?
                                  <div key={data.id} className="cursor-pointer">
                                    <CollectionsCard
                                      // data={{ index: data.nftAddress, params: data }}
                                      data={data}

                                      label="Nft" collectionData={collectionData} />
                                  </div>
                                  :
                                  index == nfts.length - 1 ? nfts.filter((data: any) => data.name.toUpperCase().includes(searchTerm.toUpperCase())).length > 0 ? "" : "No Result Found" : ""
                                  :
                                  <div key={data.id} className="cursor-pointer">
                                    <CollectionsCard
                                      // data={{ index: data.nftAddress, params: data }} 
                                      data={data}
                                      label="Nft" collectionData={collectionData} />
                                  </div>
                              )
                            })
                              :
                              "No Nfts Found"}
                          </div>
                        ) : (
                          // Show "NFT not found" when no search results
                          <div className="text-center mt-10">
                            <p className="text-red-500 font-bold text-xl">No Results Found</p>
                          </div>
                        )}
                      </>
                    )
                    }

                  </Tabs.TabPane>

                  <Tabs.TabPane tab="Auctioned" key="3">



                    {loadingAuctioned ? (
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Loader></Loader>
                      </div>
                    ) : (
                      <>
                        {auctionedNfts.length > 0 ? (
                          <div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
                            {auctionedNfts.map((data: any, index: any) => (
                              searchTerm ? data.name.toUpperCase().includes(searchTerm.toUpperCase()) ?
                                <AuctionProfileCard data={data} otherAuction={true} otherAuctionData={data} label="Cancel" collectionData={collectionData} auctionCancel={true} setGetNftDataAgain={() => { }} otherList={true}
                                  profileOwned={!activeAccount?.address && true}
                                />
                                :
                                index == auctionedNfts.length - 1 ? auctionedNfts.filter((data: any) => data.name.toUpperCase().includes(searchTerm.toUpperCase())).length > 0 ? "" : "No Result Found" : ""
                                :
                                <AuctionProfileCard data={data} otherAuction={true} otherAuctionData={data} label="Cancel" collectionData={collectionData} auctionCancel={true} setGetNftDataAgain={() => { }} otherList={true}
                                  profileOwned={!activeAccount?.address && true}
                                />
                            ))}
                          </div>
                        ) : (
                          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', color: 'red' }}>
                            No Nfts listed on Auction yet!
                          </div>
                        )}
                      </>
                    )
                    }

                  </Tabs.TabPane>


                </Tabs>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  );
};

export default PixoNft;

const trendingCard = [
  {
    id: 1,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft1,
    price: "142.02",
  },
  {
    id: 2,
    userImg: userImg1,
    userName: "ALICE JOHNSON",
    userEmail: "@Alice Johnson",
    nftImg: trendNft2,
    price: "142.02",
  },
  {
    id: 3,
    userImg: userImg1,
    userName: "BOB SMITH",
    userEmail: "@Bob Smith",
    nftImg: trendNft3,
    price: "142.02",
  },
  {
    id: 4,
    userImg: userImg1,
    userName: "CHARLIE BROWN",
    userEmail: "@Charlie Brown",
    nftImg: trendNft4,
    price: "142.02",
  },
  {
    id: 5,
    userImg: userImg1,
    userName: "MASON CLARK",
    userEmail: "@Mason Clark ",
    nftImg: trendNft5,
    price: "142.02",
  },
  {
    id: 6,
    userImg: userImg1,
    userName: "JOE SMITH",
    userEmail: "@Joe Smith",
    nftImg: trendNft6,
    price: "142.02",
  },
  {
    id: 7,
    userImg: userImg1,
    userName: "ALLISON REED",
    userEmail: "@Allison Reed",
    nftImg: trendNft7,
    price: "142.02",
  },
  {
    id: 8,
    userImg: userImg1,
    userName: "TOM WILLIAMS",
    userEmail: "@Tom Williams",
    nftImg: trendNft8,
    price: "142.02",
  },
  {
    id: 9,
    userImg: userImg1,
    userName: "HOPPER MARTIN",
    userEmail: "@Hopper Martin",
    nftImg: trendNft9,
    price: "142.02",
  },
  {
    id: 10,
    userImg: userImg1,
    userName: "GEORGE TAYLOR",
    userEmail: "@George Taylor",
    nftImg: trendNft10,
    price: "142.02",
  },
  {
    id: 11,
    userImg: userImg1,
    userName: "ISSAC LEWIS",
    userEmail: "@Issac Lewis",
    nftImg: trendNft11,
    price: "142.02",
  },
  {
    id: 12,
    userImg: userImg1,
    userName: "JESSICA HALL",
    userEmail: "@Jessica Hall",
    nftImg: trendNft12,
    price: "142.02",
  },
  {
    id: 13,
    userImg: userImg1,
    userName: "LUCAS YOUNG",
    userEmail: "@Lucas Young",
    nftImg: trendNft13,
    price: "142.02",
  },
  {
    id: 14,
    userImg: userImg1,
    userName: "NATHAN KING",
    userEmail: "@Nathan King",
    nftImg: trendNft14,
    price: "142.02",
  },

];
