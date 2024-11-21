import { useWallet } from "@txnlab/use-wallet"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { buyNftWithRoyalty, cancelList, getSingleNftlistData } from "../../fryMarketMethods"
import Button from "../shared/button"

const Reminder = ({ hide, showReminder, nftData: nftDataFromProps, forList }: any) => {
  const [loading, setLoading] = useState<any>(false)
  const [isOwner, setOwner] = useState(false);
  const [nftData, setNftData] = useState<any>({})
  const [ownerSectionsVisible, setOwnerSectionsVisible] = useState(false);
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

  const handleCancelNftList = async () => {


    try {
      return new Promise(async (resolve, reject) => {
        try {


          if (activeAccount?.address) {
            setLoading(true)
            const response: any = await cancelList(activeAccount.address, nftData.assetId, signer);
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
            console.log("response", response);
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
          console.log("Error While Claiming nft", e);
          setLoading(false)

          reject(false);
        }

      })



    }
    catch (e) {
      console.log("Error Uploading Image", e);
      return e;
    }

  }

  const getRecentListingData = async () => {



    try {


      const response = await getSingleNftlistData(nftDataFromProps.assetId)
      console.log("Single Listing Data", response);
      setNftData(response)

      // return (Number(bidAmount) > Number((response.highestBidAmount / 1000000) + (data.minBidAmount / 1000000)))

    }
    catch (e) {

      console.log("Error getting Single Nft Detail");
    }
  }

  useEffect(() => {
    if (!activeAccount?.address) {
      return;
    }
    if (nftData.seller == activeAccount?.address) {
      setOwnerSectionsVisible(true)
    }

    if (nftData.seller == activeAccount?.address && nftData.isListed) {
      setOwner(true);
    }

    getRecentListingData();
  }, [nftData, activeAccount])

  return (
    <>
      <div className="salesEndDiv bg-white flex flex-col mt-6">
        {
          !forList && !ownerSectionsVisible ?
            <div className="salesHeader p-5">
              <img src="/src/assets/icons/grayClock.svg" alt="" />
              <p className="lightGray font-normal text-[16px]">Listed at {(new Date(nftData.listTime * 1000)).toLocaleString()}</p>
            </div>
            :

            ""
        }
        <div className="salesBody p-5 flex flex-col gap-5 ">
          {
            !forList && !ownerSectionsVisible ?
              <div className="area1">
                <p className="ex-small lightGray font-Roboto">Current price</p>
                <p className="font-medium text-black ex-large mt-1">{nftData.price ? nftData.price / 1000000 : 0} FRY</p>
              </div>
              :
              ""}
          <div className="area2 flex-start gap-3">

            <>
              {/* <Button className="button btn-secondary large font-medium btnBuy" minWidth={343} minHeight={44} text="Buy now"></Button> */}

              <Button className="button btn-primary large font-medium btnOffer" minWidth={343} minHeight={44} text={isOwner ? nftData.isListed ? "Cancel" : "List now" : forList ? "List now" : "Buy now"}
                disabled={loading}
                onClick={() => {
                  if (activeAccount?.address) {
                    if (isOwner && !nftData.isListed) {
                      navigate("/sell-method", { state: { nftData: nftDataFromProps } })
                    }
                    if (isOwner) {
                      toast.promise(
                        handleCancelNftList(),
                        {
                          pending: "NFT Listing Cancellation in progress",
                          error: "There was an error Cancelling NFT Listing",
                          success: "NFT List Cancelled successfully"

                        }
                      )
                    }
                    else if (forList) {
                      navigate("/sell-method", { state: { nftData: nftDataFromProps } })
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
