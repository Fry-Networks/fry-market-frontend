import React from "react";
import logo from "../../assets/icons/logo.svg";
import { NavLink } from "react-router-dom";
import Button from "../shared/button";

const Navbar = () => {
  return (
    <>
      <div className="navWrapper mt-5 ">
        <div className="container">
          <div className="nav-content flex justify-between items-center">
            <div className="nav-logo">
              <img src={logo} alt="" />
            </div>
            <div className="nav-items ">
              <ul className="flex justify-center items-center gap-x-8 font-normal medium darkBlack font-Apex uppercase cursor-pointer">
                <NavLink className=" navlink" to="/">
                  <li>Home</li>
                </NavLink>

                <NavLink>
                  <li>Marketplace</li>
                </NavLink>
                <NavLink>
                  <li>AI Nft Generation</li>
                </NavLink>
              </ul>
            </div>
            <div className="nav-btns flex gap-x-3 font-Roboto">
              <Button
                className="button btn-primary large font-medium btnConnect"
                minWidth={213}
                minHeight={58}
                text="Connect Wallet"
              ></Button>

              <Button
                className="button btn-secondary large font-medium btnCreate"
                minWidth={176}
                minHeight={58}
                text="Create NFT"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
