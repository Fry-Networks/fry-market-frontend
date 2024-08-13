import React, { useState } from "react";
import logo from "../../assets/icons/websiteLogo.svg";
import { NavLink } from "react-router-dom";
import { Drawer } from 'antd';
import Button from "../shared/button";
import menu from "../../assets/icons/menu.png";

const Navbar = () => {

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
