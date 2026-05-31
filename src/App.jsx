import "./index.css";
import { Routes, Route } from "react-router-dom";
import StartD from "./pages/StartD"; // ดึงไฟล์ที่เราแก้ร่วมกันล่าสุดมาใช้

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0a0f] text-white font-sans">
      <Routes>
        {/* เปิดหน้าแรกมาปุ๊บ (/) เจอโปรเจกต์หลักของคุณทันทีไม่ต้องเข้าลิงก์ย่อย */}
        <Route path="/" element={<StartD />} />

        {/* แสตนด์บายลิงก์นี้ไว้ด้วย เผื่อกดเมนูบาร์ด้านบน */}
        <Route path="/start-d" element={<StartD />} />
      </Routes>
    </div>
  );
}
