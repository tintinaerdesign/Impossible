import { Routes, Route } from "react-router-dom";
import FirstPage from "./pages/FirstPage";
import Calculator from "./pages/Calculator";
import CoinList from "./pages/coinlist";
import BtcPage from "./pages/BtcPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/Calculator" element={<Calculator />} />
      <Route path="/coinlist" element={<CoinList />} />
      <Route path="/BtcPage" element={<BtcPage />} />
    </Routes>
  );
}
