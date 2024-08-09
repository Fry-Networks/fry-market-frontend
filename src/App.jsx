import { Route, Routes } from "react-router-dom";
import Home from "./page/home";
import Auction from "./page/auction";
import NftCollection from "./page/nftCollection";
import TopCollection from "./page/topCollection";
import TopSeller from "./page/topSeller";
import SellerCollection from "./page/sellerCollections";
import CreateNft from "./page/createNft";
import CreateNftCollection from "./page/createNftCollection";
import SelectedNft from "./page/selectedNft";

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



      </Routes>
    </>
  );
}

export default App;
