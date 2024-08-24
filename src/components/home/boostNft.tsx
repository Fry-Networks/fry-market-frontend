import boosterIcon from "../../assets/icons/boosterIvon.svg";
import Button from "../shared/button";

const BoostNft = () => {
  return (
    <>
      <div className="boostNftWrapper mb-52 relative md:mb-20">
        <img className="absolute bottom-[-500px] left-0 -z-10" src="/src/assets/home/images/leftGlow.png" alt="" />
        <div className="container">
          <div className="inner flex-center">
            <div className="leftArea flex flex-col justify-start gap-20 w-3/5 border-2 border-slate-950">
              <div className="flex flex-col gap-2">
                <h2 className="font-normal font-Apex uppercase text-left tracking-wide darkBlack">
                  Boost Your NFTs: Enhance Visibility and Value
                </h2>
                <p className="text-clr font-light medium w-[580px]">The Boost feature is a premium service that allows NFT creators and collectors to elevate their listings on our marketplace. By boosting an NFT, you can ensure it appears prominently in search results, featured sections, and on the homepage, maximizing exposure to potential buyers.</p>
              </div>
              <Button
                className="button btn-primary large font-medium flex-center gap-3"
                width={217}
                minHeight={58}
                text="Boost"
                img={boosterIcon}
                imgClass="order-1"
              ></Button>
            </div>
            <div className="rightArea w-2/5">
              <img className="w-full h-full object-cover" src="/src/assets/home/images/monkey2.png" alt="" /></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoostNft;
