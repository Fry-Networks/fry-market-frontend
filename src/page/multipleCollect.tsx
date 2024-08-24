import nft1 from "../assets/images/createNft/nftimage1.webp";
import nft2 from "../assets/images/createNft/nftimage2.webp";
import nft3 from "../assets/images/createNft/nftimage3.webp";
import nft4 from "../assets/images/createNft/nftimage4.webp";
import nft5 from "../assets/images/createNft/nftimage1.webp";
import nft6 from "../assets/images/createNft/nftimage2.webp";
import nft7 from "../assets/images/createNft/nftimage3.webp";
import nft8 from "../assets/images/createNft/nftimage4.webp";
import nft9 from "../assets/images/createNft/nftimage1.webp";
import nft10 from "../assets/images/createNft/nftimage2.webp";
import Navbar from "../components/layout/navbar";
import Button from "../components/shared/button";
import { useNavigate } from "react-router-dom";
import bgGlow from "../assets/images/createNft/bgGlow.png";
const MultipleCollect = () => {
  const images = [nft1, nft2, nft3, nft4, nft5, nft6, nft7, nft8, nft9 , nft10];
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/createnft-collect");
  };
  return (
    <>
      <div className="createNft mt-16 relative">
        <img  className="absolute top-[-200px] -z-10" src={bgGlow} alt="" />
        <div className="container ">
          <div className=" nftBtnContainer flex items-center justify-between mb-[75px]">
            <div className="singlenft flex items-center justify-between gap-4 ">
              <Button
                text="Collection"
                className="py-4 px-8 lightGray font-medium font-Roboto border"
              />
              <p className="large lightGray font-normal font-Roboto">
                10/10 Generated
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
          <div className="multipleCARD grid grid-cols-4 gap-x-16 gap-y-10">
            {images.map((image, index) => (
              <div key={index} className="relative group overflow-hidden">
                <img
                  src={image}
                  alt={`nft-${index}`}
                  className="opacity-1 w-full h-full object-cover"
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

export default MultipleCollect;

