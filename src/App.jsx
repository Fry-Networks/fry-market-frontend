import { Route, Routes } from "react-router-dom";
import Home from "./page/home";
import Auction from "./page/auction";
import NftCollection from "./page/nftCollection";
import TopCollection from "./page/topCollection";
import TopSeller from "./page/topSeller";
import SellerCollection from "./page/sellerCollections";
import CreateNftCollection from "./page/createNftCollection";
import SelectedNft from "./page/selectedNft";
import NftDetail from "./page/nftDetail";
import ArtistsProfile from "./page/artistsProfile";
import CreateNftPage from "./page/createNftPage";
import CreateNft from "./page/createNft";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/nft-collection" element={<NftCollection />} />
        <Route path="/top-collection" element={<TopCollection />} />
        <Route path="/top-seller" element={<TopSeller />} />
        <Route path="/seller-collection" element={<SellerCollection />} />
        <Route path="/create-nft" element={<CreateNft />} />
        <Route path="/createnft-collect" element={<CreateNftCollection />} />
        <Route path="/select-nft" element={<SelectedNft />} />
        <Route path="/nft-detail" element={<NftDetail />} />
        <Route path="/create-nft-page" element={<CreateNftPage />} />
        <Route path="/artist-profile" element={<ArtistsProfile />} />
      </Routes>
    </>
  );
}

export default App;
