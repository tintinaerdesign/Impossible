import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 💡 [แก้ไขสำเร็จ]: ดึงระบบตรวจจับการคลิกด้านนอกพื้นที่เพื่อหุบเมนูของเวอร์ชันมือถือ
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav>
      {/* Nav แบบปังๆ */}
      <nav
        className={`fixed px-6 z-50 left-1/2 -translate-x-1/2 flex items-center transition-all duration-500 ease-in-out ${
          isScrolled
            ? "top-4 h-14 w-11/12 rounded-2xl border border-white/10 bg-[#0f0f0f]/90 backdrop-blur-lg"
            : "top-0 h-20 w-full border-b border-white/[0.05] bg-[#0f0f0f]/80 backdrop-blur-md"
        }`}
      >
        {/* ใช้ Grid 3 คอลัมน์ขนาดเท่ากัน เพื่อบังคับให้ส่วนผสมตรงกลางอยู่กึ่งกลางกล่องเสมอ */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 items-center relative">
          {/* [1] ฝั่งซ้าย: Logo */}
          <div className="flex justify-start">
            <span
              className={`logo whitespace-nowrap transition-all duration-500 hover:scale-105 hover:brightness-110 select-none ${
                isScrolled ? "text-xl" : "text-[28px]"
              }`}
              style={{
                fontWeight: "800",
                letterSpacing: "-1.5px",
                cursor: "pointer",
                background: "linear-gradient(135deg, #d879a8, #ec0065)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Start D
            </span>
          </div>

          {/* [2] ตรงกลาง: Menu สำหรับ Desktop */}
          <div className="hidden md:flex justify-center items-center">
            <ul className="flex items-center gap-6 lg:gap-8 text-[14px] lg:text-[15px] font-medium whitespace-nowrap">
              <li>
                <Link
                  to="/"
                  className="hover:text-white text-gray-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/Calculator"
                  className="hover:text-white text-gray-400 transition-colors"
                >
                  Inflation Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/BtcPage"
                  className="hover:text-white text-gray-400 transition-colors"
                >
                  Bitcoin Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* [3] ฝั่งขวา: ปุ่ม Toggle บนมือถือ */}
          <div className="flex justify-end items-center mobile-menu-container">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              type="button"
              className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-2xl">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* ==================== DROPDOWN MENU สำหรับ MOBILE ==================== */}
        <div
          className={`absolute right-0 w-full mobile-menu-container bg-[#0f0f0f]/95 backdrop-blur-lg border-b border-white/[0.05] md:hidden transition-all duration-300 ease-in-out ${
            isScrolled ? "top-14 rounded-b-2xl" : "top-20"
          } ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col p-6 space-y-4 text-base font-medium">
            <li>
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-white text-gray-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Calculator"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-white text-gray-400 transition-colors"
              >
                Inflation Calculator
              </Link>
            </li>
            <li>
              <Link
                to="/coinlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-white text-gray-400 transition-colors"
              >
                Coin Market
              </Link>
            </li>
            <li>
              <Link
                to="/BtcPage"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-white text-gray-400 transition-colors"
              >
                Bitcoin Insights
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </nav>
  );
}
