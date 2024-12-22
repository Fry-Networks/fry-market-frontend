import { useWallet } from "@txnlab/use-wallet";
import { Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import redline from "../assets/modals/redLine.png";
import Button from "../components/shared/button";
import { getImgGenFee, getImgGenFeeAmount } from "../fryMarketMethods";

const GenerateNft = ({ isgeneratemodal, setisgeneratemodal, inputValue, nftType, supply, selectedStyle }: any) => {

  const [loading, setLoading] = useState(false)
  const [isPaymentSuccessfull, setIsPaymentSuccessfull] = useState(false)
  const [fee, setFee] = useState<any>(0)

  const navigate = useNavigate();
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()
  const deductImageGenerationFee = async () => {

    return new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        const response: any = await getImgGenFee(supply == 1 ? false : true, supply, signer, activeAccount?.address ? activeAccount?.address : "123")
        // console.log("response after minting", response);
        // toast.success("Mint Successful")
        setLoading(false);
        setIsPaymentSuccessfull(true);
        resolve(true);
        handleConfirmButtonClick();
        // navigate("/artist-profile")

      }
      catch (e: any) {
        // console.log("Error Mintin Nft", e);
        toast.error(e.message);
        setLoading(false);
        setIsPaymentSuccessfull(false);

        reject(false);


      }


    });


  }

  const handleChange = (value: string) => {
    // console.log(`selected ${value}`);
  };
  const handleConfirmButtonClick = () => {
    setisgeneratemodal(false);
    navigate("/create-nft", { state: { inputValue, nftType, supply, selectedStyle } })
  };
  const handleOk = () => {
    setisgeneratemodal(false);
    navigate("/create-nft", { state: { inputValue, nftType, supply, selectedStyle } })

  };

  const handleCancel = () => {
    setisgeneratemodal(false);
    // console.log("Modal should close now");
  };

  const getFee = async () => {
    try {
      const fee = await getImgGenFeeAmount(supply == 1 ? false : true, supply, signer, activeAccount?.address ? activeAccount?.address : "123")
      // console.log("Fee", fee);
      setFee(fee);
    }
    catch (e) {
      toast.error("Error Occured while calculating fee")
    }
  }

  useEffect(() => {
    // console.log(inputValue);
    // console.log(nftType);
    // console.log(supply);
    // console.log(selectedStyle);
    getFee()

  })

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
              <p className="darkBlack font-Roboto medium  font-normal">Type</p>
              {/* <input className="rounded-lg py-3.5 px-6 w-full border-solid border-2 border-[red]" placeholder="Minimum bid 3.52 FRY " type="number" /> */}

              <Select
                className="rounded-lg"
                defaultValue={nftType}
                value={nftType}
                style={{ width: 370, height: "55px" }}
                onChange={handleChange}
                options={[
                  { value: 'single', label: 'Single NFT' },
                  { value: 'multiple', label: 'Multiple NFT' },
                ]}
                disabled={true}
              />
            </div>
            <div className="enterAmount flex flex-col justify-start gap-2 w-full mb-5 mt-3">
              <p className="darkBlack font-Roboto medium font-normal">Prompt</p>
              <textarea className="rounded-lg py-3.5 px-6 w-full h-[150px]" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum luctus ornare ante, a mattis eros blandit non. " value={inputValue} disabled />
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
              <p className="lightGray small font-Roboto font-normal">Cost of Generation : {fee ? fee : 0} FRY</p>
            </div>
            <img src={redline} alt="" />

            <div className="btnWrapper w-full flex justify-end mt-3">


              <Button
                className="button btn-primary medium font-Roboto font-medium"
                width={144}
                minHeight={53}
                text="CONFIRM"
                disabled={loading}
                onClick={() => {
                  if (activeAccount?.address) {
                    toast.promise(
                      deductImageGenerationFee(),
                      {
                        pending: "Transaction in progress",
                        error: "There was an error in transaction",
                        // @ts-ignore
                        success: `Transaction is successful`
                      }
                    )
                  }
                }}
              ></Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default GenerateNft;