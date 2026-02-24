import { useWallet } from '@txnlab/use-wallet'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import whiteCard from '../../assets/home/images/whiteCard.png'
import timeIcon from '../../assets/icons/timeIcon.svg'
import { cancelAuction, claimNftRoyalty } from '../../auctionMethod'
import { buyNftWithRoyalty, cancelList, listNft } from '../../fryMarketMethods'
import BoostNft from '../../modals/boostNft'
import { formatPrice, replaceJsonWithJpg, truncateImageName } from '../../utils/getImageFromJson'
import Button from '../shared/button'

const CollectionsCard = ({
  data,
  showHiddenDiv,
  isAuctionPage,
  showLayer,
  isProfilePage,
  label,
  collectionData = {},
  setGetNftDataAgain,
  auctionCancel,
  otherAuction,
  otherAuctionData,
  otherList,
  profileOwned,
}: any) => {
  // console.log('data', data)
  // console.log('collectionData', collectionData)
  const [isSoldbtn, setIsSoldBtn] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [btnLoader, setBtnLoader] = useState(false)
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (showLayer) {
      setIsSoldBtn(true)
    }
  }, [showLayer])
  useEffect(() => {
    if (showHiddenDiv) {
      setIsVisible(true)
    }
  }, [showHiddenDiv])

  const [isboostmodal, setisboostmodal] = useState(false)

  const showBoostModal = () => {
    setisboostmodal(true)
  }

  const handleListNft = async () => {
    try {
      return new Promise(async (resolve, reject) => {
        try {
          if (activeAccount?.address) {
            const response = await listNft(activeAccount?.address, data.index, signer, 1000000)

            // console.log("response", response);
            resolve(true)
          } else {
            reject(false)
          }
        } catch (e) {
          reject(false)
        }
      })
    } catch (e) {
      // console.log("Error Uploading Image", e);
      return e
    }
  }
  const handleBuyNft = async () => {
    try {
      return new Promise(async (resolve, reject) => {
        try {
          if (activeAccount?.address) {
            // console.log('data', data)
            const response = await buyNftWithRoyalty(activeAccount?.address, data.assetId, signer, data.seller, data.price)

            // console.log("response", response);
            resolve(true)
          } else {
            reject(false)
          }
        } catch (e) {
          reject(false)
        }
      })
    } catch (e) {
      // console.log("Error Uploading Image", e);
      return e
    }
  }

  const handleClaimNft = async () => {
    try {
      return new Promise(async (resolve, reject) => {
        try {
          if (activeAccount?.address) {
            setBtnLoader(true)
            const response = await claimNftRoyalty(
              activeAccount.address,
              signer,
              data.index,
              data.params.bidContract,
              data.params.price,
              data.params.sellerId,
            )
            setBtnLoader(false)

            resolve(true)
            setGetNftDataAgain((prev: any) => !prev)
          } else {
            setBtnLoader(false)

            reject(false)
          }
        } catch (e) {
          // console.log("Error While Claiming nft", e);
          setBtnLoader(false)

          reject(false)
        }
      })
    } catch (e) {
      // console.log("Error Uploading Image", e);
      return e
    }
  }
  const handleCancelNftList = async () => {
    try {
      return new Promise(async (resolve, reject) => {
        try {
          if (activeAccount?.address) {
            setBtnLoader(true)
            const response: any = await cancelList(activeAccount.address, data.assetId, signer)

            if (typeof response == 'string' && response?.includes('Input is not a 64-bit unsigned integer')) {
              setBtnLoader(false)
              reject(false)
              return
            }
            // console.log("response", response);
            setGetNftDataAgain((prev: any) => !prev)
            setBtnLoader(false)

            resolve(true)
          } else {
            setBtnLoader(false)

            reject(false)
          }
        } catch (e) {
          // console.log("Error While Claiming nft", e);
          setBtnLoader(false)

          reject(false)
        }
      })
    } catch (e) {
      // console.log("Error Uploading Image", e);
      return e
    }
  }
  const handleCancelNftAuction = async () => {
    try {
      return new Promise(async (resolve, reject) => {
        try {
          if (activeAccount?.address) {
            setBtnLoader(true)
            setBtnLoader(true)

            const response = await cancelAuction(
              activeAccount.address,
              signer,
              data.params.nftAddress,
              data.params.bidContract,
              signTransactions,
              sendTransactions,
              data.params.highestBidder,
            )

            if (typeof response == 'string' && response?.includes('Input is not a 64-bit unsigned integer')) {
              setBtnLoader(false)
              reject(false)
              return
            }
            // console.log("response", response);
            setGetNftDataAgain((prev: any) => !prev)
            setBtnLoader(false)

            resolve(true)
          } else {
            setBtnLoader(false)

            reject(false)
          }
        } catch (e) {
          // console.log("Error While Claiming nft", e);
          setBtnLoader(false)

          reject(false)
        }
      })
    } catch (e) {
      // console.log("Error Uploading Image", e);
      return e
    }
  }

  const handleNftAddressClick = (e: any, nftAddress: number) => {
    e.stopPropagation() // Prevent the card click event
    const peraExplorerUrl = `https://explorer.perawallet.app/asset/${nftAddress}`
    window.open(peraExplorerUrl, '_blank')
  }

  const truncateAddress = (address: string | number, startChars = 6, endChars = 4) => {
    const addressStr = address.toString()
    if (addressStr.length <= startChars + endChars) return addressStr
    return `${addressStr.slice(0, startChars)}...${addressStr.slice(-endChars)}`
  }
  function replaceJsonWithPng(str: any) {
    return str.includes('.json') ? str.replace('.json', '.png') : str
  }

  return (
    <>
      <div
        onClick={() => {
          if (true) {
            if (otherAuction) {
              navigate('/auction-detail', { state: { data: otherAuctionData, collectionData } })
            } else {
              if (otherList) {
                if (label == 'Minted') {
                  // console.log("Ff", data);

                  navigate(`/nft/${data.assetId}`, { state: { data: data, collectionData, onlyShow: true } })
                } else if (label == 'List' && profileOwned) {
                  navigate(`/nft/${data.assetId}`, { state: { data: data, collectionData, forList: true } })
                } else if (label == 'Claim' && profileOwned) {
                  navigate(`/nft/${data.assetId}`, { state: { data: data, collectionData, forList: true, forClaim: true } })
                } else {
                  navigate(`/nft/${otherAuctionData?.assetId || data.assetId}`, {
                    state: { data: otherAuctionData, collectionData, onlyShow: true },
                  })
                }
              } else {
                navigate(`/nft/${data.assetId}`, { state: { data, collectionData } })
              }
            }
          }
        }}
        className="collectionCard flex flex-col gap-2 relative cursor-pointer"
      >
        <img className=" max-w-[388px] max-h-[430px] w-full h-full whiteCard absolute top-0 left-0 -z-20" src={whiteCard} alt="" />
        <div className="Cardheader flex justify-start items-center gap-2">
          <div className="t-left-part w-[53px] h-[53px] ">
            <img
              className="w-full h-full object-cover rounded-full z-10"
              src={
                data?.collectionData?.image_url
                  ? data?.collectionData?.image_url
                  : data?.userImg
                    ? data?.userImg
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              }
              alt=""
            />
          </div>
          <div className="t-right-part w-4/5 flex flex-col gap-2">
            <p className="medium font-Apex font-light darkBlack ">
              {data?.name ? truncateImageName(data?.name) : data?.params?.name ? truncateImageName(data?.params?.name) : 'NFT'}
            </p>
            <p className="ex-small font-light font-Roboto lightGray opacity-80">
              @{collectionData?.collection_name ? collectionData?.collection_name : 'collection'}
            </p>

            {/* NFT Address Display */}
            {data?.nftAddress && (
              <div
                className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={(e) => handleNftAddressClick(e, data.nftAddress)}
                title={`View on Pera Explorer: ${data.nftAddress}`}
              >
                <p className="ex-small font-medium font-Roboto text-blue-600 underline">
                  Asa ID: {truncateAddress(data.nftAddress)}
                </p>
                <svg
                  className="w-3 h-3 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
        <div className="cardBody relative">
          <div className={` ${isSoldbtn ? ' ' : 'hidden'} absolute w-full h-full top-0 left-0 flex items-center justify-center z-30`}>
            <div className="absolute w-full h-full top-0 left-0 bg-black opacity-40 rounded-xl"></div>
            <Button
              className="relative z-10 button ex-small font-semibold rounded-lg outline-[3px] outline-solid outline-[rgba(253,253,253,0.15)] font-Apex text-white bg-[linear-gradient(318deg,_#FD0000_26.88%,_#BB5151_105.85%,_#FDFDFD_15%)]"
              minWidth={96}
              minHeight={37}
              text="Sold"
            />
          </div>
          <div
            className={`${isVisible ? '' : 'hidden'
              } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-lg py-2.5 px-4 bg-white bg-opacity-80`}
          >
            <p className="medium font-medium darkBlack">3:06:59:18</p>
          </div>
          <div className="absolute p-3 bottom-0 flex justify-between items-center w-full" style={{ zIndex: '9999' }}>
            {isAuctionPage ? (
              <div className="cursor-pointer rounded-lg p-2.5 bg-white flex justify-between items-center gap-4">
                <p className="ex-small darkBlack font-medium font-Roboto">In Stock</p>
                <p className="ex-small lightGray font-medium font-Roboto">7</p>
              </div>
            ) : isProfilePage ? (
              <Button
                className="button btn-primary font-medium ex-small border-none"
                minWidth={56}
                minHeight={36}
                text="Boost"
                onClick={showBoostModal}
              />
            ) : (
              !(otherAuction || otherList) ||
              (profileOwned && (
                <Button
                  className="button btn-primary font-medium ex-small"
                  minWidth={56}
                  minHeight={36}
                  text={label ? label : 'List'}
                  disabled={btnLoader}
                  onClick={(e: any) => {
                    e.stopPropagation()

                    if (label == 'Buy') {
                      toast.promise(handleBuyNft(), {
                        pending: 'NFT buying in progress ',
                        error: 'There was an error Buying NFT',
                        success: 'NFT bought successfully',
                      })
                    } else if (label == 'List') {
                      console.log('data', data)
                      navigate('/sell-method', { state: { nftData: data } })
                    } else if (label == 'Claim') {
                      // navigate("/sell-method", { state: { nftData: data } })

                      toast.promise(handleClaimNft(), {
                        pending: 'NFT claiming in progress',
                        error: 'There was an error Claiming NFT',
                        success: 'NFT claimed successfully',
                      })
                    } else if (label == 'Cancel' && auctionCancel) {
                      toast.promise(handleCancelNftAuction(), {
                        pending: 'NFT Auction Cancellation in progress',
                        error: 'There was an error Cancelling NFT Auction',
                        success: 'NFT Auction Cancelled successfully',
                      })
                    } else if (label == 'Cancel') {
                      toast.promise(handleCancelNftList(), {
                        pending: 'NFT Listing Cancellation in progress',
                        error: 'There was an error Cancelling NFT Listing',
                        success: 'NFT List Cancelled successfully',
                      })
                    }
                  }}
                />
              ))
            )}
            {data.price ? (
              <button className="p-3 bg-white flex gap-2 items-center">
                <span className="ex-small darkBlack fw-medium">Price:</span>

                <div className="flex gap-1">
                  <img src={timeIcon} alt="" />
                  <span className="ex-small lightGray font-medium">{formatPrice(data.price / 1000000)}</span>
                </div>
              </button>
            ) : (
              ''
            )}
          </div>
          <div className="relative">
            <img
              className="rounded-lg w-[292px] h-[314px] object-cover bg-gray-100"
              src={
                data?.params?.url ? replaceJsonWithPng(data?.params?.url) : data?.imgUrl ? replaceJsonWithPng(data?.imgUrl) : data.nftImg
              }
              alt={data?.name || data?.params?.name || 'NFT'}
              loading="lazy"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null // prevents looping
                // Try JPG fallback first
                if (data?.params?.url && !currentTarget.src.includes('.jpg')) {
                  currentTarget.src = replaceJsonWithJpg(data?.params?.url)
                } else if (data?.imgUrl && !currentTarget.src.includes('.jpg')) {
                  currentTarget.src = replaceJsonWithJpg(data?.imgUrl)
                } else {
                  // Final fallback to a placeholder
                  currentTarget.src = 'https://via.placeholder.com/292x314/f3f4f6/9ca3af?text=NFT'
                }
              }}
            />
            {data?.params?.url?.includes('/AI/') || data?.imgUrl?.includes('/AI/') ? (
              <div className="absolute top-2 right-2 bg-black p-1 rounded-lg">
                <p className="primary font-semibold medium ">AI</p>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>

      <BoostNft isboostmodal={isboostmodal} setisboostmodal={setisboostmodal} />
    </>
  )
}

export default CollectionsCard
