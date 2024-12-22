import { Collapse, theme } from "antd";
import rightGlow from "../../assets/home/images/homeImages/faqRightt.webp";
import minus from "/src/assets/icons/minus.svg";
import plus from "/src/assets/icons/plus.svg";


const text1 = `
The Fry Networks NFT Marketplace is a centralized platform where users can easily create, buy, sell, and trade NFTs using advanced AI tools and the Algorand blockchain. Our marketplace offers a seamless experience for both creators and collectors.
`;

const text2 = `
 NFTs (Non-Fungible Tokens) are unique digital assets that represent ownership of items such as artwork, collectibles, and other digital goods. Each NFT is stored on the blockchain, ensuring its uniqueness and security.
`;

const text3 = `
You can create NFTs on our platform using our AI-powered NFT generation tool. Simply input a text prompt, customize the generation parameters, and our system will create a unique collection based on your preferences.
`;

const text4 = `
Fry Networks utilizes the Algorand blockchain, known for its speed, security, and low transaction fees. This ensures a smooth and efficient user experience for NFT creation and transactions.
`;


const text5 = `
The FRY token is the native cryptocurrency of our marketplace. You can use FRY tokens for listing fees, NFT generation fees, and other platform transactions. It also helps power our marketplace ecosystem.
`;


const text6 = `
 Yes, the Fry Networks supports both fixed-price listings and auctions. You can set your NFTs for auction, allowing other users to bid on them within a time-limited window.
`;


const text7 = `
  Fry Foundation accepts FRY tokens for platform transactions. You can easily acquire FRY tokens by connecting a compatible Algorand wallet to your account.
`;


const text8 = `
Yes, the Fry Foundation platform is built with security in mind. We use the Algorand blockchain to ensure transparency and reliability, and our smart contracts undergo regular security audits to protect user data and transactions.
`;


const text9 = `
Simply sign up for an account, connect your Algorand wallet, and you can start browsing, creating, buying, or selling NFTs. If you're new to NFTs, our user-friendly interface and guides will help you navigate the process.
`;


const text10 = `
 AI-powered NFT generation is a tool that allows users to create unique NFT collections by providing text prompts. Our AI (GPT-4) generates metadata, and Stability AI creates the visuals, offering endless creative possibilities for users.
`;

const text11 = `
 Yes, our AI tool allows users to customize their NFT collections by adjusting parameters like style, quantity, and other creative elements to match their vision.
`;


const text12 = `
 Yes, there is a listing fee, which can be paid using FRY tokens. The exact fee depends on whether you're opting for a fixed-price sale or an auction.
`;


const text13 = `
Yes, each NFT on the Fry Foundation platform includes detailed information, such as ownership history, metadata, and other relevant details to ensure full transparency.
`;


const text14 = `
In a fixed-price sale, the NFT is sold at a set price, while in an auction, buyers bid on the NFT within a time limit, and the highest bidder at the end wins the auction.
`;


const text15 = `
 It’s important to store your private keys in a secure place. The Fry Foundation recommends using a hardware wallet or a trusted Algorand-compatible wallet for the best security practices. We also conduct regular audits to ensure platform security.
`;

const Faq = () => {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const activeHeaderStyle = {
    borderRadius: "20px",
    opacity: 0.1,
    background: "#FD0000",
  };

  const onChange = (key: any) => {
    // console.log(key);
  };

  return (
    <div className="faqWrapper my-52 relative">
      {/* <img className="absolute bottom-[-800px] left-0 -z-10" src={leftGlow} alt="" /> */}
      <img className="absolute top-[-500px] right-0 -z-10" src={rightGlow} alt="" />

      <div className="container">
        <h2 className="font-bold font-Apex uppercase text-center tracking-wide darkBlack mb-10">
          Frequently Asked Questions
        </h2>
        <div className="faqAccordion">
          <Collapse
            className="faqStyling"
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <img src={isActive ? minus : plus} alt="" />
            )}
            style={{
              background: token.colorBgContainer,
            }}
            onChange={onChange}
          >
            <Collapse.Panel
              header={
                <div className="flex justify-start items-center gap-7">
                  <span className="font-semibold darkBlack font-Roboto large">
                    What is the Fry Networks NFT Marketplace?
                  </span>
                </div>
              }
              key="1"
              style={panelStyle}
            >
              <p className="text-base">{text1}</p>
            </Collapse.Panel>
            <Collapse.Panel
              header={
                <span className="font-semibold darkBlack font-Roboto large pt-7 pb-8">
                  What are NFTs?
                </span>
              }
              key="2"
              style={panelStyle}
            >
              <p className="text-base">{text2}</p>
            </Collapse.Panel>
            <Collapse.Panel
              header={
                <span className="font-semibold darkBlack font-Roboto large pt-7 pb-8">
                  How do I create an NFT on the Fry Networks platform?
                </span>
              }
              key="3"
              style={panelStyle}
            >
              <p className="text-base">{text3}</p>
            </Collapse.Panel>
            <Collapse.Panel
              header={
                <span className="font-semibold darkBlack font-Roboto large pt-7 pb-8">
                  Which blockchain does the Fry Networks use?
                </span>
              }
              key="4"
              style={panelStyle}
            >
              <p className="text-base">{text4}</p>
            </Collapse.Panel>


            {/* 
            <Collapse.Panel
              header={
                <span className="font-semibold darkBlack font-Roboto large pt-7 pb-8">
                  What is the FRY token, and how is it used?
                </span>
              }
              key="5"
              style={panelStyle}
            >
              <p className="text-base">{text5}</p>
            </Collapse.Panel>




            <Collapse.Panel
              header={
                <span className="font-semibold darkBlack font-Roboto large pt-7 pb-8">
                  Can I sell my NFTs through auctions?
                </span>
              }
              key="6"
              style={panelStyle}
            >
              <p className="text-base">{text6}</p>
            </Collapse.Panel>



            <Collapse.Panel
              header={
                <span className="font-semibold darkBlack font-Roboto large pt-7 pb-8">
                  What payment methods are accepted on the platform?
                </span>
              }
              key="7"
              style={panelStyle}
            >
              <p className="text-base">{text7}</p>
            </Collapse.Panel>



            <Collapse.Panel
              header={
                <span className="font-semibold darkBlack font-Roboto large pt-7 pb-8">
                  Is it safe to buy and sell NFTs on Fry Foundation?
                </span>
              }
              key="8"
              style={panelStyle}
            >
              <p className="text-base">{text8}</p>
            </Collapse.Panel>



            <Collapse.Panel
              header={
                <span className="font-semibold darkBlack font-Roboto large pt-7 pb-8">
                  How do I get started on the Fry Foundation?
                </span>
              }
              key="9"
              style={panelStyle}
            >
              <p className="text-base">{text9}</p>
            </Collapse.Panel>


            <Collapse.Panel
              header={
                <span className="font-semibold darkBlack font-Roboto large pt-7 pb-8">
                  What is AI-powered NFT generation?
                </span>
              }
              key="10"
              style={panelStyle}
            >
              <p className="text-base">{text10}</p>
            </Collapse.Panel>


            <Collapse.Panel
              header={
                <span className="font-semibold darkBlack font-Roboto large pt-7 pb-8">
                  Can I customize the NFTs I generate using the AI tool?
                </span>
              }
              key="11"
              style={panelStyle}
            >
              <p className="text-base">{text11}</p>
            </Collapse.Panel>


            <Collapse.Panel
              header={
                <span className="font-semibold darkBlack font-Roboto large pt-7 pb-8">
                  Is there a fee to list my NFTs on the marketplace?
                </span>
              }
              key="12"
              style={panelStyle}
            >
              <p className="text-base">{text12}</p>
            </Collapse.Panel>


            <Collapse.Panel
              header={
                <span className="font-semibold darkBlack font-Roboto large pt-7 pb-8">
                  Can I track the ownership history of NFTs?
                </span>
              }
              key="13"
              style={panelStyle}
            >
              <p className="text-base">{text13}</p>
            </Collapse.Panel>



            <Collapse.Panel
              header={
                <span className="font-semibold darkBlack font-Roboto large pt-7 pb-8">
                  What is the difference between fixed prices and auction sales?
                </span>
              }
              key="14"
              style={panelStyle}
            >
              <p className="text-base">{text14}</p>
            </Collapse.Panel>



            <Collapse.Panel
              header={
                <span className="font-semibold darkBlack font-Roboto large pt-7 pb-8">
                  How do I ensure my private keys are secure?
                </span>
              }
              key="15"
              style={panelStyle}
            >
              <p className="text-base">{text15}</p>
            </Collapse.Panel> */}
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default Faq;
