import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { DaffiWalletConnect } from '@daffiwallet/connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { PROVIDER_ID, ProvidersArray, WalletProvider, useInitializeProviders, useWallet } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import axios from 'axios'
import { SnackbarProvider } from 'notistack'
import { createContext, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import OtherProfilePage from './components/artistProfile/otherProfilePage'
import ConnectWallet from './components/ConnectWallet'
import Footer from "./components/layout/footer"
import Navbar from "./components/layout/navbar"
import Transact from './components/Transact'
import ContractHome from "./Home"
import ArtistProfileArt from "./page/artistProfileArt"
import ArtistsProfile from "./page/artistsProfile"
import Auction from "./page/auction"
import AuctionDetail from './page/auctionDetail'
import CreateNftCollectionManual from './page/createCollectionManual'
import CreateNft from "./page/createNft"
import CreateNftCollection from "./page/createNftCollection"
import CreateNftPage from "./page/createNftPage"
import Home from './page/home'
import ManualCreateNft from './page/manualCreateNft'
import MultipleCollect from './page/multipleCollect'
import NftCollection from "./page/nftCollection"
import NftDetail from "./page/nftDetail"
import NotFound from './page/notFound'
import SelectedNft from "./page/selectedNft"
import SellerCollection from "./page/sellerCollections"
import SellMethod from "./page/sellMethod"
import TopCollection from "./page/topCollection"
import TopSeller from "./page/topSeller"
import { getAlgodConfigFromViteEnvironment, getKmdConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'
const baseUrl = import.meta.env.VITE_API_BASE_URL
let providersArray: ProvidersArray
if (import.meta.env.VITE_ALGOD_NETWORK === '') {
  const kmdConfig = getKmdConfigFromViteEnvironment()
  providersArray = [
    {
      id: PROVIDER_ID.KMD,
      clientOptions: {
        wallet: kmdConfig.wallet,
        password: kmdConfig.password,
        host: kmdConfig.server,
        token: String(kmdConfig.token),
        port: String(kmdConfig.port),
      },
    },
  ]
} else {
  providersArray = [
    { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
    { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
    { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
    { id: PROVIDER_ID.EXODUS },
    // If you are interested in WalletConnect v2 provider
    // refer to https://github.com/TxnLab/use-wallet for detailed integration instructions
  ]
}
export const TokenContext = createContext<any>(null);

export default function App() {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false);
  const algodConfig = getAlgodConfigFromViteEnvironment();
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet();

  const getToken = async () => {
    try {
      const result = await axios.post(`${baseUrl}/get-token`, {
        wallet_address: activeAccount?.address
      });
      if (result?.data?.token) {

        console.log("Got the token", result?.data?.token);
        setToken(result?.data?.token)
      }
      else {
        setToken("");
      }

    } catch (error) {
      console.log("Error Getting Token", error);

    }
  }

  useEffect(() => {
    if (activeAccount?.address) {
      // getToken();
    }

  }, [activeAccount])



  const walletProviders = useInitializeProviders({
    providers: providersArray,
    nodeConfig: {
      network: algodConfig.network,
      nodeServer: algodConfig.server,
      nodePort: String(algodConfig.port),
      nodeToken: String(algodConfig.token),
    },
    algosdkStatic: algosdk,
  })

  const location = useLocation();

  const isNavbar =
    location.pathname === "/" ||
    location.pathname === "/auction" ||
    location.pathname === "/nft-collection" ||
    location.pathname === "/top-collection" ||
    location.pathname === "/nft-detail" ||
    location.pathname === "/top-seller" ||
    location.pathname === "/seller-collection" ||
    location.pathname === "/create-nft-page" ||
    location.pathname === "/createnft-collect";


  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }

  const [token, setToken] = useState("");

  return (
    <TokenContext.Provider value={token}>
      <SnackbarProvider maxSnack={3}>
        <WalletProvider value={walletProviders}>
          <Navbar open={openWalletModal} setOpen={toggleWalletModal} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auction" element={<Auction />} />
            <Route path="/nft-collection" element={<NftCollection />} />
            <Route path="/top-collection" element={<TopCollection />} />
            <Route path="/top-seller" element={<TopSeller />} />
            <Route path="/seller-collection" element={<SellerCollection />} />
            <Route path="/create-nft" element={<CreateNft />} />
            <Route path="/create-nft-collection" element={<CreateNftCollection />} />
            <Route path="/create-collection" element={<CreateNftCollectionManual />} />
            <Route path="/select-nft" element={<SelectedNft />} />
            <Route path="/multiple-collect" element={<MultipleCollect />} />
            <Route path="/nft-detail" element={<NftDetail />} />
            <Route path="/auction-detail" element={<AuctionDetail />} />
            <Route path="/create-nft-page" element={<CreateNftPage />} />
            <Route path="/artist-profile" element={<ArtistsProfile />} />
            <Route path="/artist-profile-others" element={<OtherProfilePage />} />
            <Route path="/artist-profile-art" element={<ArtistProfileArt />} />
            <Route path="/sell-method" element={<SellMethod />} />
            <Route path="/manual-create-nft" element={<ManualCreateNft />} />
            <Route path="/contract" element={<ContractHome />} />
            <Route path="*" element={<NotFound />} />


          </Routes>
          {isNavbar ? <Footer /> : ""}
          <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
          <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
        </WalletProvider>
      </SnackbarProvider>
    </TokenContext.Provider>
  )
}
