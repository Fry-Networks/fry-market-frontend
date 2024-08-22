import { Modal } from "antd";
import redline from "../assets/modals/redLine.png";
import Button from "../components/shared/button";

const GenerateNft = ({ isgeneratemodal, setisgeneratemodal }: any) => {

  const handleOk = () => {
    setisgeneratemodal(false);
  };

  const handleCancel = () => {
    setisgeneratemodal(false);
    console.log("Modal should close now");
  };
  return (
    <>
      <Modal
        open={isgeneratemodal}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
        width={415}
        footer={null}
      >
        <div className="connectModal">
          <div className="w-full">
            <p className="fw-bold ex-large font-Apex font-normal darkBlack text-center">
              Generate NFT
            </p>
          </div>
          <div className="innerContent flex flex-col items-center gap-5 mt-4 ">

            <img src={redline} alt="" />
            <div className="enterAmount flex flex-col justify-start gap-2 w-full mt-3">
              <p className="darkBlack font-Roboto medium font-normal">Type</p>
              <input className="rounded-lg py-3.5 px-6 w-full border-solid border-2 border-[red]" placeholder="Minimum bid 3.52 FRY " type="text" />
            </div>
            <div className="enterAmount flex flex-col justify-start gap-2 w-full mb-5 mt-3">
              <p className="darkBlack font-Roboto medium font-normal">Prompt</p>
              <textarea className="rounded-lg py-3.5 px-6 w-full border-solid border-2 border-[red] h-[150px]" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum luctus ornare ante, a mattis eros blandit non. " />
            </div>

            {/* <div className="serviceDiv w-full flex justify-between items-center mb-7 mt-3">
        <p className="darkBlack font-Roboto medium font-normal">Marketplace fee</p>
        <p className="darkBlack font-Roboto medium font-medium">0.5 FRY</p>
    </div> */}
            {/* <div className="serviceDiv w-full flex justify-between items-center">
        <p className="darkBlack font-Roboto medium font-normal">Total bid amount</p>
        <p className="darkBlack font-Roboto ex-large font-medium">4.12 FRY</p>
    </div> */}

            <div className="paymentMethod py-[14px] px-[25px] bg-[#F4F3F3] flex flex-col gap-3 justify-start w-full rounded-md">
              <p className="darkBlack font-Roboto medium font-normal">Payment Method</p>
              <p className="lightGray small font-Roboto font-normal">Cost of Generation :0.032 FRY</p>
            </div>
            <img src={redline} alt="" />

            <div className="btnWrapper w-full flex justify-end mt-3">


              <Button
                className="button btn-primary medium font-Roboto font-medium"
                width={144}
                minHeight={53}
                text="CONFIRM"
                onClick={handleCancel}
              ></Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default GenerateNft;