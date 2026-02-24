import { Modal } from "antd";
import mintImg from "../assets/createNft/mint.webp";
import checkIcon from "../assets/icons/checkIcon.svg";
import loader from "../assets/icons/loader.svg";
import Button from "../components/shared/button";

const MintNft = ({ ismintmodal, setismintmodal }: any) => {
  const handleOk = () => {
    setismintmodal(false);
  };

  const handleCancel = () => {
    setismintmodal(false);
    // console.log("Modal should close now");
  };
  return (
    <>
      <Modal
        open={ismintmodal}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
        width={415}
        footer={null}
      >
        <div className="connectModal">
          {/* <div className="w-full">
            <p className="fw-bold ex-large font-Apex font-normal darkBlack text-center">
              Add traits
            </p>
          </div> */}
          <div className="innerContent flex flex-col items-center gap-4 mt-4 ">
            <img src={mintImg} alt="" />
            <div className="uploadImg flex-center gap-2  w-full">
              <img src={checkIcon} alt="" />
              <p className="lightGray font-Roboto large font-normal">Upload images</p>
            </div>


            <div className="uploadImg flex-center   gap-2  w-full">
              <img src={checkIcon} alt="" />
              <p className="lightGray font-Roboto large font-normal">Upload images</p>
            </div>
            <p className="ex-large darkBlack font-Roboto font-medium ">Mint</p>
            <p className="lightGray font-Roboto medium font-normal text-center">We’ve sent a transaction to create your NFT, check your wallet</p>
            <img src={loader} alt="" />
            <div className="btnWrapper w-full flex-center mt-1">
              <Button
                className="button btn-primary medium font-Roboto font-medium"
                width={284}
                minHeight={53}
                text="Cancel"
                onClick={handleCancel}
              ></Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MintNft;
