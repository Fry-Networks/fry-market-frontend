import { useState } from "react";
import PlaceBid from "../../modals/placeBid";
import Button from "../shared/button";

const AuctionReminder = ({ hide, showReminder, nftData }: any) => {
  const [isbidmodal, setisbidmodal] = useState(false);

  const showplaceBidModal = () => {
    setisbidmodal(true);
  };

  const Completionist = () => (<p style={{ color: "#FE2424" }}>Time Ended</p>);

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (

        <p>
          {days}:{hours}:{minutes}:{seconds}

        </p>

      )
    }
  };
  return (
    <>
      <div className="salesEndDiv bg-white flex flex-col mt-6">
        <div className="salesHeader p-5">
          <img src="/src/assets/icons/grayClock.svg" alt="" />
          <p className="lightGray font-normal text-[16px]">Sale ends at {(new Date(nftData.biddingEndTime * 1000)).toLocaleString()} </p>
          {/* {nftData.biddingEndTime ? (<Countdown date={Date.now() + ((nftData.biddingEndTime * 1000) - Date.now())} />) : ""} */}
          {(nftData.biddingEndTime * 1000) < Date.now() ?
            <p style={{ color: "#FE2424" }}>(Time Ended)</p>
            :
            ""
          }

        </div>
        <div className="salesBody p-5 flex flex-col gap-5 ">
          <div className="area1">
            <p className="ex-small lightGray font-Roboto">Highest Bid</p>
            <p className="font-medium text-black ex-large mt-1">{nftData.highestBidAmount / 1000000} FRY</p>
          </div>
          <div className="area2 flex-start gap-3">
            <>
              {/* <h1>hjflkhdlkfh</h1> */}
              {/* <Button className="button btn-secondary large font-medium btnBuy" minWidth={343} minHeight={44} text="Buy now"></Button> */}

              <Button className="button btn-primary large font-medium btnOffer" minWidth={343} minHeight={44} text="Place bid" disabled={(nftData.biddingEndTime * 1000) < Date.now()}
                onClick={showplaceBidModal}></Button>

            </>


            <div >
              {/* <Button className="button btn-primary large font-medium btnOffer" minWidth={343} minHeight={44} text="Place Bid"></Button> */}

            </div>


          </div>
        </div>
      </div>

      <PlaceBid
        isbidmodal={isbidmodal}
        setisbidmodal={setisbidmodal}
        data={nftData}

      />

    </>
  )
}

export default AuctionReminder 
