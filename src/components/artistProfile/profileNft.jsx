import { Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import bodyImg from '../../assets/nftCollection/popularBodyImg.png'
import headerImg from '../../assets/nftCollection/popularHeaderImg.png'

import userImg1 from '../../assets/home/images/card-userImg.png'
import nftImg1 from '../../assets/home/images/cardImg1.png'
import nftImg2 from '../../assets/home/images/cardImg2.png'
import nftImg3 from '../../assets/home/images/cardImg3.png'
import nftImg4 from '../../assets/home/images/cardImg4.png'
import AuctionProfileCard from '../cards/auctionProfileCard'
import CollectionsCard from '../cards/collectionsCard'

import { useWallet } from '@txnlab/use-wallet'

import pageGlow from '../../assets/artistsProfile/artistGlow.webp'
import soldNft1 from '../../assets/home/images/soldNft/soldNftImg1.png'
import soldNft2 from '../../assets/home/images/soldNft/soldNftImg2.png'
import soldNft3 from '../../assets/home/images/soldNft/soldNftImg3.png'
import soldNft4 from '../../assets/home/images/soldNft/soldNftImg4.png'
import { getAllUserAuctions, getAllUserClaimable } from '../../auctionMethod'
import { getAllCollectionWListed, getAllListedByUser, getAllUserNfts } from '../../fryMarketMethods'
import Loader from '../Loader'
const baseUrl = import.meta.env.VITE_API_BASE_URL

const ProfileNft = ({ collectionData, address }) => {
  const [activeKey, setActiveKey] = React.useState(`${address ? '3' : '1'}`)
  const [mintedNft, setMintedNft] = useState([])
  const [boughtNft, setAllBoughtNft] = useState([])
  const [listedNft, setAllListedNft] = useState([])
  const [auctionedNft, setAuctionedNft] = useState([])
  const [claimableNft, setClaimableNft] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingAll, setLoadingAll] = useState(false)
  const [loadingListed, setLoadingListed] = useState(false)
  const [loadingAuctioned, setLoadingAuctioned] = useState(false)
  const [loadingClaimable, setLoadingClaimable] = useState(false)
  const [getNftDataAgain, setGetNftDataAgain] = useState(false)
  const { activeAccount, signer } = useWallet()
  const onChange = (key) => {
    setActiveKey(key)
    // console.log(key)
  }
  const featureCard = [
    {
      id: 1,
      userImg: userImg1,
      userName: 'STELLA NOVA',
      userEmail: '@Stella Nova',
      nftImg: nftImg1,
      price: '142.02',
    },
    {
      id: 2,
      userImg: userImg1,
      userName: 'STELLA NOVA',
      userEmail: '@Stella Nova',
      nftImg: nftImg2,
      price: '142.02',
    },
    {
      id: 3,
      userImg: userImg1,
      userName: 'STELLA NOVA',
      userEmail: '@Stella Nova',
      nftImg: nftImg3,
      price: '142.02',
    },

    {
      id: 4,
      userImg: userImg1,
      userName: 'STELLA NOVA',
      userEmail: '@Stella Nova',
      nftImg: nftImg4,
      price: '142.02',
    },
  ]
  const exploreData = [
    {
      id: 1,
      headerImg: headerImg,
      artistName: 'Jacob Jones',
      bodyPic: bodyImg,
      itemPrice: '1.5k',
    },
  ]

  const soldCardData = [
    {
      id: 1,
      userImg: userImg1,
      userName: 'STELLA NOVA',
      userEmail: '@Stella Nova',
      nftImg: soldNft1,
      price: '142.02',
    },
    {
      id: 2,
      userImg: userImg1,
      userName: 'STELLA NOVA',
      userEmail: '@Stella Nova',
      nftImg: soldNft2,
      price: '142.02',
    },
    {
      id: 3,
      userImg: userImg1,
      userName: 'STELLA NOVA',
      userEmail: '@Stella Nova',
      nftImg: soldNft3,
      price: '142.02',
    },
    {
      id: 4,
      userImg: userImg1,
      userName: 'STELLA NOVA',
      userEmail: '@Stella Nova',
      nftImg: soldNft4,
      price: '142.02',
    },
  ]

  const getMintedNft = async () => {
    // console.log('full')

    try {
      if (address || activeAccount?.address) {
        setLoading(true)
        const response = await getAllCollectionWListed(address || activeAccount?.address)
        // console.log('NftMinted', response)
        setMintedNft(response)
        setLoading(false)
      }
    } catch (e) {
      // console.log('ee', e)

      setLoading(false)
    }
  }

  const getAllNft = async () => {
    // console.log('cole', collectionData)
    try {
      if (address || activeAccount?.address) {
        setLoadingAll(true)
        const response = await getAllUserNfts(address || activeAccount?.address)
        // console.log('NftAll', response)
        setAllBoughtNft(response)
        setLoadingAll(false)
      }
    } catch (e) {
      setLoadingAll(false)
    }
  }

  const getListedNft = async () => {
    try {
      // console.log("aaaa");
      // console.log("ff", activeAccount?.address);

      if (address || activeAccount?.address) {
        // console.log("dda", activeAccount?.address);

        setLoadingListed(true)
        const response = await getAllListedByUser(address || activeAccount?.address)
        // console.log('NftListed', response)
        setAllListedNft(response)
        setLoadingListed(false)
      }
    } catch (e) {
      // console.log("ee", e);

      setLoadingListed(false)
    }
  }

  const getAuctionedNft = async () => {
    // console.log("NftAuctionedd");

    if (address || activeAccount?.address) {
      try {
        setLoadingAuctioned(true)
        const response = await getAllUserAuctions(address || activeAccount?.address, signer)
        // console.log('NftAuctionedd', response)
        setAuctionedNft(response.filter((item) => item?.isListed))
        setLoadingAuctioned(false)
      } catch (e) {
        // console.log('D', e)

        setLoadingAuctioned(false)
      }
    }
  }
  const getClaimableNft = async () => {
    if (address || activeAccount?.address) {
      try {
        setLoadingClaimable(true)
        const response = await getAllUserClaimable(address || activeAccount?.address, signer)
        // console.log('NftClaimable', response)
        setClaimableNft(response.filter((data) => data.highestBidder != data.sellerId))
        setLoadingClaimable(false)
      } catch (e) {
        // console.log('dd', e)

        setLoadingClaimable(false)
      }
    }
  }

  useEffect(() => {
    // console.log('heeh')

    if (address || activeAccount?.address) {
      getMintedNft()
      getAllNft()
      getListedNft()
      getAuctionedNft()
      if (!address) {
        getClaimableNft()
      }
    }
  }, [activeAccount, getNftDataAgain])

  return (
    <>
      <div className="profileNft mt-24 relative">
        <img className="absolute top-0 left-0 right-0 bottom-0 -z-30 w-full h-full object-cover" src={pageGlow} alt="" />
        <div className="container">
          <div className="nftContainer">
            <Tabs className="collectionTab" defaultActiveKey="1" activeKey={activeKey} onChange={onChange} tabBarStyle={{ padding: 0 }}>
              {!address ? (
                <Tabs.TabPane tab="Owned" key="1">
                  {loadingAll ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Loader></Loader>
                    </div>
                  ) : (
                    <>
                      {boughtNft.length > 0 ? (
                        <div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
                          {boughtNft.map((data, index) => (
                            <CollectionsCard
                              // data={{ index: data.nftAddress, params: data }}
                              data={{ ...data, imgUrl: data.url }}
                              // otherList={address ? true : false}
                              otherList={true}
                              profileOwned={!address && true}
                              otherAuctionData={data}
                              label={address ? '' : 'List'}
                              collectionData={collectionData}
                            />
                          ))}
                        </div>
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>No Nft Owned yet.</div>
                      )}
                    </>
                  )}
                </Tabs.TabPane>
              ) : (
                ''
              )}
              <Tabs.TabPane tab="Minted" key="3">
                {loading ? (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Loader></Loader>
                  </div>
                ) : (
                  <>
                    {mintedNft.length > 0 ? (
                      <div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
                        {mintedNft.map((data, index) => (
                          <CollectionsCard
                            data={{ ...data.params, imgUrl: data.params.url, assetId: data.index }}
                            label="Minted"
                            collectionData={collectionData}
                            otherList={true}
                            otherAuctionData={data}
                          />
                        ))}
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>No Nft Minted yet.</div>
                    )}
                  </>
                )}
              </Tabs.TabPane>
              <Tabs.TabPane tab="On Sale" key="4">
                {loadingListed ? (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Loader></Loader>
                  </div>
                ) : (
                  <>
                    {listedNft.length > 0 ? (
                      <div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
                        {listedNft.map((data, index) => (
                          <CollectionsCard
                            // data={{ index: data.assetId, params: { url: data.imgUrl, price: data.price, name: data.name } }}
                            data={data}
                            label="Cancel"
                            collectionData={collectionData}
                            setGetNftDataAgain={setGetNftDataAgain}
                            otherList={true}
                            profileOwned={!address && true}
                            otherAuctionData={data}
                          />
                        ))}
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>No Nfts listed on Sale yet.</div>
                    )}
                  </>
                )}
              </Tabs.TabPane>

              <Tabs.TabPane tab="Auction" key="5">
                {loadingAuctioned ? (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Loader></Loader>
                  </div>
                ) : (
                  <>
                    {auctionedNft.length > 0 ? (
                      <div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
                        {auctionedNft.map((data, index) => (
                          <AuctionProfileCard
                            data={data}
                            otherAuction={true}
                            otherAuctionData={data}
                            label="Cancel"
                            collectionData={collectionData}
                            auctionCancel={true}
                            setGetNftDataAgain={setGetNftDataAgain}
                            otherList={true}
                            profileOwned={!address && true}
                          />
                        ))}
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', color: 'red' }}>
                        No Nfts listed on Auction yet!
                      </div>
                    )}
                  </>
                )}
              </Tabs.TabPane>
              {!address ? (
                <Tabs.TabPane tab="Claimable" key="6">
                  {loadingClaimable ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Loader></Loader>
                    </div>
                  ) : (
                    <>
                      {claimableNft.length > 0 ? (
                        <div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
                          {claimableNft.map((data, index) => (
                            <CollectionsCard
                              data={{
                                ...data,
                                index: data.nftAddress,
                                params: {
                                  url: data.url,
                                  price: data.highestBidAmount,
                                  name: data.name,
                                  bidContract: data.bidContract,
                                  sellerId: data.sellerId,
                                },
                              }}
                              // data={{...data, imgUrl: data.url}}
                              label="Claim"
                              collectionData={collectionData}
                              otherList={true}
                              profileOwned={true}
                              otherAuctionData={data}
                              setGetNftDataAgain={setGetNftDataAgain}
                            />
                          ))}
                        </div>
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', color: 'red' }}>
                          No Claimable Nfts found!
                        </div>
                      )}
                    </>
                  )}
                </Tabs.TabPane>
              ) : (
                ''
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileNft
