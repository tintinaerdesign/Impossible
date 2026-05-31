import { Routes, Route } from "react-router-dom";
import coinlist from "./pages/coinlist";
import FirstPage from "./pages/FirstPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/coinlist" element={<coinlist />} />
    </Routes>
  );
}
