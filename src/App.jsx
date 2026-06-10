import { Routes, Route } from "react-router-dom";

import FirstPage from "./sites/FirstPage";
import Calculator from "./sites/Calculator";
import BtcPage from "./sites/BtcPage";
import Practice from "./sites/Practice";

import CoinList from "./pages/CoinList";
import CoinDashboard from "./pages/CoinDashboard";

import DashboardLayouts from "./layouts/DashboardLayouts";

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<FirstPage />} />

      <Route path="/calculator" element={<Calculator />} />

      {/* Dashboard Layout */}
      <Route element={<DashboardLayouts />}>
        <Route path="/dashboard" element={<BtcPage />} />

        <Route path="/coinlist" element={<CoinList />} />

        <Route path="/practice" element={<Practice />} />

        <Route path="/coin/:id" element={<CoinDashboard />} />
      </Route>
    </Routes>
  );
}
