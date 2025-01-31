import { Icon } from "@iconify/react";
import { useWallet } from "@txnlab/use-wallet";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bgGlow from "../assets/images/createNft/bgGlow.webp";
import nft1 from "../assets/images/createNft/nftimage1.webp";
import nft2 from "../assets/images/createNft/nftimage2.webp";
import nft3 from "../assets/images/createNft/nftimage3.webp";
import nft4 from "../assets/images/createNft/nftimage4.webp";
import Button from "../components/shared/button";
import { mintMultipleNft } from "../fryMarketMethods";
import "./loader.scss";

const baseUrl = import.meta.env.VITE_API_BASE_URL;


const CreateNft: React.FC = () => {
  const images = [nft1, nft2, nft3, nft4];
  const [selectedImages, setSelectedImages] = useState<any>([]);
  const [generatedNfts, setGeneratedNfts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [mintLoading, setMintLoading] = useState(false);
  const [locationParams, setLocationParams] = useState<any>({});
  const [isMintSuccessful, setIsMintSuccessful] = useState<any>(true);
  const [isFailed, setIsFailed] = useState<any>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()
  const walletAddressRef = useRef<string | null>(null);

  useEffect(() => {
    if (activeAccount?.address) {
      walletAddressRef.current = activeAccount.address;
    }
  }, [activeAccount]);
  const handleClick = () => {
    if (selectedImages.length > 0) {
      if (activeAccount?.address) {
        if (selectedImages.length > 0) {

          toast.promise(
            mintNft(),
            {
              pending: "NFT is minting",
              error: "There was an error Minting NFT",
              // @ts-ignore
              success: `NFT minted successfully`
            }
          )
        }
        else {
          toast.error(`${locationParams.nftType == "single" ? "Please select an NFT" : "Please select NFTs"}`)
        }
      }
      else {

        toast.error("Please connect wallet first");

      }
    }
    else {
      toast.error("Please select NFT first")
    }



  };

  const generateImages = (inputValue: any, selectedStyle: any, supply: any) => {
    setLoading(true);

    const ws = new WebSocket("wss://nftproduction.fry.market/ws");

    ws.onopen = () => {
      console.log("WebSocket connected ✅");
      const walletAddress = walletAddressRef.current || "fallback_wallet_address";

      ws.send(JSON.stringify({
        wallet_address: walletAddress,
        prompt: inputValue,
        style: selectedStyle,
        num_images: supply
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "image") {
        // Add initial NFT object with image URL
        setGeneratedNfts((prevNfts: any) => [...prevNfts, { image: data.data }]);
        setIsFailed(false);
      } else if (data.type === "metadata") {
        // Update the NFT entry with full metadata
        const metadata = data.data;
        setGeneratedNfts((prevNfts: any) => {
          const index = prevNfts.findIndex((nft: any) => nft.image === metadata.image);
          if (index !== -1) {
            const newNfts = [...prevNfts];
            newNfts[index] = metadata; // Replace with complete metadata
            return newNfts;
          }
          return prevNfts;
        });
      } else if (data.type === "progress") {
        console.log(`Progress: ${data.progress}%`);
      } else if (data.type === "event") {
        console.log("All images received ✅");
        ws.close();
        setLoading(false);
      } else if (data.error) {
        toast.error("Error while generating NFTs");
        setIsFailed(true);
        setLoading(false);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error ❌", error);
      toast.error("WebSocket error while generating NFTs");
      setIsFailed(true);
      setLoading(false);
    };

    ws.onclose = (event) => {
      console.log("WebSocket closed 🚪", event);
    };
  };



  // useEffect(() => {
  //   if (isMintSuccessful) {
  //     navigate("/artist-profile")
  //   }
  // }, [isMintSuccessful])

  const imgGeneration = () => {
    const { inputValue, selectedStyle, supply, nftType } = location.state;
    if (inputValue && selectedStyle && supply && nftType && !loading) {
      setLocationParams(location.state);
      generateImages(inputValue, selectedStyle, supply);
    }
  };

  useEffect(() => {
    if (location.state) {
      imgGeneration()
    }
    else {
      // alert("No location data found")
      navigate("/create-nft-page")
    }
  }, [])

  const toggleImageSelection = (nftObject: any, index: number) => {
    if (loading || mintLoading) {
      return;
    }
    if (locationParams.nftType == "single") {
      setSelectedImages([nftObject])
    }
    else {

      const found = selectedImages.some((nftObj: any) => nftObj.image == nftObject.image);
      if (found) {
        setSelectedImages((prev: any) => {
          const filteredArray = prev.filter((nftObj: any) => nftObj.image != nftObject.image);
          return filteredArray;
        });
      } else {
        setSelectedImages((prev: any) => ([...prev, nftObject]));
      }
    }
  };

  useEffect(() => {
    // console.log("selectedImages", selectedImages);
  }, [selectedImages])

  useEffect(() => {
    window.onbeforeunload = function () {
      window.history.replaceState({}, '')
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const mintNft = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        setMintLoading(true);
        const response: any = await mintMultipleNft(selectedImages, activeAccount?.address || "", signer, signTransactions, sendTransactions)
        // console.log("response after minting", response);
        // toast.success("Mint Successful")
        setMintLoading(false);
        setIsMintSuccessful(true);
        resolve(true);

        navigate("/artist-profile")

      }
      catch (e) {
        // console.log("Error Mintin Nft");
        // toast.error("Error Creating Collection");
        setMintLoading(false);
        setIsMintSuccessful(false);

        reject(false);


      }


    });

  }

  return (
    <>
      <div className="createNft mt-16 relative">
        <img className="absolute top-[-200px] -z-10" src={bgGlow} alt="" />
        <div className="container ">
          <div className="nftBtnContainer flex items-center justify-between mb-[75px]">
            <div className="singlenft flex items-center justify-between gap-4 ">
              <Button
                text={`${locationParams.nftType == "single" ? "Single NFT" : "Multiple NFT"}`}
                className="py-4 px-8 lightGray font-normal font-Roboto border cursor-default"
              />
              <p className="large lightGray font-normal font-Roboto">
                {/* {isMintSuccessful ? locationParams.supply ? loading ? "0 / " + locationParams.supply : locationParams.supply + "/" + locationParams.supply : "0/0" : "0/0"} Generated */}
                {generatedNfts.length + "/" + locationParams.supply}
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
                disabled={loading || mintLoading}
              />

              {!loading && isFailed &&
                <Button
                  className="button btn-primary text-[12px] font-semibold"
                  width={96}
                  minHeight={37}
                  text="Generate Again"
                  onClick={imgGeneration}
                  disabled={loading || mintLoading}
                />


              }

            </div>
          </div>
          <div className="singleNftCard flex items-center justify-between" style={{ flexWrap: "wrap", justifyContent: "flex-start", gap: "50px" }}>
            {/* {images.map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden cursor-pointer"
                onClick={() => toggleImageSelection(index)}
              >
                <img
                  src={image}
                  alt={`nft-${index}`}
                  className={`w-full h-full max-w-[288px] max-h-[265px] object-cover ${selectedImages.includes(index) ? "opacity-70" : "opacity-1"
                    }`}
                />
                {selectedImages.includes(index) && (
                  <>
                    <div className="absolute rounded-2xl inset-0 bg-black opacity-80"></div>
                    <div className="absolute top-2  right-2 w-6 h-6 bg-transparent flex items-center justify-center">
                      <Icon icon="teenyicons:tick-circle-outline" width="18" height="18" style={{ color: "white" }} />

                    </div>
                  </>
                )}
              </div>
            ))} */}
            {generatedNfts.map((nftObject: any, index: any) => (
              <div
                key={index}
                className="relative group overflow-hidden cursor-pointer"
                onClick={() => toggleImageSelection(nftObject, index)}
              >

                <img
                  src={nftObject.image}
                  alt={`nft-${index}`}
                  className={`w-full h-full max-w-[288px] max-h-[265px] object-cover  ${selectedImages.includes(index) ? "opacity-70" : "opacity-1"
                    }`}
                  style={{ borderRadius: "20px" }}
                />
                {selectedImages.some((nftObj: any) => nftObj.image == nftObject.image) && (
                  <>
                    <div className="absolute rounded-2xl inset-0 bg-black opacity-80"></div>
                    <div className="absolute top-2  right-2 w-6 h-6 bg-transparent flex items-center justify-center">
                      <Icon icon="teenyicons:tick-circle-outline" width="18" height="18" style={{ color: "white" }} />

                    </div>
                  </>
                )}
              </div>
            ))}
            {loading && Array.from({ length: Math.max(Number(locationParams.supply || 0) - generatedNfts.length, 0) }).map((_, index) => (
              <div
                key={index}
                className="relative group overflow-hidden cursor-pointer"
              >
                <span className="loaderNew"></span>
              </div>
            )
            )
            }
          </div>
        </div>

      </div>
    </>
  );
};


export default CreateNft;
