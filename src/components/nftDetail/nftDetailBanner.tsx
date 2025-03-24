import { useWallet } from "@txnlab/use-wallet";
import { Collapse, Table } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import leftGlow from "../../assets/nftCollection/redGloww.webp";
import rightSecPic from "../../assets/nftDetail/leftPic.webp";
import rightGlow from "../../assets/topCollection/rightGlow.webp";
import { getAllBids, getSingleAuction } from "../../auctionMethod";
import { replaceJsonWithJpg, replaceJsonWithPng, truncateString } from "../../utils/getImageFromJson";
import TraitsBox from "../cards/traitsBox";
import AuctionReminder from "./auctionReminder";
import Reminder from "./reminder";


const NftDetailBanner = ({ detail, collectionData = {}, nftData = {}, profileData = {}, onlyShow, forList, forClaim }: any) => {
  const [nftMetaData, setNftMetaData] = useState<any>({});
  const [highestBid, setHighestBid] = useState<any>(0);
  const [loading, setLoading] = useState<any>(false);
  const [bidDetails, setBidDetails] = useState<any>([])
  const [isOwner, setIsOwner] = useState(false);
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()
  const [nftDataLatest, setNftDataLatest] = useState<any>(false)
  const navigate = useNavigate();

  const getNftMetaData = async (url: any) => {
    try {

      const response = await axios.get(url);
      // console.log("Meta Data Result", response.data);

      if (response.data) {
        setNftMetaData(response.data)
      }
    } catch (error) {

    }
  }

  const getBidDetails = async () => {



    try {


      setLoading(true);
      const response = await getAllBids(nftData.bidContract)
      // console.log("Nft Bids", response);
      setBidDetails(response.sort((a, b) => b.bidAmount - a.bidAmount));
      setLoading(false)

    }
    catch (e) {
      setLoading(false);
    }

  }
  const getHighestBid = async () => {



    try {


      setLoading(true);
      const response = await getSingleAuction(nftData.nftAddress)
      // console.log("Single Auction", response);
      setHighestBid(response.highestBidAmount);
      setNftDataLatest(response)
      setLoading(false)

    }
    catch (e) {
      setLoading(false);
    }

  }

  useEffect(() => {
    if (nftData.url) {
      getNftMetaData(nftData.url);
    }
    if (nftData.imgUrl) {
      getNftMetaData(nftData.imgUrl);
    }
  }, [nftData]);
  const biddingRef = useRef<any>();
  useEffect(() => {
    if (nftData.url && !forClaim) {
      biddingRef.current = setInterval(() => {
        getBidDetails();
        getHighestBid();

      }, 3000)
    }
    return () => {
      clearInterval(biddingRef.current)
    }

  }, [nftData, activeAccount])



  const offerColumns = [
    {
      title: 'Address',
      dataIndex: 'bidder',
      key: 'bidder',
      render: (text: string) => <span className="font-bold text-black">{text}</span>,
    },
    {
      title: 'Bid Amount (FRY)',
      dataIndex: 'bidAmount',
      key: 'bidAmount',
    },
    {
      title: 'Bid Date',
      dataIndex: 'bidDate',
      key: 'quantity',
    },

    {
      title: 'Bid Time',
      dataIndex: 'bidTime',
      key: 'bidTime',
    }
  ];
  const listingColumnsNew = [
    {
      title: 'Owner Address',
      dataIndex: 'ownerAddress',
      key: 'ownerAddress',
      render: (text: string) => <span className="font-bold text-black">{text}</span>,
    },
    {
      title: 'List Count',
      dataIndex: 'listCount',
      key: 'listCount',
    },
    {
      title: 'List Date',
      dataIndex: 'listDate',
      key: 'listDate',
    },
    {
      title: 'List Time',
      dataIndex: 'listTime',
      key: 'listTime',
    },
  ];

  const getFee = () => {
    if (nftData) {
      if (nftData.list_count == 1) {
        return (Number(nftData.price) / 100000000) * 3
      }
      else {
        return (Number(nftData.price) / 100000000) * 1
      }
    }
    else {
      return 0
    }
  }

  useEffect(() => {
    if (activeAccount?.address) {

      if (nftData.seller == activeAccount?.address && nftData.isListed) {
        setIsOwner(true);
      }
    }

  }, [nftData, activeAccount])
  return (
    <>
      <div className="nftDetailBannerWrapper mb-52 relative">
        <img src={leftGlow} className="leftGlow absolute top-[-400px] left-0 -z-10" alt="" />
        <img src={rightGlow} className=" rightGlow absolute top-[-200px] right-0 -z-10" alt="" />
        <div className="container">
          <div className="topSection flex items-start gap-6 mt-10">
            <div className="leftArea w-[546px]  flex flex-col gap-7 ">
              <img className=" max-w-[546px] max-h-[610px] object-cover w-full h-full rounded-3xl border-solid border-[19px] border-[#fff] " src={nftData.url || nftData.imgUrl ? replaceJsonWithPng(nftData.url || nftData.imgUrl) : rightSecPic} alt="" onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = nftData.url || nftData.imgUrl ? replaceJsonWithJpg(nftData.url || nftData.imgUrl) : rightSecPic
              }} />
              <div className="descriptionAccordion">
                <Collapse
                  defaultActiveKey={"1"}
                  expandIconPosition="end"
                  items={[
                    {
                      key: "1",
                      label: (
                        <div className="custom-label">
                          <div className="flex items-center gap-3">
                            <img src="/src/assets/icons/menuLines.svg" alt="" />
                            <span className="lightGray font-Roboto font-normal medium">
                              Description
                            </span>
                          </div>
                        </div>
                      ),
                      children: (
                        <>
                          <p className="lightGray font-Roboto font-normal medium">
                            By
                            <span className="darkBlack font-medium cursor-pointer" onClick={() => navigate("/top-collection", { state: { profile: profileData, collectionData: collectionData } })}>
                              {" "}
                              {collectionData.collection_name ? collectionData.collection_name : "Unknown"}
                            </span>
                          </p>
                          <p className="ex-small lightGray font-normal font-Roboto">
                            {
                              nftMetaData.description ?
                                nftMetaData.description :

                                `Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Mauris eu feugiat felis, in maximus neque.
                            Morbi rutrum est interdum, suscipit erat et, mattis
                            ante. Donec at diam pulvinar, pulvinar orci vitae,
                            luctus mauris..`}
                          </p>
                        </>
                      ),
                    },
                  ]}
                />
              </div>

              <div className="descriptionAccordion">
                <Collapse
                  defaultActiveKey={"1"}
                  expandIconPosition="end"
                  items={[
                    {
                      key: "1",
                      label: (
                        <div className="custom-label">
                          <div className="flex items-center gap-3">
                            <img src="/src/assets/icons/pricetag.svg" alt="" />
                            <span className="lightGray font-Roboto font-normal medium">
                              Traits
                            </span>
                          </div>
                        </div>
                      ),
                      children: (
                        <>
                          <div className="grid grid-cols-3 gap-2">

                            {
                              nftMetaData.properties ?
                                Object.keys(nftMetaData.properties).map((traitName, index) => (
                                  <TraitsBox data={{ traitName: traitName, traitValue: nftMetaData.properties[traitName] }} />
                                ))

                                :
                                "No Traits Added"}
                          </div>
                        </>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
            <div className="rightArea ps-5 w-3/5 flex flex-col gap-5 ">
              <div className="pixacioDiv">
                <h2 className="font-normal font-Apex uppercase leading-[82px]">{nftData.name ? nftData.name : "PIXACIO"}</h2>
                <p className="lightGray text-[20px] font-normal font-Roboto">Owned by <span className="darkBlack font-semibold cursor-pointer" onClick={() => {
                  if (activeAccount?.address == profileData?.wallet_address) {
                    navigate("/artist-profile")

                  }
                  else {
                    navigate("/artist-profile-others", { state: { profileData: profileData } })

                  }

                }}>{profileData.display_name ? profileData.display_name : "Unknown"}</span></p>
              </div>

              {!onlyShow || isOwner || nftData.isListed ? detail ?
                <Reminder nftData={nftDataLatest ? nftDataLatest : nftData} forList={forList} forClaim={forClaim} />

                :

                <AuctionReminder nftData={nftDataLatest ? nftDataLatest : nftData} highestBid={highestBid} />

                :

                ""
              }
              {
                !onlyShow && !forList ?
                  <div className="listingAccordion">
                    <Collapse
                      defaultActiveKey={"1"}
                      expandIconPosition="end"
                      items={[
                        {
                          key: "1",
                          label: (
                            <div className="custom-label">
                              <div className="flex items-center gap-3">
                                <img src="/src/assets/icons/dotedMenu.png" alt="" />
                                <span className="lightGray font-Roboto font-normal medium">
                                  {detail ? "Listing Details" : "Offers"}
                                </span>
                              </div>
                            </div>
                          ),
                          children: (
                            <>

                              {detail ?

                                <Table
                                  columns={listingColumnsNew}
                                  dataSource={
                                    [
                                      {
                                        ownerAddress: truncateString(nftData.seller), listCount: nftData.list_count, listDate: (new Date(nftData.listTime * 1000)).toLocaleDateString(), listTime: (new Date(nftData.listTime * 1000)).toLocaleTimeString()
                                      }
                                    ]
                                  }
                                  pagination={false}
                                />

                                :
                                <Table
                                  columns={offerColumns}
                                  dataSource={bidDetails.map((bidDetail: any) => (
                                    {
                                      bidder: truncateString(bidDetail.bidder), bidAmount: bidDetail.bidAmount / 1000000, bidDate: (new Date(bidDetail.bidTime * 1000)).toLocaleDateString(), bidTime: (new Date(bidDetail.bidTime * 1000)).toLocaleTimeString()
                                    }
                                  ))}
                                  pagination={false}
                                />
                              }

                            </>
                          ),
                        },
                      ]}
                    />
                  </div>
                  :
                  ""}
              <div className="detailsAccordion">
                <Collapse
                  defaultActiveKey={"1"}
                  expandIconPosition="end"
                  items={[
                    {
                      key: "1",
                      label: (
                        <div className="custom-label">
                          <div className="flex items-center gap-3">
                            <img src="/src/assets/icons/detailIcon.svg" alt="" />
                            <span className="lightGray font-Roboto font-normal medium">
                              Details
                            </span>
                          </div>
                        </div>
                      ),
                      children: (
                        <>
                          <div className="flex flex-col gap-3">


                            <div className="w-full flex justify-between">
                              <p className="lightGray small font-normal font-Roboto">Contract Address</p>
                              <p className="lightGray small font-normal font-Roboto">0x5848...1713</p>
                            </div>

                            <div className="w-full flex justify-between">
                              <p className="lightGray small font-normal font-Roboto">Token ID</p>
                              <p className="lightGray small font-normal font-Roboto">{nftData.nftAddress || nftData.assetId ? nftData.nftAddress || nftData.assetId : "Unabel to get"}</p>
                            </div>


                            <div className="w-full flex justify-between">
                              <p className="lightGray small font-normal font-Roboto">Token Standard</p>
                              <p className="lightGray small font-normal font-Roboto">ARC-3</p>
                            </div>


                            <div className="w-full flex justify-between">
                              <p className="lightGray small font-normal font-Roboto">Chain</p>
                              <p className="lightGray small font-normal font-Roboto">Algorand</p>
                            </div>


                            <div className="w-full flex justify-between">
                              <p className="lightGray small font-normal font-Roboto">Creator Earnings</p>
                              <p className="lightGray small font-normal font-Roboto">{collectionData?.royalty ? collectionData?.royalty : "0"}%</p>
                            </div>
                            {nftData.list_count && <div className="w-full flex justify-between">
                              <p className="lightGray small font-normal font-Roboto">Fee</p>
                              <p className="lightGray small font-normal font-Roboto">{getFee()} Fry</p>
                            </div>}

                          </div>
                        </>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default NftDetailBanner;
