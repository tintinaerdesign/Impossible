import { Routes, Route } from "react-router-dom";
// 🔥 1. เปลี่ยนมานำเข้าด้วยตัวพิมพ์ใหญ่ให้ถูกต้องตามกฎ React
import FirstPage from "./pages/FirstPage";
import CoinList from "./pages/coinlist"; // ดึงจากไฟล์เดิมแต่เปลี่ยนชื่อตัวแปรที่รับเป็น C ตัวใหญ่

export default function App() {
  return (
    <Routes>
      {/* 🔥 2. แก้ path="/" เพื่อบอกระบบว่า เปิดเว็บมาปุ๊บ ให้โชว์หน้า FirstPage เป็นหน้าแรกทันที! */}
      <Route path="/" element={<FirstPage />} />

      {/* ตั้งเส้นทางสำรองไว้ เผื่อวันหลังพิมพ์ /FirstPage บน URL ก็จะเข้าหน้านี้ได้เหมือนกัน */}
      <Route path="/FirstPage" element={<FirstPage />} />

      {/* 🔥 3. เปลี่ยนแท็กเรียกใช้งานให้เป็นตัวพิมพ์ใหญ่ตามด้านบน */}
      <Route path="/coinlist" element={<CoinList />} />
    </Routes>
  );
}
