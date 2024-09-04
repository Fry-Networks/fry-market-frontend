import { useEffect } from "react";
import artistImage from "../../src/assets/topCollection/leftImg.webp";
import ReadyForNext from "../components/home/readyForNext";
import PixacioBanner from "../components/topCollection/pixacioBanner";
import PixoNft from "../components/topCollection/pixoNft";

const TopCollection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>


      <PixacioBanner name="Pixacio" image={artistImage} />
      <PixoNft />
      <ReadyForNext />

    </>
  );
};

export default TopCollection;
