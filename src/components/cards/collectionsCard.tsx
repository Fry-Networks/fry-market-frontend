import { useWallet } from "@txnlab/use-wallet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import whiteCard from "../../assets/home/images/whiteCard.png";
import timeIcon from "../../assets/icons/timeIcon.svg";
import { cancelAuction, claimNftRoyalty } from "../../auctionMethod";
import { buyNftWithRoyalty, cancelList, listNft } from "../../fryMarketMethods";
import BoostNft from "../../modals/boostNft";
import Button from "../shared/button";


const CollectionsCard = ({ data, showHiddenDiv, isAuctionPage, showLayer, isProfilePage, label, collectionData = {}, setGetNftDataAgain, auctionCancel }: any) => {
  const [isSoldbtn, setIsSoldBtn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()
  const navigate = useNavigate();
  useEffect(() => {
    if (showLayer) {
      setIsSoldBtn(true);
    }
  }, [showLayer]);
  useEffect(() => {
    if (showHiddenDiv) {
      setIsVisible(true);
    }
  }, [showHiddenDiv]);


  // const [isSoldbtn, setIsSoldBtn] = useState(false);
  // const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showLayer) {
      setIsSoldBtn(true);
    }
  }, [showLayer]);
  useEffect(() => {
    if (showHiddenDiv) {
      setIsVisible(true);
    }
  }, [showHiddenDiv]);

  const [isboostmodal, setisboostmodal] = useState(false);

  const showBoostModal = () => {
    setisboostmodal(true);
  };

  const handleListNft = async () => {


    try {
      return new Promise(async (resolve, reject) => {
        try {
          if (activeAccount?.address) {

            const response = await listNft(activeAccount?.address, data.index, signer, 1000000);


            console.log("response", response);
            resolve(true)


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
  const handleBuyNft = async () => {
    try {
      return new Promise(async (resolve, reject) => {
        try {
          if (activeAccount?.address) {

            const response = await buyNftWithRoyalty(
              activeAccount?.address,
              data.assetId,
              signer,
              data.seller,
              data.price);


            console.log("response", response);
            resolve(true)


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

  const handleClaimNft = async () => {


    try {
      return new Promise(async (resolve, reject) => {
        try {
          if (activeAccount?.address) {

            const response = await claimNftRoyalty(activeAccount.address, signer, data.index, data.params.bidContract, data.params.price, data.params.sellerId)
            // (
            //   activeAccount?.address,
            //   data.assetId,
            //   signer,
            //   data.seller,
            //   data.price);


            console.log("response", response);
            resolve(true)


          }
        }
        catch (e) {
          console.log("Error While Claiming nft", e);

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

            const response = await cancelList(activeAccount.address, data.index, signer);
            // (
            //   activeAccount?.address,
            //   data.assetId,
            //   signer,
            //   data.seller,
            //   data.price);


            console.log("response", response);
            setGetNftDataAgain((prev: any) => !prev)
            resolve(true)


          }
        }
        catch (e) {
          console.log("Error While Claiming nft", e);

          reject(false);
        }

      })



    }
    catch (e) {
      console.log("Error Uploading Image", e);
      return e;
    }




  }
  const handleCancelNftAuction = async () => {


    try {
      return new Promise(async (resolve, reject) => {
        try {
          if (activeAccount?.address) {
            console.log("heheWell", data);

            const response = await cancelAuction(activeAccount.address, signer, data.params.nftAddress, data.params.bidContract, signTransactions, sendTransactions);
            // (
            //   activeAccount?.address,
            //   data.assetId,
            //   signer,
            //   data.seller,
            //   data.price);


            console.log("response", response);
            setGetNftDataAgain((prev: any) => !prev)
            resolve(true)


          }
        }
        catch (e) {
          console.log("Error While Claiming nft", e);

          reject(false);
        }

      })



    }
    catch (e) {
      console.log("Error Uploading Image", e);
      return e;
    }




  }

  function replaceJsonWithPng(str: any) {
    return str.includes('.json') ? str.replace('.json', '.png') : str;
  }

  return (
    <>
      <div onClick={(() => (
        navigate("/nft-detail")
      ))} className="collectionCard flex flex-col gap-2 relative cursor-pointer">
        <img className=" max-w-[388px] max-h-[411px] w-full h-full whiteCard absolute top-0 left-0 -z-20" src={whiteCard} alt="" />
        <div className="Cardheader flex justify-start items-center gap-2">
          <div className="t-left-part max-w-[53px] max-h-[53px] w-full h-full">
            <img className="w-full h-full object-cover rounded-full" src={collectionData?.image_url ? collectionData?.image_url : data?.userImg} alt="" />
          </div>
          <div className="t-right-part w-4/5 flex flex-col gap-2">
            <p className="medium font-Apex font-light darkBlack ">
              {data?.name ? data?.name : data?.params?.name ? data?.params?.name : "NFT"}
            </p>
            <p className="ex-small font-light font-Roboto lightGray opacity-80">
              @{collectionData?.collection_name ? collectionData?.collection_name : "collection"}
            </p>
          </div>
        </div>
        <div className="cardBody relative">
          <div
            className={` ${isSoldbtn ? " " : "hidden"
              } absolute w-full h-full top-0 left-0 flex items-center justify-center z-30`}
          >
            <div className="absolute w-full h-full top-0 left-0 bg-black opacity-40 rounded-xl"></div>
            <Button
              className="relative z-10 button ex-small font-semibold rounded-lg outline-[3px] outline-solid outline-[rgba(253,253,253,0.15)] font-Apex text-white bg-[linear-gradient(318deg,_#FD0000_26.88%,_#BB5151_105.85%,_#FDFDFD_15%)]"
              minWidth={96}
              minHeight={37}
              text="Sold"

            />
          </div>
          <div
            className={`${isVisible ? "" : "hidden"
              } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-lg py-2.5 px-4 bg-white bg-opacity-80`}
          >
            <p className="medium font-medium darkBlack">3:06:59:18</p>
          </div>
          <div className="absolute p-3 bottom-0 flex justify-between items-center w-full">
            {isAuctionPage ? (
              <div className="cursor-pointer rounded-lg p-2.5 bg-white flex justify-between items-center gap-4">
                <p className="ex-small darkBlack font-medium font-Roboto">
                  In Stock
                </p>
                <p className="ex-small lightGray font-medium font-Roboto">7</p>
              </div>
            ) : (
              isProfilePage ? (
                <Button
                  className="button btn-primary font-medium ex-small border-none"
                  minWidth={56}
                  minHeight={36}
                  text="Boost"
                  onClick={showBoostModal}
                />
              ) : (
                <Button
                  className="button btn-primary font-medium ex-small"
                  minWidth={56}
                  minHeight={36}
                  text={label ? label : "List"}
                  onClick={() => {


                    if (label == "Buy") {
                      toast.promise(
                        handleBuyNft(),
                        {
                          pending: "NFT buying in progress ",
                          error: "There was an error Buying NFT",
                          success: "NFT bought successfully"

                        }
                      )
                    }
                    else if (label == "List") {

                      navigate("/sell-method", { state: { nftData: data } })

                      // toast.promise(
                      //   handleListNft(),
                      //   {
                      //     pending: "NFT is lisitng",
                      //     error: "There was an error Listing NFT",
                      //     success: "NFT listed successfully"

                      //   }
                      // )

                    }
                    else if (label == "Claim") {

                      // navigate("/sell-method", { state: { nftData: data } })

                      toast.promise(
                        handleClaimNft(),
                        {
                          pending: "NFT claiming in progress",
                          error: "There was an error Claiming NFT",
                          success: "NFT claimed successfully"

                        }
                      )

                    }
                    else if (label == "Cancel" && auctionCancel) {
                      toast.promise(
                        handleCancelNftAuction(),
                        {
                          pending: "NFT Auction Cancellation in progress",
                          error: "There was an error Cancelling NFT Auction",
                          success: "NFT Auction Cancelled successfully"

                        }
                      )
                    }
                    else if (label == "Cancel") {
                      toast.promise(
                        handleCancelNftList(),
                        {
                          pending: "NFT Listing Cancellation in progress",
                          error: "There was an error Cancelling NFT Listing",
                          success: "NFT List Cancelled successfully"

                        }
                      )
                    }


                  }}
                />
              )
            )}
            {
              data.price ?
                <button className="p-3 bg-white flex gap-2 items-center">
                  <span className="ex-small darkBlack fw-medium">Price:</span>

                  <div className="flex gap-1">
                    <img src={timeIcon} alt="" />
                    <span className="ex-small lightGray font-medium">
                      {data.price / 1000000}
                    </span>
                  </div>

                </button>
                :

                ""}
          </div>
          <img className="rounded-lg max-w-[292px] max-h-[314px] w-full h-full object-cover" src={data?.params?.url ? replaceJsonWithPng(data?.params?.url) : data?.imgUrl ? replaceJsonWithPng(data?.imgUrl) : data.nftImg} alt="" />
        </div>
      </div>


      <BoostNft
        isboostmodal={isboostmodal}
        setisboostmodal={setisboostmodal}
      />
    </>
  );
};

export default CollectionsCard;
