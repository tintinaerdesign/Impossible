import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BtcChart from "./BtcChart";

// นำเข้าไอคอนดีไซน์มินิมอลลายเส้นตรงปก
import {
  LayoutDashboard,
  Briefcase,
  ListOrdered,
  Star,
  Bell,
  Newspaper,
  GraduationCap,
  Calculator,
} from "lucide-react";

export default function BtcPage() {
  // 1. 🌐 ใช้สเตตสำหรับเก็บข้อมูล
  const [bitcoin, setBitcoin] = useState(null);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("1D");

  const [rsiData, setRsiData] = useState([]);

  const [bullishDivergence, setBullishDivergence] = useState(false);

  // 🌟 ฟังก์ชันที่ 2: แยกสำหรับดึงข้อมูลคริปโตโดยเฉพาะ
  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,ripple,solana,cardano&order=market_cap_desc&sparkline=false",
      );
      const data = await response.json();
      setCoins(data);
      setBitcoin(data[0]); // ถ้า Bitcoin อยู่ในตำแหน่งแรกของอาเรย์
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

  const detectBullishDivergence = (candles, rsiData) => {
    if (candles.length < 20 || rsiData.length < 20) {
      return false;
    }

    // หา low ล่าสุด 2 จุด
    const recentCandles = candles.slice(-20);

    const lows = recentCandles.map((c) => c.low);

    const firstLow = Math.min(...lows.slice(0, 10));

    const secondLow = Math.min(...lows.slice(10));

    const firstLowIndex = lows.indexOf(firstLow);

    const secondLowIndex = lows.lastIndexOf(secondLow);

    const firstRsi = rsiData[firstLowIndex]?.value;

    const secondRsi = rsiData[secondLowIndex]?.value;

    const bullish = secondLow < firstLow && secondRsi > firstRsi;

    return bullish;
  };
  return (
    <div className="min-h-screen bg-black text-white flex font-lexend">
      {/* ======================================================== */}
      {/* 1. 📁 แถบเมนูด้านซ้าย (Sidebar) - ใช้ฟอนต์มินิมอลตามบรีฟใหม่ */}
      {/* ======================================================== */}
      <aside className="w-64 border-r border-zinc-900 bg-zinc-950/60 p-6 flex flex-col justify-between hidden lg:flex shrink-0">
        <div className="space-y-8">
          <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent font-[Orbitron] tracking-wider">
            Start D
          </div>

          <nav className="space-y-1.5">
            {[
              { name: "Dashboard", icon: LayoutDashboard, active: false },
              { name: "Portfolio", icon: Briefcase, active: false },
              { name: "Coin List", icon: ListOrdered, active: true },
              { name: "Watchlist", icon: Star, active: false },
              { name: "Price Alert", icon: Bell, active: false },
              { name: "News", icon: Newspaper, active: false },
              { name: "Learning", icon: GraduationCap, active: false },
              { name: "DCA Calculator", icon: Calculator, active: false },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                    item.active
                      ? "bg-zinc-900/60 text-pink-500 border-zinc-800"
                      : "text-zinc-500 border-transparent hover:text-zinc-200 hover:bg-zinc-900/30"
                  }`}
                >
                  <IconComponent
                    size={18}
                    strokeWidth={0.5}
                    className={item.active ? "text-pink-500" : "text-zinc-500"}
                  />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-900 text-center">
          <h4 className="text-sm font-bold mb-1 font-[Orbitron]">
            Start DCA Now
          </h4>
          <p className="text-[11px] text-zinc-500 mb-4 leading-tight">
            ลงุทนอย่างสม่ำเสมอ สร้างอนาคตที่มั่นคง
          </p>
          <button className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:opacity-90 transition shadow-lg shadow-pink-500/20">
            Start DCA your assets
          </button>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. 📊 พื้นที่เนื้อหาหลัก (Main Content Area) */}
      {/* ======================================================== */}
      <main className="flex-1 p-6 md:p-10 space-y-6 overflow-y-auto w-full">
        {/* แถบเส้นทางด้านบนสุด */}
        <div className="flex justify-between items-center gap-4 border-b border-zinc-900 pb-4">
          <div className="text-xs text-zinc-500 font-medium">
            Coin List &gt; <span className="text-zinc-300">Bitcoin</span>
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

        {/* ส่วนหัวข้อมูลหลักสไตล์กระดานเทรดพรีเมียม */}
        {bitcoin && (
          <header className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            {/* ซ้าย: โลโก้ + ชื่อเหรียญ */}
            <div className="flex items-center gap-4 xl:col-span-1">
              <img
                src={bitcoin.image}
                className="w-10 h-10 object-contain"
                alt={bitcoin.name}
              />

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold font-[Orbitron]">
                    {bitcoin.name}
                  </h1>

                  <span className="text-xs bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded font-[Orbitron]">
                    {bitcoin.symbol.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-3xl md:text-4xl text-pink-500 tracking-tight font-sans">
                    $
                    {bitcoin.current_price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>

                  <span
                    className={`text-xs font-bold ${
                      bitcoin.price_change_percentage_24h >= 0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {bitcoin.price_change_percentage_24h >= 0 ? "▲" : "▼"}{" "}
                    {bitcoin.price_change_percentage_24h.toFixed(2)}% (24h)
                  </span>
                </div>
              </div>
            </div>

            {/* ขวา: Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-zinc-950/40 p-4 rounded-2xl border border-zinc-900/60 backdrop-blur-sm xl:col-span-2 w-full">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-[Orbitron]">
                  Market Cap
                </p>
                <p className="text-xs font-bold mt-1 text-zinc-300 font-[Orbitron]">
                  ${(bitcoin.market_cap / 1e12).toFixed(2)}T
                </p>
              </div>

              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-[Orbitron]">
                  24h High
                </p>
                <p className="text-xs font-bold mt-1 text-zinc-300 font-[Orbitron]">
                  $
                  {bitcoin.high_24h.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>

              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-[Orbitron]">
                  24h Low
                </p>
                <p className="text-xs font-bold mt-1 text-zinc-300 font-[Orbitron]">
                  $
                  {bitcoin.low_24h.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>

              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-[Orbitron]">
                  24h Volume
                </p>
                <p className="text-xs font-bold mt-1 text-zinc-300 font-[Orbitron]">
                  ${(bitcoin.total_volume / 1e12).toFixed(2)}T
                </p>
              </div>
            </div>
          </header>
        )}

        {/* ======================================================== */}
        {/* 3. 🧩 โครงสร้างสองฝั่ง (ซ้ายกล่องชาร์ตใหญ่ / ขวาวิดเจ็ตสถิติ) */}
        {/* ======================================================== */}
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
                {["1D", "7D", "1M", "3M", "1Y", "ALL"].map((t) => (
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
            <div className="absolute right-4 top-4 text-[10px] text-pink-500 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20 font-[Orbitron] backdrop-blur-md">
              LIVE
            </div>

            {/* พื้นที่สำหรับแสดงชาร์ตดึงจากโมดูลนอก (Clean & Professional) */}
            <div className="w-full h-[450px] min-h-[450px] relative bg-gradient-to-b from-pink-500/[0.01] to-transparent rounded-xl border border-zinc-900/40 p-2 overflow-hidden">
              {bitcoin ? (
                <BtcChart
                  currentPrice={bitcoin.current_price}
                  timeframe={timeframe}
                  setRsiData={setRsiData}
                  setBullishDivergence={setBullishDivergence}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-zinc-600 text-xs font-[Orbitron] tracking-widest animate-pulse">
                  LOADING REALTIME CHART...
                </div>
              )}

              {bitcoin && (
                <div className="absolute left-4 top-4 text-[10px] text-pink-500 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20 font-[Orbitron] backdrop-blur-md">
                  LIVE
                </div>
              )}
            </div>
            {/* RSI INDICATOR */}
            <div className="bg-zinc-950/50 border border-zinc-900 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500 font-[Orbitron]">
                    Relative Strength Index (14)
                  </p>

                  <p className="text-sm text-zinc-400 mt-1">
                    Momentum indicator
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-pink-500 font-[Orbitron]">
                    {rsiData.length
                      ? rsiData[rsiData.length - 1].value.toFixed(1)
                      : "--"}
                  </p>
                </div>
              </div>

              <div className="relative h-[160px]">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {/* 70 line */}
                  <line
                    x1="0"
                    y1="30"
                    x2="100"
                    y2="30"
                    stroke="#ec4899"
                    strokeDasharray="4"
                    opacity="0.3"
                  />

                  {/* 30 line */}
                  <line
                    x1="0"
                    y1="70"
                    x2="100"
                    y2="70"
                    stroke="#22c55e"
                    strokeDasharray="4"
                    opacity="0.3"
                  />

                  {/* RSI path */}
                  <polyline
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="0.2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    points={
                      rsiData.length > 1
                        ? rsiData
                            .map((d, i) => {
                              const x =
                                (i / Math.max(rsiData.length - 1, 1)) * 100;

                              const y = 100 - d.value;

                              return `${x},${y}`;
                            })
                            .join(" ")
                        : ""
                    }
                  />
                </svg>

                {/* labels */}
                <div className="absolute right-2 top-[18%] text-[10px] text-zinc-500 font-[Orbitron]">
                  70
                </div>

                <div className="absolute right-2 top-[58%] text-[10px] text-zinc-500 font-[Orbitron]">
                  30
                </div>
              </div>
            </div>

            {/* เปอร์เซ็นต์ผลตอบแทนย้อนหลัง */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {[
                {
                  label: "24h",
                  val: bitcoin
                    ? `${bitcoin.price_change_percentage_24h.toFixed(2)}%`
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

          {/* --- ฝั่งขวา: เครื่องมือคำนวณและสถิติตลาดเชิงลึก --- */}
          <div className="space-y-6">
            <div className="bg-zinc-950/60 border border-zinc-900 rounded-3xl p-6">
              <h3 className="text-xs font-bold text-zinc-400 tracking-wider uppercase mb-5">
                BTC Market Zone
              </h3>

              <div className="text-center">
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">
                  Current Market Position
                </p>

                <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-full">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />

                  <span className="text-yellow-400 font-semibold">
                    Healthy Pullback
                  </span>
                </div>
              </div>

              {/* visual zone */}
              <div className="mt-6">
                <div className="flex justify-between text-[10px] text-zinc-500 mb-2">
                  <span>Deep Pullback</span>
                  <span>Overheated</span>
                </div>

                <div className="relative h-3 rounded-full bg-zinc-900 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-yellow-500 to-pink-500" />

                  <div className="absolute left-[55%] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-4 border-black" />
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 text-center mt-4 leading-relaxed">
                Based on historical Fibonacci retracement behavior. Educational
                reference only.
              </p>
            </div>

            {/* 2. บล็อกข้อมูลข้อมูลรายละเอียดตลาดเชิงลึก */}
            <div className="bg-zinc-950/60 border border-zinc-900 rounded-3xl p-6 space-y-3.5">
              <h3 className="text-md font-bold text-zinc-400 font-sans tracking-wider uppercase mb-1">
                Market Info
              </h3>
              {[
                {
                  name: "Market Cap",
                  val: bitcoin
                    ? `$${(bitcoin.market_cap / 1e12).toFixed(2)}T`
                    : "--",
                },
                {
                  name: "Market Cap Rank",
                  val: bitcoin ? `#${bitcoin.market_cap_rank}` : "--",
                  highlight: true,
                },
                {
                  name: "Circulating Supply",
                  val: bitcoin
                    ? `${(bitcoin.circulating_supply / 1e6).toFixed(2)}M BTC`
                    : "--",
                },
                {
                  name: "Total Supply",
                  val: bitcoin?.total_supply
                    ? `${(bitcoin.total_supply / 1e6).toFixed(2)}M BTC`
                    : "--",
                },
                {
                  name: "Max Supply",
                  val: bitcoin?.max_supply
                    ? `${(bitcoin.max_supply / 1e6).toFixed(2)}M BTC`
                    : "--",
                },
                { name: "Market Dominance", val: "52.34%" },
                {
                  name: "All Time High",
                  val: bitcoin
                    ? `$${bitcoin.ath.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}`
                    : "--",
                  sub: bitcoin
                    ? new Date(bitcoin.ath_date).toLocaleDateString()
                    : "--",
                },
                {
                  name: "All Time Low",
                  val: bitcoin
                    ? `$${bitcoin.atl.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}`
                    : "--",
                  sub: bitcoin
                    ? new Date(bitcoin.atl_date).toLocaleDateString()
                    : "--",
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className="border-b border-zinc-900/60 pb-2 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between text-md">
                    <span className="text-zinc-500 font-medium">
                      {row.name}
                    </span>
                    <span
                      className={`font-bold font-sans ${row.highlight ? "text-transparent bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text" : "text-zinc-300"}`}
                    >
                      {row.val}
                    </span>
                  </div>
                  {row.sub && (
                    <p className="text-[9px] text-zinc-600 text-right mt-0.5 font-sans">
                      {row.sub}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
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
