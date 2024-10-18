import { useNavigate } from 'react-router-dom';
import sellerBack from "../../assets/home/images/topSeller/topsellerBack.webp";
import sellerImg1 from "../../assets/home/images/topSeller/topsellerImg1.png";
import sellerImg2 from "../../assets/home/images/topSeller/topsellerImg2.png";
import sellerImg3 from "../../assets/home/images/topSeller/topsellerImg3.png";
import sellerImg4 from "../../assets/home/images/topSeller/topsellerImg4.png";
import sellerImg5 from "../../assets/home/images/topSeller/topsellerImg5.png";
import sellerImg6 from "../../assets/home/images/topSeller/topsellerImg6.png";
import sellerImg7 from "../../assets/home/images/topSeller/topsellerImg7.png";
import sellerImg8 from "../../assets/home/images/topSeller/topsellerImg8.png";
import SellerCard from '../cards/sellerCard';



const TopSeller = ({ collectionDataFull }: any) => {

    const navigate = useNavigate();

    return (
        <>
            <div className="topsellerWrapper my-40 relative lg:mb-24">
                <img className='absolute top-[-500px] right-0 w-full left-0 -z-10' src={sellerBack} alt="" />
                <div className="container">
                    <div className='flex justify-between items-center headWrappr'>
                        <h2 className="font-normal font-Apex uppercase mb-10">
                            SELLERS
                        </h2>
                        <p className='primary large font-medium font-Roboto cursor-pointer' onClick={(() => (
                            navigate("/top-seller")
                        ))}>View All</p>
                    </div>

                    <div className="sellerCardDiv grid grid-cols-3 gap-2 gap-y-[30px]" style={{ placeItems: "center" }}>
                        {/* {
                            sellerData.map((data, index) => (
                                <SellerCard data={data} key={data.id} />
                            ))
                        } */}
                        {
                            collectionDataFull.map((data: any, index: any) => (
                                <SellerCard data={data} key={data._id} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopSeller;

const sellerData = [
    {
        id: 1,
        sellerImg: sellerImg1,
        sellerName: "Jacob Jones",
        rate: "245.5 FRY"
    },
    {
        id: 2,
        sellerImg: sellerImg2,
        sellerName: "Jacob Jones",
        rate: "245.5 FRY"
    },
    {
        id: 3,
        sellerImg: sellerImg3,
        sellerName: "Jacob Jones",
        rate: "245.5 FRY"
    },
    {
        id: 4,
        sellerImg: sellerImg4,
        sellerName: "Jacob Jones",
        rate: "245.5 FRY"
    },
    {
        id: 5,
        sellerImg: sellerImg5,
        sellerName: "Jacob Jones",
        rate: "245.5 FRY"
    },
    {
        id: 6,
        sellerImg: sellerImg6,
        sellerName: "Jacob Jones",
        rate: "245.5 FRY"
    },
    {
        id: 7,
        sellerImg: sellerImg7,
        sellerName: "Jacob Jones",
        rate: "245.5 FRY"
    },
    {
        id: 8,
        sellerImg: sellerImg8,
        sellerName: "Jacob Jones",
        rate: "245.5 FRY"
    }

]