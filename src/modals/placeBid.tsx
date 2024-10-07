import { useWallet } from "@txnlab/use-wallet";
import { Modal } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import redline from "../assets/modals/redLine.png";
import { createBid } from "../auctionMethod";
import Button from "../components/shared/button";

const PlaceBid = ({ isbidmodal, setisbidmodal, data, getAuctionedNft }: any) => {
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()

  const [bidAmount, setBidAMount] = useState(0);

  const handleOk = () => {
    setisbidmodal(false);
  };

  const handleCancel = () => {
    setisbidmodal(false);
    console.log("Modal should close now");
  };

  const handleBidNft = async () => {


    try {
      return new Promise(async (resolve, reject) => {
        try {
          if (activeAccount?.address) {

            const response = await createBid(activeAccount.address, signer, data.nftAddress, data.bidContract, bidAmount * 1000000, signTransactions, sendTransactions);


            console.log("response", response);
            if (typeof (response) == "string" && response.includes("Error")) {
              reject(false);
              return;
            }
            resolve(true)
            getAuctionedNft();
            handleOk();

          }
        }
        catch (e) {
          reject(false);
        }

      })



    }
    catch (e) {
      console.log("Error Uploading Image", e);
      return e;

    }




  }

  return (
    <>
      <Modal
        open={isbidmodal}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
        width={415}
        footer={null}
      >
        <div style={{ zIndex: "9999" }} className="connectModal z-[9999]">
          <div className="w-full">
            <p className="fw-bold ex-large font-Apex font-normal darkBlack text-center">
              Place your bid
            </p>
          </div>
          <div className="innerContent flex flex-col items-center gap-5 mt-4 ">

            <img src={redline} alt="" />
            <div className="enterAmount flex flex-col justify-start gap-2 w-full mb-5 mt-3">
              <p className="darkBlack font-Roboto medium font-normal">Enter bid amount</p>
              <input className="rounded-lg py-3.5 px-6 w-full border-solid border-2 border-[red]" placeholder="Minimum bid 3.52 FRY " type="number" value={bidAmount} onChange={(e: any) => setBidAMount(e.target.value)} />
            </div>
            {/* <div className="serviceDiv w-full flex justify-between items-center">
              <p className="darkBlack font-Roboto medium font-normal">Service fee</p>
              <p className="darkBlack font-Roboto medium font-medium">0.1 FRY</p>
            </div> */}
            <img src={redline} alt="" />
            <div className="serviceDiv w-full flex justify-between items-center mb-7 mt-3">
              <p className="darkBlack font-Roboto medium font-normal">Marketplace fee</p>
              <p className="darkBlack font-Roboto medium font-medium">{bidAmount * 0.5} FRY</p>
            </div>
            <div className="serviceDiv w-full flex justify-between items-center">
              <p className="darkBlack font-Roboto medium font-normal">Total bid amount</p>
              <p className="darkBlack font-Roboto ex-large font-medium">{(Number(bidAmount) + (Number(bidAmount) * 0.5)).toFixed(2)} FRY</p>
            </div>
            <img src={redline} alt="" />

            <div className="btnWrapper w-full flex justify-between mt-3">
              <Button
                className="button btn-whiteClr medium font-Roboto font-medium bidCancel"
                width={166}
                minHeight={53}
                text="Cancel"
                onClick={handleCancel}
              ></Button>

              <Button
                className="button btn-primary medium font-Roboto font-medium bidPlace"
                width={166}
                minHeight={53}
                text="Place bid"
                onClick={() => {
                  if (Number(bidAmount) > Number((data.highestBidAmount / 1000000) + (data.minBidAmount / 1000000))) {
                    toast.promise(
                      handleBidNft(),
                      {
                        pending: "Biding is in place",
                        error: "There was an error while placing a bid",
                        success: "Bid placed successfully"

                      }
                    )
                  }
                  else {
                    toast.error(`Minimum Bidding Amount should be more than ${Number((data.highestBidAmount / 1000000) + (data.minBidAmount / 1000000)).toFixed(2)}`)
                  }

                }}
              ></Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default PlaceBid;