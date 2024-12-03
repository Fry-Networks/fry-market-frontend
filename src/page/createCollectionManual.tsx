// @ts-ignore
import { useWallet } from "@txnlab/use-wallet";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { TokenContext } from "../App";
import nft1 from "../assets/images/createNft/profilepic.png";
import Button from "../components/shared/button";
import Input from "../components/shared/input";
import Textarea from "../components/shared/textarea";
import { addCollectionRoyalty, getRoyalty } from "../fryMarketMethods";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const CreateNftCollectionManual = () => {
  const [prevImage, setPrevImage] = useState("")
  const navigate = useNavigate();
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()
  // @ts-ignore
  const { token }: any = useContext(TokenContext)

  const [formData, setFormData] = useState({
    collection_name: '',
    description: '',
  });

  const [collectionDataFound, setCollectionDataFound] = useState<any>(false)
  const [royalty, setRoyalty] = useState<any>(false)


  const getCollectionData = async () => {
    if (activeAccount?.address) {
      try {

        // const config = {
        //   headers: { Authorization: `Bearer ${token}` }
        // };
        const royalty = await getRoyalty(activeAccount?.address);
        setRoyalty(Number(royalty) / 100)
        const response = await axios.get(`${baseUrl}/get-collection/${activeAccount?.address}`);
        console.log("Collection Data", response.data);
        setCollectionDataFound(true);
        setFormData(response.data)

      }
      catch (e) {
        console.log("Error Getting Collection", e);
        // toast.error("Error Creating Collection");

      }
    }
  }

  useEffect(() => {
    getCollectionData();
  }, [activeAccount])

  const handleInput = (e: any) => {
    console.log(e.target.files[0])
    setPrevImage(e.target.files[0])
  }


  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validation = () => {
    console.log("Dd", activeAccount?.address);

    if (formData.collection_name && formData.description && activeAccount?.address && prevImage && royalty) {
      return true
    }
    else {
      return false
    }
  }

  const uploadImage = async () => {

    try {
      return new Promise(async (resolve, reject) => {
        // if (!token) {

        //   reject(false);
        // }
        try {
          if (activeAccount?.address) {
            const addRoyaltyResponse = await addCollectionRoyalty(activeAccount?.address, signer, royalty, activeAccount?.address)
            console.log("added", addRoyaltyResponse);

            const formDataForImage = new FormData;
            formDataForImage.append("images", prevImage);
            const response = await axios.post(`${baseUrl}/upload-images`, formDataForImage);
            console.log("Response in upload Image", response.data);
            setFormData(prev => ({ ...prev, image_url: response.data?.image_urls[0] }))
            if (response.data?.image_urls[0]) {

              if (await handleContinue(response.data?.image_urls[0])) {
                resolve(true);
              }
              else {
                reject(false);
              }
            }
            else {
              console.log("Some Error Occured while uploading image. Please try again.");
              reject(false);

            }
          }
          else {
            reject(false)
          }
        }
        catch (e) {
          console.log("error", e);

          reject(false)

        }




      })

    }
    catch (e) {
      console.log("Error Uploading Image", e);
      return e;


    }


  }

  const handleContinue = async (imageUrl: any) => {
    try {

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const response: any = await axios.post(`${baseUrl}/create-collection`, { ...formData, image_url: imageUrl, collection_address: activeAccount?.address }, config);
      console.log("Hehe", response.data);
      return true;

    }
    catch (e) {
      console.log("Error Creating Collection");
      // toast.error("Error Creating Collection");
      return false

    }
  }

  // useEffect(() => {
  //   console.log("hahs");

  //   handleContinue()
  // }, [])

  return (
    <>

      <div>
        <div className="nftCollection mt-[107px] h-[110vh]">
          <div className="container">
            <div className="contentWrapper flex gap-8 w-full">
              <div className=" leftContent flex flex-col  items-start">
                <div className="p-[20px] bg-white flex justify-center rounded-[20px] box-shadow ">

                  <label htmlFor="collectionImage" className="block">
                    <img src={
                      // @ts-ignore
                      formData.image_url ? formData.image_url : prevImage == "" || prevImage == undefined ? nft1 : URL.createObjectURL(prevImage)} alt="profile image" style={{ width: "288px", objectFit: "cover" }} />
                    <input className="hidden" id="collectionImage" type="file" accept="image/png, image/jpeg, image/webp,image/jpg" onChange={handleInput} disabled={collectionDataFound} />
                    <span
                      className="btn-gray w-full darkGray mt-7 text-center block"> Choose file </span>
                  </label>
                </div>

              </div>

              <div className="w-[992px] rightContent">
                <div className="flex gap-3 items-center rightText">
                  {/* <Button
                    className="btn-gray w-32 lightGray"
                    text="Collection"
                  />
                  <Button
                    className="btn-gray w-32 lightGray "
                    text="100 Items"
                  /> */}
                </div>
                <div className="py-4 px-[89px] bg-white box-shadow rounded-[20px] manualDiv">
                  <h2 className="text-center font-normal text-[40px] font-Apex darkBlack mb-24 uppercase mt-[20px]">
                    Create a collection
                  </h2>
                  <form action="" className="flex flex-col gap-7">
                    <div>
                      <Input
                        type="text"
                        label="Collection Name*"
                        placeholder="Name your Collection"
                        className="w-full input-nft"
                        name="collection_name"
                        value={formData.collection_name}
                        onChange={handleChange}
                        disabled={collectionDataFound}
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        label="Token Symbol*"
                        placeholder="$ CGPT, for example"
                        className="w-full input-nft"
                        disabled={collectionDataFound}
                      />
                    </div>
                    <div>
                      <Input
                        type="number"
                        label="Royalty*"
                        placeholder="Enter Royalty Percentage (0-15%)"
                        className="w-full input-nft"
                        name="collection_name"
                        value={royalty}
                        onChange={(e: any) => {
                          console.log("e", e.target.value);

                          if (e.target.value == "" || e.target.value >= 0 && e.target.value <= 15) {
                            setRoyalty(e.target.value)
                            console.log("D");
                          }
                        }}
                        disabled={collectionDataFound}
                      />
                    </div>
                    <div>



                      <Textarea
                        // label="Description "
                        label={
                          <>
                            <div className="flex flex-col gap-2">
                              <span>Description</span>
                              <span className="medium ">
                                The description will be included on the item's
                                detail page underneath its image.
                              </span>
                            </div>
                          </>
                        }
                        rows={6}
                        placeholder="Provide a detailed description of your item"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        disabled={collectionDataFound}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        className="btn-primary px-8 py-4 mb-5"
                        text="Continue"
                        onClick={(e: any) => {
                          e.preventDefault(); console.log("hello");
                          //  navigate("/select-nft") 
                          if (validation()) {

                            toast.promise(
                              uploadImage().then((response) => {
                                if (response) {
                                  navigate("/manual-create-nft")
                                }

                              }),
                              {
                                pending: "Collection is creating",
                                error: "There was an error Creating Collection",
                                success: "Collection created successfully ."

                              }


                            )
                          }
                          else {
                            if (!activeAccount?.address) {
                              toast.error("Please connect wallet first");
                            }
                            else {
                              toast.error("Please provide all information.");
                            }

                          }

                        }}
                        disabled={collectionDataFound}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default CreateNftCollectionManual;
