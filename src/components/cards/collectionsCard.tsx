import { useEffect, useState } from "react";
import whiteCard from "../../assets/home/images/whiteCard.png";
import timeIcon from "../../assets/icons/timeIcon.svg";
import BoostNft from "../../modals/boostNft";
import Button from "../shared/button";


const CollectionsCard = ({ data, showHiddenDiv, isAuctionPage, showLayer, isProfilePage }: any) => {
  const [isSoldbtn, setIsSoldBtn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showLayer) {
      setIsSoldBtn(true);
    }
  }, [showLayer]);
  useEffect(() => {
    if (showHiddenDiv) {
      setIsVisible(true);
    }
  }, [showHiddenDiv]);


  // const [isSoldbtn, setIsSoldBtn] = useState(false);
  // const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showLayer) {
      setIsSoldBtn(true);
    }
  }, [showLayer]);
  useEffect(() => {
    if (showHiddenDiv) {
      setIsVisible(true);
    }
  }, [showHiddenDiv]);

  const [isboostmodal, setisboostmodal] = useState(false);

  const showBoostModal = () => {
    setisboostmodal(true);
  };

  return (
    <>
      <div className="collectionCard flex flex-col gap-2 relative">
        <img className="whiteCard absolute top-0 left-0 -z-20" src={whiteCard} alt="" />
        <div className="Cardheader flex justify-start items-center gap-2">
          <div className="t-left-part w-1/5 ">
            <img src={data.userImg} alt="" />
          </div>
          <div className="t-right-part w-4/5 flex flex-col gap-2">
            <p className="medium font-Apex font-light darkBlack ">
              {data.userName}
            </p>
            <p className="ex-small font-light font-Roboto lightGray opacity-80">
              {data.userEmail}
            </p>
          </div>
        </div>
        <div className="cardBody relative">
          <div
            className={` ${isSoldbtn ? " " : "hidden"
              } absolute w-full h-full top-0 left-0 flex items-center justify-center z-30`}
          >
            <div className="absolute w-full h-full top-0 left-0 bg-black opacity-40"></div>
            <Button
              className="relative z-10 button ex-small font-semibold font-Apex text-white bg-[linear-gradient(318deg,#FD0000_26.88%,#BB5151_105.85%)]"
              minWidth={96}
              minHeight={37}
              text="Sold"
              
            />
          </div>
          <div
            className={`${isVisible ? "" : "hidden"
              } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-lg py-2.5 px-4 bg-white bg-opacity-80`}
          >
            <p className="medium font-medium darkBlack">3:06:59:18</p>
          </div>
          <div className="absolute p-3 bottom-0 flex justify-between items-center w-full">
            {isAuctionPage ? (
              <div className="cursor-pointer rounded-lg p-2.5 bg-white flex justify-between items-center gap-4">
                <p className="ex-small darkBlack font-medium font-Roboto">
                  In Stock
                </p>
                <p className="ex-small lightGray font-medium font-Roboto">7</p>
              </div>
            ) : (
              isProfilePage ? (
                <Button
                  className="button btn-primary font-medium ex-small border-none"
                  minWidth={56}
                  minHeight={36}
                  text="Boost"
                  onClick={showBoostModal}
                />
              ) : (
                <Button
                  className="button btn-primary font-medium ex-small"
                  minWidth={56}
                  minHeight={36}
                  text="Buy"
                />
              )
            )}
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
          <img className="rounded-lg" src={data.nftImg} alt="" />
        </div>
      </div>


      <BoostNft
        isboostmodal={isboostmodal}
        setisboostmodal={setisboostmodal}
      />
    </>
  );
};

export default CollectionsCard;
