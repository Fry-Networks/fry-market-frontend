import { Route, Routes } from "react-router-dom";
import Home from "./page/home";
import Auction from "./page/auction";
import NftCollection from "./page/nftCollection";
import TopCollection from "./page/topCollection";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/nft-collection" element={<NftCollection />} />
        <Route path="/top-collection" element={<TopCollection />} />


      </Routes>
    </>
  );
}

export default App;
