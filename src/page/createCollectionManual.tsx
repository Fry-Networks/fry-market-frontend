// @ts-ignore
import { useWallet } from "@txnlab/use-wallet";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import nft1 from "../assets/images/createNft/profilepic.png";
import Button from "../components/shared/button";
import Input from "../components/shared/input";
import Textarea from "../components/shared/textarea";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const CreateNftCollectionManual = () => {
  const [prevImage, setPrevImage] = useState("")
  const navigate = useNavigate();
  const { activeAccount } = useWallet()

  const [formData, setFormData] = useState({
    collection_name: '',
    description: '',
  });
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
    if (formData.collection_name && formData.description && activeAccount?.address && prevImage) {
      return true
    }
    else {
      return false
    }
  }

  const uploadImage = async () => {

    try {
      return new Promise(async (resolve, reject) => {
        try {
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
        catch (e) {
          reject(false)
        }




      })

    }
    catch (e) {
      console.log("Error Uploading Image", e);


    }


  }

  const handleContinue = async (imageUrl: any) => {
    try {

      const response: any = await axios.post(`${baseUrl}/create-collection`, { ...formData, image_url: imageUrl, collection_address: activeAccount?.address });
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
            <div className="flex gap-8">
              <div className="flex flex-col  items-start">
                <div className="p-[20px] bg-white flex justify-center rounded-[20px] box-shadow ">

                  <label htmlFor="collectionImage" className="block">
                    <img src={
                      // @ts-ignore
                      prevImage == "" ? nft1 : URL.createObjectURL(prevImage)} alt="profile image" style={{ width: "288px", objectFit: "cover" }} />
                    <input className="hidden" id="collectionImage" type="file" accept="image/png, image/jpeg, image/webp,image/jpg" onChange={handleInput} />
                    <span
                      className="btn-gray w-full darkGray mt-7 text-center block"> Choose file </span>
                  </label>
                </div>

              </div>

              <div className="w-[992px]">
                <div className="flex gap-3 items-center">
                  {/* <Button
                    className="btn-gray w-32 lightGray"
                    text="Collection"
                  />
                  <Button
                    className="btn-gray w-32 lightGray "
                    text="100 Items"
                  /> */}
                </div>
                <div className="py-4 px-[89px] bg-white box-shadow rounded-[20px] ">
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
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        label="Token Symbol*"
                        placeholder="$ CGPT, for example"
                        className="w-full input-nft"
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
                            toast.error("Please provide all information.");

                          }

                        }}
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
