import { useWallet } from "@txnlab/use-wallet"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { buyNftWithRoyalty } from "../../fryMarketMethods"
import Button from "../shared/button"

const Reminder = ({ hide, showReminder, nftData, forList }: any) => {
  const [loading, setLoading] = useState<any>(false)
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()
  const navigate = useNavigate();
  const handleBuyNft = async () => {
    try {
      return new Promise(async (resolve, reject) => {
        try {
          if (activeAccount?.address) {
            setLoading(true);
            const response = await buyNftWithRoyalty(
              activeAccount?.address,
              nftData.assetId,
              signer,
              nftData.seller,
              nftData.price);


            console.log("response", response);
            setLoading(false);
            resolve(true)
            navigate("/artist-profile")


          }
          else {
            reject(false)

          }
        }
        catch (e) {
          setLoading(false);

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
      <div className="salesEndDiv bg-white flex flex-col mt-6">
        {
          !forList ?
            <div className="salesHeader p-5">
              <img src="/src/assets/icons/grayClock.svg" alt="" />
              <p className="lightGray font-normal text-[16px]">Listed at {(new Date(nftData.listTime * 1000)).toLocaleString()}</p>
            </div>
            :

            ""
        }
        <div className="salesBody p-5 flex flex-col gap-5 ">
          {
            !forList ?
              <div className="area1">
                <p className="ex-small lightGray font-Roboto">Current price</p>
                <p className="font-medium text-black ex-large mt-1">{nftData.price / 1000000} FRY</p>
              </div>
              :
              ""}
          <div className="area2 flex-start gap-3">

            <>
              {/* <Button className="button btn-secondary large font-medium btnBuy" minWidth={343} minHeight={44} text="Buy now"></Button> */}

              <Button className="button btn-primary large font-medium btnOffer" minWidth={343} minHeight={44} text={forList ? "List now" : "Buy now"}
                disabled={loading}
                onClick={() => {
                  if (activeAccount?.address) {
                    if (forList) {
                      navigate("/sell-method", { state: { nftData: nftData } })
                    }
                    else {
                      toast.promise(
                        handleBuyNft(),
                        {
                          pending: "NFT buying in progress ",
                          error: "There was an error Buying NFT",
                          success: "NFT bought successfully"

                        }
                      )
                    }


                  }
                  else {
                    toast.error("Please Connect Wallet First!")
                  }
                }
                }
              ></Button>

            </>


            <div >
              {/* <Button className="button btn-primary large font-medium btnOffer" minWidth={343} minHeight={44} text="Place Bid"></Button> */}

            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default Reminder
