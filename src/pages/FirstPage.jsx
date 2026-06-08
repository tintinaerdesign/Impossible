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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ระบบคำนวณทางคณิตศาสตร์แปรผันตามอินพุตแบบเรียลไทม์
  const principal = monthlySaving * 12 * savingPeriod;

  // ระบบ saving Period
  useEffect(() => {
    const handleClickOutside = (event) => {
      // เช็กว่าจุดที่คลิก ไม่ได้อยู่ในกล่อง Dropdown (เลือกปี)
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }

      // 💡 ปิดเมนูมือถือก็ต่อเมื่อ: จุดที่คลิก "ไม่ใช่" ปุ่มแฮมเบอร์เกอร์/เมนูมือถือ
      // โดยเช็กจาก คลาส หรือ attribute (วิธีนี้ปลอดภัยที่สุด ไม่ต้องพึ่ง stopPropagation)
      if (!event.target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    {
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // กดเปลี่ยน task ทีละ step
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNextStep = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      setIsTransitioning(false);
    }, 300); // รอ fade out ก่อนเปลี่ยน step
  };

  let fvResult = Number(principal) || 0;
  if (btcGrowth > 0) {
    const monthlyRate = btcGrowth / 100 / 12;
    const totalMonths = savingPeriod * 12;

    const calculatedValue =
      (monthlySaving * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
      monthlyRate;

    fvResult = isFinite(calculatedValue) ? calculatedValue : principal;
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

        {/* ================= STEP CARD SYSTEM ================= */}
        <div className="lg:col-span-5 mt-24 flex justify-center items-center w-full">
          <div
            className={`w-full max-w-[460px] min-h-[580px] transition-all duration-700 ease-out ${
              isTransitioning
                ? "opacity-0 -translate-x-24 blur-sm scale-[0.98]"
                : "opacity-100 translate-x-0 blur-0 scale-100"
            }`}
          >
            {/* ================= STEP 1 ================= */}
            {currentStep === 1 && (
              <div className="bg-[#1a1a1c] rounded-3xl shadow-2xl border border-white/5 p-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 bg-gradient-to-r from-[#ec0065] to-[#f2a900] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    Step 1
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-zinc-100">
                      Enter Monthly Savings
                    </h3>

                    <p className="text-sm text-zinc-500">
                      Set how much you can save monthly.
                    </p>
                  </div>
                </div>

                <div className="bg-[#151414] rounded-2xl border border-white/5 p-5">
                  <h2 className="text-lg font-semibold text-zinc-200">
                    Assets Saving Calculator
                  </h2>

                  <p className="text-gray-400 text-xs mt-1">
                    Calculate your potential savings.
                  </p>

                  <div className="h-[1px] w-full bg-white/5 mt-6" />

                  <div className="space-y-2 mt-4">
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Monthly Saving (USD)
                    </label>

                    <div className="w-full bg-[#151414] border border-white/10 rounded-xl flex items-center justify-between h-12 px-4">
                      <span className="text-gray-500">$</span>

                      <input
                        type="number"
                        value={monthlySaving}
                        onChange={(e) =>
                          setMonthlySaving(Number(e.target.value) || 0)
                        }
                        className="
                  [appearance:textfield]
                  [&::-webkit-outer-spin-button]:appearance-none
                  [&::-webkit-inner-spin-button]:appearance-none
                  w-full
                  ml-4
                  bg-transparent
                  outline-none
                  text-white
                "
                      />

                      <span className="text-gray-500">USD</span>
                    </div>

                    <input
                      type="range"
                      min="10"
                      max="10000"
                      value={monthlySaving}
                      onChange={(e) => setMonthlySaving(Number(e.target.value))}
                      className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer accent-[#ec0065]"
                    />
                  </div>
                  <div className="flex items-center mt-4 gap-2 px-1 select-none">
                    <span className="text-xl text-amber-500 animate-pulse">
                      ✨
                    </span>

                    <p className="text-xs font-light text-zinc-500 tracking-wide">
                      Start simple — just enter the amount you can comfortably
                      save each month.
                    </p>
                  </div>
                  <button
                    onClick={handleNextStep}
                    className="w-full mt-14 py-3 bg-gradient-to-r from-[#ec0065] to-[#f2a900] rounded-2xl hover:scale-[1.02] transition-all duration-300"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 2 ================= */}
            {currentStep === 2 && (
              <div className="bg-[#1a1a1c] rounded-3xl shadow-2xl border border-white/5 p-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 bg-gradient-to-r from-[#ec0065] to-[#f2a900] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    Step 2
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-zinc-100">
                      Choose Saving Period
                    </h3>

                    <p className="text-sm text-zinc-500">
                      Configure your timeline.
                    </p>
                  </div>
                </div>

                <div className="bg-[#151414] rounded-2xl border border-white/5 p-5">
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Monthly Saving (USD)
                  </label>

                  <div className="mt-3 w-full bg-[#151414] border border-white/10 rounded-xl flex items-center justify-between h-12 px-4 opacity-70">
                    <span className="text-gray-500">$</span>

                    <input
                      readOnly
                      value={monthlySaving}
                      className="w-full ml-4 bg-transparent outline-none text-zinc-400 pointer-events-none"
                    />

                    <span className="text-gray-500">USD</span>
                  </div>
                  <div className="h-[1px] w-full bg-white/10 mt-6"></div>
                  <div className="space-y-2 mt-6">
                    <label className="block text-sm font-medium text-gray-400">
                      Saving period
                    </label>

                    <div className="relative w-full" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex items-center justify-between bg-[#1a1a1c] border border-white/10 rounded-xl px-4 py-3 text-zinc-200"
                      >
                        <span>{savingPeriod} years</span>

                        <span>▼</span>
                      </button>

                      {isDropdownOpen && (
                        <ul className="absolute overflow-auto max-h-60 left-0 w-full mt-2 bg-[#1a1a1c] border border-white/10 rounded-xl z-50 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                          {[...Array(40)].map((_, i) => (
                            <li
                              key={i + 1}
                              onClick={() => {
                                setSavingPeriod(i + 1);
                                setIsDropdownOpen(false);
                              }}
                              className="px-4 py-2 hover:bg-[#ec0065]/20 cursor-pointer"
                            >
                              {i + 1} years
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center mt-4 gap-2 px-1 select-none">
                    <span className="text-xl text-amber-500 animate-pulse">
                      ✨
                    </span>

                    <p className="text-xs font-light text-zinc-500 tracking-wide">
                      Start simple - How long do you plan to save?
                    </p>
                  </div>

                  <div className="flex gap-4 mt-14">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="w-full border border-white/10 rounded-2xl py-3 hover:scale-[1.02] transition-all duration-300"
                    >
                      Back
                    </button>

                    <button
                      onClick={handleNextStep}
                      className="w-full py-3 bg-gradient-to-r from-[#ec0065] to-[#f2a900] rounded-2xl hover:scale-[1.02] transition-all duration-300"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3*/}
            {currentStep === 3 && (
              <div className="col-span-4 bg-[#1a1a1c] rounded-3xl shadow-2xl border border-white/5 p-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-[#ec0065] whitespace-nowrap to-[#f2a900] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    STEP 3
                  </div>
                  <div className="whitespace-nowrap">
                    <h3 className="text-xl text-zinc-100">
                      Expected Annual Growth
                    </h3>

                    <p className="text-sm text-zinc-500">
                      Set your expected annual return assumption..
                    </p>
                  </div>
                </div>
                <div className="h-[1px] border border-white/10 w-full mt-3"></div>

                <div className="bg-[#151414] rounded-2xl border border-white/5 space-y-4 p-5">
                  <div className="mt-3 w-full bg-[#151414] border border-white/10 rounded-xl flex items-center justify-between h-12 px-4 opacity-70">
                    <span className="text-gray-500">$</span>

                    <input
                      readOnly
                      value={monthlySaving}
                      className="w-full ml-4 bg-transparent outline-none text-zinc-400 pointer-events-none"
                    />

                    <span className="text-gray-500">USD</span>
                  </div>

                  <button
                    readOnly
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between bg-[#151514] border border-white/10 rounded-xl px-4 py-3 text-zinc-400 opacity-70"
                  >
                    <span>{savingPeriod} years</span>
                  </button>

                  <div className="w-full bg-[#1a1a1c] border border-white/10 rounded-xl py-2.5 px-4 flex justify-between items-center">
                    <span className="text-xs text-gray-400 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">
                        trending_up
                      </span>
                      Growth Rate
                    </span>
                    <span className="text-zinc-200 font-mono font-semibold">
                      {btcGrowth.toFixed(2)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="120"
                    value={btcGrowth}
                    onChange={(e) => setBtcGrowth(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer accent-[#ec0065]"
                  />
                  <div className="flex items-center gap-2 px-1 select-none">
                    <span className="text-xl text-amber-500 animate-pulse">
                      ✨
                    </span>

                    <p className="text-md font-light text-zinc-500 tracking-wide">
                      Adjust the percentage using the slider.
                    </p>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="w-full border border-white/10 rounded-2xl py-3 hover:scale-[1.02] transition-all duration-300"
                    >
                      Back
                    </button>

                    <button
                      onClick={handleNextStep}
                      className="w-full py-3 bg-gradient-to-r from-[#ec0065] to-[#f2a900] rounded-2xl hover:scale-[1.02] transition-all duration-300"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="col-span-4 bg-[#1a1a1c] rounded-3xl shadow-2xl border border-white/5 p-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-[#ec0065] whitespace-nowrap to-[#f2a900] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    Result
                  </div>
                  <div className="whitespace-nowrap">
                    <h3 className="text-xl text-zinc-100">
                      Future Value (Est.)
                    </h3>

                    <p className="text-sm text-zinc-500">
                      See how compound growth may impact your savings.
                    </p>
                  </div>
                </div>
                <div className="h-[1px] border border-white/10 w-full mt-3"></div>

                <div className="w-full bg-[#151414] border border-white/10 rounded-xl p-4">
                  <div className="flex flex-col items-center justify-center">
                    <p className="bg-gradient-to-r from-[#f2a900] to-[#ec398f] bg-clip-text text-transparent text-5xl font-semibold">
                      $
                      {(Number(fvResult) || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 justify-between mt-3">
                    <div className="flex items-center justify-center">
                      <div className="pl-4 rounded-xl text-pink-500 text-lg flex flex-cols-2 items-center">
                        <span className="material-symbols-outlined">
                          account_balance
                        </span>
                      </div>
                      <div className="text-[11px] pl-2 items-start whitespace-nowrap uppercase text-gray-500 font-medium">
                        Total Investment
                        <div className="text-lg text-white">
                          $
                          {principal.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="grid justify-center">
                      <p className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">
                        Saving Period
                      </p>
                      <span className="text-lg text-white">
                        {savingPeriod} Years
                      </span>
                    </div>
                  </div>
                  <div
                    readOnly
                    className="mt-4 w-full bg-[#1a1a1c] border border-white/10 rounded-xl py-2.5 px-4 flex justify-between items-center"
                  >
                    <span className="text-xs text-gray-400 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">
                        trending_up
                      </span>
                      Growth Rate
                    </span>
                    <span className="text-zinc-200 font-mono font-semibold">
                      {btcGrowth.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-1 select-none">
                  <span className="text-xl text-amber-500 animate-pulse">
                    ✨
                  </span>

                  <p className="text-md font-light text-zinc-500 tracking-wide">
                    Inflation may reduce your future purchasing power.
                  </p>
                </div>

                <div className="flex gap-4 mt-14">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="w-full border border-white/10 rounded-2xl py-3 hover:scale-[1.02] transition-all duration-300"
                  >
                    Back
                  </button>

                  <Link
                    to="/Calculator"
                    state={{
                      monthlySaving,
                      savingPeriod,
                      btcGrowth,
                    }}
                    className="w-full py-3 flex justify-center bg-gradient-to-r from-[#4a183e] via-[#5f1c50] to-[#7a245d] border shadow-[0_0_20px_rgba(236,0,101,0.12)] rounded-2xl hover:scale-[1.02] transition-all duration-300"
                  >
                    More Deatils
                  </Link>
                </div>
                <div className="h-[1px] w-full border-white/10 mt-3"></div>
              </div>
            )}
          </div>
        </div>

        {/* === ฝั่งซ้ายเดิม: เนื้อหาข้อความพาดหัว (กินพื้นที่ 5 ช่องหลังบนจอใหญ่) === */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <h1 className="font-['Orbitron'] text-4xl md:text-5xl font-black leading-[1.2] tracking-tight text-left">
            Navigate Inflation & Purchasing Power with Clarity
          </h1>

          <p className="text-zinc-400 text-lg leading-relaxed font-light">
            Explore real-time market data, inflation insights, and financial
            tools to better understand digital assets and macroeconomic trends.
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
