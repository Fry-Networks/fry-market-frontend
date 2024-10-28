import { CloseOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useWallet } from '@txnlab/use-wallet';
import { message, Switch } from 'antd';
import { RcFile } from 'antd/es/upload';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import selectNftGlow from '../assets/createNft/selectedNftGlow.webp';
import plus from '../assets/icons/plus.svg';
import nft1 from "../assets/images/createNft/profilepic.png";
import Loader from '../components/Loader';
import Button from "../components/shared/button";
import Input from "../components/shared/input";
import Textarea from '../components/shared/textarea';
import { getAllCollectionNft, mintMultipleNft } from '../fryMarketMethods';
import AddTraits from '../modals/addTraits';
import MintNft from '../modals/mintNft';

const baseUrl = import.meta.env.VITE_API_BASE_URL;


const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const ManualCreateNft = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const onSwitch = (checked: any) => {
        console.log(`switch to ${checked}`);
    };
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [showOriginalContent, setShowOriginalContent] = useState(true);
    const [value, setValue] = useState("blue: fox");
    const [isEditing, setIsEditing] = useState(false);
    const [istraitmodal, setistraitmodal] = useState(false);
    const [ismintmodal, setismintmodal] = useState(false);
    const [prevImage, setPrevImage] = useState("")
    const [collectionData, setCollectionData] = useState<any>(false);
    const [formData, setFormData] = useState<any>({})
    const [collectionSelected, setCollectionSelected] = useState(false)
    const [traits, setTraits] = useState<any>({})
    const [traitName, setTraitName] = useState<any>({})
    const [traitValue, setTraitValue] = useState<any>({})
    const navigate = useNavigate();
    const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()
    // const handleChange = (info: any) => {
    //     if (info.file.status === 'uploading') {
    //         setLoading(true);
    //         return;
    //     }
    //     if (info.file.status === 'done') {
    //         getBase64(info.file.originFileObj, (url) => {
    //             setLoading(false);
    //             setImageUrl(url);
    //         });
    //     }
    // };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleInput = (e: any) => {
        console.log(e.target.files[0])
        setPrevImage(e.target.files[0])
    }

    const uploadButton = (
        <div
            style={{
                border: '1px dashed #d9d9d9',
                borderRadius: 4,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: '#fafafa'
            }}
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined style={{ fontSize: 24 }} />}
            <div style={{ marginTop: 8, fontSize: 16, color: '#bfbfbf' }}>Upload</div>
        </div>
    );

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleClearClick = () => {
        setValue("");
    };

    const handleBackClick = () => {
        if (!showOriginalContent) {
            setShowOriginalContent(true);
        } else {
            // Handle navigation to create-nft page here
        }
    };

    const handleChooseFromExistedClick = () => {
        setShowOriginalContent(false);
    };

    const showAddTraitModal = () => {
        setistraitmodal(true);
    };

    const showMintModal = () => {
        setismintmodal(true);
    };

    const getNftCollection = async () => {
        try {
            setLoading(true)
            console.log("dd", activeAccount);

            const response: any = await axios.get(`${baseUrl}/get-collection/${activeAccount?.address}`);
            if (response.data) {
                setCollectionData(response.data);


            }
            // console.log("hehe", response.data);
            setLoading(false)

        } catch (error) {
            setLoading(false)
        }
    }
    const validation = () => {
        if (formData.itemName && formData.itemSymbol && formData.itemDescription && prevImage && collectionSelected) {
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
                    setLoading(true);
                    const formDataForImage = new FormData;
                    formDataForImage.append("image", prevImage);
                    const response = await axios.post(`${baseUrl}/upload-nft-image`, formDataForImage);
                    console.log("Response in upload Image", response.data);
                    setFormData((prev: any) => ({ ...prev, image_url: response.data?.url }))
                    if (response.data?.url) {
                        let metaData = {
                            "image": response.data?.url,
                            "name": formData.itemName,
                            "description": formData.itemDescription,
                            "extra": {},
                            "standard": "arc3",
                            "properties": {
                                "Eyes": "None",
                                "Skin": "None",
                                "Tail": "None",
                                "Mouth": "None",
                                "Eyewear": "None",
                                "Special": "None",
                                "Headgear": "None",
                                "Background": "None"
                            },
                            "image_mime_type": "image/png",
                            "extra_properties": {}
                        }
                        const metaDataResponse = await axios.post(`${baseUrl}/upload-metadata`, metaData);
                        console.log("Response in upload Image", metaDataResponse?.data?.url);
                        if (metaDataResponse?.data?.url) {



                            if (await mintNft({ ...metaData, metadata: metaDataResponse?.data?.url })) {
                                setLoading(false);

                                resolve(true);
                            }
                            else {
                                setLoading(false);

                                reject(false)
                            }
                        }
                        else {
                            console.log("Some Error Occured while uploading meta data. Please try again.");
                            setLoading(false);

                            reject(false)

                        }

                    }
                    else {
                        console.log("Some Error Occured while uploading image. Please try again.");
                        setLoading(false);

                        reject(false)

                    }
                }
                catch (e) {
                    setLoading(false);

                    reject(false);
                }

            })



        }
        catch (e) {
            console.log("Error Uploading Image", e);
            return e;

        }


    }

    const mintNft = async (imageUrl: any) => {
        try {
            const response: any = await mintMultipleNft([imageUrl], activeAccount?.address || "", signer, signTransactions, sendTransactions)
            console.log("response after minting", response);
            // toast.success("Mint Successful")
            return true

        }
        catch (e) {
            console.log("Error Creating Collection");
            // toast.error("Error Creating Collection");
            return false

        }
    }



    useEffect(() => {
        if (activeAccount?.address) {

            getNftCollection()
        }
    }, [activeAccount])

    useEffect(() => {
        getNfts();
    }, [activeAccount])
    const getNfts = async () => {
        try {
            console.log("hehehe");

            if (activeAccount?.address) {

                const response = await getAllCollectionNft(activeAccount?.address);
                console.log("got NFTS", response);

            }

        } catch (error) {

        }
    }

    const handleTraitAdd = () => {
        if (traitName && traitValue) {
            if (!Object.keys(traits).includes(traitName)) {
                setTraits((prev: any) => ({ ...prev, [traitName]: traitValue }))
            }
            else {
                toast.error("Trait already exists")
            }
        }
        else {
            toast.error("Please give trait name and trait value");
        }
    }

    return (
        <>
            <div>
                <div className="nftCollection mt-[107px] h-[110vh] relative">
                    <img className="glow absolute top-[-200px] -z-50" src={selectNftGlow} alt="" />
                    <div className="container">
                        <div className="contentWrapper flex gap-8 leftArea">
                            <div className="leftContent  flex flex-col items-start">
                                <div className='uploadDiv w-[300px]'>
                                    {/* <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                        action="https://httpbin.org/post"
                                    >
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt="avatar"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        ) : (
                                            uploadButton
                                        )}
                                    </Upload> */}

                                    <label htmlFor="collectionImage" className="block">
                                        <img src={
                                            // @ts-ignore
                                            prevImage == "" || prevImage == undefined ? nft1 : URL.createObjectURL(prevImage)} alt="profile image" style={{ width: "288px", objectFit: "cover" }} />
                                        <input className="hidden" id="collectionImage" type="file" accept="image/png, image/jpeg, image/webp,image/jpg" onChange={handleInput} />
                                        <span
                                            className="btn-gray w-full darkGray mt-7 text-center block"> Choose file </span>
                                    </label>

                                </div>
                            </div>

                            <div className="w-[992px]  rightContent">
                                {showOriginalContent ? (
                                    <div className='rightText'>
                                        <div className="manualDiv py-4 px-[89px] bg-white box-shadow rounded-[20px]">
                                            <h2 className="text-center font-normal text-[40px] font-Apex darkBlack mb-24">
                                                MANUAL CREATE NFT
                                            </h2>
                                            <div className="flex flex-col gap-7">
                                                <div>
                                                    <Input
                                                        type="text"
                                                        label="Item Name*"
                                                        placeholder="Name your NFT"
                                                        className="w-full input-nft"
                                                        name="itemName"
                                                        value={formData.itemName}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div>
                                                    <Input
                                                        type="text"
                                                        label="Token Symbol*"
                                                        placeholder="$ CGPT, for example"
                                                        className="w-full input-nft"
                                                        name="itemSymbol"
                                                        value={formData.itemSymbol}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div>
                                                    <Textarea
                                                        label={
                                                            <>
                                                                <div className="flex flex-col gap-2">
                                                                    <span className="mb-1 font-medium">
                                                                        Description
                                                                    </span>
                                                                    <span className="medium ">
                                                                        The description will be included on the
                                                                        item's detail page underneath its image.
                                                                    </span>
                                                                </div>
                                                            </>
                                                        }
                                                        rows={6}
                                                        placeholder="Provide a detailed description of your item"
                                                        name="itemDescription"
                                                        value={formData.itemDescription}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div className="chooseCollection my-3">
                                                    <div className=" chooseContent w-full flex justify-between items-center">
                                                        <p className="darkBlack large font-medium font-Roboto">
                                                            Choose Collection
                                                        </p>
                                                        {/* <p
                                                            className="underline lightGray medium font-normal cursor-pointer"
                                                            onClick={handleChooseFromExistedClick}
                                                        >
                                                            Choose From Existed
                                                        </p> */}
                                                    </div>

                                                    <p className="itemAppear lightGray text-[16px] font-Roboto font-normal mt-2">
                                                        (this is the collection where your item will appear)
                                                    </p>
                                                    <div className="newCollectionDiv flex gap-4 mt-4">
                                                        {!collectionData ?
                                                            <div className="createNewCollection rounded-xl border-solid border-[#E7E7E7] border-2 p-[15px] flex justify-start gap-3 w-1/2" onClick={() => navigate("/create-collection")} style={{ cursor: "pointer" }}>
                                                                <div className="grayDiv p-[16px] bg-[#E7E7E7] flex-center rounded-xl">
                                                                    <img src={plus} alt="" />
                                                                </div>
                                                                <div className="rightContnt flex flex-col justify-center">
                                                                    <p className="darkBlack medium font-medium font-Roboto">
                                                                        Create new collection
                                                                    </p>
                                                                    <p className="lightGray small font-Roboto font-normal mt-2">
                                                                        Type to create
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            :
                                                            ""

                                                        }
                                                        {
                                                            loading ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", margin: "0 auto" }}>
                                                                <Loader></Loader>
                                                                <p>Loading Exiting Collections</p>
                                                            </div>
                                                                :
                                                                collectionData ?
                                                                    <div className={`createNewCollection rounded-xl border-solid border-[${collectionSelected ? "red" : "#E7E7E7"}] border-2 p-[15px] flex justify-start gap-3 w-1/2`} onClick={() => { setCollectionSelected(prev => !prev) }}>

                                                                        <div className="grayDiv bg-[#E7E7E7] flex-center rounded-xl">
                                                                            <img src={collectionData.image_url} alt="" style={{ width: "61px", objectFit: "cover" }} />
                                                                        </div>
                                                                        <div className="rightContnt flex flex-col justify-center">
                                                                            <p className="darkBlack medium font-medium font-Roboto">
                                                                                {collectionData.collection_name}
                                                                            </p>
                                                                            <p className="lightGray small font-Roboto font-normal mt-2">
                                                                                Items{" "}
                                                                                <span className="font-medium darkBlack">
                                                                                    {collectionData.listed_nfts.length}
                                                                                </span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    ""
                                                        }
                                                        {/* <div className="createNewCollection rounded-xl border-solid border-[#E7E7E7] border-2 p-[15px] flex justify-start gap-3 w-1/2">


                                                            <div className="grayDiv bg-[#E7E7E7] flex-center rounded-xl">
                                                                <img src={newCollect} alt="" />
                                                            </div>
                                                            <div className="rightContnt flex flex-col justify-center">
                                                                <p className="darkBlack medium font-medium font-Roboto">
                                                                    Wonderful Artwork
                                                                </p>
                                                                <p className="lightGray small font-Roboto font-normal mt-2">
                                                                    Items{" "}
                                                                    <span className="font-medium darkBlack">
                                                                        1.5k
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>

                                                <div className="addTraits flex flex-col gap-3">
                                                    <p className="darkBlack large font-medium font-Roboto">
                                                        Add Traits
                                                    </p>
                                                    <p className="darkBlack font-Roboto medium font-normal">
                                                        Traits describe attributes of your item. They appear
                                                        as filters inside your collection page and are also
                                                        shown on the item's detail page.
                                                    </p>
                                                    <div className='flex items-center justify-start gap-7 w-full flex-wrap'>
                                                        <input type="text" placeholder='Trait Name' className='flex w-[195px] h-[50px] justify-center gap-2 border-2 border-[#E7E7E7] border-solid items-center rounded-2xl pl-4' />
                                                        <input type="text" placeholder='Trait Value' className='flex w-[195px] h-[50px] justify-center gap-2 border-2 border-[#E7E7E7] border-solid items-center rounded-2xl pl-4' />

                                                        <Button
                                                            className="button btn-primary small font-medium btnConnect font-Roboto"
                                                            width={150}
                                                            minHeight={39}
                                                            text="Add Trait"
                                                            data-test-id="connect-wallet"

                                                        ></Button>
                                                    </div>


                                                    <div className="relative">
                                                        <Input
                                                            type="text"
                                                            value={value}
                                                            onChange={(e: any) => setValue(e.target.value)}
                                                            placeholder="blue: fox"
                                                            className="w-full"
                                                            inputClass={`w-full  bg-[#F4F4F4] border-none pl-4 pr-12 ${isEditing ? "outline-none focus:ring-2" : ""
                                                                }`}
                                                            readOnly={!isEditing}
                                                        />
                                                        <div className="absolute inset-y-0 right-5 top-2 flex items-center space-x-8 pr-2">
                                                            <EditOutlined
                                                                className="text-gray-500 cursor-pointer"
                                                                onClick={() => { handleEditClick(); showAddTraitModal(); }}
                                                            />
                                                            <div className="h-[24px] w-[1px] bg-gray-400"></div>
                                                            <CloseOutlined
                                                                className="text-gray-500 cursor-pointer"
                                                                onClick={handleClearClick}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* <Button
                                                        type="primary"
                                                        text="Add Traits"
                                                        className="text-white rounded-xl mt-2"
                                                        onClick={showAddTraitModal}
                                                    /> */}
                                                </div>

                                                {/* <div className="create flex justify-center mt-5">
                                                    <Button
                                                        type="primary"
                                                        text="Create"
                                                        className="text-white rounded-xl mt-2"
                                                        onClick={showMintModal}
                                                    />
                                                </div> */}


                                                <div onClick={showAddTraitModal} className="flex w-[195px] h-[58px] justify-center gap-2 border-2 border-[#E7E7E7] border-solid items-center rounded-2xl">
                                                    <p className="lightGray font-normal medium font-Roboto">
                                                        Add Traits
                                                    </p>
                                                    <img src="/src/assets/icons/plus.svg" alt="" />
                                                </div>
                                                <div className="royality flex flex-col gap-5">
                                                    <p className="darkBlack font-Roboto large font-medium">
                                                        Royalties
                                                    </p>
                                                    <Switch
                                                        className="w-[60px]"
                                                        defaultChecked
                                                        onChange={onSwitch}
                                                    />
                                                </div>
                                                <div className="flex justify-end">
                                                    {/* <Button
                                                        className="btn-primary px-8 py-4 mb-5"
                                                        text="Mint NFT"
                                                        onClick={showMintModal}
                                                    /> */}
                                                    <Button
                                                        className="btn-primary px-8 py-4 mb-5"
                                                        text="Mint NFT"
                                                        onClick={
                                                            () => {
                                                                if (validation()) {
                                                                    toast.promise(
                                                                        uploadImage(),
                                                                        {
                                                                            pending: "NFT is minting",
                                                                            error: "There was an error Minting NFT",
                                                                            success: "NFT minted successfully"

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
                                                            }
                                                        }
                                                        disabled={loading}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full">
                                        <p className="text-center mt-[100px] text-xl font-semibold">
                                            Choose Collection
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Traits Modal */}
            <AddTraits
                isModalOpen={istraitmodal}
                handleCancel={() => setistraitmodal(false)}
                handleOk={() => setistraitmodal(false)}
            />

            {/* Mint NFT Modal */}
            <MintNft
                isModalOpen={ismintmodal}
                handleCancel={() => setismintmodal(false)}
                handleOk={() => setismintmodal(false)}
            />
        </>
    );
};

export default ManualCreateNft;
