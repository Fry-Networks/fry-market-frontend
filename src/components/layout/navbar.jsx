import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import Button from "../shared/button";
import logo1 from "../../assets/icons/topSeller/walletLogo.svg";
import logo2 from "../../assets/icons/topSeller/navLogo2.svg";

const Navbar = () => {
  const location = useLocation();

  const isCreateNftPage =
    location.pathname === "/create-nft" ||
    location.pathname === "/createnft-collect" ||
    location.pathname === "/create-nft-page" ||
    location.pathname === "/select-nft";

  return (
    <>
      <div className="navWrapper mt-5 ">
        <div className="container">
          <div className="nav-content flex justify-between items-center">
            <div className="nav-logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="nav-items ">
              <ul className="flex justify-center items-center gap-x-8 font-normal medium darkBlack font-Apex uppercase cursor-pointer">
                <NavLink className="navlink" to="/">
                  <li>Home</li>
                </NavLink>
                <NavLink className="navlink" to="/marketplace">
                  <li>Marketplace</li>
                </NavLink>
                <NavLink className="navlink" to="/ai-nft-generation">
                  <li>AI Nft Generation</li>
                </NavLink>
              </ul>
            </div>
            {isCreateNftPage ? (
              <div className="flex gap-x-3">
                <img src={logo1} alt="button" className="cursor-pointer" />
                <img src={logo2} alt="button" className="cursor-pointer" />
              </div>
            ) : (
              <div className="nav-btns flex gap-x-3 font-Roboto">
                <Button
                  className="button btn-primary large font-medium"
                  minWidth={213}
                  minHeight={58}
                  text="Connect Wallet"
                />
                <Button
                  className="button btn-secondary large font-medium"
                  minWidth={176}
                  minHeight={58}
                  text="Create NFT"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
