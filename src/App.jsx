import { Routes, Route, BrowserRouter } from "react-router-dom";
import FirstPage from "./pages/FirstPage";
import CoinList from "./pages/coinlist";

export default function App() {
  return (
    // 2. เอา BrowserRouter มาครอบคลุมทางเดินทั้งหมดในนี้
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/FirstPage" element={<FirstPage />} />
        <Route path="/coinlist" element={<CoinList />} />
      </Routes>
    </BrowserRouter>
  );
}
