import sendIcon from "../../assets/icons/sendIcon.svg";
import Input from "../shared/input";
import readyDropIcon from "../../assets/home/images/homeImages/readyDropBtn.webp";

const ReadyForNext = () => {
  const placeholderStyle = {
    color: "red"
  };
  return (
    <>
      <div className="nextNftWrapper">
        <div className="container">
          <h2 className="font-bold font-Oxanium capitalize darkBlack mb-10 text-center">
            Ready For Next NFT Drop?
          </h2>

          <div
            style={{ width: "680px", height:"96px", margin: "0 auto" }}
            className="relative nftDropInput"
          >
            <Input
              wrapperClass="flex items-center justify-center mx-auto z-10 border-2 border-red-500 "
              placeholder="info@gmail.com"
              inputClass="ex-large font-normal font-Roboto primary mx-auto  flex items-center justify-center custom-placeholder border-2 border-red-500"
              width={680}
              height={96}
              minHeight={96}
              type="text"
              className="m-auto nftdropInput"


            />
          
              <img
              className="absolute top-[17px] right-8 object-cover cursor-pointer"
                style={{ width: "88px", height: "76px" }}
                src={readyDropIcon}
                alt=""
              />
        
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadyForNext;
