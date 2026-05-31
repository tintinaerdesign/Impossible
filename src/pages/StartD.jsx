import "./App.css";
import { useState, useEffect } from "react";

const App = () => {
  // 1. สร้าง State สำหรับเก็บข้อมูลคริปโต (เริ่มต้นให้เป็นอาเรย์ว่าง [])
  const [coins, setCoins] = useState([]);
  // 2. สร้าง State สำหรับเช็กว่ากำลังโหลดข้อมูลอยู่หรือไม่
  const [loading, setLoading] = useState(true);

  // 3. ฟังก์ชัน async/await สำหรับดึงข้อมูลจาก CoinGecko
  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      // ดึงข้อมูลเหรียญท็อปๆ (ในที่นี้ขอดึง Bitcoin มาโชว์เป็นหลักก่อน)
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
      );
      const data = await response.json();
      // เก็บข้อมูลที่ได้ลงใน State coins
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

  return (
    <div className="min-h-screen bg-[#11070b] text-white font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-900/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] bg-orange-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      <nav className="w-full grid grid-cols-3 items-center px-10 py-3 bg-[#160b10]/40 backdrop-blur-md border-b border-white/5 relative z-10">
        <div className="logo tracking-wide justify-self-start">
          Start <span className="text-white">D</span>
        </div>

        <div className="flex items-center gap-8 text-lg text-gray-400 justify-self-center">
          <a href="#" className="hover:text-white transition-colors">
            Calculator
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors whitespace-nowrap"
          >
            inflation
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors whitespace-nowrap"
          >
            Dream Future Cost
          </a>
          <a
            href="#"
            className="text-white font-meduim border-b-2 border-[#e65c8c] pb-1 whitespace-nowrap"
          >
            Price Widget
          </a>
        </div>

        <div className="justify-self-end"></div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
        <h1 className="text-2xl tracking-[6px] font-semibold text-gray-400 uppercase mb-8">
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
                    className="px-6 py-16 text-center text-gray-500 tracking-wide text-sm"
                  >
                    กำลังดึงข้อมูลจากระบบดาวเทียมตลาดคริปโต...
                  </td>
                </tr>
              ) : (
                coins.map((coin) => (
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
                        coin.price_change_percentage_24h >= 0
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}
                    >
                      {coin.price_change_percentage_24h >= 0 ? "▲ +" : "▼ "}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
