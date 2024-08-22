import nft1 from "../assets/images/createNft/nftimage1.webp";
import nft2 from "../assets/images/createNft/nftimage2.webp";
import nft3 from "../assets/images/createNft/nftimage3.webp";
import nft4 from "../assets/images/createNft/nftimage4.webp";
import Navbar from "../components/layout/navbar";
import Button from "../components/shared/button";
import { useNavigate } from "react-router-dom";
const CreateNft = () => {
  const images = [nft1, nft2, nft3, nft4];
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/createnft-collect");
  };
  return (
    <>
     
      <div className="createNft mt-16">
        <div className="container ">
          <div className="flex items-center justify-between mb-[75px]">
            <div className="flex items-center justify-between gap-4 ">
              <Button
                text="Single NFT"
                className="py-4 px-8 lightGray font-medium font-Roboto border"
              />
              <p className="large lightGray font-normal font-Roboto">
                4/4 Generated
              </p>
            </div>
            <p className="lightGray font-normal font-Roboto text-base ">
              Select an image to mint
            </p>
          </div>
          <div className="flex items-center justify-between ">
            {images.map((image, index) => (
              <div key={index} className="relative group overflow-hidden">
                <img
                  src={image}
                  alt={`nft-${index}`}
                  className="opacity-1 w-full h-full"
                />
                <Button
                  className="absolute ex-small w-24 font-semibold btn-primary btn-primaryBorder translate-x-[90px] opacity-0 group-hover:opacity-100 group-hover:translate-y-[-60px] group-hover:block transition-all duration-1000 ease-in-out"
                  text="Mini NFT"
                  onClick={handleClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateNft;
