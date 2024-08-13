// import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/icons/websiteLogo.svg";
import { Drawer } from 'antd';
import Button from "../shared/button";
import logo1 from "../../assets/icons/topSeller/walletLogo.svg";
import logo2 from "../../assets/icons/topSeller/navLogo2.svg";
import menu from "../../assets/icons/menu.png";

const Navbar = () => {
  const location = useLocation();

  const isCreateNftPage =
    location.pathname === "/create-nft" ||
    location.pathname === "/createnft-collect" ||
    location.pathname === "/create-nft-page" ||
    location.pathname === "/select-nft";


  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('left');
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const handleShow = () => {
    showDrawer();
  };

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
                  className="button btn-primary large font-medium btnConnect"
                  minWidth={213}
                  minHeight={58}
                  text="Connect Wallet"
                />
                <Button
                  className="button btn-secondary large font-medium btnCreate"
                  minWidth={176}
                  minHeight={58}
                  text="Create NFT"
                />
              </div>
            )}
          </div>
        </div>
      </div>



      <div className="mobile-navbar">
        <NavLink className="d-flex" to="/">
          <img className="mobileLogo" src={logo} alt="" />
        </NavLink>
        <button onClick={handleShow} className="menu-btn">
          <img src={menu} alt="Menu" />
        </button>
      


      <Drawer
     
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
             <div className="navbar-logo mb-4">
              <img className="logo" src={logo} alt="" />
            </div>
       <div className="navbarList">
              <ul className="flex flex-col gap-y-5 darkGray font-normal medium darkBlack font-Apex uppercase cursor-pointer">
                <NavLink>
                  <li>Home</li>
                </NavLink>
                <NavLink>
                  <li>Marketplace</li>
                </NavLink>
                <NavLink>
                  <li>AI NFT Generation</li>
                </NavLink>

       
              </ul>
            </div>
            <div className="navbar-btns flex flex-col gap-4 mt-5">
            <Button
                className="button btn-primary small font-medium btnConnect"
                width={150}
                minHeight={39}
                text="Connect Wallet"
              ></Button>

              <Button
                className="button btn-secondary small font-medium btnConnect"
                width={150}
                minHeight={39}
                text="Create NFT"
              ></Button>
            </div>
      </Drawer>
      </div>
    </>
  );
};

export default Navbar;
