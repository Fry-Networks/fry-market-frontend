import { useState } from "react";
import Countdown from "react-countdown";
import whiteCard from "../../assets/home/images/whiteCard.png";
import timeIcon from "../../assets/icons/timeIcon.svg";
import PlaceBid from "../../modals/placeBid";
import Button from "../shared/button";

const AuctionCard = ({ data, getAuctionedNft, collectionData }: any) => {
  const [isbidmodal, setisbidmodal] = useState(false);

  const showplaceBidModal = () => {
    setisbidmodal(true);
  };



  return (
    <>
      <div className='auctionCard flex flex-col gap-2 relative'>
        <img className="whiteCard absolute top-0 left-0 -z-20" src={whiteCard} alt="" />
        <div className="Cardheader flex justify-start gap-2">
          <div className="t-left-part max-w-[53px] max-h-[53px] w-full h-full">
            <img className="w-full h-full object-cover rounded-full" src={collectionData.image_url ? collectionData.image_url : ""} alt="" />
          </div>
          <div className="t-right-part w-4/5 flex flex-col gap-2">
            <p className="medium font-Apex font-light darkBlack ">
              {data.name}
            </p>
            <p className="ex-small font-light font-Roboto lightGray opacity-80">
              @{collectionData?.collection_name ? collectionData?.collection_name : "collection"}
            </p>
          </div>
        </div>
        <div className="cardBody relative">


          <Button
            className="placeBidBtn button font-Montserrat btn-primary font-semibold ex-small absolute -bottom-9 opacity-0 left-[90px]"
            minWidth={96}
            minHeight={37}
            text="Place a Bid"
            onClick={showplaceBidModal}
          />
          <div
            className="z-50 timimgDiv  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-lg py-2.5 px-4 bg-white bg-opacity-80"
          >
            {/* <p className="medium font-medium darkBlack">3:06:59:18</p> */}
            <p className="medium font-medium darkBlack">
              <Countdown date={Date.now() + ((data.biddingEndTime * 1000) - Date.now())} />
            </p>
          </div>

          <div className="absolute p-3 bottom-0 flex justify-between items-center w-full z-50">

            <div className="cursor-pointer rounded-lg p-2.5 bg-white flex justify-between items-center gap-4">
              <p className="ex-small darkBlack font-medium font-Roboto">
                Min raise
              </p>
              <p className="ex-small lightGray font-medium font-Roboto">{data.minBidAmount / 1000000}</p>
            </div>



            <button className="p-3 bg-white flex gap-2 items-center">
              <span className="ex-small darkBlack fw-medium">Highest Bid:</span>
              <div className="flex gap-1">
                <img src={timeIcon} alt="" />
                <span className="ex-small lightGray font-medium">
                  {data.highestBidAmount / 1000000}
                </span>
              </div>
            </button>
          </div>
          <img className="rounded-lg max-w-[292px] max-h-[314px] w-full h-full object-cover" src={data.url} alt="" />
        </div>
      </div>


      <PlaceBid
        isbidmodal={isbidmodal}
        setisbidmodal={setisbidmodal}
        data={data}
        getAuctionedNft={getAuctionedNft}
      />
    </>
  )
}

export default AuctionCard;