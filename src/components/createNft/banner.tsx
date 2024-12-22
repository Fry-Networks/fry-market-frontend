import { useWallet } from "@txnlab/use-wallet";
import { InputNumber, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bannerImg from "../../assets/createNft/bannerImg.webp";
import vectorBtm from "../../assets/icons/bottomVector.png";
import generateIcon from "../../assets/icons/generateIcon.svg";
import downArrow from "../../assets/icons/nft-down-arrow.svg";
import plus from "../../assets/icons/plus.svg";
import vectorTop from "../../assets/icons/topVector.png";
import banerGlow from "../../assets/images/topSellers/bannerGlow.webp";
import Button from "../../components/shared/button";
import AddStyleModal from "../../modals/addStyleModal";
import GenerateNft from "../../modals/generateNft";
import Input from "../shared/input";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Banner = ({ prompt }: any) => {
  const [isstylemodal, setisstylemodal] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const navigate = useNavigate();
  const showAddStyleModal = () => {
    setisstylemodal(true);
  };

  const [isgeneratemodal, setisgeneratemodal] = useState(false);
  const { activeAccount } = useWallet();

  const [inputValue, setInputValue] = useState("")
  const [supply, setSupply] = useState(1)
  const [nftType, setNftType] = useState("single")
  const [collectionData, setCollectionData] = useState<any>("")

  const showGenerateNftModal = () => {
    if (activeAccount?.address) {
      if (!collectionData) {
        toast.error("Create Collection first")
        return;
      }
      if (inputValue && supply && nftType && selectedStyle) {
        if (!validation()) {
          toast.error("Please enter a valid prompt.")
          return;
        }
        setisgeneratemodal(true);
        // navigation("create-nft")
      }
      else {
        toast.error("Please provide all details")
      }
    }
    else {
      toast.error("Please connect wallet first")
    }

  };
  const onChange = (value: any) => {
    // console.log(`selected ${value}`);
    setNftType(value);
  };
  const onSearch = (value: any) => {
    // console.log("search:", value);
    setNftType(value);
  };

  const onSupply = (value: any) => {
    // console.log("changed", value);
    setSupply(value);
  };
  const handleChange = (e: any) => {
    // console.log("handleChange", e.target.value);
    setInputValue(e.target.value);
  }
  const handleGenerate = () => {
    // console.log("generate")
    // console.log("inputValue", inputValue)
    // console.log("Supply", supply)
  }

  const getCollectionData = async () => {
    if (activeAccount?.address) {
      try {

        // const config = {
        //   headers: { Authorization: `Bearer ${token}` }
        // };

        const response = await axios.get(`${baseUrl}/get-collection/${activeAccount.address}`);
        // console.log("Collection Data", response.data);
        setCollectionData(response.data)

      }
      catch (e) {
        // console.log("Error Getting Collection", e);
        // toast.error("Error Creating Collection");
        setCollectionData("")

      }
    }
  }

  const validation = () => {
    // console.log("here", inputValue.replace(/\s+/g, '').length != 0);

    if (inputValue.replace(/\s+/g, '').length != 0) {
      return true
    }
    else {
      return false
    }
  }

  useEffect(() => {
    getCollectionData();
    // console.log("d", prompt);
    if (prompt) {

      setInputValue(prompt)
    }

  }, [activeAccount])

  return (
    <>
      <div className="bannerWrapper mb-44 relative">
        <img className="absolute top-[-250px] right-0 -z-30" src={banerGlow} alt="" />
        <div className="container ">
          <div className="inner">


            <h2 className="font-normal font-Apex uppercase darkBlack text-center mt-20">
              Create your own <span className="primary  relative"> masterpiece
                <img className="topVector absolute top-[-25%] left-[-2%] -z-50" src={vectorTop} alt="" />
                <img className="btmVector absolute bottom-[-16%] right-[-3%] -z-50" src={vectorBtm} alt="" />
              </span>
            </h2>
            <img
              className="mt-10 w-full h-full max-w-[1320px] object-cover"
              src={bannerImg}
              alt=""
            />
            <div>
              <div className="earnMoneyDiv flex flex-col justify-center items-center gap-5">
                <div className="part1">
                  <p className="lightGray text-[16px] font-normal font-Roboto capitalize">
                    get onboard and earn money like a pro
                  </p>
                </div>
                <div className="part2">
                  <div
                    style={{ width: "1002px", margin: "0 auto" }}
                    className="relative earnInput"
                  >
                    <Input
                      wrapperClass="flex items-center justify-center mx-auto z-10"
                      placeholder="Fantasy Creature holding a sword..."
                      inputClass="medium font-normal font-Roboto lightGray mx-auto flex items-center justify-center"
                      width={1002}
                      height={70}
                      type="text"
                      className="m-auto"
                      onChange={handleChange}
                      value={inputValue}
                    />
                    <button onClick={showGenerateNftModal} className="absolute top-[18px] right-3  bg-primary text-white medium font-bold font-Roboto py-3 px-3 flex-center gap-2">
                      Generate
                      <img src={generateIcon} alt="" />
                    </button>
                  </div>
                </div>

                <div className="part3 my-5 flex-center gap-16">
                  <div className="slectDiv">
                    {/* <Select
                      showSearch
                      style={{ width: 370, height:"55px" }}
                      placeholder="Single NFT"
                      optionFilterProp="label"
                      onChange={onChange}
                      onSearch={onSearch}
                      suffixIcon={<img className="cursor-pointer" src={downArrow} alt="dropdown icon" />}
                      options={[
                        {
                          value: "single",
                          label: "Single NFT Image",
                        },
                        {
                          value: "multiple",
                          label: "Multi-NFT Collection",
                        },
                      ]}
                    /> */}


                    <Select
                      className=""
                      // defaultValue="Single NFT"
                      placeholder="Select NFT type"
                      style={{ width: 270, height: "55px" }}
                      suffixIcon={<img className="cursor-pointer" src={downArrow} alt="dropdown icon" />}
                      onChange={onChange}  // Make sure this is not preventing default behavior
                      options={[
                        { value: 'single', label: "Single NFT Image" },
                        { value: 'multiple', label: "Multi-NFT Collection" },
                      ]}
                      value={nftType}


                    />
                  </div>
                  <div className="supplyDiv flex-center gap-4">
                    <p className="medium font-normal font-Roboto lightGray">Supply</p>
                    <InputNumber
                      min={1}
                      max={99999999999}
                      defaultValue={1}
                      onChange={onSupply}
                      className="gray-input"

                    />
                  </div>
                  <div className="addStyle flex justify-between items-center cursor-pointer" onClick={showAddStyleModal}>
                    <p className="lightGray font-normal medium font-Roboto" style={{ color: `${!selectedStyle ? "" : "black"}` }}>{!selectedStyle ? "Add Styles" : selectedStyle}</p>
                    <img src={plus} alt="" />
                  </div>



                  {/* <div className="addStyle flex justify-between items-center">
                    <p className="lightGray font-normal medium font-Roboto">Add Traits</p>
                    <img src="/src/assets/icons/plus.svg" alt="" />
                  </div> */}
                </div>
                <div className="part4 flex flex-col w-full items-center gap-4">
                  <p className="font-semibold text-[#504e4e]">OR</p>
                  <Button
                    className="button btn-primary large font-medium btnConnect font-Roboto"
                    minWidth={213}
                    minHeight={58}
                    text="Manual Create Nft"
                    onClick={(() => (
                      navigate("/manual-create-nft")
                    ))}

                  />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddStyleModal
        isstylemodal={isstylemodal}
        setisstylemodal={setisstylemodal}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
      />


      <GenerateNft
        isgeneratemodal={isgeneratemodal}
        setisgeneratemodal={setisgeneratemodal}
        inputValue={inputValue}
        nftType={nftType}
        supply={supply}
        selectedStyle={selectedStyle}

      />
    </>
  );
};

export default Banner;
