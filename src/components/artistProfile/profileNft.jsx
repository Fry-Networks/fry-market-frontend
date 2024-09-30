import { Tabs } from "antd";
import React, { useEffect, useState } from 'react';
import bodyImg from "../../assets/nftCollection/popularBodyImg.png";
import headerImg from "../../assets/nftCollection/popularHeaderImg.png";

import userImg1 from "../../assets/home/images/card-userImg.png";
import nftImg1 from "../../assets/home/images/cardImg1.png";
import nftImg2 from "../../assets/home/images/cardImg2.png";
import nftImg3 from "../../assets/home/images/cardImg3.png";
import nftImg4 from "../../assets/home/images/cardImg4.png";
import CollectionsCard from '../cards/collectionsCard';

import { useWallet } from "@txnlab/use-wallet";

import pageGlow from "../../assets/artistsProfile/artistGlow.webp";
import soldNft1 from "../../assets/home/images/soldNft/soldNftImg1.png";
import soldNft2 from "../../assets/home/images/soldNft/soldNftImg2.png";
import soldNft3 from "../../assets/home/images/soldNft/soldNftImg3.png";
import soldNft4 from "../../assets/home/images/soldNft/soldNftImg4.png";
import { getAllUserAuctions, getAllUserClaimable } from "../../auctionMethod";
import { getAllCollectionWListed, getAllListedByUser, getAllUserNfts } from "../../fryMarketMethods";
import Loader from "../Loader";
const baseUrl = import.meta.env.VITE_API_BASE_URL;


const ProfileNft = ({collectionData}) => {

    const [activeKey, setActiveKey] = React.useState("1");
    const [mintedNft, setMintedNft] = useState([])
    const [boughtNft, setAllBoughtNft] = useState([])
    const [listedNft, setAllListedNft] = useState([])
    const [auctionedNft, setAuctionedNft] = useState([])
    const [claimableNft, setClaimableNft] = useState([])
    const [loading, setLoading] = useState(false);
    const [loadingAll, setLoadingAll] = useState(false);
    const [loadingListed, setLoadingListed] = useState(false);
    const [loadingAuctioned, setLoadingAuctioned] = useState(false);
    const [loadingClaimable, setLoadingClaimable] = useState(false);
    const { activeAccount, signer } = useWallet()
    const onChange = (key) => {
      setActiveKey(key);
      console.log(key);
    };
    const featureCard = [
        {
          id: 1,
          userImg: userImg1,
          userName: "STELLA NOVA",
          userEmail: "@Stella Nova",
          nftImg: nftImg1,
          price: "142.02",
        },
        {
          id: 2,
          userImg: userImg1,
          userName: "STELLA NOVA",
          userEmail: "@Stella Nova",
          nftImg: nftImg2,
          price: "142.02",
        },
        {
          id: 3,
          userImg: userImg1,
          userName: "STELLA NOVA",
          userEmail: "@Stella Nova",
          nftImg: nftImg3,
          price: "142.02",
        },
      
        {
          id: 4,
          userImg: userImg1,
          userName: "STELLA NOVA",
          userEmail: "@Stella Nova",
          nftImg: nftImg4,
          price: "142.02",
        },
      ];
    const exploreData=[
      {
        id:1,
        headerImg:headerImg,
        artistName:"Jacob Jones",
        bodyPic:bodyImg,
        itemPrice:"1.5k"
      },
    
   
    ]

    const soldCardData = [
        {
          id: 1,
          userImg: userImg1,
          userName: "STELLA NOVA",
          userEmail: "@Stella Nova",
          nftImg: soldNft1,
          price: "142.02",
        },
        {
          id: 2,
          userImg: userImg1,
          userName: "STELLA NOVA",
          userEmail: "@Stella Nova",
          nftImg: soldNft2,
          price: "142.02",
        },
        {
          id: 3,
          userImg: userImg1,
          userName: "STELLA NOVA",
          userEmail: "@Stella Nova",
          nftImg: soldNft3,
          price: "142.02",
        },
        {
          id: 4,
          userImg:userImg1,
          userName: "STELLA NOVA",
          userEmail: "@Stella Nova",
          nftImg:  soldNft4,
          price: "142.02",
        },
        
      ];

      const getMintedNft = async () => {
        console.log("f");
        
        try{

          if (activeAccount?.address) {
            setLoading(true);
            const response = await getAllCollectionWListed(activeAccount?.address);
            console.log("NftMinted", response);
            setMintedNft(response);
            setLoading(false)
          }
        }
        catch(e){
          console.log("ee", e);
          
          setLoading(false);
        }
      }
      
      const getAllNft = async () => {
        try{

          if (activeAccount?.address) {
            setLoadingAll(true);
            const response = await getAllUserNfts(activeAccount?.address);
            console.log("NftAll", response);
            setAllBoughtNft(response);
            setLoadingAll(false)
          }
        }
        catch(e){
          setLoadingAll(false);
        }
      }

      const getListedNft = async () => {
        try{

          if (activeAccount?.address) {
            setLoadingListed(true);
            const response = await getAllListedByUser(activeAccount?.address);
            console.log("NftListed", response);
            setAllListedNft(response);
            setLoadingListed(false);
          }
        }
        catch(e){
          setLoadingListed(false);
        }
      }
    
      const getAuctionedNft = async () => {
        if (activeAccount?.address) {
    
    
          try {
    
    
            setLoadingAuctioned(true);
            const response = await getAllUserAuctions(activeAccount?.address, signer);
            console.log("NftAuctioned", response);
            setAuctionedNft(response);
            setLoadingAuctioned(false)
    
          }
          catch (e) {
            console.log("D", e);
            
            setLoadingAuctioned(false);
          }
        }
      }
      const getClaimableNft = async () => {
        if (activeAccount?.address) {
    
    
          try {
    
    
            setLoadingClaimable(true);
            const response = await getAllUserClaimable(activeAccount?.address, signer);
            console.log("NftClaimable", response);
            setClaimableNft(response);
            setLoadingClaimable(false)
    
          }
          catch (e) {
            console.log("dd",e);
            
            setLoadingClaimable(false);
          }
        }
      }

     

      useEffect(() => {
        console.log("heeh");
    
        if (activeAccount?.address) {
          getMintedNft();
          getAllNft();
          getListedNft();
          getAuctionedNft();
          getClaimableNft();
        }
    
      }, [activeAccount])

  return (
 <>
 <div className="profileNft mt-24 relative">
  <img className='absolute top-[-900px] w-full -z-30' src={pageGlow} alt="" />
<div className="container">
    <div className="nftContainer">
    <Tabs
              className="collectionTab"
              defaultActiveKey="1"
              activeKey={activeKey}
              onChange={onChange}
              tabBarStyle={{ padding: 0 }} 
            >
              <Tabs.TabPane tab="Owned" key="1">
             {/* <div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
             {featureCard.map((data, index) => (
              <CollectionsCard data={data} isProfilePage={true}  />
            ))}
             {
                soldCardData.map((data,index)=>(
                    <CollectionsCard data={data} key={data.id} showLayer={true}/>
                ))
            }
              {featureCard.map((data, index) => (
              <CollectionsCard data={data} isProfilePage={true}  />
            ))}
              
             </div> */}

{
loadingAll ? 
<div style={{display: "flex", justifyContent: 'center'}}>
<Loader></Loader>
</div>
:
<>
{boughtNft.length > 0 ? 

<div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
{boughtNft.map((data, index) => (
              <CollectionsCard data={{index: data.nftAddress, params: data }} label="List" collectionData={collectionData} />
             
            ))}
            </div>
          :
          <div style={{display: "flex", justifyContent: "center", marginTop: '20px'}}>No Nft Owned yet.</div>
          }   
            </>

}



              </Tabs.TabPane>
              {/* <Tabs.TabPane tab="Generated" key="2">
              <div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
             {featureCard.map((data, index) => (
              <CollectionsCard data={data} />
            ))}
             {
                soldCardData.map((data,index)=>(
                    <CollectionsCard data={data} key={data.id} showLayer={true}/>
                ))
            }
              {featureCard.map((data, index) => (
              <CollectionsCard data={data} />
            ))}
              
             </div>
              </Tabs.TabPane> */}
              <Tabs.TabPane tab="Minted" key="3">
            
             {/* {featureCard.map((data, index) => (
              <CollectionsCard data={data} />
            ))}
             {
                soldCardData.map((data,index)=>(
                    <CollectionsCard data={data} key={data.id} showLayer={true}/>
                ))
            }
              {featureCard.map((data, index) => (
              <CollectionsCard data={data} />
            ))} */}
{
loading ? 
<div style={{display: "flex", justifyContent: 'center'}}>
<Loader></Loader>
</div>
:
<>
{mintedNft.length > 0 ? 

<div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
{mintedNft.map((data, index) => (
              <CollectionsCard data={data} label="Minted"  collectionData={collectionData} />
             
            ))}
            </div>
          :
          <div style={{display: "flex", justifyContent: "center", marginTop: '20px'}}>No Nft Minted yet.</div>
          }   
            </>

}



              </Tabs.TabPane>
              <Tabs.TabPane tab="On Sale" key="4">
              {/* <div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
             {featureCard.map((data, index) => (
              <CollectionsCard data={data} />
            ))}
             {
                soldCardData.map((data,index)=>(
                    <CollectionsCard data={data} key={data.id} showLayer={true}/>
                ))
            }
              {featureCard.map((data, index) => (
              <CollectionsCard data={data} />
            ))}
              
             </div> */}

{
loadingListed ? 
<div style={{display: "flex", justifyContent: 'center'}}>
<Loader></Loader>
</div>
:
<>
{listedNft.length > 0 ? 

<div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
{listedNft.map((data, index) => (
              <CollectionsCard data={{index: data.assetId, params: {url: data.imgUrl, price: data.price, name: data.name} }} label="Listed"  collectionData={collectionData} />
             
            ))}
            </div>
          :
          <div style={{display: "flex", justifyContent: "center", marginTop: '20px'}}>No Nfts listed on Sale yet.</div>
          }   
            </>

}

              </Tabs.TabPane>



              <Tabs.TabPane tab="Auction" key="5">
              {/* <div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
             {featureCard.map((data, index) => (
              <CollectionsCard data={data} />
            ))}
             {
                soldCardData.map((data,index)=>(
                    <CollectionsCard data={data} key={data.id} showLayer={true}/>
                ))
            }
              {featureCard.map((data, index) => (
              <CollectionsCard data={data} />
            ))}
              
             </div> */}

{
loadingAuctioned ? 
<div style={{display: "flex", justifyContent: 'center'}}>
<Loader></Loader>
</div>
:
<>
{auctionedNft.length > 0 ? 

<div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
{auctionedNft.map((data, index) => (
              <CollectionsCard data={{index: data.assetId, params: data}} label="Listed"  collectionData={collectionData}/>
             
            ))}
            </div>
          :
          <div style={{display: "flex", justifyContent: "center", marginTop: '20px'}}>No Nfts listed on Auction yet.</div>
          }   
            </>

}

              </Tabs.TabPane>
             


              {/* <Tabs.TabPane tab="Sold" key="6">
              <div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
             {featureCard.map((data, index) => (
              <CollectionsCard data={data} />
            ))}
             {
                soldCardData.map((data,index)=>(
                    <CollectionsCard data={data} key={data.id} showLayer={true}/>
                ))
            }
              {featureCard.map((data, index) => (
              <CollectionsCard data={data} />
            ))}
              
             </div>
              </Tabs.TabPane> */}
              
              <Tabs.TabPane tab="Claimable" key="6">
              {/* <div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
             {featureCard.map((data, index) => (
              <CollectionsCard data={data} />
            ))}
             {
                soldCardData.map((data,index)=>(
                    <CollectionsCard data={data} key={data.id} showLayer={true}/>
                ))
            }
              {featureCard.map((data, index) => (
              <CollectionsCard data={data} />
            ))}
              
             </div> */}

{
loadingClaimable ? 
<div style={{display: "flex", justifyContent: 'center'}}>
<Loader></Loader>
</div>
:
<>
{claimableNft.length > 0 ? 

<div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
{claimableNft.map((data, index) => (
              <CollectionsCard data={{index: data.nftAddress, params: {url: data.url, price: data.highestBidAmount, name: data.name, bidContract: data.bidContract, sellerId: data.sellerId} }} label="Claim"  collectionData={collectionData}/>
             
            ))}
            </div>
          :
          <div style={{display: "flex", justifyContent: "center", marginTop: '20px'}}>No Claimable Nfts found.</div>
          }   
            </>

}

              </Tabs.TabPane>

            </Tabs>
    </div>
</div>
 </div>
 </>
  )
}

export default ProfileNft