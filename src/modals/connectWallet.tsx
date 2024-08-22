import { Modal } from "antd";
import blackFlower from "../assets/icons/blackFlower.svg";
import blackupArrow from "../assets/icons/blackUpArrow.svg";
import daffi from "../assets/icons/daffi.svg";
import walletBlue from "../assets/icons/walletBlue.svg";
import logo from "../assets/icons/websiteLogo.svg";
import redline from "../assets/modals/redLine.png";


const ConnectWallet = ({ isconnectmodal, setisconnectmodal }: any) => {
  const handleOk = () => {
    setisconnectmodal(false);
  };

  const handleCancel = () => {
    setisconnectmodal(false);
    console.log("Modal should close now");
  };
  return (
    <>
      <Modal
        open={isconnectmodal}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
        width={415}
        footer={null}
      >
        <div className="connectModal">
          <div className="w-full">
            <p className="fw-bold ex-large font-Apex font-normal darkBlack text-center">
              Connect your wallet
            </p>
          </div>
          <div className="innerContent flex flex-col items-center gap-4 mt-4 ">
            <img src={logo} alt="" />
            <img src={redline} alt="" />
            <button className="wltbtn py-3.5 px-6 lightGray font-Roboto ex-small font-normal w-full flex justify-start items-center gap-5 border-solid border-2 border-[red]">
              <img src={blackFlower} alt="" />
              Pera
            </button>
            <button className=" wltbtn py-3.5 px-6 lightGray font-Roboto ex-small font-normal w-full flex justify-start items-center gap-5 border-solid border-2 border-[red]">
              <img src={blackupArrow} alt="" />
              Defly
            </button>{" "}
            <button className=" wltbtn py-3.5 px-6 lightGray font-Roboto ex-small font-normal w-full flex justify-start items-center gap-5 border-solid border-2 border-[red]">
              <img src={daffi} alt="" />
              Daffi
            </button>{" "}
            <button className=" wltbtn py-3.5 px-6 lightGray font-Roboto ex-small font-normal w-full flex justify-start items-center gap-5 border-solid border-2 border-[red]">
              <img src={walletBlue} alt="" />
              WalletConect
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConnectWallet;
