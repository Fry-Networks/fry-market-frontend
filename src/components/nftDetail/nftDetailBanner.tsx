import { Collapse, Table } from "antd";
import TraitsBox from "../cards/traitsBox";
import Button from "../shared/button";
import rightSecPic from "../../assets/nftDetail/leftPic.webp";
import leftGlow from "../../assets/nftCollection/redGloww.webp";
import rightGlow from "../../assets/topCollection/rightGlow.webp";

const NftDetailBanner = () => {
  const onChange = (key: any) => {
    console.log(key);
  };

  const traitData = [
    {
      id: 1,
      text1: "EDITION",
      foundationEdition: "52%",
      floor: "12.75 ALGO",
    },
    {
      id: 2,
      text1: "EDITION",
      foundationEdition: "52%",
      floor: "12.75 ALGO",
    },
    {
      id: 3,
      text1: "EDITION",
      foundationEdition: "52%",
      floor: "12.75 ALGO",
    },
    {
      id: 4,
      text1: "EDITION",
      foundationEdition: "52%",
      floor: "12.75 ALGO",
    },
    {
      id: 5,
      text1: "EDITION",
      foundationEdition: "52%",
      floor: "12.75 ALGO",
    },
    {
      id: 6,
      text1: "EDITION",
      foundationEdition: "52%",
      floor: "12.75 ALGO",
    },
    {
      id: 7,
      text1: "EDITION",
      foundationEdition: "52%",
      floor: "12.75 ALGO",
    },
    {
      id: 8,
      text1: "EDITION",
      foundationEdition: "52%",
      floor: "12.75 ALGO",
    },
    {
      id: 9,
      text1: "EDITION",
      foundationEdition: "52%",
      floor: "12.75 ALGO",
    },
  ];

  const listingColumns = [
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: string) => <span className="font-bold text-black">{text}</span>,
    },
    {
      title: 'USD Price',
      dataIndex: 'usd',
      key: 'usd',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      render: (text: string) => (
        <div className="flex items-center justify-between gap-[100px]">
          <span>{text}</span>
          <Button
            className="button btn-primary font-medium"
            minWidth={54}
            minHeight={32}
            text="Buy"
          />
        </div>
      ),
    },

  ];

  const listingData = [
    {
      key: '1',
      price: '0.008 FRY',
      usd: '$4.25',
      quantity: '2',
      from: '16DD55',
    },

  ];




  const offerColumns = [
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: string) => <span className="font-bold text-black">{text}</span>,
    },
    {
      title: 'USD Price',
      dataIndex: 'usd',
      key: 'usd',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },

    {
      title: 'Floor Difference',
      dataIndex: 'floor',
      key: 'floor',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
    }
  ];

  const itemData = [
    {
      key: '1',
      event: 'List',
      price: '0.008 FRY',
      from: '294693',
      to: "",
      date: '1 days',
    },
    {
      key: '2',
      event: 'List',
      price: '',
      from: '199016',
      to: "126673",
      date: '2mo ago',
    },


    {
      key: '3',
      event: 'Sale',
      price: '0.008 FRY',
      from: '294693',
      to: '294693',
      date: '2mo ago',
    },

  ];

  const itemColumns = [
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',

    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: string) => <span className="font-bold text-black">{text}</span>,
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date"
    }
  ];

  const offerData = [
    {
      key: '1',
      price: '0.008 FRY',
      usd: '$4.25',
      quantity: '2',
      floor: "44% below",
      from: '16DD55',
    },

    {
      key: '2',
      price: '0.008 FRY',
      usd: '$4.25',
      quantity: '2',
      floor: "44% below",
      from: '16DD55',
    },


    {
      key: '3',
      price: '0.008 FRY',
      usd: '$4.25',
      quantity: '2',
      floor: "44% below",
      from: '16DD55',
    },

  ];
  return (
    <>
      <div className="nftDetailBannerWrapper mb-52 relative">
      <img src={leftGlow} className="leftGlow absolute top-[-400px] left-0 -z-10" alt="" />
      <img src={rightGlow} className=" rightGlow absolute top-[-200px] right-0 -z-10" alt="" />
        <div className="container">
          <div className="topSection flex items-start gap-6 mt-10">
            <div className="leftArea w-[546px]  flex flex-col gap-7 ">
              <img className="pixicoImg max-w-[546px] max-h-[610px] object-cover w-full h-full rounded-3xl border-solid border-[19px] border-[#fff]  shadow-[4px_4px_15px_0px_rgba(0,0,0,0.20)]" src={rightSecPic} alt="" />
              <div className="descriptionAccordion">
                <Collapse
                  expandIconPosition="end"
                  items={[
                    {
                      key: "1",
                      label: (
                        <div className="custom-label">
                          <div className="flex items-center gap-3">
                            <img src="/src/assets/icons/menuLines.svg" alt="" />
                            <span className="lightGray font-Roboto font-normal medium">
                              Description
                            </span>
                          </div>
                        </div>
                      ),
                      children: (
                        <>
                          <p className="lightGray font-Roboto font-normal medium">
                            By
                            <span className="darkBlack font-medium">
                              {" "}
                              Stella Nova
                            </span>
                          </p>
                          <p className="ex-small lightGray font-normal font-Roboto">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Mauris eu feugiat felis, in maximus neque.
                            Morbi rutrum est interdum, suscipit erat et, mattis
                            ante. Donec at diam pulvinar, pulvinar orci vitae,
                            luctus mauris..
                          </p>
                        </>
                      ),
                    },
                  ]}
                />
              </div>

              <div className="descriptionAccordion">
                <Collapse
                  expandIconPosition="end"
                  items={[
                    {
                      key: "1",
                      label: (
                        <div className="custom-label">
                          <div className="flex items-center gap-3">
                            <img src="/src/assets/icons/pricetag.svg" alt="" />
                            <span className="lightGray font-Roboto font-normal medium">
                              Traits
                            </span>
                          </div>
                        </div>
                      ),
                      children: (
                        <>
                          <div className="grid grid-cols-3 gap-2">
                            {traitData.map((data, index) => (
                              <TraitsBox data={data} />
                            ))}
                          </div>


                        </>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
            <div className="rightArea ps-5 w-3/5 flex flex-col gap-5 ">
              <div className="pixacioDiv">
                <h2 className="font-normal font-Apex uppercase leading-[82px]">PIXACIO</h2>
                <p className="lightGray text-[20px] font-normal font-Roboto">Owned by <span className="darkBlack font-semibold">Stella Nova</span></p>
              </div>
              <div className="salesEndDiv bg-white flex flex-col mt-6">
                <div className="salesHeader p-5">
                  <img src="/src/assets/icons/grayClock.svg" alt="" />
                  <p className="lightGray font-normal text-[16px]">Sale ends 18 November 2023 at 8:47 am </p>
                </div>
                <div className="salesBody p-5 flex flex-col gap-5 ">
                  <div className="area1">
                    <p className="ex-small lightGray font-Roboto">Current price</p>
                    <p className="font-medium text-black ex-large mt-1">5.001 FRY</p>
                  </div>
                  <div className="area2 flex-center gap-3">



                    <Button
                      className="button btn-secondary large font-medium btnBuy"
                      minWidth={343}
                      minHeight={44}
                      text="Buy now"
                    ></Button>

                    <Button
                      className="button btn-primary large font-medium btnOffer"
                      minWidth={343}
                      minHeight={44}
                      text="Make offer"
                    ></Button>
                  </div>
                </div>

              </div>

              <div className="listingAccordion">
                <Collapse
                  expandIconPosition="end"
                  items={[
                    {
                      key: "1",
                      label: (
                        <div className="custom-label">
                          <div className="flex items-center gap-3">
                            <img src="/src/assets/icons/pricetag.svg" alt="" />
                            <span className="lightGray font-Roboto font-normal medium">
                              Listings
                            </span>
                          </div>
                        </div>
                      ),
                      children: (
                        <>

                          <Table
                            columns={listingColumns}
                            dataSource={listingData}
                            pagination={false}
                          />

                        </>
                      ),
                    },
                  ]}
                />
              </div>

              <div className="listingAccordion">
                <Collapse
                  expandIconPosition="end"
                  items={[
                    {
                      key: "1",
                      label: (
                        <div className="custom-label">
                          <div className="flex items-center gap-3">
                            <img src="/src/assets/icons/dotedMenu.png" alt="" />
                            <span className="lightGray font-Roboto font-normal medium">
                              Offers
                            </span>
                          </div>
                        </div>
                      ),
                      children: (
                        <>

                          <Table
                            columns={offerColumns}
                            dataSource={offerData}
                            pagination={false}
                          />

                        </>
                      ),
                    },
                  ]}
                />
              </div>




              <div className="detailsAccordion">
                <Collapse
                  expandIconPosition="end"
                  items={[
                    {
                      key: "1",
                      label: (
                        <div className="custom-label">
                          <div className="flex items-center gap-3">
                            <img src="/src/assets/icons/detailIcon.svg" alt="" />
                            <span className="lightGray font-Roboto font-normal medium">
                              Details
                            </span>
                          </div>
                        </div>
                      ),
                      children: (
                        <>
                          <div className="flex flex-col gap-3">


                            <div className="w-full flex justify-between">
                              <p className="lightGray small font-normal font-Roboto">Contract Address</p>
                              <p className="lightGray small font-normal font-Roboto">0x5848...1713</p>
                            </div>

                            <div className="w-full flex justify-between">
                              <p className="lightGray small font-normal font-Roboto">Token ID</p>
                              <p className="lightGray small font-normal font-Roboto">7926</p>
                            </div>


                            <div className="w-full flex justify-between">
                              <p className="lightGray small font-normal font-Roboto">Token Standard</p>
                              <p className="lightGray small font-normal font-Roboto">ERC-721</p>
                            </div>


                            <div className="w-full flex justify-between">
                              <p className="lightGray small font-normal font-Roboto">Chain</p>
                              <p className="lightGray small font-normal font-Roboto">Algorand</p>
                            </div>


                            <div className="w-full flex justify-between">
                              <p className="lightGray small font-normal font-Roboto">Creator Earnings</p>
                              <p className="lightGray small font-normal font-Roboto">6.5%</p>
                            </div>

                          </div>
                        </>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="bottomSection">


            <div className="itemActivityAccordion">
              <Collapse
                expandIconPosition="end"
                items={[
                  {

                    label: (
                      <div className="custom-label">
                        <div className="flex items-center gap-3">
                          <img src="/src/assets/icons/dotedMenu.png" alt="" />
                          <span className="lightGray font-Roboto font-normal medium">
                            Offers
                          </span>
                        </div>
                      </div>
                    ),
                    children: (
                      <>

                        <Table
                          columns={itemColumns}
                          dataSource={itemData}
                          pagination={false}
                        />

                      </>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftDetailBanner;
