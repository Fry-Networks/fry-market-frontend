import { Route, Routes } from "react-router-dom";
import Home from "./page/home";
import Auction from "./page/auction";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auction" element={<Auction />} />
      </Routes>
    </>
  );
}

export default App;
