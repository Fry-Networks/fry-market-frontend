import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Banner from "../components/createNft/banner";
import PromptExample from "../components/createNft/promptExample";
import ReadyForNext from "../components/home/readyForNext";

const CreateNftPage = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <>

      <Banner prompt={location?.state?.prompt ? location?.state?.prompt : ""} />
      <PromptExample />
      <ReadyForNext />

    </>
  );
};

export default CreateNftPage;
