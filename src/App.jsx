import "./index.css";
import BitcoinCalc from "./pages/BitcoinCalc"; // 🔥 เปลี่ยนมาสั่ง Import ตัวคำนวณตรง ๆ เลย

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0a0f] text-white font-sans">
      {/* 💥 เรียกใช้ชิ้นส่วนเครื่องคำนวณบิตคอยน์ขึ้นโชว์เป็นหน้าแรก */}
      <BitcoinCalc />
    </div>
  );
}
