import { toast } from "react-toastify";
import copy from "../../assets/createNft/copy.png";
const PromptCard = ({ data }: any) => {
  return (
    <>
      <div
        style={{ border: "3px solid #E7E7E7" }}
        className="max-w-[577px] max-h-[262px] w-full h-full promptCard bg-white  rounded-3xl p-4 outline outline-[#E7E7E7] flex-center gap-11 relative "
      >
        <img
          className="copy absolute top-[40%] left-[44%] cursor-pointer"
          src={copy}
          alt=""
          onClick={() => { navigator.clipboard.writeText(data.description); toast.success("Prompt Successfully copied to clipboard", { toastId: "prompt copied" }) }}
        />
        <div className="leftSide w-1/2 h-full">
          <div className="max-w-[310px] max-h-[252px] w-full h-full ">


            <img className="max-w-[310px] max-h-[252px] w-full h-full object-cover rounded-2xl" src={data.nftImg} alt="" />
          </div>
        </div>
        <div className="rightSide w-2/5 flex flex-col gap-3  justify-start  h-full">
          <p className="font-Apex large font-normal darkBlack">{data.title}</p>
          <p className="lightGray font-Roboto small opacity-80">
            {data.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default PromptCard;
