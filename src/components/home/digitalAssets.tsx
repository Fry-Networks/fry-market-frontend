import { useNavigate } from "react-router-dom";
import leftLines from "../../assets/home/images/homeImages/digitalGrid.webp";
import digitalassetBack from "../../assets/home/images/topSeller/digitalAssetBack.webp";
import digittalGrid from "../../assets/home/images/topSeller/digitalGrid.png";
import generateIcon from "../../assets/icons/generateIcon.svg";
import Input from "../shared/input";

const DigitalAssets = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="digitalAssetWrapper my-52 flex-col flex-center relative">
        <img className="leftLines absolute top-[-400px] left-0 -z-60" src={leftLines} alt="" />
        <img className=" digitalGrid absolute bottom-[-400px] right-0" src={digittalGrid} alt="" />
        <img className="absolute top-40" src={digitalassetBack} alt="" />
        <div className="container">
          <h2 className="m-auto font-normal font-Apex uppercase mb-14 w-[830px] text-center">
            TURN YOUR IMAGINATION INTO DIGITAL ASSET
          </h2>

          <div style={{ width: "737px", margin: "0 auto" }} className="relative digitalInput">
            <Input
              wrapperClass="flex items-center justify-center mx-auto z-10 "
              placeholder="Fantasy Creature holding a sword..."
              inputClass="medium font-normal font-Roboto lightGray mx-auto flex items-center justify-center"
              width={737}
              height={70}
              type="text"
              className="m-auto my-72"

            />
            <button className="absolute top-[13.5px] right-2  bg-primary text-white medium font-bold font-Roboto py-3 px-3 flex-center gap-2" onClick={() => navigate("/create-nft-page")}>Generate
              <img src={generateIcon} alt="" />
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default DigitalAssets;
