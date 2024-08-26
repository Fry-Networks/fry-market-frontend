// @ts-ignore
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import nft1 from "../assets/images/createNft/profilepic.png";
import Button from "../components/shared/button";
import Input from "../components/shared/input";
import Textarea from "../components/shared/textarea";

const CreateNftCollectionManual = () => {
  const [prevImage, setPrevImage] = useState("")
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    collectionName: '',
    collectionDescription: '',
    email: '',
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
                      prevImage == "" ? nft1 : URL.createObjectURL(prevImage)} alt="profile image" />
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
                        name="collectionName"
                        value={formData.collectionName}
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
                    <div>createNftCollection.tsx:99 hello



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
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        className="btn-primary px-8 py-4 mb-5"
                        text="Continue"
                        onClick={(e: any) => { e.preventDefault(); console.log("hello"); navigate("/select-nft") }}
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
