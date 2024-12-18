import { useWallet } from "@txnlab/use-wallet";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import whiteCard from "../../assets/home/images/whiteCard.png";
import timeIcon from "../../assets/icons/timeIcon.svg";
import { cancelAuction } from "../../auctionMethod";
import PlaceBid from "../../modals/placeBid";
import { formatPrice, replaceJsonWithJpg, truncateImageName } from "../../utils/getImageFromJson";
import Button from "../shared/button";

const AuctionProfileCard = ({ data, showHiddenDiv, isAuctionPage, showLayer, isProfilePage, label, collectionData = {}, setGetNftDataAgain, auctionCancel, otherAuction, otherAuctionData, otherList, profileOwned }: any) => {
    const navigate = useNavigate();
    const [isbidmodal, setisbidmodal] = useState(false);
    const [btnLoader, setBtnLoader] = useState(false);
    const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()

    useEffect(() => {
        console.log("ggg", data);
        console.log("ggg", collectionData);
        console.log("ggg", activeAccount?.address);

    })
    const showplaceBidModal = () => {
        setisbidmodal(true);
    };

    function replaceJsonWithPng(str: any) {
        return str ? str.includes('.json') ? str.replace('.json', '.png') : str : "";
    }
    const handleCancelNftAuction = async () => {


        try {
            return new Promise(async (resolve, reject) => {
                try {
                    if (activeAccount?.address) {
                        setBtnLoader(true)
                        console.log("heheWell", data);
                        setBtnLoader(true)

                        const response = await cancelAuction(activeAccount.address, signer, data.params.nftAddress, data.params.bidContract, signTransactions, sendTransactions, data.params.highestBidder);
                        // (
                        //   activeAccount?.address,
                        //   data.assetId,
                        //   signer,
                        //   data.seller,
                        //   data.price);

                        if (typeof (response) == "string" && response?.includes("Input is not a 64-bit unsigned integer")) {
                            setBtnLoader(false)
                            reject(false)
                            return;
                        }
                        console.log("response", response);
                        setGetNftDataAgain((prev: any) => !prev)
                        setBtnLoader(false)

                        resolve(true)


                    }
                    else {
                        setBtnLoader(false)

                        reject(false)

                    }
                }
                catch (e) {
                    console.log("Error While Claiming nft", e);
                    setBtnLoader(false)

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
            <div onClick={(() => {
                if (true) {
                    if (otherAuction) {

                        navigate("/auction-detail", { state: { data: otherAuctionData, collectionData } })
                    } else {
                        if (otherList) {
                            if (label == "Minted") {
                                console.log("Ff", data);

                                navigate("/nft-detail", { state: { data: data, collectionData, onlyShow: true } })

                            }
                            else if (label == "List" && profileOwned) {
                                navigate("/nft-detail", { state: { data: data, collectionData, forList: true } })

                            }
                            else {

                                navigate("/nft-detail", { state: { data: otherAuctionData, collectionData, onlyShow: true } })
                            }
                        }
                        else {

                            navigate("/nft-detail", { state: { data, collectionData } })
                        }
                    }

                }



            }
            )} className='auctionCard flex flex-col gap-2 relative cursor-pointer'>
                <img className="whiteCard absolute top-0 left-0 -z-20 max-w-[388px] max-h-[430px] w-full h-full" src={whiteCard} alt="" />
                <div className="Cardheader flex justify-start gap-2">
                    <div className="t-left-part w-[53px] h-[53px] ">
                        <img className="w-full h-full object-cover rounded-full" src={collectionData.image_url ? collectionData.image_url : ""} alt="" />
                    </div>
                    <div className="t-right-part w-4/5 flex flex-col gap-2">
                        <p className="medium font-Apex font-light darkBlack ">
                            {data.name ? truncateImageName(data.name) : "NFT"}
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
                        text={collectionData?.collection_address == activeAccount?.address ? "Cancel" : "View"}
                        // disabled={(data.biddingEndTime * 1000) < Date.now()}
                        onClick={() => {

                        }}
                    />
                    <div
                        className="z-50 timimgDiv  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-lg py-2.5 px-4 bg-white bg-opacity-80"
                    >
                        {/* <p className="medium font-medium darkBlack">3:06:59:18</p> */}
                        <p className="medium font-medium darkBlack">
                            {data.biddingEndTime && <Countdown date={Date.now() + ((data.biddingEndTime * 1000) - Date.now())} />}
                        </p>
                    </div>

                    <div className="absolute p-3 bottom-0 flex justify-between items-center w-full z-50">

                        <div className="cursor-pointer rounded-lg p-2.5 bg-white flex justify-between items-center gap-4">
                            <p className="ex-small darkBlack font-medium font-Roboto">
                                Min raise
                            </p>
                            <p className="ex-small lightGray font-medium font-Roboto">{formatPrice(parseInt(data.minBidAmount) / 1000000)}</p>
                        </div>



                        <button className="p-3 bg-white flex gap-2 items-center">
                            <span className="ex-small darkBlack fw-medium">Highest Bid:</span>
                            <div className="flex gap-1">
                                <img src={timeIcon} alt="" />
                                <span className="ex-small lightGray font-medium">
                                    {formatPrice(parseInt(data.highestBidAmount) / 1000000)}
                                </span>
                            </div>
                        </button>
                    </div>
                    <div className="relative">


                        <img className="rounded-lg w-[292px] h-[314px] object-cover" src={replaceJsonWithPng(data.url)} alt="" onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = replaceJsonWithJpg(data.url);
                        }} />
                        {(data?.url?.includes("/AI/")) ?
                            <div className="absolute top-2 right-2 bg-black p-1 rounded-lg">
                                <p className="primary font-semibold medium ">AI</p>
                            </div>
                            :
                            ""
                        }
                    </div>
                </div>
            </div>


            <PlaceBid
                isbidmodal={isbidmodal}
                setisbidmodal={setisbidmodal}
                data={data}
            />
        </>
    )
}

export default AuctionProfileCard;