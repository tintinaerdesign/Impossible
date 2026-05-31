import { Routes, Route } from "react-router-dom";
import FirstPage from "./pages/FirstPage";
import Calculator from "./pages/calculator";
import CoinList from "./pages/coinlist";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/Calculator" element={<Calculator />} />
      <Route path="/coinlist" element={<CoinList />} />
    </Routes>
  );
}
