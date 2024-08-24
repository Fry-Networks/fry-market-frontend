import { useNavigate } from "react-router-dom";
import userImg1 from "../../assets/home/images/card-userImg.png";
import search from "../../assets/icons/search.svg";
import trendNft1 from "../../assets/topCollection/nftImg1.png";
import trendNft10 from "../../assets/topCollection/nftImg10.png";
import trendNft11 from "../../assets/topCollection/nftImg11.png";
import trendNft12 from "../../assets/topCollection/nftImg12.png";
import trendNft13 from "../../assets/topCollection/nftImg13.png";
import trendNft14 from "../../assets/topCollection/nftImg14.png";
import trendNft2 from "../../assets/topCollection/nftImg2.png";
import trendNft3 from "../../assets/topCollection/nftImg3.png";
import trendNft4 from "../../assets/topCollection/nftImg4.png";
import trendNft5 from "../../assets/topCollection/nftImg5.png";
import trendNft6 from "../../assets/topCollection/nftImg6.png";
import trendNft7 from "../../assets/topCollection/nftImg7.png";
import trendNft8 from "../../assets/topCollection/nftImg8.png";
import trendNft9 from "../../assets/topCollection/nftImg9.png";
import CollectionsCard from "../cards/collectionsCard";
import Input from "../shared/input";
import { Collapse } from "antd";
import filter from "../../assets/icons/filter.svg";
import Button from "../shared/button";
import rightGlow from "../../assets/topCollection/rightGlow.webp";
import leftGlow from "../../assets/nftCollection/redGlow.webp";
import pixoGrid from "../../assets/topCollection/topColectGrid.webp";





const PixoNft = () => {

  const navigate = useNavigate(); // Initialize useNavigate

  const handleCardClick = () => {
    navigate("/nft-detail"); // Redirect to nft-detail page
  };

  const onTopList = (key: any) => {
    console.log(key);
  };
  return (
    <>
      <div className="pixoNftContainer mb-52 relative">

      <div className="absolute top-0 left-0 w-[200px] collapseDiv">
      

      <Collapse
      defaultActiveKey={['1']}
        onChange={onTopList}
        items={[
          {
            key: "1",
            id: "first-element",
            label: (
              <>
                <div className="flex items-center justify-between mb-1">
                  <span className="flex items-center">
                    <img src={filter} className="mr-2" alt="" />
                  </span>
                </div>
                {/* <hr className="h-[2px] bg-black w-[97%] mx-auto" /> */}
              </>
            ),
            children: (
              <Collapse
                defaultActiveKey="1"
                items={[
                  {
                    key: "1-1",
                    label: (
                      <div className="flex items-center justify-between">
                        <span>Popular</span>
                        <span className="count">15</span>
                      </div>
                    ),
                    children: (
                      <>
                        {/* <p>{text}</p> */}
                       
                      </>
                    ),
                  },
                  {
                    key: "1-2",
                    label: "price",
                    children: (
                      <>
                      <div className="w-full flex items-center justify-center gap-2 mt-3">
                        <button className="bg-black border-solid border-1 border-[red] text-white flex-center w-[76px] h-[44px] ">Min</button>
                        <p>to</p>
                        <button className="bg-black border-solid border-1 border-[red] text-white flex-center w-[76px] h-[44px] ">Min</button>

                      </div>
                     <div className="mt-5 w-full flex-center">
                     <Button
              className="button btn-primary font-Roboto text-[15px] font-medium"
              minWidth={197}
              minHeight={41}
              text="Apply"
       
            />
                     </div>
                      </>
                    )
                  },

                  {
                    key: "1-3",
                    label: (
                      <div className="flex items-center justify-between">
                        <span>Background</span>
                        <span className="count">20</span>
                      </div>
                    ),
                    children: (
                      <>
                    <div className="w-full flex justify-start gap-2 items-center  border-solid border-2 border-[#E7E7E7] py-2.5 px-3.5 rounded-lg">
                    <img src={search} alt="" />
                      <input 
                       type="search" className="w-full lightGray text-[16px] font-Roboto font-normal" placeholder="Search" />
                   
                    </div>

                    <div className="nftBg w-full flex flex-col gap-3 mt-3">
                      <div className="whiteClr flex justify-between items-center">
                        <div className="leftPart flex items-center gap-2">
                          <div className="box w-[44px] h-[44px] border-solid border-2 border-[#E7E7E7]  rounded-lg"></div>
                          <p className="darkBlack medium font-Roboto font-normal">White</p>
                        </div>
                        <div className="rightPart">
                          <p className="darkBlack medium font-Roboto font-normal ">37</p>
                        </div>

                      </div>


                      <div className="whiteClr flex justify-between items-center">
                        <div className="leftPart flex items-center gap-2">
                          <div className="box w-[44px] h-[44px] border-solid border-2 border-[#E7E7E7]  rounded-lg"></div>
                          <p className="darkBlack medium font-Roboto font-normal">Red</p>
                        </div>
                        <div className="rightPart">
                          <p className="darkBlack medium font-Roboto font-normal ">5</p>
                        </div>

                      </div>




                      <div className="whiteClr flex justify-between items-center">
                        <div className="leftPart flex items-center gap-2">
                          <div className="box w-[44px] h-[44px] border-solid border-2 border-[#E7E7E7]  rounded-lg"></div>
                          <p className="darkBlack medium font-Roboto font-normal">Light Blue</p>
                        </div>
                        <div className="rightPart">
                          <p className="darkBlack medium font-Roboto font-normal ">10</p>
                        </div>

                      </div>
                    </div>
                       
                      </>
                    ),
                  },


                  {
                    key: "1-4",
                    label: (
                      <div className="flex items-center justify-between">
                        <span>Clothing</span>
                        <span className="count">110</span>
                      </div>
                    ),
                    children: (
                      <>
                        {/* <p>{text}</p> */}
                       
                      </>
                    ),
                  },


                  {
                    key: "1-5",
                    label: (
                      <div className="flex items-center justify-between">
                        <span>Eye</span>
                        <span className="count">2</span>
                      </div>
                    ),
                    children: (
                      <>
                        {/* <p>{text}</p> */}
                       
                      </>
                    ),
                  },

                  {
                    key: "1-6",
                    label: (
                      <div className="flex items-center justify-between">
                        <span>Body Color</span>
                        <span className="count">11</span>
                      </div>
                    ),
                    children: (
                      <>
                        {/* <p>{text}</p> */}
                       
                      </>
                    ),
                  },

                  {
                    key: "1-6",
                    label: (
                      <div className="flex items-center justify-between">
                        <span>Head</span>
                        <span className="count">33</span>
                      </div>
                    ),
                    children: (
                      <>
                        {/* <p>{text}</p> */}
                       
                      </>
                    ),
                  },
                ]}
              />
            ),
          },
          // {
          //   key: "2",
          //   label: "This is panel header 2",
          //   children: <p>{text}</p>,
          // },
          // {
          //   key: "3",
          //   label: "This is panel header 3",
          //   children: <p>{text}</p>,
          // },
        ]}
      />
    </div>
    <img src={rightGlow} className="absolute right-0 top-[200px] -z-10" alt="" />
    <img src={leftGlow} className="absolute left-0 bottom-[-400px] -z-10" alt="" />
    <img src={pixoGrid} className='absolute right-0 bottom-[-150px] -z-10' alt="" />

        <div className="container">
          <div className="inner">
            <div className="searchDiv w-auto flex justify-end items-center mb-14">
              <Input
                wrapperClass="flex items-center justify-center border-2 border-solid border[#243c5a] bg-trasparent"
                icon={search}
                placeholder="Search by name"
                inputClass="medium font-normal bg-transparent font-Roboto flex items-center justify-center lightGray  border-2 border[#243c5a]"
                width={613}
                height={55}
                type="text"
                className="lightGray  border-2  border[#243c5a] bg-transparent"

              />
            </div>

            <div className="cardsWrap grid grid-cols-4 gap-6">
            {trendingCard.map((data) => (
              <div key={data.id} onClick={handleCardClick} className="cursor-pointer">
                <CollectionsCard data={data} />
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PixoNft;

const trendingCard = [
  {
    id: 1,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft1,
    price: "142.02",
  },
  {
    id: 2,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft2,
    price: "142.02",
  },
  {
    id: 3,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft3,
    price: "142.02",
  },
  {
    id: 4,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft4,
    price: "142.02",
  },
  {
    id: 5,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft5,
    price: "142.02",
  },
  {
    id: 6,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft6,
    price: "142.02",
  },
  {
    id: 7,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft7,
    price: "142.02",
  },
  {
    id: 8,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft8,
    price: "142.02",
  },
  {
    id: 9,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft9,
    price: "142.02",
  },
  {
    id: 10,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft10,
    price: "142.02",
  },
  {
    id: 11,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft11,
    price: "142.02",
  },
  {
    id: 12,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft12,
    price: "142.02",
  },
  {
    id: 13,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft13,
    price: "142.02",
  },
  {
    id: 14,
    userImg: userImg1,
    userName: "STELLA NOVA",
    userEmail: "@Stella Nova",
    nftImg: trendNft14,
    price: "142.02",
  },

];
