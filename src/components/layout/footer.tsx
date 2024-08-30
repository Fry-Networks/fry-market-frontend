import { Link } from "react-router-dom";
import footerBg from "../../assets/home/images/footer.png";
import footerLogo from "/src/assets/home/images/footerLogo2.png";
import discord from "/src/assets/icons/discord.svg";
import facebook from "/src/assets/icons/facebook.svg";
import insta from "/src/assets/icons/instagram.svg";
import linkedIn from "/src/assets/icons/linkedin.svg";
import telegram from "/src/assets/icons/telegram.svg";
import tiktok from "/src/assets/icons/tiktok.svg";
import footerGrid from "../../assets/home/images/homeImages/footerGrid.png";

const Footer = () => {
  return (
    <>
      <div className="footerWrapper my-10 relative">
      <img src={footerGrid} className="absolute top-0 left-0 -z-20" alt="" />
        <div className="container">
          <div
            style={{ backgroundImage: `url(${footerBg})` }}
            className="innerData flex justify-between gap-36"
          >
            <div className="dataArea1 flex items-start w-1/6">
              <img src={footerLogo} alt="" />
            </div>
            <div className="dataArea2 flex flex-col justify-between w-2/6 py-7">
              <div className="area2content1">
                <p className="text-white font-normal font-Roboto leading-9">
                  NFT ALGO is the world’s leading NFTs marketplace where you can
                  discover, sell and bid NFTs and get rich{" "}
                </p>
              </div>
              <div className="area2content2">
                <div className="socialIcons flex items-start justify-start gap-2">
                  <img className="cursor-pointer" src={facebook} alt="" />
                  <img className="cursor-pointer" src={telegram} alt="" />
                  <img className="cursor-pointer" src={linkedIn} alt="" />
                  <img className="cursor-pointer" src={discord} alt="" />
                  <img className="cursor-pointer" src={insta} alt="" />
                  <img className="cursor-pointer" src={tiktok} alt="" />
                </div>
              </div>
            </div>
            <div className="dataArea3 w-1/6">
              <div className="aboutArea flex flex-col gap-3 ">
                <p className="ex-large font-bold font-Roboto  leading-9 text-white">
                  About
                </p>
                <Link to="">
                  <p className="large font-normal font-Roboto  leading-9 text-white">
                    About NFT
                  </p>
                </Link>

                <Link to="">
                  <p className="large font-normal font-Roboto  leading-9 text-white">
                    Live Auctions
                  </p>
                </Link>

                <Link to="">
                  <p className="largefont-normal font-Roboto  leading-9 text-white">
                    Collection
                  </p>
                </Link>

                <Link to="">
                  <p className="largefont-normal font-Roboto  leading-9 text-white">
                    Activity
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
