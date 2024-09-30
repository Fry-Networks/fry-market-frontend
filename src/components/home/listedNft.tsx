import arrowDown from "../../assets/icons/arrow-down.svg";
import CollectionsCard from '../cards/collectionsCard';
import Button from "../shared/button";

import { useWallet } from "@txnlab/use-wallet";
import { useEffect, useState } from "react";
import userImg1 from "../../assets/home/images/card-userImg.png";
import trendingNft1 from "../../assets/home/images/trendingNft1.png";
import trendingNft2 from "../../assets/home/images/trendingNft2.png";
import trendingNft3 from "../../assets/home/images/trendingNft3.png";
import trendingNft4 from "../../assets/home/images/trendingNft4.png";
import trendingNft5 from "../../assets/home/images/trendingNft5.png";
import trendingNft6 from "../../assets/home/images/trendingNft6.png";
import trendingNft7 from "../../assets/home/images/trendingNft7.png";
import trendingNft8 from "../../assets/home/images/trendingNft8.png";
import { getAllListed } from "../../fryMarketMethods";


const ListedNft = ({ collectionData }: any) => {
    const [loading, setLoading] = useState(false);
    const [listedNfts, setListedNfts] = useState<any>([]);
    const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()

    const getListedNft = async () => {
        try {


            setLoading(true);
            const response = await getAllListed();
            console.log("NftListed", response);
            setListedNfts(response);
            setLoading(false)

        }
        catch (e) {
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log("heeh");


        getListedNft();


    }, [activeAccount])



    return (
        <div className="trendingNftWrapper my-52 md:my-20">
            <div className="container">
                <div className='flex inner items-center justify-between'>
                    <h2 className="font-normal font-Apex uppercase">
                        Listed NFT'S
                    </h2>
                    <Button
                        className="button btn-secondary font-normal medium uppercase relative flex items-center justify-center gap-1"
                        minWidth={220}
                        height={52}
                        text="Last 30 minutes"
                        img={arrowDown}
                        imgClass="order-1"

                    />
                </div>

                <div className="nftWrapper mt-10 grid grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 xxl:grid-cols-4   gap-x-5 xxl:gap-x-10 gap-y-7 place-items-center">
                    {listedNfts.map((data: any, index: any) => (
                        <CollectionsCard key={data.assetId} data={data} label={"Buy"} collectionData={collectionData[data.seller]} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListedNft;

const trendingCard = [
    {
        id: 1,
        userImg: userImg1,
        userName: "STELLA NOVA",
        userEmail: "@Stella Nova",
        nftImg: trendingNft1,
        price: "142.02",
    },
    {
        id: 2,
        userImg: userImg1,
        userName: "STELLA NOVA",
        userEmail: "@Stella Nova",
        nftImg: trendingNft2,
        price: "142.02",
    },
    {
        id: 3,
        userImg: userImg1,
        userName: "STELLA NOVA",
        userEmail: "@Stella Nova",
        nftImg: trendingNft3,
        price: "142.02",
    },
    {
        id: 4,
        userImg: userImg1,
        userName: "STELLA NOVA",
        userEmail: "@Stella Nova",
        nftImg: trendingNft4,
        price: "142.02",
    },
    {
        id: 5,
        userImg: userImg1,
        userName: "STELLA NOVA",
        userEmail: "@Stella Nova",
        nftImg: trendingNft5,
        price: "142.02",
    },
    {
        id: 6,
        userImg: userImg1,
        userName: "STELLA NOVA",
        userEmail: "@Stella Nova",
        nftImg: trendingNft6,
        price: "142.02",
    },
    {
        id: 7,
        userImg: userImg1,
        userName: "STELLA NOVA",
        userEmail: "@Stella Nova",
        nftImg: trendingNft7,
        price: "142.02",
    },
    {
        id: 8,
        userImg: userImg1,
        userName: "STELLA NOVA",
        userEmail: "@Stella Nova",
        nftImg: trendingNft8,
        price: "142.02",
    },
];
