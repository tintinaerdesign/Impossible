import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

export default function FirstPage() {
  // 💡 [แก้ไขสำเร็จ]: ประกาศกลุ่มตัวแปรและ States สำหรับใช้ควบคุมชุดเมนูบน Navbar
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // States สำหรับระบบคำนวณของกล่องเครื่องคิดเลข
  const [monthlySaving, setMonthlySaving] = useState(200);
  const [savingPeriod, setSavingPeriod] = useState(4);
  const [btcGrowth, setBtcGrowth] = useState(8);

  // ระบบคำนวณทางคณิตศาสตร์แปรผันตามอินพุตแบบเรียลไทม์
  const principal = monthlySaving * 12 * savingPeriod;

  let fvResult = 0;
  if (btcGrowth > 0) {
    const monthlyRate = btcGrowth / 100 / 12;
    const totalMonths = savingPeriod * 12;
    fvResult =
      (monthlySaving * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
      monthlyRate;
  } else {
    fvResult = principal;
  }

  const fiatDilutionRate = 0.07;
  const adjustedPurchasingPower =
    fvResult / Math.pow(1 + fiatDilutionRate, savingPeriod);
  const totalPowerLossPercent =
    fvResult > 0 ? (adjustedPurchasingPower / fvResult - 1) * 100 : 0;

  // 💡 [แก้ไขสำเร็จ]: ดึงสคริปต์ตรวจจับพิกัดระยะการ Scroll หน้าจอมาทำงานร่วมกับแถบแคปซูล
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
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white font-sans antialiased flex items-center pt-20 lg:pt-0">
      {/* โครงสร้าง Layout คุมพื้นที่จัดหน้าจอ */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-10 gap-12 items-center w-full">
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

        {/* === ฝั่งขวาเดิม: กล่องเครื่องคิดเลขสไตล์ Fintech (กินพื้นที่ 5 ช่องแรกบนจอใหญ่) === */}
        <div className="lg:col-span-5 w-full space-y-6 flex flex-col justify-center items-center">
          <div className="w-full max-w-[460px] bg-[#1a1a1c] rounded-3xl shadow-2xl border border-white/5 p-6 space-y-5">
            <div className="flex items-start gap-4">
              {/* Step Badge */}
              <div className="shrink-0 bg-gradient-to-r from-[#ec0065] to-[#f2a900] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm select-none">
                Step 1
              </div>

              {/* Header Content */}
              <div className="flex flex-col space-y-1">
                <h3 className="text-xl font-bold text-zinc-100 tracking-tight leading-none">
                  Enter Monthly Savings
                </h3>
                <p className="text-sm font-light text-zinc-500 leading-normal">
                  Show only what needs to be focused on initially.
                </p>
              </div>
            </div>

            <div className="bg-[#151414] rounded-2xl border border-white/5 p-5">
              <h2 className="text-lg font-semibold text-zinc-200">
                Assets saving calculator
              </h2>
              <p className="text-gray-400 text-xs mt-1">
                Calculate your potential savings with our easy-to-use
                calculator.
              </p>
              <div className="h-[1px] w-full bg-white/5 mt-6"></div>

              {/* ช่องกรอกตัวเลขแบบไม่มีปุ่ม Spinner ลูกศรกวนใจ */}
              <div className="space-y-2 mt-4">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Monthly Saving (USD)
                </label>
                <div className="w-full bg-[#151414] border border-white/10 rounded-xl flex items-center justify-between h-12 px-4">
                  <span className="text-gray-500 ">$</span>
                  <input
                    type="number"
                    value={monthlySaving}
                    onChange={(e) =>
                      setMonthlySaving(Number(e.target.value) || 0)
                    }
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full text-start ml-4 bg-transparent border-none outline-none focus:ring-0 text-white pr-2"
                  />
                  <span className="text-gray-500 text-md">USD</span>
                </div>

                {/* สไลเดอร์จับระยะปรับช่วงตัวเลข */}
                <input
                  type="range"
                  min="10"
                  max="10000"
                  value={monthlySaving}
                  onChange={(e) => setMonthlySaving(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer accent-[#ec0065]"
                />
              </div>

              <div className="h-[1px] w-full bg-white/5 mt-5"></div>

              {/* แถบคำแนะนำ Tips ใต้กล่อง */}
              <div className="flex items-center mt-4 gap-2 px-1 select-none">
                <span className="text-md text-amber-500 animate-pulse">✨</span>
                <p className="text-xs font-light text-zinc-500 tracking-wide">
                  Start simple-just enter the amount you can comfortably save
                  each month.
                </p>
              </div>

              <div className="shrink-0 w-full mt-14 py-3 bg-gradient-to-r from-[#ec0065] to-[#f2a900] text-white text-md font-medium px-3 rounded-full cursor-pointer text-center tracking-wider shadow-sm select-none hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                Next Step
              </div>
            </div>
          </div>
        </div>

        {/* === ฝั่งซ้ายเดิม: เนื้อหาข้อความพาดหัว (กินพื้นที่ 5 ช่องหลังบนจอใหญ่) === */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <h1 className="font-['Orbitron'] text-4xl md:text-5xl font-black leading-[1.2] tracking-tight text-left">
            Navigate Purchasing Power <br /> & Inflation with Clarity
          </h1>

          <p className="text-zinc-400 text-lg leading-relaxed font-light">
            Explore real-time market data, inflation insights, and financial
            tools designed to help you better understand digital assets and
            macro trends.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to="/Calculator"
              className="px-8 py-4 rounded-2xl border border-white/20 text-center text-lg bg-transparent text-white hover:text-black hover:bg-white transition duration-300"
            >
              Full-details Calculator
            </Link>
            <Link
              to="/coinlist"
              className="px-8 py-4 rounded-2xl text-center text-white text-lg bg-gradient-to-r from-orange-400 to-pink-500 hover:scale-105 transition duration-300 shadow-md"
            >
              Explore Coin Market
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
