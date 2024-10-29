import React from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import ReadyForNext from "../components/home/readyForNext";
import Banner from "../components/createNft/banner";
import PromptExample from "../components/createNft/promptExample";

const CreateNftPage = () => {
  return (
    <>

      <Banner/>
      <PromptExample/>
      <ReadyForNext />
     
    </>
  );
};

export default CreateNftPage;
