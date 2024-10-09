import { useNavigate } from "react-router-dom";
import icontick from "../../assets/icons/purplr-bg-tick.svg";
const ExploreCard = ({ data }: any) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/top-collection");
  };
  return (
    <>
      <div className="cursor-pointer exploreCard w-[417px] h-[276px] rounded-2xl p-2.5 outline outline-2 outline-[#E7E7E7]" onClick={handleClick}>

        <div className="inner flex flex-col gap-3 max-w-[417px] max-h-[276px] w-full h-full">
          <div className="headerArea flex justify-start items-center gap-3 w-full">
            <div className="max-w-[65px] h-[65px] object-cover rounded-3xl w-full flex items-center justify-center">
              <img className="max-w-[65px] max-h-[65px] object-cover rounded-xl w-full h-full" src={data.headerImg} alt="" />

            </div>
            <div className='flex flex-col gap-2'>
              <p className='medium font-Roboto font-bold darkBlack'>WONDERFUL ARTWORK</p>
              <div className='flex gap-2'>
                <p className='small font-Roboto font-normal lightGray'>Created by <span className='font-bold'>{data.artistName} </span> </p>
                <img src={icontick} alt="" />
              </div>

            </div>
          </div>
          <div className="bodyArea w-full relative" >
            <div className='grayDiv absolute py-[8px] px-[17px] bg-[#E7E7E7] rounded-lg bottom-0 left-[38%] ex-small font-normal lightGray'> Items  &nbsp;
              <span className="itemBox darkBlack font-bold">{data.itemPrice}</span>
            </div>
            <img className="max-w-[397px] max-h-[178px] h-full w-full object-cover" src={data.bodyPic} alt="" />
          </div>

        </div>
      </div>

    </>
  )
}

export default ExploreCard;

