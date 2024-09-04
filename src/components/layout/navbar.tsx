// import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useWallet } from "@txnlab/use-wallet";
import { Drawer } from "antd";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import mobileLogo from "../../assets/icons/navbarLogo.svg";
import menu from "../../assets/icons/menu.png";
import logo from "../../assets/icons/newLogo.svg";
import logo2 from "../../assets/icons/topSeller/navLogo2.svg";
import logo1 from "../../assets/icons/topSeller/walletLogo.svg";
import Button from "../shared/button";

interface Toggle {
  open: boolean,
  setOpen: (value: boolean) => void
}

const Navbar = (props: Toggle) => {
  const navigate = useNavigate();
  const { activeAddress } = useWallet();
  const goToCraeteNft = () => {
    navigate("/create-nft-page")
  }
  const location = useLocation();

  const isCreateNftPage =
    location.pathname === "/create-nft" ||
    location.pathname === "/create-nft-collection" ||
    location.pathname === "/create-nft-page" ||
    location.pathname === "/select-nft" ||
    location.pathname === "/sell-method" ||
    location.pathname === "/artist-profile-art" ||
    location.pathname === "/artist-profile"


    const isHomeActive = location.pathname === "/" || location.pathname === "/auction"  || location.pathname === "/nft-collection" || location.pathname === "/top-collection" || location.pathname === "/nft-detail" || location.pathname === "/top-seller" || location.pathname === "/seller-collection";
  console.log(location.pathname);



  const isNftActive = location.pathname === "/create-nft-page" || location.pathname === "/create-nft"  || location.pathname === "/multiple-collect" || location.pathname === "/select-nft" || location.pathname === "/createnft-collect" || location.pathname === "/artist-profile-art" || location.pathname === "/artist-profile" || location.pathname === "/sell-method";
  console.log(location.pathname);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<string>("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e: any) => {
    setPlacement(e.target.value);
  };
  const handleShow = () => {
    showDrawer();
  };

  const toggleWalletModal = () => {
    props.setOpen(!props.open)
  }
  return (
    <>
      <div className="navWrapper mt-5 ">
        <div className="container">
          <div className="nav-content flex justify-between items-center">
            <div className="nav-logo">
              <img src={mobileLogo} alt="Logo" className="cursor-pointer w=[150px] h-[100px] object-cover"
                onClick={(() => (
                  navigate("/")
                ))} />
            </div>
            <div className="nav-items ">
              <ul className="flex justify-center items-center gap-x-8 font-normal medium darkBlack font-Apex uppercase cursor-pointer">
              <NavLink
                  className={`navlink ${isHomeActive ? "active" : ""}`}
                  to="/"
                >
                  <li>Home</li>
                </NavLink>
                {/* <NavLink className="cursor-default" to="#">
                  <li>Marketplace</li>
                </NavLink> */}
                <NavLink  className={`navlink ${isNftActive ? "active" : ""}`} to="/create-nft-page">
                  <li>AI Nft Generation</li>
                </NavLink>
{/* 
                <NavLink className="navlink" to="/createnft-collect">
                  <li>Create NFt Collection</li>
                </NavLink> */}
              </ul>
            </div>
            {isCreateNftPage ? (
              <div className="flex gap-x-3">
                <img src={logo1} alt="button" className="cursor-pointer" />
                <img src={logo2} alt="button" className="cursor-pointer" onClick={(() => (
                  navigate("/artist-profile-art")
                ))} />
              </div>
            ) : (
              <div className="nav-btns flex gap-x-3 font-Roboto">
                <Button
                  className="button btn-primary large font-medium btnConnect font-Roboto"
                  minWidth={213}
                  minHeight={58}
                  text={activeAddress ? activeAddress.slice(0, 6) + "...." + activeAddress.slice(-6) : "Connect Wallet"}
                  onClick={toggleWalletModal}
                />
                <Button
                  className="button btn-secondary large font-medium btnCreate font-Roboto"
                  minWidth={176}
                  minHeight={58}
                  text="Create NFT"
                  onClick={goToCraeteNft}
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
          //@ts-ignore
          placement={placement}
          closable={false}
          onClose={onClose}
          open={open}
          key={placement}
        >
          <div className="navbar-logo mb-4 flex justify-between">
            <img className="logo" src={mobileLogo} alt="" />
            <Icon className="mt-3" icon="basil:cross-solid" width="30" height="30" style={{ color: "black" }} onClick={onClose} />
          </div>
          <div className="navbarList">
            <ul className="flex flex-col gap-y-5 darkGray font-normal medium darkBlack font-Apex uppercase cursor-pointer">
            <NavLink
                  className={`navlink ${isHomeActive ? "active" : ""}`}
                  to="/"
                >
                  <li>Home</li>
                </NavLink>
                {/* <NavLink className="cursor-default" to="#">
                  <li>Marketplace</li>
                </NavLink> */}
                <NavLink  className={`navlink ${isNftActive ? "active" : ""}`} to="/create-nft-page">
                  <li>AI Nft Generation</li>
                </NavLink>
{/* 
                <NavLink className="navlink" to="/createnft-collect">
                  <li>Create NFt Collection</li>
                </NavLink> */}
            </ul>
          </div>
          <div className="navbar-btns flex flex-col gap-4 mt-5">
            <Button
              className="button btn-primary small font-medium btnConnect font-Roboto"
              width={150}
              minHeight={39}
              text="Connect Wallet"
              data-test-id="connect-wallet"
              onClick={toggleWalletModal}
            ></Button>

            <Button
              className="button btn-secondary small font-medium btnConnect font-Roboto"
              width={150}
              minHeight={39}
              text="Create NFT"
              onClick={goToCraeteNft}
            ></Button>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default Navbar;
