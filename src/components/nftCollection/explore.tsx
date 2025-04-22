import { Tabs } from 'antd'
import React from 'react'
import exploreGrid from '../../assets/nftCollection/exploreGrid.webp'
import leftGlow from '../../assets/nftCollection/redGloww.webp'
import rightGlow from '../../assets/nftCollection/rightGlow.webp'
import ExploreCard from '../cards/exploreCard'

const Explore = ({ collectionDataFull }: any) => {
  const [activeKey, setActiveKey] = React.useState('1')
  const onChange = (key: any) => {
    setActiveKey(key)
  }

  return (
    <>
      <div className="exploreWrapper mt-10 mb-52 relative">
        <img src={rightGlow} className="absolute right-0 top-[-100px]" alt="" />
        <img src={leftGlow} className="absolute bottom-[-500px] left-0" alt="" />
        <img src={exploreGrid} className=" exploreGrid absolute bottom-[-500px] right-0" alt="" />
        <div className="container">
          <h2 className="font-normal font-Apex uppercase mb-10">EXPLORE COLLECTIONS</h2>
          <div className="tabSection">
            <Tabs className="collectionTab" defaultActiveKey="1" activeKey={activeKey} onChange={onChange} tabBarStyle={{ padding: 0 }}>
              <Tabs.TabPane tab="All" key="1">
                <div className="popularcardContainer grid grid-cols-3 gap-8 mt-5">
                  {collectionDataFull.map((data: any, index: any) => (
                    <ExploreCard data={data} key={data._id} />
                  ))}
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}

export default Explore
