import promptBack from "../../assets/createNft/bannerBack.webp";
import promptImg2 from "../../assets/createNft/examp2.png";
import promptImg3 from "../../assets/createNft/examp3.png";
import promptImg4 from "../../assets/createNft/examp4.png";
import promptImg5 from "../../assets/createNft/examp5.png";
import promptImg6 from "../../assets/createNft/examp6.png";
import promptImg7 from "../../assets/createNft/examp7.png";
import promptImg8 from "../../assets/createNft/examp8.png";
import promptImg from "../../assets/createNft/pExample1.png";
import PromptCard from './promptCard';





const PromptExample = () => {

    const promptData = [
        {
            id: 1,
            nftImg: promptImg,
            title: "DRAGON WORLD",
            description: "Amollis, ultrices augue id, laoreet tellus. Sed vitae fermentum neque. Nunc sed tincidunt enim, sed ultricies nisl. Maecenas ullamcorper nunc metus, sed facilisis dolor cursus eu. Nam sit amet maximus augue."

        },
        {
            id: 2,
            nftImg: promptImg2,
            title: "FANTASY",
            description: "Sed vitae orci mollis, ultrices augue id, laoreet tellus. Sed vitae fermentum neque. Nunc sed tincidunt enim, sed ultricies nisl. Maecenas ullamcorper nunc metus, sed facilisis dolor cursus eu. Nam sit amet maximus augue."

        },
        {
            id: 3,
            nftImg: promptImg3,
            title: "DRAGON HOUSE",
            description: "Sed vitae orci mollis, ultrices augue id, laoreet tellus. Sed vitae fermentum neque. Nunc sed tincidunt enim, sed ultricies nisl. "

        },
        {
            id: 4,
            nftImg: promptImg4,
            title: "PRINCESS",
            description: "Sed vitae orci mollis, ultrices augue id, laoreet tellus. Sed vitae fermentum neque. Nunc sed tincidunt enim, sed ultricies nisl. Maecenas ullamcorper nunc metus, sed facilisis dolor cursus eu."

        },
        {
            id: 5,
            nftImg: promptImg5,
            title: "SPACE TEAM",
            description: "Sed vitae orci mollis, ultrices augue id, laoreet tellus. Sed vitae fermentum neque. Nunc sed tincidunt enim, sed ultricies nisl. Maecenas ullamcorper nunc metus, sed facilisis dolor cursus eu. Nam sit amet maximus augue."

        },

        {
            id: 6,
            nftImg: promptImg6,
            title: "SEA CREATURER",
            description: "Pmied vitae orci mollis, ultrices augue id, laoreet tellus. Sed vitae fermentum neque. "

        },
        {
            id: 7,
            nftImg: promptImg7,
            title: "PIXEL GIRL",
            description: "Sed vitae orci mollis, ultrices augue id, laoreet tellus. Sed vitae fermentum neque. Nunc sed tincidunt enim, sed ultricies nisl. Maecenas ullamcorper nunc metus, sed facilisis dolor cursus eu. Nam sit amet Nam maximus augue."

        },
        {
            id: 8,
            nftImg: promptImg8,
            title: "SHADOW FIGHTER",
            description: "Sed vitae orci mollis, ultrices augue id, laoreet tellus. Sed vitae fermentum neque. Nunc sed tincidunt enim."

        },
    ]
    return (
        <>
            <div className="promptWrapper mb-52 relative">
                <img src={promptBack} className='absolute top-0 right-0 left-0 w-full -z-50' alt="" />
                <div className="container">
                    <h2 className="font-bold font-Apex uppercase tracking-wide darkBlack mb-10">
                        Prompt examples
                    </h2>
                    <div className="promptContainer  grid grid-cols-2  gap-9">
                        {
                            promptData.map((data, index) => (
                                <PromptCard data={data} />
                            ))
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default PromptExample;