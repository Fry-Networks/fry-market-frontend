import React from 'react';
import headerImg from "../../assets/nftCollection/popularHeaderImg.png";
import icontick from "../../assets/icons/purplr-bg-tick.svg"; 
import { useNavigate } from "react-router-dom";
const ExploreCard = ({data}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/top-collection");
  };
  return (
    <>
  <div className="cursor-pointer exploreCard w-[417px] h-[276px] rounded-2xl p-2.5 outline outline-2 outline-[#E7E7E7]" onClick={handleClick}>
   
    <div className="inner flex flex-col gap-3 w-screen">
        <div className="headerArea flex justify-start items-center gap-3 w=1/4">
<img src={data.headerImg} alt="" />
<div className='flex flex-col gap-2'>
    <p className='medium font-Roboto font-bold darkBlack'>WONDERFUL ARTWORK</p>
<div className='flex gap-2'>
<p className='small font-Roboto font-normal lightGray'>Created by <span className='font-bold'>{data.artistName} </span> </p>
<img src={icontick} alt="" />
</div>

</div>
        </div>
        <div className="bodyArea w-3/4 relative" >
        <div className='absolute py-[8px] px-[17px] bg-[#E7E7E7] rounded-lg bottom-0 left-[152px] ex-small font-normal lightGray'> Items  &nbsp;
          <span className="darkBlack font-bold">{data.itemPrice}</span>
        </div>
           <img src={data.bodyPic} alt="" />
        </div>

    </div>
  </div>
    
    </>
  )
}

export default ExploreCard;

