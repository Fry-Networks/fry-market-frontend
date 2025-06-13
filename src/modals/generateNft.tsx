import { useWallet } from '@txnlab/use-wallet'
import { Modal, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import redline from '../assets/modals/redLine.png'
import Button from '../components/shared/button'
import { getImgGenFee, getImgGenFeeAmount } from '../fryMarketMethods'

// Helper to create a unique key from generation parameters
const getGenerationKey = (params: { inputValue: string, selectedStyle: string, supply: number | string }) => {
  if (!params || !params.inputValue || !params.selectedStyle || !params.supply) return null;
  return `genKey-prompt:${params.inputValue}-style:${params.selectedStyle}-supply:${params.supply}`;
};

const GenerateNft = ({ isgeneratemodal, setisgeneratemodal, inputValue, nftType, supply, selectedStyle, selectedCollection }: any) => {
  const [loading, setLoading] = useState(false)
  const [isPaymentSuccessfull, setIsPaymentSuccessfull] = useState(false) // This state can be used for UI feedback if needed
  const [fee, setFee] = useState<any>(0)

  const navigate = useNavigate()
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()

  const deductImageGenerationFee = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        const response: any = await getImgGenFee(
          supply == 1 ? false : true,
          supply,
          signer,
          activeAccount?.address ? activeAccount?.address : '123',
        )
        console.log('Response after image generation fee deduction:', response);

        // Clear ALL localStorage entries related to previous generations
        console.log("Payment successful. Clearing all previous 'genKey-prompt:' localStorage data.");
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith("genKey-prompt:")) {
            localStorage.removeItem(key);
            // Decrement i because localStorage.length changes and keys shift
            // when an item is removed.
            i--;
          }
        }
        console.log("Finished clearing previous 'genKey-prompt:' localStorage data.");

        // Now, store the parameters for the new task in localStorage
        const currentGenerationParams = { inputValue, selectedStyle, supply };
        const generationKeyForNewTask = getGenerationKey(currentGenerationParams);

        if (generationKeyForNewTask) {
          localStorage.setItem(generationKeyForNewTask + '_promptValue', inputValue);
          localStorage.setItem(generationKeyForNewTask + '_styleValue', selectedStyle);
          localStorage.setItem(generationKeyForNewTask + '_expectedSupply', supply.toString());
          console.log(`Stored new task parameters in localStorage for key ${generationKeyForNewTask}:`);
          console.log(`  Prompt: ${localStorage.getItem(generationKeyForNewTask + '_promptValue')}`);
          console.log(`  Style: ${localStorage.getItem(generationKeyForNewTask + '_styleValue')}`);
          console.log(`  Expected Supply: ${localStorage.getItem(generationKeyForNewTask + '_expectedSupply')}`);
        } else {
          console.warn('Could not construct generationKey for new task. Params:', currentGenerationParams);
        }

        setLoading(false);
        setIsPaymentSuccessfull(true);

        resolve(true);

        handleConfirmButtonClick();

      }
      catch (e: any) {
        console.error("Error deducting image generation fee:", e);
        setLoading(false);
        setIsPaymentSuccessfull(false);
        reject(e);
      }
    });
  }

  const handleChange = (value: string) => {
    // console.log(`selected ${value}`);
  }

  const handleConfirmButtonClick = () => {
    setisgeneratemodal(false)
    navigate('/create-nft', { state: { inputValue, nftType, supply, selectedStyle, selectedCollection } })
  }

  // This handleOk seems redundant if CONFIRM button is the primary action.
  // If it's for a different flow, ensure its logic is intended.
  const handleOk = () => {
    setisgeneratemodal(false)
    navigate('/create-nft', { state: { inputValue, nftType, supply, selectedStyle, selectedCollection } })
  }

  const handleCancel = () => {
    setisgeneratemodal(false)
  }

  const getFee = async () => {
    if (!activeAccount?.address && !signer) {
      // console.log("Wallet not connected, cannot fetch fee yet.");
      // setFee(0); // Or some placeholder
      return
    }
    try {
      const calculatedFee = await getImgGenFeeAmount(
        supply == 1 ? false : true,
        supply,
        signer,
        activeAccount?.address ? activeAccount?.address : '123',
      )
      setFee(calculatedFee)
    } catch (e) {
      console.error('Error calculating fee:', e)
      toast.error('Error occurred while calculating fee')
      setFee(0) // Reset fee on error
    }
  }

  useEffect(() => {
    if (isgeneratemodal && supply > 0) {
      // Only get fee if modal is open and supply is valid
      getFee()
    }
  }, [isgeneratemodal, supply, activeAccount, signer]) // Rerun if modal opens, supply changes, or wallet connects

  return (
    <>
      <Modal
        open={isgeneratemodal}
        onOk={handleOk} // Consider if this is needed or if CONFIRM is the only path to generation
        onCancel={handleCancel}
        centered={true}
        width={415}
        footer={null}
      >
        <div className="connectModal">
          <div className="w-full">
            <p className="fw-bold ex-large font-Apex font-normal darkBlack text-center">Generate NFT</p>
          </div>
          <div className="innerContent flex flex-col items-center gap-5 mt-4 ">
            <img src={redline} alt="" />
            <div className="enterAmount flex flex-col justify-start gap-2 w-full mt-3">
              <p className="darkBlack font-Roboto medium font-normal">Type</p>
              <Select
                className="rounded-lg"
                defaultValue={nftType}
                value={nftType}
                style={{ width: '100%', height: '55px' }} // Use 100% width for responsiveness
                onChange={handleChange} // This function is empty, consider if it's needed
                options={[
                  { value: 'single', label: 'Single NFT' },
                  { value: 'multiple', label: 'Multiple NFT' },
                ]}
                disabled={true}
              />
            </div>
            <div className="enterAmount flex flex-col justify-start gap-2 w-full mb-5 mt-3">
              <p className="darkBlack font-Roboto medium font-normal">Prompt</p>
              <textarea
                className="rounded-lg py-3.5 px-6 w-full h-[150px] border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" // Added some basic styling
                placeholder="Enter your prompt details here..."
                value={inputValue}
                disabled
              />
            </div>
            <div className="paymentMethod py-[14px] px-[25px] bg-[#F4F3F3] flex flex-col gap-3 justify-start w-full rounded-md">
              <p className="darkBlack font-Roboto medium font-normal">Payment Method</p>
              <p className="lightGray small font-Roboto font-normal">Cost of Generation : {fee ? fee : 'Calculating...'} Algo</p>
            </div>
            <img src={redline} alt="" />
            <div className="btnWrapper w-full flex justify-end mt-3">
              <Button
                className="button btn-primary medium font-Roboto font-medium"
                width={144}
                minHeight={53}
                text="CONFIRM"
                disabled={loading || !activeAccount} // Disable if loading or wallet not connected
                onClick={() => {
                  if (activeAccount?.address) {
                    toast.promise(deductImageGenerationFee(), {
                      pending: 'Processing payment...',
                      error: 'Transaction failed or was rejected.',
                      success: 'Payment successful! Preparing generation...',
                    })
                  } else {
                    toast.error('Please connect your wallet first.')
                  }
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default GenerateNft
