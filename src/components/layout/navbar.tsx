// import React, { useState } from "react";
import { Icon } from '@iconify/react'
import { useWallet } from '@txnlab/use-wallet'
import { Drawer, Dropdown, MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import navTopLogo from '../../assets/home/images/homeImages/navTopLogo.png'
//@ts-ignore
import axios from 'axios'
import mobileLogo from '../../assets/icons/navbarLogo.svg'
import logo from '../../assets/icons/newLogo.svg'
import logo1 from '../../assets/icons/topSeller/walletLogo.svg'
import Button from '../shared/button'
import ChainSwitcher from '../shared/ChainSwitcher'
import ThemeToggle from '../shared/ThemeToggle'
import { useChain } from '../../contexts/ChainContext'
const baseUrl = import.meta.env.VITE_API_BASE_URL
interface Toggle {
  open: boolean
  setOpen: (value: boolean) => void
  isPfpChange: boolean
  setIsPfpChange: (value: any) => void
}

const Navbar = (props: Toggle) => {
  const navigate = useNavigate()
  const { activeAddress } = useWallet()
  const goToCraeteNft = () => {
    navigate('/create-nft-page')
  }
  const location = useLocation()

  const [profile, setProfile] = useState<any>({})
  const getProfileData = async () => {
    if (activeAddress) {
      try {
        // const config = {
        //   headers: { Authorization: `Bearer ${token}` }
        // };

        const response: any = await axios.get(`${baseUrl}/get-profile-settings/${activeAddress}`)
        // console.log("Hehed", response.data);
        setProfile(response.data)
        return response.data
        // return true;
      } catch (e) {
        // console.log("Error Updating Profile Data");
        // toast.error("Error Getting Profile Data");
        // return false
        return false
      }
    }
  }

  useEffect(() => {
    getProfileData()
  }, [activeAddress])
  useEffect(() => {
    // console.log("g", props.isPfpChange);
    setTimeout(() => {
      getProfileData()
    }, 2000)
  }, [activeAddress, props.isPfpChange])

  const isCreateNftPage =
    location.pathname === '/create-nft' ||
    location.pathname === '/create-nft-collection' ||
    location.pathname === '/create-nft-page' ||
    location.pathname === '/select-nft' ||
    location.pathname === '/sell-method' ||
    location.pathname === '/artist-profile-art' ||
    location.pathname === '/artist-profile'

  const isHomeActive =
    location.pathname === '/' ||
    location.pathname === '/auction' ||
    location.pathname === '/nft-collection' ||
    location.pathname === '/top-collection' ||
    location.pathname === '/nft-detail' ||
    location.pathname.startsWith('/nft/') ||
    location.pathname === '/top-seller' ||
    location.pathname === '/seller-collection' ||
    location.pathname === '/auction-detail'
  // console.log(location.pathname);

  const isNftActive =
    location.pathname === '/create-nft-page' ||
    location.pathname === '/create-nft' ||
    location.pathname === '/multiple-collect' ||
    location.pathname === '/select-nft' ||
    location.pathname === '/create-nft-collection' ||
    location.pathname === '/artist-profile-art' ||
    location.pathname === '/artist-profile' ||
    location.pathname === '/sell-method'
  const isCollectionActive = location.pathname === '/create-collection'

  // console.log(location.pathname);
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState<string>('left')
  const { activeAccount } = useWallet()
  const { hasFeature } = useChain()

  const getAuthToken = async () => {
    try {
      const tokenResponse = await axios.post(`${baseUrl}/get-token`, {
        wallet_address: activeAccount?.address,
      })
      // console.log("Response fom auth API", tokenResponse.data);
    } catch (e) { }
  }

  // useEffect(() => {

  //   if (activeAccount?.address) {
  //     console.log("Get auth token");
  //     getAuthToken();

  //   }

  // }, [activeAccount])

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const onChange = (e: any) => {
    setPlacement(e.target.value)
  }
  const handleShow = () => {
    showDrawer()
  }

  const toggleWalletModal = () => {
    props.setOpen(!props.open)
  }

  // Marketplace dropdown menu items
  const marketplaceItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <NavLink to="/explore-listed-nfts" className="flex items-center gap-2 py-2 px-3 hover:bg-gray-50 rounded">
          <Icon icon="material-symbols:grid-view" width="16" height="16" />
          Listed NFTs
        </NavLink>
      ),
    },
    {
      key: '2',
      label: (
        <NavLink to="/auction" className="flex items-center gap-2 py-2 px-3 hover:bg-gray-50 rounded">
          <Icon icon="material-symbols:gavel" width="16" height="16" />
          Auctions
        </NavLink>
      ),
    },
    {
      key: '3',
      label: (
        <NavLink to="/" className="flex items-center gap-2 py-2 px-3 hover:bg-gray-50 rounded">
          <Icon icon="material-symbols:trending-up" width="16" height="16" />
          Trending NFTs
        </NavLink>
      ),
    },
    {
      key: '4',
      label: (
        <NavLink to="/events" className="flex items-center gap-2 py-2 px-3 hover:bg-gray-50 rounded">
          <Icon icon="material-symbols:event" width="16" height="16" />
          Events
        </NavLink>
      ),
    },
    {
      key: '5',
      label: (
        <NavLink to="/launchpad" className="flex items-center gap-2 py-2 px-3 hover:bg-gray-50 rounded">
          <Icon icon="material-symbols:rocket-launch" width="16" height="16" />
          Launchpad
        </NavLink>
      ),
    },
  ]

  // Community dropdown menu items
  const communityItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <NavLink to="/top-seller" className="flex items-center gap-2 py-2 px-3 hover:bg-gray-50 rounded">
          <Icon icon="material-symbols:person-star" width="16" height="16" />
          Top Sellers
        </NavLink>
      ),
    },
    {
      key: '2',
      label: (
        <NavLink to="/top-collection" className="flex items-center gap-2 py-2 px-3 hover:bg-gray-50 rounded">
          <Icon icon="material-symbols:collections" width="16" height="16" />
          Collections
        </NavLink>
      ),
    },
    ...(hasFeature('genesisNft')
      ? [
          {
            key: '3',
            label: (
              <NavLink to="/genesis" className="flex items-center gap-2 py-2 px-3 hover:bg-gray-50 rounded">
                <Icon icon="material-symbols:diamond" width="16" height="16" />
                Genesis NFT
              </NavLink>
            ),
          },
        ]
      : []),
  ]

  // Create dropdown menu items
  const createItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <NavLink to="/create-nft-page" className="flex items-center gap-2 py-2 px-3 hover:bg-gray-50 rounded">
          <Icon icon="material-symbols:auto-awesome" width="16" height="16" />
          AI NFT Generation
        </NavLink>
      ),
    },
    {
      key: '2',
      label: (
        <NavLink to="/manual-create-nft" className="flex items-center gap-2 py-2 px-3 hover:bg-gray-50 rounded">
          <Icon icon="material-symbols:draw" width="16" height="16" />
          Manual Create NFT
        </NavLink>
      ),
    },
    {
      key: '3',
      label: (
        <NavLink to="/create-collection" className="flex items-center gap-2 py-2 px-3 hover:bg-gray-50 rounded">
          <Icon icon="material-symbols:library-add" width="16" height="16" />
          Create Collection
        </NavLink>
      ),
    },
  ]
  return (
    <>
      <div className="navWrapper mt-5 ">
        <div className="container">
          <div className="nav-content flex justify-between items-center">
            <div className="nav-logo">
              <img src={mobileLogo} alt="Logo" className="cursor-pointer w=[150px] h-[100px] object-cover" onClick={() => navigate('/')} />
            </div>
            <div className="nav-items ">
              <ul className="flex justify-center items-center gap-x-8 font-normal medium darkBlack font-Apex uppercase cursor-pointer">
                <NavLink className={`navlink ${isHomeActive ? 'active' : ''}`} to="/">
                  <li>Home</li>
                </NavLink>

                <li className="relative">
                  <Dropdown
                    menu={{ items: marketplaceItems }}
                    placement="bottomCenter"
                    trigger={['hover']}
                    overlayClassName="custom-dropdown"
                  >
                    <span className="navlink flex items-center gap-1 cursor-pointer hover:text-primary">
                      Marketplace
                      <Icon icon="material-symbols:keyboard-arrow-down" width="16" height="16" />
                    </span>
                  </Dropdown>
                </li>

                <li className="relative">
                  <Dropdown
                    menu={{ items: communityItems }}
                    placement="bottomCenter"
                    trigger={['hover']}
                    overlayClassName="custom-dropdown"
                  >
                    <span className="navlink flex items-center gap-1 cursor-pointer hover:text-primary">
                      Community
                      <Icon icon="material-symbols:keyboard-arrow-down" width="16" height="16" />
                    </span>
                  </Dropdown>
                </li>

                <li className="relative">
                  <Dropdown menu={{ items: createItems }} placement="bottomCenter" trigger={['hover']} overlayClassName="custom-dropdown">
                    <span className="navlink flex items-center gap-1 cursor-pointer hover:text-primary">
                      Create
                      <Icon icon="material-symbols:keyboard-arrow-down" width="16" height="16" />
                    </span>
                  </Dropdown>
                </li>
                <NavLink className={`navlink ${location.pathname === '/artist-profile' ? 'active' : ''}`} to="/artist-profile">
                  <li>Profile</li>
                </NavLink>
              </ul>
            </div>
            {isCreateNftPage ? (
              <div className="flex gap-x-3 items-center">
                <ChainSwitcher />
                <ThemeToggle />
                <img src={logo1} alt="button" className="cursor-pointer" onClick={toggleWalletModal} />

                {activeAccount?.address ? (
                  <img
                    src={
                      profile?.profile_image
                        ? profile.profile_image
                        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                    }
                    alt="button"
                    className="cursor-pointer"
                    style={{ width: '55px', height: '55px', borderRadius: '50%', objectFit: 'cover' }}
                    onClick={() => navigate('/artist-profile')}
                  />
                ) : (
                  ''
                )}
              </div>
            ) : (
              <div className="nav-btns flex items-center gap-x-3 font-Roboto">
                <ChainSwitcher />
                <ThemeToggle />

                <Button
                  className="button btn-primary large font-medium btnConnect font-Roboto"
                  minWidth={213}
                  minHeight={58}
                  text={activeAddress ? `${activeAddress.slice(0, 6)}....${activeAddress.slice(-6)}` : 'Connect Wallet'}
                  onClick={toggleWalletModal}
                />
                <Button
                  className="button btn-secondary large font-medium btnCreate font-Roboto"
                  minWidth={176}
                  minHeight={58}
                  text="Create NFT"
                  onClick={goToCraeteNft}
                />

                {activeAccount?.address ? (
                  <img
                    src={
                      profile?.profile_image
                        ? profile.profile_image
                        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                    }
                    alt="button"
                    className="cursor-pointer"
                    style={{ width: '55px', height: '55px', borderRadius: '50%', objectFit: 'cover' }}
                    onClick={() => navigate('/artist-profile')}
                  />
                ) : (
                  ''
                )}
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
          {/* <img src={menu} alt="Menu" /> */}
          <Icon icon="iconamoon:menu-burger-horizontal-fill" width="36" height="36" style={{ color: 'var(--text-primary)' }} />
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
            <img className="logo" src={navTopLogo} alt="" />
            <Icon className="mt-3" icon="basil:cross-solid" width="45" height="45" style={{ color: 'var(--text-primary)' }} onClick={onClose} />
          </div>
          <div className="navbarList mt-8">
            <ul className="flex flex-col gap-y-5 darkGray font-normal medium darkBlack font-Apex uppercase cursor-pointer">
              <NavLink className={`navlink ${isHomeActive ? 'active' : ''}`} to="/" onClick={onClose}>
                <li>Home</li>
              </NavLink>
              <NavLink className={`navlink text-sm`} to="/artist-profile" onClick={onClose}>
                <li>Profile</li>
              </NavLink>

              <div className="mobile-dropdown-section">
                <p className="text-sm font-semibold text-gray-600 mb-2">MARKETPLACE</p>
                <div className="ml-4 flex flex-col gap-2">
                  <NavLink className={`navlink text-sm`} to="/explore-listed-nfts" onClick={onClose}>
                    <li>Listed NFTs</li>
                  </NavLink>
                  <NavLink className={`navlink text-sm`} to="/auction" onClick={onClose}>
                    <li>Auctions</li>
                  </NavLink>
                  <NavLink className={`navlink text-sm`} to="/" onClick={onClose}>
                    <li>Trending NFTs</li>
                  </NavLink>
                  <NavLink className={`navlink text-sm`} to="/events" onClick={onClose}>
                    <li>Events</li>
                  </NavLink>
                  <NavLink className={`navlink text-sm`} to="/launchpad" onClick={onClose}>
                    <li>Launchpad</li>
                  </NavLink>
                </div>
              </div>

              <div className="mobile-dropdown-section">
                <p className="text-sm font-semibold text-gray-600 mb-2">COMMUNITY</p>
                <div className="ml-4 flex flex-col gap-2">
                  <NavLink className={`navlink text-sm`} to="/top-seller" onClick={onClose}>
                    <li>Top Sellers</li>
                  </NavLink>
                  <NavLink className={`navlink text-sm`} to="/top-collection" onClick={onClose}>
                    <li>Collections</li>
                  </NavLink>
                  {hasFeature('genesisNft') && (
                    <NavLink className={`navlink text-sm`} to="/genesis" onClick={onClose}>
                      <li>Genesis NFT</li>
                    </NavLink>
                  )}
                </div>
              </div>

              <div className="mobile-dropdown-section">
                <p className="text-sm font-semibold text-gray-600 mb-2">CREATE</p>
                <div className="ml-4 flex flex-col gap-2">
                  <NavLink className={`navlink text-sm`} to="/create-nft-page" onClick={onClose}>
                    <li>AI NFT Generation</li>
                  </NavLink>
                  <NavLink className={`navlink text-sm`} to="/manual-create-nft" onClick={onClose}>
                    <li>Manual Create NFT</li>
                  </NavLink>
                  <NavLink className={`navlink text-sm`} to="/create-collection" onClick={onClose}>
                    <li>Create Collection</li>
                  </NavLink>
                </div>
              </div>
            </ul>
          </div>
          <div className="flex items-center gap-3 mt-4 mb-2">
            <ChainSwitcher />
            <ThemeToggle />
          </div>
          <div className="navbar-btns flex flex-col gap-4 mt-5">
            <Button
              className="button btn-primary small font-medium btnConnect font-Roboto"
              width={150}
              minHeight={39}
              text={activeAddress ? `${activeAddress.slice(0, 6)}....${activeAddress.slice(-6)}` : 'Connect Wallet'}
              data-test-id="connect-wallet"
              onClick={toggleWalletModal}
            ></Button>

            <Button
              className="button btn-secondary small font-medium btnConnect font-Roboto"
              width={150}
              minHeight={39}
              text="Create NFT"
              onClick={() => navigate('/create-collection')}
            ></Button>
          </div>
        </Drawer>
      </div>
    </>
  )
}

export default Navbar
