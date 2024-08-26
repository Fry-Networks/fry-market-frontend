import timeIcon from "../../assets/icons/timeIcon.svg";
import Button from "../shared/button";
import whiteCard from "../../assets/home/images/whiteCard.png";

const AuctionCard = ({ data }: any) => {
  return (
    <>
      <div className='auctionCard flex flex-col gap-2 relative'>
      <img className="whiteCard absolute top-0 left-0 -z-20" src={whiteCard} alt="" />
        <div className="Cardheader flex justify-start gap-2">
          <div className="t-left-part w-1/5">
            <img src={data.userImg} alt="" />
          </div>
          <div className="t-right-part w-4/5">
            <p className="medium font-Apex font-light darkBlack ">
              {data.userName}
            </p>
            <p className="ex-small font-light font-Roboto lightGray opacity-80">
              {data.userEmail}
            </p>
          </div>
        </div>
        <div className="cardBody relative">


          <Button
            className="placeBidBtn button font-Montserrat btn-primary font-semibold ex-small absolute -bottom-9 opacity-0 left-[100px]"
            minWidth={96}
            minHeight={37}
            text="Place a Bid"
          />
          <div
            className="z-50 timimgDiv  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-lg py-2.5 px-4 bg-white bg-opacity-80"
          >
            <p className="medium font-medium darkBlack">3:06:59:18</p>
          </div>

          <div className="absolute p-3 bottom-0 flex justify-between items-center w-full z-50">

            <div className="cursor-pointer rounded-lg p-2.5 bg-white flex justify-between items-center gap-4">
              <p className="ex-small darkBlack font-medium font-Roboto">
                In Stock
              </p>
              <p className="ex-small lightGray font-medium font-Roboto">7</p>
            </div>



            <button className="p-3 bg-white flex gap-2 items-center">
              <span className="ex-small darkBlack fw-medium">Price:</span>
              <div className="flex gap-1">
                <img src={timeIcon} alt="" />
                <span className="ex-small lightGray font-medium">
                  {data.price}
                </span>
              </div>
            </button>
          </div>
          <img src={data.nftImg} alt="" />
        </div>
      </div>
    </>
  )
}

export default AuctionCard;