import { Select, Table } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icons/topSeller/logo.svg";
import table1 from "../assets/icons/topSeller/ts1.svg";
import table10 from "../assets/icons/topSeller/ts10.svg";
import table11 from "../assets/icons/topSeller/ts11.svg";
import table2 from "../assets/icons/topSeller/ts2.svg";
import table3 from "../assets/icons/topSeller/ts3.svg";
import table4 from "../assets/icons/topSeller/ts4.svg";
import table5 from "../assets/icons/topSeller/ts5.svg";
import table6 from "../assets/icons/topSeller/ts6.svg";
import table7 from "../assets/icons/topSeller/ts7.svg";
import table8 from "../assets/icons/topSeller/ts8.svg";
import table9 from "../assets/icons/topSeller/ts9.svg";
import ts2 from "../assets/images/topSellers/ts2.jpg";
import ts3 from "../assets/images/topSellers/ts3.jpg";
import ts1 from "../assets/images/topSellers/tss1.png";
import ReadyForNext from "../components/home/readyForNext";
import Button from "../components/shared/button";

const columns = [
  {
    title: "Collections",
    dataIndex: "collection",
    key: "collection",
    render: ({ text, record, index }: any) => (
      <div className="flex items-center">
        <span className="mr-3">{index + 1}.</span>
        <img src={record.image} alt="icon" className="mr-2" />
        <span>{text}</span>
      </div>
    ),
  },
  {
    title: "Volume",
    dataIndex: "volume",
    key: "volume",
    render: (text: any) => (
      <div className="flex items-center">
        <img src={logo} alt="icon" className="mr-2" />
        <span>{text}</span>
      </div>
    ),
  },
  {
    title: "Followers",
    dataIndex: "follower",
    key: "follower",
  },
  {
    title: "24%",
    dataIndex: "percentage",
    key: "percentage",
  },
  {
    title: "Floor Price",
    dataIndex: "price",
    key: "price",
    render: (text: any) => (
      <div className="flex items-center">
        <img src={logo} alt="icon" className="mr-2" />
        <span>{text}</span>
      </div>
    ),
  },
  {
    title: "Items",
    dataIndex: "items",
    key: "items",
  },
];

const data = [
  {
    key: "1",
    collection: "Jacob Jones",
    volume: 154.0,
    follower: 100,
    percentage: "+237.67%",
    price: "4,901",
    items: "9.8k",
    image: table1,
  },
  {
    key: "2",
    collection: "Jacob Jones",
    volume: 154.0,
    follower: 150,
    percentage: "+237.67%",
    price: "4,901",
    items: "9.8k",
    image: table2,
  },
  {
    key: "3",
    collection: "Jacob Jones",
    volume: 154.0,
    follower: 75,
    percentage: "+237.67%",
    price: "4,901",
    items: "9.8k",
    image: table3,
  },
  {
    key: "4",
    collection: "Jacob Jones",
    volume: 154.0,
    follower: 75,
    percentage: "+237.67%",
    price: "4,901",
    items: "9.8k",
    image: table4,
  },
  {
    key: "5",
    collection: "Jacob Jones",
    volume: 154.0,
    follower: 33,
    percentage: "+237.67%",
    price: "4,901",
    items: "9.8k",
    image: table5,
  },
  {
    key: "6",
    collection: "Jacob Jones",
    volume: 154.0,
    follower: 24,
    percentage: "+237.67%",
    price: "4,901",
    items: "9.8k",
    image: table6,
  },
  {
    key: "7",
    collection: "Jacob Jones",
    volume: 154.0,
    follower: 22,
    percentage: "+237.67%",
    price: "4,901",
    items: "9.8k",
    image: table7,
  },
  {
    key: "8",
    collection: "Jacob Jones",
    volume: 154.0,
    follower: 64,
    percentage: "+237.67%",
    price: "4,901",
    items: "9.8k",
    image: table1,
  },
  {
    key: "9",
    collection: "Jacob Jones",
    volume: 154.0,
    follower: 877,
    percentage: "+237.67%",
    price: "4,901",
    items: "9.8k",
    image: table8,
  },
  {
    key: "10",
    collection: "Jacob Jones",
    volume: 154.0,
    follower: 55,
    percentage: "+237.67%",
    price: "4,901",
    items: "9.8k",
    image: table9,
  },
  {
    key: "11",
    collection: "Jacob Jones",
    volume: 154.0,
    follower: 35,
    percentage: "+237.67%",
    price: "4,901",
    items: "9.8k",
    image: table10,
  },
  {
    key: "12",
    collection: "Jacob Jones",
    volume: 154.0,
    follower: 32,
    percentage: "+237.67%",
    price: "4,901",
    items: "9.8k",
    image: table3,
  },
  {
    key: "13",
    collection: "Jacob Jones",
    volume: 154.0,
    follower: 94,
    percentage: "+237.67%",
    price: "4,901",
    items: "9.8k",
    image: table2,
  },
  {
    key: "14",
    collection: "Jacob Jones",
    volume: 154.0,
    follower: 75,
    percentage: "+237.67%",
    price: "4,901",
    items: "9.8k",
    image: table1,
  },
  {
    key: "15",
    collection: "Jacob Jones",
    volume: 154.0,
    follower: 25,
    percentage: "+237.67%",
    price: "4,901",
    items: "9.8k",
    image: table11,
  },
];

const handleChange = (value: any) => {
  console.log(`selected ${value}`);
};

const TopSeller = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRowClick = (record: any) => {
    navigate("/seller-collection");
  };
  return (
    <>

      <div className="container">
        <div className="flex  gap-[146px] items-center h-[80vh]">
          <div>
            <h2 className="font-bold font-Apex darkBlack">
              TOP <br />
              <span className="primary text-[128px]"> SELLERS</span>
            </h2>
          </div>
          <div className="relative sellerImages">
            <img
              src={ts1}
              alt="image"
              className="w-[362px] h-[397px] rounded-3xl z-30 relative"
            />
            <img
              src={ts3}
              alt="image"
              className="w-[362px] h-[397px] rounded-3xl absolute left-24 top-0 rotate-[20deg]"
            />
            <img
              src={ts2}
              alt="image"
              className="w-[362px] h-[397px] rounded-3xl absolute left-11 top-0 rotate-[10deg]"
            />
          </div>
        </div>

        <div className="flex justify-between mt-9 mb-9">
          {/* <Button className="btn-white" text="Catagory"/> */}
          <div className="catagorySelector">
            <Select
              defaultValue="Catagory"
              style={{
                width: 138,
                height: 48,
                boxShadow: "4px 4px 15px 0px rgba(0, 0, 0, 0.20)",
                borderRadius: 8,

              }}
              // className="btn-white"
              onChange={handleChange}
              // autoFocus={false}
              options={[
                {
                  value: "catagory1",
                  label: "Catagory 1",
                },
                {
                  value: "catagory2",
                  label: "Catagory 2",
                },
              ]}
            />
          </div>
          <Button className="btn-white" text="Last 30 days" />
        </div>

        <div>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}

            rowClassName="cursor-pointer"
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            className="mb-[199px] sellerTable"
          />
        </div>
      </div>
      <ReadyForNext />

    </>
  );
};

export default TopSeller;
