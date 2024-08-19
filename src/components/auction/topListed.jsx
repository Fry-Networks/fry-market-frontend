import React, { useState,  useRef } from 'react';
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
import { TreeSelect } from 'antd';
import AuctionCard from '../cards/auctionCard';
import { DownOutlined, FilterOutlined } from '@ant-design/icons';
import '../../style/page/auction/topListed.scss';
import rightGlow from "../../assets/auction/rightGlow.png";


const { TreeNode } = TreeSelect;

const CustomTreeNodeTitle = ({ text, count }) => (
  <div className="custom-tree-node-title">
  <span>{text}</span>
  <div className="count-container">
    <span className="count">{count}</span>
    <DownOutlined className="dropdown-arrow" />
  </div>
</div>
);
const TopListed = () => {
  const [value, setValue] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(true); // Initially open
  const selectRef = useRef(null);

  const onChange = (newValue) => {
    setValue(newValue);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownVisibleChange = (open) => {
    if (open) {
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  };

  return (
    <>
    <div className="topListedSection relative mb-52">
      <img className='absolute right-0 top-32' src={rightGlow} alt="" />
      <div className="absolute top-0 left-0 hidden">
        <div className="dropdown w-[300px]  bg-white rounded-[30px]">
          <div className="custom-header" onClick={toggleDropdown}>
            <FilterOutlined className="filter-icon" />
            {/* <span className="placeholder-text">Please select</span> */}
            <DownOutlined className={`dropdown-toggle-icon ${dropdownOpen ? 'open' : ''}`} />
          </div>
          {dropdownOpen && (
            <TreeSelect
              className="custom-treeselect"
              style={{ width: '100%', marginBottom: '30px' }}
              value={value}
              dropdownStyle={{ maxHeight: 'auto', overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              treeDefaultExpandAll
              onChange={onChange}
              showSearch={false}
              open={dropdownOpen}
              onDropdownVisibleChange={toggleDropdown}
            >
              <TreeNode
                value="parent 1"
                title={<CustomTreeNodeTitle text="Popular" count="15" />}
              >
                <TreeNode value="parent 1-0" title="parent 1-0" />
              </TreeNode>
              <TreeNode
                value="parent 2"
                title={<CustomTreeNodeTitle text="Price" count="" />}
              >
                <TreeNode value="parent 2-0" title="parent 2-0" />
              </TreeNode>
              <TreeNode
                value="parent 3"
                title={<CustomTreeNodeTitle text="Background" count="20" />}
              >
                <TreeNode value="parent 3-0" title="parent 3-0" />
              </TreeNode>
              <TreeNode
                value="parent 4"
                title={<CustomTreeNodeTitle text="Clothing" count="110" />}
              >
                <TreeNode value="parent 4-0" title="parent 4-0" />
              </TreeNode>
              <TreeNode
                value="parent 5"
                title={<CustomTreeNodeTitle text="Eye" count="2" />}
              >
                <TreeNode value="parent 5-0" title="parent 5-0" />
              </TreeNode>
              <TreeNode
                value="parent 6"
                title={<CustomTreeNodeTitle text="Body Color" count="11" />}
              >
                <TreeNode value="parent 6-0" title="parent 6-0" />
              </TreeNode>
              <TreeNode
                value="parent 7"
                title={<CustomTreeNodeTitle text="Head" count="33" />}
              >
                <TreeNode value="parent 7-0" title="parent 7-0" />
              </TreeNode>
            </TreeSelect>
          )}
        </div>
      </div>
      <div className="container">
        <div className="topListedInner">
          <h2 className="font-normal font-Apex uppercase mb-10">TOP LISTED</h2>
          <div className="auctionCarContainer mt-10 grid grid-cols-4 grid-rows-3 gap-x-10 gap-y-7 relative z-20">
            {auctionData.map((data) => (
              <AuctionCard key={data.id} data={data} showHiddenDiv={true} isAuctionPage={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

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
    id: 11,
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
