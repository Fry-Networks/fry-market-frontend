import { useWallet } from "@txnlab/use-wallet";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cancelAuction } from "../../auctionMethod";
import PlaceBid from "../../modals/placeBid";
import Button from "../shared/button";

const AuctionReminder = ({ hide, showReminder, nftData, highestBid }: any) => {
  const [loading, setLoading] = useState<any>(false)
  const [isbidmodal, setisbidmodal] = useState(false);
  const [isOwner, setOwner] = useState(false);
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()
  const navigate = useNavigate()
  const location = useLocation();
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

  const handleCancelNftAuction = async () => {

    if (activeAccount?.address) {

      try {
        return new Promise(async (resolve, reject) => {
          try {
            if (activeAccount?.address) {

              setLoading(true)

              const response = await cancelAuction(activeAccount.address, signer, nftData.nftAddress, nftData.bidContract, signTransactions, sendTransactions, nftData.highestBidder);
              // (
              //   activeAccount?.address,
              //   data.assetId,
              //   signer,
              //   data.seller,
              //   data.price);

              if (typeof (response) == "string" && response?.includes("Input is not a 64-bit unsigned integer")) {
                setLoading(false)
                reject(false)
                return;
              }
              // console.log("response", response);
              // setGetNftDataAgain((prev: any) => !prev)
              navigate("/artist-profile")
              setLoading(false)

              resolve(true)


            }
            else {
              setLoading(false)

              reject(false)

            }
          }
          catch (e) {
            // console.log("Error While Claiming nft", e);
            setLoading(false)

            reject(false);
          }

        })



      }
      catch (e) {
        // console.log("Error Uploading Image", e);
        return e;
      }
    }
    else {
      // console.log("Please connect your wallet!");
      return;

    }




  }

  useEffect(() => {
    // console.log("d", nftData);
    // console.log("d", activeAccount?.address);
    // console.log("ff", isOwner);
    if (activeAccount?.address) {

      if (nftData.sellerId == activeAccount?.address) {
        // console.log("goes");

        setOwner(true);
      }
    }

  }, [nftData, activeAccount])

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
            <p className="font-medium text-black ex-large mt-1">{highestBid ? parseInt(highestBid) ? parseInt(highestBid) / 1000000 : parseInt(nftData.highestBidAmount) / 1000000 : 0} FRY</p>
          </div>
          <div className="area2 flex-start gap-3">
            <>
              {/* <h1>hjflkhdlkfh</h1> */}
              {/* <Button className="button btn-secondary large font-medium btnBuy" minWidth={343} minHeight={44} text="Buy now"></Button> */}

              <Button className="button btn-primary large font-medium btnOffer" minWidth={343} minHeight={44} text={`${isOwner ? "Cancel" : "Place bid"}`} disabled={isOwner ? false : (nftData.biddingEndTime * 1000) < Date.now()}
                onClick={() => {
                  if (isOwner) {
                    toast.promise(
                      handleCancelNftAuction(),
                      {
                        pending: "NFT Auction Cancellation in progress",
                        error: "There was an error Cancelling NFT Auction",
                        success: "NFT Auction Cancelled successfully"

                      }
                    )
                  }
                  else {
                    showplaceBidModal()

                  }


                }
                }></Button>

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
