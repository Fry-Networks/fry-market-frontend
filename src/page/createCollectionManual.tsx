// @ts-ignore
import { useWallet } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TokenContext } from '../App'
import nft1 from '../assets/images/placeholder-image.webp'
import BackButton from '../components/shared/backButton'
import Button from '../components/shared/button'
import Input from '../components/shared/input'
import Textarea from '../components/shared/textarea'
import { addCollectionRoyalty } from '../fryMarketMethods'

const baseUrl = import.meta.env.VITE_API_BASE_URL
const CreateNftCollectionManual = () => {
  const generateUniqueAddress = () => {
    const account = algosdk.generateAccount()
    return account.addr
  }

  const uniqueCollectionAddress = generateUniqueAddress()
  const [prevImage, setPrevImage] = useState('')
  const navigate = useNavigate()
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()
  // @ts-ignore
  const { token }: any = useContext(TokenContext)

  const [formData, setFormData] = useState({
    collection_name: '',
    description: '',
    image_url: '',
  })

  // const [collectionDataFound, setCollectionDataFound] = useState<any>(false)
  const [royalty, setRoyalty] = useState<any>(false)

  const getCollectionData = async () => {
    if (activeAccount?.address) {
      try {
        // const config = {
        //   headers: { Authorization: `Bearer ${token}` }
        // };
        // const royalty = await getRoyalty(activeAccount?.address);
        // setRoyalty(Number(royalty) / 100)
        const response = await axios.get(`${baseUrl}/get-collections/${activeAccount?.address}`)
        // console.log("Collection Data", response.data);
        // setCollectionDataFound(true);
        // setFormData(response.data)
      } catch (e) {
        console.log('Error Getting Collection', e)
        // toast.error("Error Creating Collection");
      }
    }
  }

  useEffect(() => {
    getCollectionData()
  }, [activeAccount])

  const handleInput = (e: any) => {
    // console.log(e.target.files[0])
    setPrevImage(e.target.files[0])
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const validation = () => {
    // console.log("Dd", activeAccount?.address);

    if (
      formData.collection_name.replace(/\s+/g, '').length != 0 &&
      formData.description.replace(/\s+/g, '').length != 0 &&
      activeAccount?.address &&
      prevImage &&
      royalty
    ) {
      return true
    } else {
      return false
    }
  }

  const uploadImage = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (activeAccount?.address) {
          console.log("royalty", royalty);
          const addRoyaltyResponse = await addCollectionRoyalty(activeAccount?.address, signer, royalty, 0)
          console.log("Royalty Response", addRoyaltyResponse);

          if (addRoyaltyResponse) {
            // console.log("added", addRoyaltyResponse);

            const formDataForImage = new FormData()
            formDataForImage.append('images', prevImage)

            const response = await axios.post(`${baseUrl}/upload-images`, formDataForImage)
            // Set image URL in form data
            setFormData((prev) => ({ ...prev, image_url: response.data?.image_urls[0] }))

            if (response.data?.image_urls[0]) {
              const continueHandled = await handleContinue(response.data?.image_urls[0])

              if (continueHandled) {
                resolve('Image uploaded and collection created successfully.')
              } else {
                reject(new Error('Failed to continue after image upload.'))
              }
            } else {
              console.log('Image not uploaded')
              reject(new Error('Image upload failed.'))
            }
          } else {
            console.log('Royalty not added')
            reject(new Error('Royalty not added.'))
          }
        } else {
          reject(new Error('No wallet address connected.'))
        }
      } catch (e) {
        console.log('Error Uploading Image', e)
        reject(new Error('Error occurred during image upload.'))
      }
    })
  }

  const handleContinue = async (imageUrl: any) => {
    if (!activeAccount?.address) {
      toast.error('Wallet not connected')
      return
    }

    const data = {
      collection_name: formData.collection_name,
      collection_address: uniqueCollectionAddress,
      wallet_address: activeAccount.address,
      image_url: imageUrl,
      description: formData.description,
      royalty: royalty,
    }
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }

      const response: any = await axios.post(`${baseUrl}/create-collection`, data, config)
      // console.log("Hehe", response.data);
      return true
    } catch (e) {
      console.log('Error Creating Collection', e)
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
        <div className="nftCollection mt-[107px] mb-40 pb-20">
          <div className="container">
            {/* Back Button */}
            <div className="backButtonSection mb-6">
              <BackButton />
            </div>

            <div className="contentWrapper flex flex-col lg:flex-row gap-8 w-full">
              <div className=" leftContent flex flex-col items-center lg:items-start">
                <div className="p-[20px] bg-white flex justify-center rounded-[20px] box-shadow" style={{ cursor: 'pointer' }}>
                  <label htmlFor="collectionImage" className="block">
                    <img
                      src={
                        // @ts-ignore
                        formData.image_url
                          ? formData.image_url
                          : prevImage == '' || prevImage == undefined
                            ? nft1
                            : typeof prevImage === 'string'
                              ? prevImage
                              : URL.createObjectURL(prevImage)
                      }
                      alt="profile image"
                      style={{ width: '288px', objectFit: 'cover', cursor: 'pointer' }}
                    />
                    <input
                      className="hidden"
                      id="collectionImage"
                      type="file"
                      accept="image/png, image/jpeg, image/webp,image/jpg"
                      onChange={handleInput}
                    />
                    <span
                      className="btn-gray w-full darkGray mt-7 text-center block"
                      style={{ cursor: 'pointer', border: '1px solid #E7E7E7', borderRadius: '10px', padding: '10px' }}
                    >
                      {' '}
                      Choose file<span style={{ color: '#FD0000', cursor: 'pointer' }}> *</span>{' '}
                    </span>
                  </label>
                </div>
              </div>

              <div className="w-full lg:w-[992px] rightContent">
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
                <div className="py-4 px-5 md:px-[89px] bg-white box-shadow rounded-[20px] manualDiv">
                  <h2 className="text-center font-normal text-[30px] md:text-[40px] font-Apex darkBlack mb-10 md:mb-24 uppercase mt-[20px]">Create a collection </h2>
                  <form action="" className="flex flex-col gap-7">
                    <div>
                      <Input
                        type="text"
                        label="Collection Name"
                        asterisk="*"
                        placeholder="Name your Collection"
                        className="w-full input-nft"
                        name="collection_name"
                        value={formData.collection_name}
                        onChange={handleChange}
                      // disabled={collectionDataFound}
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        label="Token Symbol"
                        placeholder="$ CGPT, for example"
                        className="w-full input-nft"
                      // disabled={collectionDataFound}
                      />
                    </div>
                    <div>
                      <Input
                        type="number"
                        label="Royalty"
                        asterisk="*"
                        placeholder="Enter Royalty Percentage (0-15%)"
                        className="w-full input-nft"
                        name="royalty"
                        value={royalty}
                        onKeyDown={(evt: any) => evt.key === 'e' && evt.preventDefault()}
                        onChange={(e: any) => {
                          // console.log("e", e.target.value);

                          if (e.target.value == '' || (e.target.value >= 0 && e.target.value <= 15)) {
                            setRoyalty(e.target.value)
                          }
                        }}
                      // disabled={collectionDataFound}
                      />
                    </div>
                    <div>
                      <Textarea
                        // label="Description "
                        label={
                          <>
                            <div className="flex flex-col gap-2">
                              <span>
                                Description<span style={{ color: '#FD0000' }}> *</span>
                              </span>
                              <span className="medium ">
                                The description will be included on the item's detail page underneath its image.
                              </span>
                            </div>
                          </>
                        }
                        rows={6}
                        placeholder="Provide a detailed description of your item"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                      // disabled={collectionDataFound}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        className="btn-primary px-8 py-4 mb-5"
                        text="Continue"
                        onClick={(e: any) => {
                          e.preventDefault()

                          // Check wallet connection first
                          if (!activeAccount?.address) {
                            toast.error('Please connect wallet first')
                            return
                          }

                          if (validation()) {
                            // Only proceed if validation is successful
                            toast.promise(
                              uploadImage()
                                .then((response) => {
                                  if (response) {
                                    // console.log("Image uploaded successfully");
                                    // Only navigate if the uploadImage was successful
                                    toast.success('Collection Created Successfully')
                                    navigate('/create-nft-page')
                                  }
                                })
                                .catch((err) => {
                                  console.log('err', err) // Log any errors for debugging
                                  toast.error('There was an error Creating Collection')
                                }),
                              {
                                pending: 'Collection is creating',
                                error: 'There was an error Creating Collection',
                              },
                            )
                          } else {
                            // Handle validation failure - now only field validation
                            toast.error('Please provide all information.')
                          }
                        }}

                      // disabled={collectionDataFound}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateNftCollectionManual
