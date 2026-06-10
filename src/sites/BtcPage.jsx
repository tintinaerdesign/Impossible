import React, { useState, useEffect } from "react";

//ดึง component มาใช้เด้อ อิหล่า
import Sidebar from "../components/common/Sidebar.jsx";
import CoinHeader from "../components/bitcoin/CoinHeader.jsx";
import CoinChart from "../components/bitcoin/CoinChart.jsx";
import MarketInfo from "../components/bitcoin/MarketInfo.jsx";

export default function BtcPage() {
  // 1. 🌐 ใช้สเตตสำหรับเก็บข้อมูล
  const [coin, setCoin] = useState(null);

  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("1D");

  const [bullishDivergence, setBullishDivergence] = useState(false);

  // 🌟 ฟังก์ชันที่ 2: แยกสำหรับดึงข้อมูลคริปโตโดยเฉพาะ
  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&sparkline=false",
      );
      const data = await response.json();

      setCoin(data[0]); // ถ้า Bitcoin อยู่ในตำแหน่งแรกของอาเรย์
    } catch (error) {
      console.error("Error fetching Crypto:", error);
    }
  };

  // 🌟 ใน useEffect สั่งทำงานคู่กัน และเปิดปิด Loading พร้อมกัน
  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      await Promise.all([fetchCryptoData()]);
      setLoading(false);
    };

    loadAllData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex font-lexend">
      {/* 2. 📊 (Main Content Area) */}

      <main className="flex-1 p-6 md:p-10 space-y-6 overflow-y-auto w-full">
        {/* แถบเส้นทางด้านบนสุด */}
        <div className="flex justify-between items-center gap-4 border-b border-zinc-900 pb-4">
          <div className="text-xs text-zinc-500 font-medium">
            Coin List &gt;{" "}
            <span className="text-zinc-300">{coin ? coin.name : "--"}</span>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-xl text-xs font-bold border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition font-[Orbitron]">
              ☆ Add to Watchlist
            </button>
            <button className="px-4 py-2 rounded-xl text-xs font-bold border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition font-[Orbitron]">
              🔗 Share
            </button>
          </div>
        </div>
        <CoinHeader coin={coin} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- ฝั่งซ้าย: กล่องแสดงกราฟ --- */}

          <div className="lg:col-span-2 bg-zinc-950/30 border border-zinc-900 rounded-3xl p-6 flex flex-col justify-between space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="flex gap-6 text-xs font-bold text-zinc-500 border-b border-zinc-900 sm:border-0 pb-2 sm:pb-0">
                <span className="text-pink-500 border-b-2 border-pink-500 pb-1 cursor-pointer font-[Orbitron]">
                  Overview
                </span>
                <span className="hover:text-zinc-300 cursor-pointer font-[Orbitron]">
                  Markets
                </span>
                <span className="hover:text-zinc-300 cursor-pointer font-[Orbitron]">
                  News
                </span>
                <span className="hover:text-zinc-300 cursor-pointer font-[Orbitron]">
                  About
                </span>
              </div>

              <div className="flex bg-black p-1 rounded-xl border border-zinc-900 self-start sm:self-auto">
                {["1D", "1W", "1M", "3M", "1Y"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeframe(t)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-[Orbitron] transition ${
                      timeframe === t
                        ? "bg-pink-500/10 text-pink-500 border border-pink-500/20"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* พื้นที่สำหรับแสดงชาร์ตดึงจากโมดูลนอก (Clean & Professional) */}
            <div className="w-full h-[450px] min-h-[450px] relative bg-gradient-to-b from-pink-500/[0.01] to-transparent rounded-xl border border-zinc-900/40 p-2 overflow-hidden">
              {coin ? (
                <CoinChart
                  currentPrice={coin.current_price}
                  timeframe={timeframe}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-zinc-600 text-xs font-[Orbitron] tracking-widest animate-pulse">
                  LOADING REALTIME CHART...
                </div>
              )}

              {coin && (
                <div className="absolute left-4 top-4 text-[10px] text-pink-500 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20 font-[Orbitron] backdrop-blur-md">
                  LIVE
                </div>
              )}
            </div>

            {/* เปอร์เซ็นต์ผลตอบแทนย้อนหลัง */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {[
                {
                  label: "24h",
                  val: coin
                    ? `${coin.price_change_percentage_24h.toFixed(2)}%`
                    : "--",
                },
                { label: "7d", val: "+8.12%" },
                { label: "30d", val: "+15.34%" },
                { label: "90d", val: "+32.21%" },
                { label: "1y", val: "+73.52%" },
                { label: "YTD", val: "+68.19%" },
              ].map((period, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-900/60 text-center"
                >
                  <p className="text-[9px] text-zinc-500 font-medium uppercase tracking-wider font-[Orbitron]">
                    {period.label}
                  </p>
                  <p className="text-xs font-bold text-emerald-400 mt-0.5 font-[Orbitron]">
                    {period.val}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <MarketInfo coin={coin} />
        </div>

        {/* ส่วนท้ายสุด: About Box */}

        <footer
          className={`mt-3 border rounded-xl p-3 ${
            bullishDivergence
              ? "bg-emerald-500/10 border-emerald-500/20"
              : "bg-zinc-950 border-zinc-900"
          }`}
        >
          <p
            className={`text-xs font-medium ${
              bullishDivergence ? "text-emerald-400" : "text-zinc-400"
            }`}
          >
            {bullishDivergence
              ? "Bullish Momentum Divergence Detected"
              : "No Bullish Divergence Detected"}
          </p>

          <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
            {bullishDivergence
              ? "Price weakness appears to be slowing while momentum shows relative strength. Educational insight only."
              : "No notable bullish momentum divergence detected on the selected timeframe."}
          </p>
        </footer>
      </main>
    </div>
  );
}
