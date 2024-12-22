import { Tabs } from "antd";
import React from 'react';
import pageGlow from "../../assets/artistsProfile/artistGlow.png";
import userImg1 from "../../assets/home/images/card-userImg.png";
import nftImg1 from "../../assets/home/images/cardImg1.png";
import nftImg2 from "../../assets/home/images/cardImg2.png";
import nftImg3 from "../../assets/home/images/cardImg3.png";
import nftImg4 from "../../assets/home/images/cardImg4.png";
import soldNft1 from "../../assets/home/images/soldNft/soldNftImg1.png";
import soldNft2 from "../../assets/home/images/soldNft/soldNftImg2.png";
import soldNft3 from "../../assets/home/images/soldNft/soldNftImg3.png";
import soldNft4 from "../../assets/home/images/soldNft/soldNftImg4.png";
import bodyImg from "../../assets/nftCollection/popularBodyImg.png";
import headerImg from "../../assets/nftCollection/popularHeaderImg.png";
import CollectionsCard from '../cards/collectionsCard';

const ProfileNft = ({ collectionData, address }: any) => {

  const [activeKey, setActiveKey] = React.useState("1");

  const onChange = (key: any) => {
    setActiveKey(key);
    // console.log(key);
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
  const exploreData = [
    {
      id: 1,
      headerImg: headerImg,
      artistName: "Jacob Jones",
      bodyPic: bodyImg,
      itemPrice: "1.5k"
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
      userImg: userImg1,
      userName: "STELLA NOVA",
      userEmail: "@Stella Nova",
      nftImg: soldNft4,
      price: "142.02",
    },

  ];



  return (
    <>
      <div className="profileNft mt-24 relative">
        <img className='absolute top-[-900px]' src={pageGlow} alt="" />
        <div className="container">
          <div className="nftContainer">
            <Tabs
              className="collectionTab"
              defaultActiveKey="1"
              activeKey={activeKey}
              onChange={onChange}
              tabBarStyle={{ padding: 0 }}
            >
              <Tabs.TabPane tab="All" key="1">
                <div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
                  {featureCard.map((data, index) => (
                    <CollectionsCard data={data} />
                  ))}
                  {
                    soldCardData.map((data, index) => (
                      <CollectionsCard data={data} key={data.id} showLayer={true} />
                    ))
                  }
                  {featureCard.map((data, index) => (
                    <CollectionsCard data={data} />
                  ))}

                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Generated" key="2">
                <div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
                  {featureCard.map((data, index) => (
                    <CollectionsCard data={data} />
                  ))}
                  {
                    soldCardData.map((data, index) => (
                      <CollectionsCard data={data} key={data.id} showLayer={true} />
                    ))
                  }
                  {featureCard.map((data, index) => (
                    <CollectionsCard data={data} />
                  ))}

                </div>
              </Tabs.TabPane>
              {/* <Tabs.TabPane tab="Minted" key="3">
                <div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
                  {featureCard.map((data, index) => (
                    <CollectionsCard data={data} />
                  ))}
                  {
                    soldCardData.map((data, index) => (
                      <CollectionsCard data={data} key={data.id} showLayer={true} />
                    ))
                  }
                  {featureCard.map((data, index) => (
                    <CollectionsCard data={data} />
                  ))}

                </div>
              </Tabs.TabPane> */}
              <Tabs.TabPane tab="On Sale" key="4">
                <div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
                  {featureCard.map((data, index) => (
                    <CollectionsCard data={data} />
                  ))}
                  {
                    soldCardData.map((data, index) => (
                      <CollectionsCard data={data} key={data.id} showLayer={true} />
                    ))
                  }
                  {featureCard.map((data, index) => (
                    <CollectionsCard data={data} />
                  ))}

                </div>
              </Tabs.TabPane>



              <Tabs.TabPane tab="Auction" key="5">
                <div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
                  {featureCard.map((data, index) => (
                    <CollectionsCard data={data} />
                  ))}
                  {
                    soldCardData.map((data, index) => (
                      <CollectionsCard data={data} key={data.id} showLayer={true} />
                    ))
                  }
                  {featureCard.map((data, index) => (
                    <CollectionsCard data={data} />
                  ))}

                </div>
              </Tabs.TabPane>



              <Tabs.TabPane tab="Sold" key="6">
                <div className="popularcardContainer grid grid-cols-4 gap-8 mt-5">
                  {featureCard.map((data, index) => (
                    <CollectionsCard data={data} />
                  ))}
                  {
                    soldCardData.map((data, index) => (
                      <CollectionsCard data={data} key={data.id} showLayer={true} />
                    ))
                  }
                  {featureCard.map((data, index) => (
                    <CollectionsCard data={data} />
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

export default ProfileNft