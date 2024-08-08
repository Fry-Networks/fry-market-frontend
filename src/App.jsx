import { Route, Routes } from "react-router-dom";
import Home from "./page/home";
import Auction from "./page/auction";
import NftCollection from "./page/nftCollection";
import TopCollection from "./page/topCollection";
import NftDetail from "./page/nftDetail";
import CreateNft from "./page/createNft";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/nft-collection" element={<NftCollection />} />
        <Route path="/top-collection" element={<TopCollection />} />
        <Route path="/nft-detail" element={<NftDetail/>} />
        <Route path="/create-nft" element={<CreateNft/>} />




      </Routes>
    </>
  );
}

export default App;
