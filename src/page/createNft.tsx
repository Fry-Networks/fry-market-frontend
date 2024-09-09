import { useState } from "react";
import { useNavigate } from "react-router-dom";
import nft1 from "../assets/images/createNft/nftimage1.webp";
import nft2 from "../assets/images/createNft/nftimage2.webp";
import nft3 from "../assets/images/createNft/nftimage3.webp";
import nft4 from "../assets/images/createNft/nftimage4.webp";
import Button from "../components/shared/button";
import bgGlow from "../assets/images/createNft/bgGlow.webp";
import { Icon } from "@iconify/react";

const CreateNft: React.FC = () => {
  const images = [nft1, nft2, nft3, nft4];
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/select-nft");
  };

  const toggleImageSelection = (index: number) => {
    if (selectedImages.includes(index)) {
      setSelectedImages(selectedImages.filter((i) => i !== index));
    } else {
      setSelectedImages([...selectedImages, index]);
    }
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
                className="py-4 px-8 lightGray font-normal font-Roboto border"
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
                className="button btn-primary text-[12px] font-semibold"
                width={96}
                minHeight={37}
                text="Mint NFT"
                onClick={handleClick}
              />
            </div>
          </div>
          <div className="singleNftCard flex items-center justify-between">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden cursor-pointer"
                onClick={() => toggleImageSelection(index)}
              >
                <img
                  src={image}
                  alt={`nft-${index}`}
                  className={`w-full h-full max-w-[288px] max-h-[265px] object-cover ${
                    selectedImages.includes(index) ? "opacity-70" : "opacity-1"
                  }`}
                />
                {selectedImages.includes(index) && (
                  <>
                    <div className="absolute rounded-2xl inset-0 bg-black opacity-80"></div>
                    <div className="absolute top-2  right-2 w-6 h-6 bg-transparent flex items-center justify-center">
                    <Icon icon="teenyicons:tick-circle-outline" width="18" height="18"  style={{color: "white"}} />

                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNft;
