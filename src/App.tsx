import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { DaffiWalletConnect } from '@daffiwallet/connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { PROVIDER_ID, ProvidersArray, WalletProvider, useInitializeProviders } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import { SnackbarProvider } from 'notistack'
import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import ConnectWallet from './components/ConnectWallet'
import Footer from "./components/layout/footer"
import Navbar from "./components/layout/navbar"
import Transact from './components/Transact'
import ArtistProfileArt from "./page/artistProfileArt"
import ArtistsProfile from "./page/artistsProfile"
import Auction from "./page/auction"
import CreateNftCollectionManual from './page/createCollectionManual'
import CreateNft from "./page/createNft"
import CreateNftCollection from "./page/createNftCollection"
import CreateNftPage from "./page/createNftPage"
import Home from './page/home'
import NftCollection from "./page/nftCollection"
import NftDetail from "./page/nftDetail"
import SelectedNft from "./page/selectedNft"
import SellerCollection from "./page/sellerCollections"
import SellMethod from "./page/sellMethod"
import TopCollection from "./page/topCollection"
import TopSeller from "./page/topSeller"
import { getAlgodConfigFromViteEnvironment, getKmdConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'
import ManualCreateNft from './page/manualCreateNft'

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

export default function App() {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false);
  const algodConfig = getAlgodConfigFromViteEnvironment();


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
    location.pathname === "/top-seller" ||
    location.pathname === "/seller-collection" ||
    location.pathname === "/create-nft-page"||
    location.pathname==="/createnft-collect";


  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }

  return (
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
          <Route path="/createnft-collect" element={<CreateNftCollection />} />
          <Route path="/create-collection" element={<CreateNftCollectionManual />} />
          <Route path="/select-nft" element={<SelectedNft />} />
          <Route path="/nft-detail" element={<NftDetail />} />
          <Route path="/create-nft-page" element={<CreateNftPage />} />
          <Route path="/artist-profile" element={<ArtistsProfile />} />
          <Route path="/artist-profile-art" element={<ArtistProfileArt />} />
          <Route path="/sell-method" element={<SellMethod />} />
          <Route path="/manual-create-nft" element={<ManualCreateNft />} />

        </Routes>
        {isNavbar ? <Footer /> : ""}
        <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
        <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
      </WalletProvider>
    </SnackbarProvider>
  )
}
