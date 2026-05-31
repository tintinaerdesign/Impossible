import { Routes, Route } from "react-router-dom";
import StartD from "./pages/StartD";

export default function App() {
  return (
    <div class="min-h-screen bg-[#0b0a0f] text-white font-sans">
      <Routes>
        {/* เปิดหน้าแรกมา เจอโปรเจกต์ StartD ทันที */}
        <Route path="/" element={<StartD />} />

        {/* สแตนด์บายลิงก์ /start-d เผื่อกดลิงก์ย่อยเข้ามาด้วย */}
        <Route path="/start-d" element={<StartD />} />
      </Routes>
    </div>
  );
}
