import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const App = () => {
  // 1. สร้าง State สำหรับเก็บข้อมูลคริปโต (เริ่มต้นให้เป็นอาเรย์ว่าง [])
  const [coins, setCoins] = useState([]);
  // 2. สร้าง State สำหรับเช็กว่ากำลังโหลดข้อมูลอยู่หรือไม่
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 3. ฟังก์ชัน async/await สำหรับดึงข้อมูลจาก CoinGecko
  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      // ดึงข้อมูลเหรียญท็อปๆ แหลกลาน
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
      );
      const data = await response.json();
      // เก็บข้อมูลที่ได้ลงใน State coins
      console.log(data[0]); // เช็คของกลางนะจ๊ะ ว่า API ส่งอะไรมาบ้าง
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  // 4. ส่วนฟังก์ชันทำมห้ fetchCryptoData ทำงานทันทีที่เปิดหน้าเว็บ
  useEffect(() => {
    fetchCryptoData();
  }, []);

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

  // 💡 3. เพิ่ม useEffect ตรวจจับการคลิกด้านนอกสำหรับเวอร์ชันมือถือ
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
    <div className="min-h-screen bg-linear-to-br from-black to-gray-700 text-white font-sans relative overflow-hidden">
      <nav
        className={`fixed px-6 z-50 left-1/2 -translate-x-1/2 flex items-center transition-all duration-500 ease-in-out ${
          isScrolled
            ? "top-4 h-14 w-11/12 rounded-2xl border border-white/10 bg-[#0f0f0f]/90 backdrop-blur-lg"
            : "top-0 h-20 w-full border-b border-white/[0.05] bg-[#0f0f0f]/80 backdrop-blur-md"
        }`}
      >
        {/* 💡 ใช้ Grid 3 คอลัมน์ขนาดเท่ากัน เพื่อบังคับให้ส่วนผสมตรงกลางอยู่กึ่งกลางกล่องเสมอโดยไม่ใช้ Absolute */}
        <div
          ref={dropdownRef}
          className="w-full grid grid-cols-2 md:grid-cols-3 items-center relative"
        >
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
          {/* 💡 ปรับมาใช้ flex justify-center บนระนาบปกติ ทำให้ล็อกจุดกึ่งกลางของตัวแคปซูลได้แม่นยำ ไม่บินซ้ายอีกต่อไป */}
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

          {/* [3] ฝั่งขวา: ปุ่ม Toggle บนมือถือ หรือพื้นที่ว่างบนคอมฯ */}
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
          className={`absolute right-0 w-full mobile-menu-container bg-[#1a1a1c]/95 backdrop-blur-2xl border-b border-white/[0.05] md:hidden transition-all duration-300 ease-in-out 
            ${isScrolled ? "top-14 rounded-b-2xl" : "top-20"} ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
        >
          <ul className="flex flex-col p-6 space-y-4 text-base font-medium">
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
      </nav>

      <div className="max-w-5xl mt-20 mx-auto px-6 py-16 relative z-10">
        <h1 className="text-2xl tracking-[2px] font-semibold text-gray-400 uppercase mb-8">
          <span className="text-5xl text-[#e65c8c] font-light">C</span>rypto
          currencies market
        </h1>

        <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#180d12]/60 backdrop-blur-lg shadow-2xl">
          <table className="min-w-full border-collapse">
            <thead className="bg-gradient-to-r from-[#180d12] to-orange-500/80">
              <tr>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-200 font-semibold">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-200 font-semibold">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-200 font-semibold">
                  Price (USD)
                </th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-200 font-semibold">
                  Market Cap
                </th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-200 font-semibold">
                  24h Change
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-16 text-center animate-pulse text-gray-500 tracking-wide text-sm"
                  >
                    Fetching data...
                  </td>
                </tr>
              ) : (
                coins.map((coin) => {
                  if (coin.price_change_percentage_24h === null) {
                    console.log("FOUND NULL:", coin);
                  }

                  return (
                    <tr
                      key={coin.id}
                      className="border-b border-white/5 hover:bg-white/[0.03] transition-all duration-200"
                    >
                      <td className="px-6 py-4 text-left text-sm text-gray-500">
                        {coin.market_cap_rank}
                      </td>

                      <td className="px-6 py-4 text-left">
                        <div className="flex items-center gap-3">
                          <img
                            src={coin.image}
                            className="w-6 h-6 object-contain"
                            alt={coin.name}
                          />

                          <span className="font-medium text-gray-200">
                            {coin.name}
                          </span>

                          <span className="text-xs text-gray-500 font-mono uppercase">
                            {coin.symbol}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-left font-mono font-semibold text-gray-100">
                        ${coin.current_price.toLocaleString()}
                      </td>

                      <td className="px-6 py-4 text-left text-sm font-mono text-gray-400">
                        ${coin.market_cap.toLocaleString()}
                      </td>

                      <td
                        className={`px-6 py-4 text-left font-mono font-medium text-sm ${
                          coin.price_change_percentage_24h != null &&
                          coin.price_change_percentage_24h >= 0
                            ? "text-emerald-400"
                            : "text-rose-400"
                        }`}
                      >
                        {coin.price_change_percentage_24h >= 0 ? "▲ +" : "▼ "}
                        {coin.price_change_percentage_24h?.toFixed(2) ?? "N/A"}%
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
