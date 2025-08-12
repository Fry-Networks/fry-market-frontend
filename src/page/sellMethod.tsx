import { useWallet } from '@txnlab/use-wallet';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import auctionPrice from "../assets/artistsProfile/auction.png";
import fixedPrice from "../assets/artistsProfile/fixedPrice.png";
import sellImg from "../assets/artistsProfile/sell.webp";
import fryIcon from "../assets/icons/fryIcon.svg";
import tick from "../assets/icons/priceTick.svg"; // Import tick icon
import bgBack from "../assets/sellMethod/bgGlow.webp";
import { listNftAuction } from '../auctionMethod';
import BackButton from "../components/shared/backButton";
import Button from "../components/shared/button";
import { listNft } from '../fryMarketMethods';
import { replaceJsonWithJpg, replaceJsonWithPng } from '../utils/getImageFromJson';


const SellMethod = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("fixed");
  const [price, setPrice] = useState<any>(0);
  const [minimumBidAmount, setMinimumBidAmount] = useState<any>(0);
  const [nftData, setData] = useState<any>({})
  const [biddingDuration, setBiddingDuration] = useState<any>("")
  const [biddingDurationValue, setBiddingDurationValue] = useState<any>({});
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()
  const [loading, setLoading] = useState<any>(false)

  const location = useLocation();
  const handleMethodSelect = (method: any) => {
    setSelectedMethod(method);
  };
  const handleChange = (value: any) => {
    // console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };

  const onDateChange = (e: any) => {
    const currentDate = new Date();
    // console.log(currentDate.getTime());
    const selectedDate = new Date(e?.target?.value)
    // console.log("ff", selectedDate.getTime());



    setBiddingDuration((prev: any) => ({ ...prev, [e.target.name]: Math.floor(selectedDate?.getTime() / 1000) }))
    setBiddingDurationValue((prev: any) => ({ ...prev, [e.target.name]: selectedDate.toISOString().slice(0, 16) }))



  }

  const handleListNft = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (activeAccount?.address) {
          setLoading(true);
          console.log("nftData.nftAddress", nftData)
          const response: any = await listNft(activeAccount?.address, nftData.nftAddress, signer, price * 1000000);
          // console.log("response", response);
          setLoading(false);
          if (response == undefined) {
            loading(false)
            reject(false)
            return
          }
          resolve(true)
          navigate("/artist-profile")

        }
      }
      catch (e) {
        setLoading(false);

        reject(false);
      }

    })
  }
  const handleAuctionNft = async () => {



    return new Promise(async (resolve, reject) => {
      try {
        if (activeAccount?.address) {
          setLoading(true);
          const response: any = await listNftAuction(activeAccount?.address, signer, nftData.nftAddress, price * 1000000, minimumBidAmount * 1000000, biddingDuration.biddingStartTime, biddingDuration.biddingEndTime);

          if (response == undefined) {
            loading(false)

            reject(false)
            return
          }
          // console.log("response", response);
          setLoading(false);

          resolve(true)
          navigate("/artist-profile")

        } else {
          reject(false)
        }
      }
      catch (e) {
        setLoading(false);
        reject(false);
      }

    })
  }


  const handleSubmit = () => {
    if (price) {
      if (selectedMethod == "fixed") {
        toast.promise(
          handleListNft(),
          {
            pending: "NFT is listng",
            error: "There was an error Listing NFT",
            success: "NFT listed successfully"

          }
        )
      }
      else {
        const currentDate = new Date();

        if (biddingDuration.biddingStartTime && biddingDuration.biddingEndTime && minimumBidAmount) {
          if (biddingDuration.biddingStartTime > Math.floor(currentDate.getTime() / 1000)) {

            if (biddingDuration.biddingEndTime > biddingDuration.biddingStartTime) {
              toast.promise(
                handleAuctionNft(),
                {
                  pending: "NFT is listng on auction",
                  error: "There was an error Listing NFT on auction",
                  success: "NFT listed on auction successfully"

                }
              )
            }
            else {
              toast.error("Bidding end date should be more than bidding start date")

            }

          }
          else {
            toast.error("You can only select future dates")
          }
        }
        else {
          toast.error("Please fill all fields")
        }
      }
    }
    else {
      toast.error("Please fill all fields")

    }
  }

  useEffect(() => {
    // console.log("gg", biddingDuration);

  }, [biddingDuration])

  useEffect(() => {
    if (location.state) {
      console.log("Nft Data in sell method", location.state.nftData);
      setData(location.state?.nftData)

    }
  }, [])

  return (
    <>
      <div className="sellMethodContainer relative">
        <img className='absolute top-0 -z-30' src={bgBack} alt="" />
        <div className="container">
          <div className="inner my-20 flex gap-[20px] h-full">
            <div className="leftArea w-1/4 flex flex-col justify-start gap-5">
              <BackButton
                onClick={() => navigate("/artist-profile")}
                className="shadow-[4px_4px_15px_0px_rgba(0,0,0,0.20)] w-[126px] h-[64px] rounded-2xl bg-white large darkBlack font-normal"
                text="Back"
              />
              <img className='  border-solid border-[20px] border-[white] rounded-3xl ' src={nftData?.url ? replaceJsonWithPng(nftData?.url) : sellImg} alt="" onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = nftData?.url ? replaceJsonWithJpg(nftData?.url) : sellImg
              }} />
              <p className="ex-large darkBlack font-medium font-Roboto">
                Preview your item
              </p>
            </div>
            <div
              style={{ boxShadow: "4px 4px 15px 0px rgba(0, 0, 0, 0.20)" }}
              className="rightArea w-3/4 rounded-2xl py-9 px-24 bg-white flex flex-col justify-start gap-5 mt-24"
            >
              <h3 className="w-full text-center font-Apex font-normal">
                {nftData?.params?.name ? nftData?.params?.name : " Royal Samurai"}
              </h3>
              <div className="mt-6">
                <h5 className="text-[26px] darkBlack font-semibold font-Roboto">
                  Select Your Sell Method
                </h5>
                <div className="selectMethodContainer flex gap-7 mt-6">
                  <div
                    onClick={() => handleMethodSelect("fixed")}
                    className={`rounded-xl w-[207px] h-[217px] relative flex flex-col gap-3 justify-center items-center ${selectedMethod === "fixed" ? "bg-gray-200" : ""
                      }`}
                    style={{
                      boxShadow:
                        "2.809px 2.809px 10.534px 0px rgba(0, 0, 0, 0.20)",
                    }}
                  >
                    {selectedMethod === "fixed" && (
                      <img
                        src={tick}
                        alt="tick"
                        className="absolute top-2 right-2 w-6 h-6"
                      />
                    )}
                    <img src={fixedPrice} alt="" />
                    <p className="darkBlack font-medium font-Roboto large">
                      Fixed Price
                    </p>
                  </div>
                  <div
                    onClick={() => handleMethodSelect("auction")}
                    className={`rounded-xl w-[207px] h-[217px] flex relative flex-col gap-3 justify-center items-center ${selectedMethod === "auction" ? "bg-gray-200" : ""
                      }`}
                    style={{
                      boxShadow:
                        "2.809px 2.809px 10.534px 0px rgba(0, 0, 0, 0.20)",
                    }}
                  >
                    {selectedMethod === "auction" && (
                      <img
                        src={tick}
                        alt="tick"
                        className="absolute top-2 right-2 w-6 h-6"
                      />
                    )}
                    <img src={auctionPrice} alt="" />
                    <p className="darkBlack font-medium font-Roboto large">
                      Auction
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-3 priceBox rounded-xl">
                <label className="darkBlack large font-medium font-Roboto">
                  {selectedMethod == "fixed" ? "Price" : "Start Amount"}
                </label>
                <div className="flex justify-start items-center gap-3 enterPrice">
                  <div className="py-[10px] px-[20px]  border-2 border-solid border-[#E7E7E7] rounded-2xl flex gap-2  fryText">
                    <img src={fryIcon} alt="" />
                    FRY</div>
                  <input
                    placeholder="Enter price for one item"
                    type="number"
                    className="w-full py-[12px] px-[20px]  rounded-2xl border-solid border-[#E7E7E7] border-2"
                    value={price}
                    onChange={(e) => { setPrice(e.target.value) }}
                  />
                </div>
              </div>

              {
                selectedMethod === "auction" && (
                  <>
                    <div className="flex flex-col gap-1 mt-3 ">
                      <label className="darkBlack large font-medium font-Roboto">
                        Minimum Bid Amount
                      </label>
                      <div className="flex justify-start items-center gap-3 enterPrice">
                        <div className="py-[8px] px-[20px]  border-2 border-solid border-[#E7E7E7] rounded-lg flex gap-2  fryText">
                          <img src={fryIcon} alt="" />
                          FRY</div>
                        <input
                          placeholder="Enter price for one item"
                          type="number"
                          className="w-full py-[12px] px-[20px]  rounded-xl border-solid border-[#E7E7E7] border-2"
                          value={minimumBidAmount}
                          onChange={(e) => { setMinimumBidAmount(e.target.value) }}
                        />
                      </div>
                    </div>
                    <div className="mt-3 flex flex-col gap-2 duration priceBox rounded-xl">
                      <label className="darkBlack large font-medium font-Roboto">
                        Bidding Start Time
                      </label>


                      <input
                        placeholder="1 month"
                        type="datetime-local"
                        className="w-full py-[12px] px-[20px]  rounded-xl border-solid border-[#E7E7E7] border-2 mt-3"
                        name='biddingStartTime'
                        // value={biddingDuration.biddingStartTime}
                        min={new Date().toISOString().slice(0, 16)}
                        onChange={onDateChange}
                      />
                      {/* <div className="w-full selectDiv">
                      <Select
                        labelInValue
                        defaultValue={{
                          value: 'lucy',
                          label: 'Select time',
                        }}
                        style={{
                          width: 770,
                          fontSize: 18,
                          color: "#808080"
                        }}
                        onChange={handleChange}
                        options={[
                          {
                            value: 'day1',
                            label: '1 Day',
                          },
                          {
                            value: 'week1',
                            label: '1 Week',
                          },

                          {
                            value: 'month1',
                            label: '1 Month',
                          },
                          {
                            value: 'custom',
                            label: 'Custom',
                          },
                        ]}
                      />
                    </div> */}


                    </div>

                    <div className="mt-3 flex flex-col gap-2 duration">
                      <label className="darkBlack large font-medium font-Roboto">
                        Bidding End Time
                      </label>


                      <input
                        placeholder="1 month"
                        type="datetime-local"
                        className="w-full py-[12px] px-[20px]  rounded-xl border-solid border-[#E7E7E7] border-2 mt-3"
                        name='biddingEndTime'
                        // value={biddingDuration.biddingEndTime}
                        min={new Date().toISOString().slice(0, 16)}
                        onChange={onDateChange}
                      />



                    </div>


                  </>
                )
              }

              {/* {
                selectedMethod === "fixed" && (
                  <div className="mt-3">
                    <label className="darkBlack large font-medium font-Roboto">
                      Schedule Listing
                    </label>


                    <input
                      placeholder="1 month"
                      type="number"
                      className="w-full py-[12px] px-[20px]  rounded-xl border-solid border-[#E7E7E7] border-2 mt-3"
                    />

                  </div>
                )
              } */}


              {/* {selectedMethod === "auction" && (
                <div className="extraInput mt-4">
                  <label className="darkBlack large font-medium font-Roboto">
                    Additional Info
                  </label>
                  <input
                    placeholder="Enter price for one item"
                    type="text"
                    className="w-full py-[19px] px-[30px] rounded-xl border-solid border-[#E7E7E7] border-2 mt-3"
                  />
                </div>
              )} */}
              {/* <div className="chooseCollection my-3">
                <p className="darkBlack large font-medium font-Roboto">
                  Choose Collection
                </p>
                <p className="lightGray text-[16px] font-Roboto font-normal mt-2">
                  (this is the collection where your item will appear)
                </p>
                <div className="newCollectionDiv flex gap-4 mt-4">
                  <div className="createNewCollection rounded-xl border-solid border-[#E7E7E7] border-2 p-[15px] flex justify-start gap-3 w-1/2">
                    <div className="grayDiv p-[16px] bg-[#E7E7E7] flex-center rounded-xl">
                      <img src={plus} alt="" />
                    </div>
                    <div className="rightContnt flex flex-col justify-center">
                      <p className="darkBlack medium font-medium font-Roboto">
                        Create new collection
                      </p>
                      <p className="lightGray small font-Roboto font-normal mt-2">
                        Type to create
                      </p>
                    </div>
                  </div>
                  <div className="createNewCollection rounded-xl border-solid border-[#E7E7E7] border-2 p-[15px] flex justify-start gap-3 w-1/2">
                    <div className="grayDiv bg-[#E7E7E7] flex-center rounded-xl">
                      <img src={newCollect} alt="" />
                    </div>
                    <div className="rightContnt flex flex-col justify-center">
                      <p className="darkBlack medium font-medium font-Roboto">
                        Wonderful Artwork
                      </p>
                      <p className="lightGray small font-Roboto font-normal mt-2">
                        Items{" "}
                        <span className="font-medium darkBlack">1.5k</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="submitBtn w-full flex justify-end items-center">
                <Button
                  className="button btn-primary medium font-Roboto font-medium"
                  minWidth={139}
                  minHeight={53}
                  text="Submit"
                  onClick={handleSubmit}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellMethod;
