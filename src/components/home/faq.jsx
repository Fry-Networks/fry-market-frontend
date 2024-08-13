import React from "react";
import { Collapse, theme } from "antd";


const text1 = `
An NFT (Non-Fungible Token) is a unique digital asset that represents ownership or proof of authenticity of a specific item or piece of content, often associated with digital art, collectibles, or virtual goods, and is stored on a blockchain.
`;

const text2 = `
  A cat is a type of domesticated animal.
  Known for its independence and grace,
  it can be found in many households across the world.
`;

const text3 = `
  A rabbit is a type of domesticated animal.
  Known for its quiet nature and gentle demeanor,
  it is a popular pet in many homes.
`;

const text4 = `
  A bird is a type of domesticated animal.
  Known for its ability to fly and sing,
  it brings joy to many households across the world.
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

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className="faqWrapper mb-52 md:mb-20">
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
              <img
                src={
                  isActive
                    ? "/src/assets/icons/minus.svg"
                    : "/src/assets/icons/plus.svg"
                }
                alt=""
              />
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
                    What is an NFT?
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
                  How do I buy an NFT?
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
                  How do I sell an NFT?
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
                  What cryptocurrencies do you accept?
                </span>
              }
              key="4"
              style={panelStyle}
           
            >
              <p className="text-base">{text4}</p>
            </Collapse.Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default Faq;
