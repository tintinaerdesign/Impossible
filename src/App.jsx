import { Routes, Route } from "react-router-dom";

import FirstPage from "./sites/FirstPage";
import Calculator from "./sites/Calculator";
import BtcPage from "./sites/BtcPage";
import Practice from "./sites/Practice";

import CoinList from "./pages/CoinList";

import DashboardLayouts from "./layouts/DashboardLayouts";

export default function App() {
  return (
    <Routes>
      {/* ไม่มี Sidebar */}
      <Route path="/" element={<FirstPage />} />

      <Route path="/calculator" element={<Calculator />} />

      {/* มี Sidebar */}
      <Route element={<DashboardLayouts />}>
        <Route path="/dashboard" element={<BtcPage />} />

        <Route path="/coinlist" element={<CoinList />} />

        <Route path="/practice" element={<Practice />} />
      </Route>
    </Routes>
  );
}
