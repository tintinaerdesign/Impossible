import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  // 1. 🌐 ใช้สเตต bitcoin สำหรับเก็บข้อมูลตัวเดียวโดดๆ ตัวแปร coins ตัดทิ้งไปได้เลย
  const [bitcoin, setBitcoin] = useState(null);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("1D");
  const [usdtoThb, setUsdToThb] = useState(35.0); // เริ่มต้นด้วยค่าโดยประมาณก่อน

  // 🌟 ฟังก์ชันที่ 1: แยกสำหรับดึงอัตราแลกเปลี่ยน USD/THB โดยเฉพาะ

  const fetchUsdThb = async () => {
    try {
      const fxResponse = await fetch(
        "https://api.frankfurter.app/latest?from=USD&to=THB",
      );
      const fxData = await fxResponse.json();
      if (fxData && fxData.rates && fxData.rates.THB) {
        setUsdToThb(fxData.rates.THB);
      }
    } catch (error) {
      console.error("Error fetching USD/THB:", error);
    }
  };

  // 🌟 ฟังก์ชันที่ 2: แยกสำหรับดึงข้อมูลคริปโตโดยเฉพาะ
  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,ripple,solana,cardano&order=market_cap_desc&sparkline=false",
      );
      const data = await response.json();
      setCoins(data);
    } catch (error) {
      console.error("Error fetching Crypto:", error);
    }
  };

  // 🌟 ใน useEffect สั่งทำงานคู่กัน และเปิดปิด Loading พร้อมกัน
  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      // ยิงสองพระหน่อพร้อมกันด้วย Promise.all เพื่อความรวดเร็วดั่งสายฟ้า ⚡
      await Promise.all([fetchUsdThb(), fetchCryptoData()]);
      setLoading(false);
    };

    loadAllData();
  }, []);

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
                    strokeWidth={1.5}
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
            ลงทุนอย่างสม่ำเสมอ สร้างอนาคตที่มั่นคง
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
        <header className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          {/* ข้อมูลราคาฝั่งซ้าย - ปรับเป็นชั้นข้อมูลของ Single Coin API */}
          <div className="flex items-center gap-4 xl:col-span-1">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-xl font-bold text-black shadow-lg shadow-orange-500/30">
              ₿
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold font-[Orbitron]">Bitcoin</h1>
                <span className="text-xs bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded font-[Orbitron]">
                  BTC
                </span>
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                {bitcoin ? (
                  <>
                    <span className="text-3xl md:text-4xl text-pink-500 tracking-tight font-[Orbitron]">
                      ฿
                      {(
                        bitcoin.market_data.current_price.usd * usdToThb
                      ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    <span
                      className={`text-xs font-bold ${bitcoin.market_data.price_change_percentage_24h >= 0 ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {bitcoin.market_data.price_change_percentage_24h >= 0
                        ? "▲"
                        : "▼"}{" "}
                      {bitcoin.market_data.price_change_percentage_24h.toFixed(
                        2,
                      )}
                      % (24h)
                    </span>
                  </>
                ) : (
                  <span className="text-zinc-600 text-sm animate-pulse font-[Orbitron]">
                    CONNECTING API...
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* แถบสถิติ 4 ช่องด้านขวาบน (Market Cap, High, Low, Volume) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-zinc-950/40 p-4 rounded-2xl border border-zinc-900/60 backdrop-blur-sm xl:col-span-2 w-full">
            {bitcoin ? (
              <>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-[Orbitron]">
                    Market Cap
                  </p>
                  <p className="text-xs font-bold mt-1 text-zinc-300 font-[Orbitron]">
                    ฿
                    {(
                      (bitcoin.market_data.market_cap.usd / 1e12) *
                      usdToThb
                    ).toFixed(2)}
                    T
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-[Orbitron]">
                    24h High
                  </p>
                  <p className="text-xs font-bold mt-1 text-zinc-300 font-[Orbitron]">
                    ฿
                    {(
                      bitcoin.market_data.high_24h.usd * usdToThb
                    ).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-[Orbitron]">
                    24h Low
                  </p>
                  <p className="text-xs font-bold mt-1 text-zinc-300 font-[Orbitron]">
                    ฿
                    {(
                      bitcoin.market_data.low_24h.usd * usdToThb
                    ).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-[Orbitron]">
                    24h Volume
                  </p>
                  <p className="text-xs font-bold mt-1 text-zinc-300 font-[Orbitron]">
                    ฿
                    {(
                      (bitcoin.market_data.total_volume.usd / 1e12) *
                      usdToThb
                    ).toFixed(2)}
                    T
                  </p>
                </div>
              </>
            ) : (
              <div className="col-span-4 text-center text-xs text-zinc-600 font-[Orbitron]">
                LOADING STATS...
              </div>
            )}
          </div>
        </header>

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

            {/* พื้นที่แสดงกราฟสีชมพูเรืองแสง */}
            <div className="h-72 w-full flex items-center justify-center relative bg-gradient-to-b from-pink-500/[0.02] to-transparent rounded-xl border border-zinc-900/40">
              <div className="text-zinc-600 text-xs font-[Orbitron] tracking-widest text-center">
                📈 [ Interactive Neon Pink Line Chart Area ]
                <p className="text-[10px] text-zinc-700 mt-1">
                  สีกราฟจะเรืองแสงสีชมพูเฉดเดียวกับในภาพหน้าแคมเปญ
                </p>
              </div>
              {bitcoin && (
                <div className="absolute right-4 top-1/2 text-[10px] text-pink-500 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20 font-[Orbitron]">
                  ฿
                  {(
                    bitcoin.market_data.current_price.usd * usdToThb
                  ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              )}
            </div>

            {/* เปอร์เซ็นต์ผลตอบแทนย้อนหลัง */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {[
                {
                  label: "24h",
                  val: bitcoin
                    ? `${bitcoin.market_data.price_change_percentage_24h.toFixed(2)}%`
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
            {/* 1. วิดเจ็ตตู้แปลงสกุลเงิน */}
            <div className="bg-zinc-950/60 border border-zinc-900 rounded-3xl p-6 space-y-4">
              <h3 className="text-xs font-bold text-zinc-400 font-sans tracking-wider uppercase">
                Bitcoin Converter
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/80">
                  <span className="text-xs font-bold flex items-center gap-2 font-sans">
                    🪙 BTC
                  </span>
                  <input
                    type="text"
                    value="1"
                    readOnly
                    className="bg-transparent text-right w-20 text-xs font-bold font-sans focus:outline-none text-zinc-300"
                  />
                </div>
                <div className="flex items-center justify-between bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/80">
                  <span className="text-xs font-bold flex items-center gap-2 font-sans">
                    🇹🇭 THB
                  </span>
                  <span className="text-xs font-bold font-sans text-pink-400">
                    {bitcoin
                      ? (
                          bitcoin.market_data.current_price.usd * usdToThb
                        ).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })
                      : "0.00"}
                  </span>
                </div>
              </div>
              <p className="text-[9px] text-zinc-600 text-center font-[Orbitron]">
                1 BTC ={" "}
                {bitcoin
                  ? `฿${(bitcoin.market_data.current_price.usd * usdToThb).toLocaleString()}`
                  : "--"}{" "}
                THB
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
                    ? `฿${((bitcoin.market_data.market_cap.usd / 1e12) * usdToThb).toFixed(2)}T`
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
                    ? `${(bitcoin.market_data.circulating_supply / 1e6).toFixed(2)}M BTC`
                    : "--",
                },
                {
                  name: "Total Supply",
                  val: bitcoin
                    ? `${(bitcoin.market_data.total_supply / 1e6).toFixed(2)}M BTC`
                    : "--",
                },
                {
                  name: "Max Supply",
                  val: bitcoin
                    ? `${(bitcoin.market_data.max_supply / 1e6).toFixed(2)}M BTC`
                    : "--",
                },
                { name: "Market Dominance", val: "52.34%" },
                {
                  name: "All Time High",
                  val: bitcoin
                    ? `฿${(bitcoin.market_data.ath.usd * usdToThb).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                    : "--",
                  sub: bitcoin
                    ? new Date(
                        bitcoin.market_data.ath_date.usd,
                      ).toLocaleDateString()
                    : "--",
                },
                {
                  name: "All Time Low",
                  val: bitcoin
                    ? `฿${(bitcoin.market_data.atl.usd * usdToThb).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                    : "--",
                  sub: bitcoin
                    ? new Date(
                        bitcoin.market_data.atl_date.usd,
                      ).toLocaleDateString()
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
        <footer className="bg-zinc-950/30 border border-zinc-900 rounded-3xl p-6">
          <h3 className="text-xs font-bold text-zinc-400 mb-3 font-sans tracking-wider uppercase">
            About Bitcoin
          </h3>
          <p className="text-zinc-400 text-xs leading-relaxed">
            Bitcoin คือสกุลเงินดิจิทัลแรกของโลกที่ถูกสร้างขึ้นในปี 2009
            ทำงานบนระบบบล็อกเชน (Blockchain) แบบกระจายศูนย์ ไม่มีตัวกลาง
            ควบคุมและตรวจสอบความถูกต้องร่วมกันโดยเครือข่ายคอมพิวเตอร์ของผู้ใช้งานทั่วโลก
            มีจำนวนจำกัดอย่างเข้มงวดอยู่ที่ 21 ล้านเหรียญเท่านั้น
          </p>
          <button className="text-xs text-pink-500 hover:text-pink-400 font-bold mt-4 flex items-center gap-1 transition">
            Read More →
          </button>
        </footer>
      </main>
    </div>
  );
}
