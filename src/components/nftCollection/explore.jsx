import React from "react";
import { Tabs } from "antd";
import Button from "../shared/button";
import ExploreCard from "../cards/exploreCard";
import headerImg from "../../assets/nftCollection/popularHeaderImg.png";
import bodyImg from "../../assets/nftCollection/popularBodyImg.png";
import bodyImg2 from "../../assets/nftCollection/bodyImg2.png";
import bodyImg3 from "../../assets/nftCollection/bodyImg3.png";
import bodyImg4 from "../../assets/nftCollection/bodyImg4.png";
import bodyImg5 from "../../assets/nftCollection/bodyImg5.png";
import bodyImg6 from "../../assets/nftCollection/bodyImg6.png";
import bodyImg11 from "../../assets/nftCollection/bodyImg11.png";

import headerImg2 from "../../assets/nftCollection/headerImg2.png";
import headerImg3 from "../../assets/nftCollection/headerImg3.png";
import headerImg4 from "../../assets/nftCollection/headerImg4.png";
import headerImg5 from "../../assets/nftCollection/headerImg5.png";
import headerImg6 from "../../assets/nftCollection/headerImg6.png";
import headerImg11 from "../../assets/nftCollection/headerImg11.png";
import leftGlow from "../../assets/nftCollection/redGloww.webp";
import rightGlow from "../../assets/nftCollection/rightGlow.webp";
import exploreGrid from "../../assets/nftCollection/exploreGrid.webp";


const Explore = () => {
  const [activeKey, setActiveKey] = React.useState("1");

  const onChange = (key) => {
    setActiveKey(key);
    console.log(key);
  };
  const exploreData=[
    {
      id:1,
      headerImg:headerImg,
      artistName:"Jacob Jones",
      bodyPic:bodyImg,
      itemPrice:"1.5k"
    },
    {
      id:2,
      headerImg:headerImg2,
      artistName:"Jacob Jones",
      bodyPic:bodyImg2,
      itemPrice:"1.5k"
    },
    {
      id:3,
      headerImg:headerImg3,
      artistName:"Jacob Jones",
      bodyPic:bodyImg3,
      itemPrice:"1.5k"
    },
    {
      id:4,
      headerImg:headerImg4,
      artistName:"Jacob Jones",
      bodyPic:bodyImg4,
      itemPrice:"1.5k"
    },
    {
      id:5,
      headerImg:headerImg5,
      artistName:"Jacob Jones",
      bodyPic:bodyImg5,
      itemPrice:"1.5k"
    },
    {
      id:6,
      headerImg:headerImg6,
      artistName:"Jacob Jones",
      bodyPic:bodyImg6,
      itemPrice:"1.5k"
    },
    {
      id:7,
      headerImg:headerImg2,
      artistName:"Jacob Jones",
      bodyPic:bodyImg2,
      itemPrice:"1.5k"
    },
    {
      id:8,
      headerImg:headerImg3,
      artistName:"Jacob Jones",
      bodyPic:bodyImg3,
      itemPrice:"1.5k"
    },
    {
      id:9,
      headerImg:headerImg4,
      artistName:"Jacob Jones",
      bodyPic:bodyImg4,
      itemPrice:"1.5k"
    },
    {
      id:10,
      headerImg:headerImg5,
      artistName:"Jacob Jones",
      bodyPic:bodyImg5,
      itemPrice:"1.5k"
    },
    {
      id:11,
      headerImg:headerImg11,
      artistName:"Jacob Jones",
      bodyPic:bodyImg11,
      itemPrice:"1.5k"
    },
 
  ]
  return (
    <>
      <div className="exploreWrapper mt-10 mb-52 relative">
        <img src={rightGlow} className="absolute right-0 top-[-100px]" alt="" />
        <img src={leftGlow} className="absolute bottom-[-500px] left-0" alt="" />
        <img src={exploreGrid} className=" exploreGrid absolute bottom-[-500px] right-0" alt="" />
        <div className="container">
          <h2 className="font-normal font-Apex uppercase mb-10">
            EXPLORE COLLECTIONS
          </h2>
          <div className="tabSection">
            <Tabs
              className="collectionTab"
              defaultActiveKey="1"
              activeKey={activeKey}
              onChange={onChange}
              tabBarStyle={{ padding: 0 }} 
            >
              <Tabs.TabPane tab="Popular" key="1">
             <div className="popularcardContainer grid grid-cols-3 gap-8 mt-5">
              {
                exploreData.map((data,index)=>(
                  <ExploreCard data={data}/>
                ))
              }
              
             </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Trending" key="2">
              <div className="popularcardContainer grid grid-cols-3 gap-8 mt-5">
              {
                exploreData.map((data,index)=>(
                  <ExploreCard data={data}/>
                ))
              }
              
             </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Sports" key="3">
              <div className="popularcardContainer grid grid-cols-3 gap-8 mt-5">
              {
                exploreData.map((data,index)=>(
                  <ExploreCard data={data}/>
                ))
              }
              
             </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Arts" key="4">
              <div className="popularcardContainer grid grid-cols-3 gap-8 mt-5">
              {
                exploreData.map((data,index)=>(
                  <ExploreCard data={data}/>
                ))
              }
              
             </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Fantasy" key="5">
              <div className="popularcardContainer grid grid-cols-3 gap-8 mt-5">
              {
                exploreData.map((data,index)=>(
                  <ExploreCard data={data}/>
                ))
              }
              
             </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Photography" key="6">
              <div className="popularcardContainer grid grid-cols-3 gap-8 mt-5">
              {
                exploreData.map((data,index)=>(
                  <ExploreCard data={data}/>
                ))
              }
              
             </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Space" key="7">
              <div className="popularcardContainer grid grid-cols-3 gap-8 mt-5">
              {
                exploreData.map((data,index)=>(
                  <ExploreCard data={data}/>
                ))
              }
              
             </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;


