import { useWallet } from '@txnlab/use-wallet'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { claimNftRoyalty } from '../../auctionMethod'
import { buyNftWithRoyalty, cancelList, getSingleNftlistData } from '../../fryMarketMethods'
import grayClockIcon from '../../assets/icons/grayClock.svg'
import Button from '../shared/button'

const Reminder = ({ hide, showReminder, nftData: nftDataFromProps, forList, forClaim }: any) => {
  // console.log('nftDataFromProps', nftDataFromProps)

  const [loading, setLoading] = useState<any>(false)
  const [isOwner, setOwner] = useState(false)
  const [nftData, setNftData] = useState<any>({})
  const [ownerSectionsVisible, setOwnerSectionsVisible] = useState(false)
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()

  const navigate = useNavigate()
  const handleBuyNft = async () => {
    try {
      return new Promise(async (resolve, reject) => {
        try {
          if (!activeAccount?.address) {
            reject(false)
            return
          }
          if (!nftData.seller || !nftData.price || nftData.price <= 0) {
            toast.error('NFT is not listed for sale')
            reject(false)
            return
          }
          setLoading(true)
          const response = await buyNftWithRoyalty(activeAccount?.address, nftData.assetId, signer, nftData.seller, nftData.price)
          setLoading(false)
          resolve(true)
          navigate('/artist-profile')
        } catch (e) {
          setLoading(false)
          reject(false)
        }
      })
    } catch (e) {
      return e
    }
  }

  const handleCancelNftList = async () => {
    try {
      return new Promise(async (resolve, reject) => {
        try {
          if (activeAccount?.address) {
            setLoading(true)
            const response: any = await cancelList(activeAccount.address, nftData.assetId, signer)

            if (typeof response == 'string' && response?.includes('Input is not a 64-bit unsigned integer')) {
              setLoading(false)
              reject(false)
              return
            }
            navigate('/artist-profile')
            setLoading(false)
            resolve(true)
          } else {
            setLoading(false)
            reject(false)
          }
        } catch (e) {
          // console.log("Error While Claiming nft", e);
          setLoading(false)
          reject(false)
        }
      })
    } catch (e) {
      // console.log("Error Uploading Image", e);
      return e
    }
  }
  const getRecentListingData = async () => {
    try {
      const response = await getSingleNftlistData(nftDataFromProps.assetId)
      setNftData(response)
    } catch (e) {
      // console.log("Error getting Single Nft Detail");
    }
  }
  const handleClaimNft = async () => {
    try {
      return new Promise(async (resolve, reject) => {
        try {
          if (activeAccount?.address) {
            setLoading(true)
            const response = await claimNftRoyalty(
              activeAccount.address,
              signer,
              nftDataFromProps.index,
              nftDataFromProps.params.bidContract,
              nftDataFromProps.params.price,
              nftDataFromProps.params.sellerId,
            )
            setLoading(false)

            resolve(true)
            navigate('/artist-profile')
          } else {
            setLoading(false)

            reject(false)
          }
        } catch (e) {
          // console.log("Error While Claiming nft", e);
          setLoading(false)
          reject(false)
        }
      })
    } catch (e) {
      // console.log("Error Uploading Image", e);
      return e
    }
  }

  useEffect(() => {
    if (!activeAccount?.address) {
      return
    }
    if (nftDataFromProps.seller == activeAccount?.address) {
      setOwnerSectionsVisible(true)
    }

    if (nftDataFromProps.seller == activeAccount?.address && nftDataFromProps.isListed) {
      setOwner(true)
    }

    getRecentListingData()
  }, [activeAccount, nftDataFromProps])

  const isUnlisted = nftDataFromProps?.isUnlisted || (!nftDataFromProps?.seller && !nftDataFromProps?.price)

  if (isUnlisted) {
    return (
      <div className="salesEndDiv bg-white flex flex-col mt-6">
        <div className="salesBody p-5 flex flex-col gap-5">
          <p className="font-medium text-black text-[16px]">This NFT is not currently listed for sale.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="salesEndDiv bg-white flex flex-col mt-6">
        {!forList && !ownerSectionsVisible ? (
          <div className="salesHeader p-5">
            <img src={grayClockIcon} alt="" />
            <p className="lightGray font-normal text-[16px]">Listed at {new Date(nftDataFromProps.listTime * 1000).toLocaleString()}</p>
          </div>
        ) : (
          ''
        )}
        <div className="salesBody p-5 flex flex-col gap-5 ">
          {!forList && !ownerSectionsVisible ? (
            <div className="area1">
              <p className="ex-small lightGray font-Roboto">Current price</p>
              <p className="font-medium text-black ex-large mt-1">{nftDataFromProps.price ? nftDataFromProps.price / 1000000 : 0} FRY</p>
            </div>
          ) : (
            ''
          )}
          <div className="area2 flex-start gap-3">
            <>
              <Button
                className={`button btn-primary large font-medium btnOffer ${!activeAccount?.address ? 'relative' : ''}`}
                minWidth={343}
                minHeight={44}
                text={
                  isOwner
                    ? nftData.isListed
                      ? 'Cancel'
                      : 'List now'
                    : forList
                      ? forClaim
                        ? 'Claim now'
                        : 'List now'
                      : !activeAccount?.address
                        ? 'Buy now 🔗'
                        : 'Buy now'
                }
                title={!activeAccount?.address ? 'Connect wallet to buy NFTs' : undefined}
                disabled={loading}
                onClick={() => {
                  if (activeAccount?.address) {
                    if (isOwner && !nftData.isListed) {
                      navigate('/sell-method', { state: { nftData: nftDataFromProps } })
                    } else if (isOwner) {
                      toast.promise(handleCancelNftList(), {
                        pending: 'NFT Listing Cancellation in progress',
                        error: 'There was an error Cancelling NFT Listing',
                        success: 'NFT List Cancelled successfully',
                      })
                    } else if (forClaim) {
                      toast.promise(handleClaimNft(), {
                        pending: 'NFT claiming in progress ',
                        error: 'There was an error claiming NFT',
                        success: 'NFT claimed successfully',
                      })
                    } else if (forList) {
                      navigate('/sell-method', { state: { nftData: nftDataFromProps } })
                    } else {
                      toast.promise(handleBuyNft(), {
                        pending: 'NFT buying in progress ',
                        error: 'There was an error Buying NFT',
                        success: 'NFT bought successfully',
                      })
                    }
                  } else {
                    toast.error('Please Connect Wallet First!')
                  }
                }}
              ></Button>
            </>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reminder
