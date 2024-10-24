import promptBack from "../../assets/createNft/bannerBack.webp";
import promptImg from "../../assets/createNft/prompt1.png";
import promptImg2 from "../../assets/createNft/prompt2.png";
import promptImg3 from "../../assets/createNft/prompt3.png";
import promptImg4 from "../../assets/createNft/prompt4.png";
import promptImg5 from "../../assets/createNft/prompt5.png";
import promptImg6 from "../../assets/createNft/prompt6.png";
import promptImg7 from "../../assets/createNft/prompt7.png";
import promptImg8 from "../../assets/createNft/prompt8.png";
import PromptCard from './promptCard';





const PromptExample = () => {

    const promptData = [
        {
            id: 1,
            nftImg: promptImg,
            title: "Sea Creatures",
            description: "Amollis, ultrices augue id, laoreet tellus. Sed vitae fermentum neque. Nunc sed tincidunt enim, sed ultricies nisl. Maecenas ullamcorper nunc metus, sed facilisis dolor cursus eu. Nam sit amet maximus augue."

        },
        {
            id: 2,
            nftImg: promptImg2,
            title: "Creep Crew ",
            description: "Sed vitae orci mollis, ultrices augue id, laoreet tellus. Sed vitae fermentum neque. Nunc sed tincidunt enim, sed ultricies nisl. Maecenas ullamcorper nunc metus, sed facilisis dolor cursus eu. Nam sit amet maximus augue."

        },
        {
            id: 3,
            nftImg: promptImg3,
            title: "Robo Avatars",
            description: "A futuristic character with distinct freckles and a nuanced expression, surrounded by various robotic and humanoid figures. "

        },
        {
            id: 4,
            nftImg: promptImg4,
            title: "Dragon Warrior",
            description: "A formidable dragon-like warrior with powerful armor and weaponry, ready for combat."

        },
        {
            id: 5,
            nftImg: promptImg5,
            title: "Pixelpals",
            description: "A collection of pixelated characters with diverse styles and charm."

        },

        {
            id: 6,
            nftImg: promptImg6,
            title: "Ethereal Knights",
            description: "A group of ethereal knights glowing with mystical light, standing vigilant in a shadowy forest. "

        },
        {
            id: 7,
            nftImg: promptImg7,
            title: "Mystic Gaze",
            description: "She is a mythical character with enchanting blue eyes and long, flowing hair. Adorned with unique animal-like ears, she possesses an ethereal presence."

        },
        {
            id: 8,
            nftImg: promptImg8,
            title: "Neon Pulse ",
            description: "A futuristic character emanating vibrant neon lights, embodying the essence of digital evolution."

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