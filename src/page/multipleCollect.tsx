import React, { useState } from "react";
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
import bgGlow from "../assets/images/createNft/bgGlow.webp";
import { Icon } from "@iconify/react";

const MultipleCollect: React.FC = () => {
  const images: string[] = [nft1, nft2, nft3, nft4, nft5, nft6, nft7, nft8, nft9, nft10];
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-nft-collection");
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
      <div className="createNft my-16 relative">
        <img className="absolute top-[-200px] w-full -z-10" src={bgGlow} alt="" />
        <div className="container">
          <div className="nftBtnContainer flex items-center justify-between mb-[75px]">
            <div className="singlenft flex items-center justify-between gap-4">
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
              />
            </div>
          </div>
          <div className="multipleCARD grid grid-cols-4 gap-x-16 gap-y-10">
            {images.map((image: string, index: number) => (
              <div
                key={index}
                className="relative group overflow-hidden cursor-pointer"
                onClick={() => toggleImageSelection(index)}
              >
                <img
                  src={image}
                  alt={`nft-${index}`}
                  className={`w-full h-full object-cover max-w-[288px] max-h-[265px] ${
                    selectedImages.includes(index) ? "opacity-70" : "opacity-1"
                  }`}
                />
                {selectedImages.includes(index) && (
                  <>
                    <div className="absolute rounded-2xl inset-0 bg-black opacity-80"></div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-transparent rounded-full flex items-center justify-center">
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

export default MultipleCollect;
