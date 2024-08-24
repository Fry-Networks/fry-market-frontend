


const TopCollectionCard = ({ data }: any) => {
  return (
    <>
      <div style={{ border: "2px solid #E7E7E7" }} className="cardWrap p-2.5 flex flex-col gap-4 bg-white rounded-lg border-2 border-gray-700">
        <div className="cardBody graybg p-2.5 grid gap-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <img src={data.cardBodyImg1} alt="" />
            <img src={data.cardBodyImg2} alt="" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <img src={data.cardBodyImg3} alt="" />
            <img src={data.cardBodyImg4} alt="" />
            <img src={data.cardBodyImg5} alt="" />
            <img src={data.cardBodyImg6} alt="" />
          </div>
        </div>
        <div className="cardBtm flex justify-start items-center gap-3">
          <img src={data.cardBtmImg} alt="" />
          <div className='flex flex-col gap-1'>
            <p className='medium font-Roboto font-bold darkBlack'>{data.art} </p>
            <p className='small font-Roboto font-normal lightGray '>Created by <span className='font-bold'>{data.artistName} </span></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default TopCollectionCard;