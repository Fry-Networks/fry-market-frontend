import { Link } from "react-router-dom";
import footerBg from "../../assets/home/images/footer.webp";
import footerGrid from "../../assets/home/images/homeImages/footerGrid.png";
import footerLogo from "/src/assets/home/images/footerLogo2.png";
import discord from "/src/assets/icons/discord.svg";
import facebook from "/src/assets/icons/facebook.svg";
import github from "/src/assets/icons/github.svg";
import linkedIn from "/src/assets/icons/linkedin.svg";
import reddit from "/src/assets/icons/reddit.svg";
import telegram from "/src/assets/icons/telegram.svg";

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
            <div className="dataArea2 flex flex-col justify-between w-2/6 pb-7">
              <div className="area2content1">
                <p className="text-white font-normal font-Roboto leading-9">
                  NFT ALGO is the world’s leading NFTs marketplace where you can
                  discover, sell and bid NFTs and get rich{" "}
                </p>
              </div>
              <div className="area2content2">
                <div className="socialIcons flex items-start justify-start gap-2">
                  <a href="https://www.facebook.com/profile.php?id=61561225691313" target="_blank">
                    <img className="cursor-pointer" src={facebook} alt="" />
                  </a>
                  <a href="https://t.me/+zodNDzQtGKQ1MTBh" target="_blank">

                    <img className="cursor-pointer" src={telegram} alt="" />
                  </a>

                  <a href="https://linkedin.com/company/fry-networks" target="_blank">

                    <img className="cursor-pointer" src={linkedIn} alt="" />
                  </a>

                  <a href="https://discord.gg/fry-foundation-1004603899598082069" target="_blank">

                    <img className="cursor-pointer" src={discord} alt="" />
                  </a>

                  <a href="https://github.com/Fry-Foundation" target="_blank">

                    <img className="cursor-pointer" src={github} alt="" />
                  </a>

                  <a href="https://www.reddit.com/r/frynetworks" target="_blank">

                    <img className="cursor-pointer" src={reddit} alt="" />
                  </a>

                </div>
              </div>
            </div>
            <div className="dataArea3 w-1/6 ">
              <div className="aboutArea flex flex-col items-start justify-start gap-1">

                {/* <div className="w-full flex justify-center">
                  <p className="ex-large font-bold font-Roboto  leading-9 text-white">
                    About
                  </p>
                </div>

                <Link to="">
                  <p className="large font-normal font-Roboto  leading-9 text-white">
                    About NFT
                  </p>
                </Link> */}

                <Link to="/auction">
                  <p className="medium font-normal font-Roboto  leading-9 text-white">
                    Live Auctions
                  </p>
                </Link>

                <Link to="/top-collection">
                  <p className="medium font-normal font-Roboto  leading-9 text-white">
                    Collection
                  </p>
                </Link>

                {/* <Link to="">
                  <p className="large font-normal font-Roboto  leading-9 text-white">
                    Activity
                  </p>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
