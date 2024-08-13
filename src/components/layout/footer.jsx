import React from "react";
import { Link } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import footerBg from "../../assets/home/images/footer.png";
import facebook from "/src/assets/icons/facebook.svg";
import telegram from "/src/assets/icons/telegram.svg";
import linkedIn from "/src/assets/icons/linkedin.svg";
import discord from "/src/assets/icons/discord.svg";
import insta from "/src/assets/icons/instagram.svg";
import tiktok from "/src/assets/icons/tiktok.svg";
import footerLogo from "/src/assets/home/images/footerLogo.svg";

import img1 from "/src/assets/icons/facebook.svg";
import img2 from "/src/assets/icons/telegram.svg";
import img3 from "/src/assets/icons/linkedin.svg";
import img4 from "/src/assets/icons/discord.svg";
import img5 from "/src/assets/icons/instagram.svg";
import img6 from "/src/assets/icons/tiktok.svg";
import footerLogo from "/src/assets/home/images/footerLogo.svg";
const Footer = () => {
  return (
    <>
    <div className='footerWrapper my-10'>
      <div className="container">
        <div style={{ backgroundImage: `url(${footerBg})`,}} className="innerData flex justify-between gap-36">
<div className="dataArea1 flex items-start w-1/6">
  <img src="/src/assets/home/images/footerLogo.svg" alt="" />
</div>
<div className="dataArea2 flex flex-col justify-between w-2/6 py-7">
  <div className="area2content1">
    <p className='text-white font-normal font-Roboto leading-9'>NFT ALGO is the world’s leading NFTs marketplace where you can discover, sell and bid NFTs and get rich </p>
  </div>
  <div className="area2content2">
    <div className="socialIcons flex items-start justify-start gap-2">
<img className='cursor-pointer' src="/src/assets/icons/facebook.svg" alt="" />
<img className='cursor-pointer'  src="/src/assets/icons/telegram.svg" alt="" />
<img className='cursor-pointer'  src="/src/assets/icons/linkedin.svg" alt="" />
<img className='cursor-pointer'  src="/src/assets/icons/discord.svg" alt="" />
<img className='cursor-pointer'  src="/src/assets/icons/instagram.svg" alt="" />
<img className='cursor-pointer'  src="/src/assets/icons/tiktok.svg" alt="" />

    </div>
  </div>

</div>
<div className="dataArea3 w-1/6">
  <div className="aboutArea flex flex-col gap-3 ">
    <p className='ex-large font-bold font-Roboto  leading-9 text-white'>About</p>
    <Link>
    <p className='large font-normal font-Roboto  leading-9 text-white'>About NFT</p>
    </Link>
  
  <Link>
  <p className='large font-normal font-Roboto  leading-9 text-white'>Live Auctions</p>
  </Link>


<Link>
<p className='largefont-normal font-Roboto  leading-9 text-white'>Collection</p>
</Link>


                <Link>
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
