
const SellerCard = ({ data }: any) => {
  return (
    <>
      <div className="sellerCardContainer mb-7">
        <div className="inner flex gap-3">
          <div className="leftArea">
            <img className="max-w-[116px] max-h-[116px] w-full h-full object-cover rounded-2xl" src={data.sellerImg} alt="" />
          </div>
          <div className="rightArea flex flex-col justify-end pb-3 gap-2">
            <p className="large font-bold font-Roboto darkBlack ">
              {data.sellerName}
            </p>
            <p className="small font-bold lightGray">{data.rate}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerCard;
