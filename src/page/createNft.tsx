import { useNavigate } from "react-router-dom";
import nft1 from "../assets/images/createNft/nftimage1.webp";
import nft2 from "../assets/images/createNft/nftimage2.webp";
import nft3 from "../assets/images/createNft/nftimage3.webp";
import nft4 from "../assets/images/createNft/nftimage4.webp";
import Button from "../components/shared/button";
import bgGlow from "../assets/images/createNft/bgGlow.png";
const CreateNft = () => {
  const images = [nft1, nft2, nft3, nft4];
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/select-nft");
  };
  return (
    <>
     
    <div className="createNft mt-16 relative">
      <img className="absolute top-[-200px] -z-10" src={bgGlow} alt="" />
      <div className="container ">
        <div className="nftBtnContainer flex items-center justify-between mb-[75px]">
          <div className="singlenft flex items-center justify-between gap-4 ">
            <Button
              text="Single NFT"
              className="py-4 px-8 lightGray font-medium font-Roboto border"
            />
            <p className="large lightGray font-normal font-Roboto">
              4/4 Generated
            </p>
          </div>

          <div className="selectnft flex justify-center items-center gap-3">

          <p className="lightGray font-normal font-Roboto text-base">
          Select an NFT to mint
          </p>


          <Button
            className="button btn-primary text-[12px] font-medium"
            width={96}
            minHeight={37}
            text="Mint NFT"
            onClick={handleClick}
          ></Button>

          </div>
    
        </div>
        <div className="singleNftCard flex items-center justify-between ">
          {images.map((image, index) => (
            <div key={index} className="relative group overflow-hidden">
              <img
                src={image}
                alt={`nft-${index}`}
                className="opacity-1 w-full h-full max-w-[288px] max-h-[265px] object-cover"
              />
              {/* <Button
                className="absolute ex-small w-24 font-semibold btn-primary btn-primaryBorder translate-x-[90px] opacity-0 group-hover:opacity-100 group-hover:translate-y-[-60px] group-hover:block transition-all duration-1000 ease-in-out"
                text="Mini NFT"
                onClick={handleClick}
              /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
  );
};
export default CreateNft;
