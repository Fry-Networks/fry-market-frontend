import React, { useState } from 'react';
import userImg1 from "../../assets/home/images/card-userImg.png";
import trendingNft1 from "../../assets/home/images/auction/auctionImg1.png";
import trendingNft2 from "../../assets/home/images/auction/auctionImg2.png";
import trendingNft3 from "../../assets/home/images/auction/auctionImg3.png";
import trendingNft4 from "../../assets/home/images/auction/auctionImg4.png";
import trendingNft5 from "../../assets/home/images/auction/auctionImg5.png";
import trendingNft6 from "../../assets/home/images/auction/auctionImg6.png";
import trendingNft7 from "../../assets/home/images/auction/auctionImg7.png";
import trendingNft8 from "../../assets/home/images/auction/auctionImg8.png";
import CollectionsCard from '../cards/collectionsCard';
import { Dropdown, Menu, Button, Space } from 'antd';
import AuctionCard from '../cards/auctionCard';
import { TreeSelect } from 'antd';
const { SubMenu } = Menu;

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
   
      },
    ],
  },
];

const TopListed = () => {
  const [value, setValue] = useState();
  const onChange = (newValue) => {
    setValue(newValue);
  };
  const onPopupScroll = (e) => {
    console.log('onPopupScroll', e);
  };
  return (
  <>
  <div className="topListedSection relative mb-52">
    <div className='absolute top-0 left-0'>
        <div className='dropdown'> 
        <TreeSelect
      showSearch
      style={{
        width: '100%',
      }}
      value={value}
      dropdownStyle={{
        maxHeight: 400,
        overflow: 'auto',
      }}
      placeholder="Please select"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
      treeData={treeData}
      onPopupScroll={onPopupScroll}
    />
        </div>

    </div>
    <div className="container">
        <div className="topListedInner">
            <h2 className="font-normal font-Apex uppercase mb-10">TOP LISTED</h2>
            <div className="auctionCarContainer mt-10 grid grid-cols-4 grid-rows-3 gap-x-10 gap-y-7 relative z-20">
            {auctionData.map((data, index) => (
              <AuctionCard key={data.id} data={data} showHiddenDiv={true} isAuctionPage={true}   />

            ))}
            </div>
        </div>
    </div>
  </div>
  </>
  )
}

export default TopListed;



const auctionData = [
    {
      id: 1,
      userImg: userImg1,
      userName: "STELLA NOVA",
      userEmail: "@Stella Nova",
      nftImg: trendingNft1,
      price: "142.02",
    },
    {
      id: 2,
      userImg: userImg1,
      userName: "STELLA NOVA",
      userEmail: "@Stella Nova",
      nftImg: trendingNft2,
      price: "142.02",
    },
    {
      id: 3,
      userImg: userImg1,
      userName: "STELLA NOVA",
      userEmail: "@Stella Nova",
      nftImg: trendingNft3,
      price: "142.02",
    },
    {
      id: 4,
      userImg: userImg1,
      userName: "STELLA NOVA",
      userEmail: "@Stella Nova",
      nftImg: trendingNft4,
      price: "142.02",
    },
    {
      id: 5,
      userImg: userImg1,
      userName: "STELLA NOVA",
      userEmail: "@Stella Nova",
      nftImg: trendingNft5,
      price: "142.02",
    },
    {
      id: 6,
      userImg: userImg1,
      userName: "STELLA NOVA",
      userEmail: "@Stella Nova",
      nftImg: trendingNft6,
      price: "142.02",
    },
    {
      id: 7,
      userImg: userImg1,
      userName: "STELLA NOVA",
      userEmail: "@Stella Nova",
      nftImg: trendingNft7,
      price: "142.02",
    },
    {
      id: 8,
      userImg: userImg1,
      userName: "STELLA NOVA",
      userEmail: "@Stella Nova",
      nftImg: trendingNft8,
      price: "142.02",
    },
    {
        id: 9,
        userImg: userImg1,
        userName: "STELLA NOVA",
        userEmail: "@Stella Nova",
        nftImg: trendingNft2,
        price: "142.02",
      },
      {
        id: 10,
        userImg: userImg1,
        userName: "STELLA NOVA",
        userEmail: "@Stella Nova",
        nftImg: trendingNft5,
        price: "142.02",
      },
      {
        id:11,
        userImg: userImg1,
        userName: "STELLA NOVA",
        userEmail: "@Stella Nova",
        nftImg: trendingNft8,
        price: "142.02",
      },
      {
        id: 12,
        userImg: userImg1,
        userName: "STELLA NOVA",
        userEmail: "@Stella Nova",
        nftImg: trendingNft3,
        price: "142.02",
      },
  ];
  