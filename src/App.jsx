import { Routes, Route } from "react-router-dom";

import FirstPage from "./pages/FirstPage";
import BitcoinSecurity from "./pages/BitcoinSecurity";
import LearnPage from "./pages/LearnPage";

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<FirstPage />} />
      <Route path="/BitcoinSecurity" element={<BitcoinSecurity />} />
      <Route path="/LearnPage" element={<LearnPage />} />
    </Routes>
  );
}
