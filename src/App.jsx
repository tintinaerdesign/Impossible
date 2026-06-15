import { Routes, Route } from "react-router-dom";

import FirstPage from "./pages/FirstPage";
import BitcoinSecurity from "./pages/BitcoinSecurity";

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<FirstPage />} />
      <Route path="/BitcoinSecurity" element={<BitcoinSecurity />} />
    </Routes>
  );
}
