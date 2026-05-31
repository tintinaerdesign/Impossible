import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// ลงทะเบียนก้อนปลั๊กอินของ Chart.js สำหรับใช้งานใน React
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export default function StartD() {
  // --- 1. State ของระบบการจัดการข้อมูล (React Reactive States) ---
  const [monthlySaving, setMonthlySaving] = useState(200);
  const [savingPeriod, setSavingPeriod] = useState(4);
  const [btcGrowth, setBtcGrowth] = useState(8);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [liveBtcPrice, setLiveBtcPrice] = useState("0.00");
  const [selectedInflationYear, setSelectedInflationYear] =
    useState("the future");

  // แสตนด์บายข้อมูลกราฟจำลองของ Bitcoin
  const btcDataValues = [
    65, 59, 80, 81, 56, 55, 40, 50, 60, 75, 90, 85, 95, 110,
  ];

  // --- 2. Logic การคำนวณทางคณิตศาสตร์สไตล์ React (Auto-recalculate ทุกครั้งที่ขยับ Slider) ---
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

  // --- 3. การเชื่อมต่อ Real-time Binance WebSocket ผ่าน useEffect ---
  useEffect(() => {
    const symbol = "btcusdt";
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol}@ticker`,
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const price = parseFloat(data.c).toFixed(2);
      setLiveBtcPrice(
        parseFloat(price).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      );
    };

    return () => ws.close(); // สั่งตัดการเชื่อมต่อเมื่อเปลี่ยนหน้าเพื่อประหยัดแรมเครื่อง
  }, []);

  // --- 4. การจัดการแผนภูมิ (Chart configurations) ---
  // กราฟที่ 1: แผนภูมิการสูญเสียกำลังซื้อ (Inflation Chart)
  const inflationChartData = {
    labels: ["Now", "2 Years", "4 Years", "6 Years", "8 Years", "10 Years"],
    datasets: [
      {
        label: "Purchasing Power",
        data: [100, 87.3, 76.3, 66.6, 58.2, 50.8],
        fill: true,
        borderColor: "#FF5E7E",
        borderWidth: 3,
        pointBackgroundColor: "#FF5E7E",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        tension: 0.3,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(255, 94, 126, 0.4)");
          gradient.addColorStop(1, "rgba(255, 94, 126, 0.0)");
          return gradient;
        },
      },
    ],
  };

  // กราฟที่ 2: แผนภูมิความเรืองแสงนีออนของบิตคอยน์ (BTC Dashboard Chart)
  const btcChartData = {
    labels: btcDataValues.map((_, i) => i),
    datasets: [
      {
        data: btcDataValues,
        borderColor: "#ff1e67",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 150);
          gradient.addColorStop(0, "rgba(255, 30, 103, 0.3)");
          gradient.addColorStop(1, "rgba(255, 30, 103, 0)");
          return gradient;
        },
      },
    ],
  };

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen font-sans antialiased selection:bg-[#ec0065]/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 grid grid-cols-3 border-b border-white/[0.05] w-full items-center px-10 z-50 bg-[#ec0065]/5 backdrop-blur-sm h-20">
        <span
          className="logo whitespace-nowrap ml-3"
          style={{
            fontSize: "40px",
            fontWeight: "800",
            letterSpacing: "-2px",
            cursor: "pointer",
            background: "linear-gradient(135deg, #d879a8, #ec0065)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Start D
        </span>
        <div className="flex items-center justify-center gap-8">
          <ul className="flex items-center gap-12 text-[18px]">
            <li>
              <a
                href="#calculator"
                className="hover:text-white whitespace-nowrap text-gray-400 transition-colors"
              >
                Calculator
              </a>
            </li>
            <li>
              <a
                href="#inflation"
                className="hover:text-white whitespace-nowrap text-gray-400 transition-colors"
              >
                Inflation
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white whitespace-nowrap text-gray-400 transition-colors"
              >
                Dream Future Cost
              </a>
            </li>
            <li>
              <a
                href="#price-widget"
                className="hover:text-white whitespace-nowrap text-gray-400 transition-colors"
              >
                Price Widget
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex px-20 py-20 w-full min-h-screen items-center justify-center gap-12">
        <div className="max-w-xl relative mt-20 shrink-0 z-10">
          <h1 className="flex items-center justify-center text-6xl font-bold leading-tight">
            See what
          </h1>
          <h2 className="text-7xl font-bold leading-tight text-center w-full bg-gradient-to-r from-[#f2a900] to-[#ec398f] bg-clip-text text-transparent">
            inflation steals
          </h2>
          <h3 className="flex justify-center text-6xl font-bold leading-tight">
            from your future
          </h3>
          <p className="flex items-center text-center text-gray-400 text-lg mt-4 mb-10 leading-relaxed">
            Build your purchasing power with clarity. Plan your savings and see
            the power of compounding overtime. Calculate your future purchasing
            power in a world of inflation. Simple today, Stronger tomorrow.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section
        className="scroll-mt-24 min-h-screen w-full px-6"
        id="calculator"
      >
        <div className="max-w-5xl mx-auto w-full p-8 bg-[#121214] rounded-3xl border border-white/5 shadow-2xl shadow-[0_0_80px_rgba(255,0,128,0.08)]">
          <div className="flex justify-between items-start mb-8 w-full">
            <div>
              <h2 className="text-2xl font-medium">Assets saving calculator</h2>
              <p className="text-gray-400 text-sm">
                Plan your savings visualize your future.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 md:flex-row w-full">
            <div className="flex flex-col gap-8 w-full md:max-w-[420px]">
              <div className="border border-white/5 rounded-xl p-4 space-y-6">
                {/* Monthly Saving input */}
                <div className="space-y-1.5">
                  <label className="block text-md font-medium text-gray-400">
                    Monthly Saving(USD)
                  </label>
                  <div className="w-full bg-[#1a1a1c] border border-white/10 rounded-xl py-3 px-4 flex justify-between items-center hover:border-white/20 transition-all">
                    <span className="text-gray-400 opacity-50">$</span>
                    <input
                      type="number"
                      value={monthlySaving}
                      onChange={(e) =>
                        setMonthlySaving(Number(e.target.value) || 0)
                      }
                      className="bg-transparent border-none outline-none focus:ring-0 w-full ml-4 text-white text-right"
                    />
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="10000"
                    value={monthlySaving}
                    onChange={(e) => setMonthlySaving(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-700 rounded-lg cursor-pointer accent-[#9d174d]"
                  />
                  <div className="flex justify-between text-gray-400 text-xs">
                    <span>10$</span>
                    <span>10,000$</span>
                  </div>
                </div>

                {/* Saving period Custom Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-md font-medium text-gray-400">
                    Saving period
                  </label>
                  <div className="relative w-full">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      type="button"
                      className="w-full flex items-center justify-between bg-[#1a1a1c] border border-white/10 rounded-xl px-4 py-3 text-white cursor-pointer hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500">📅</span>
                        <span>{savingPeriod} years</span>
                      </div>
                      <span className="text-gray-500">▼</span>
                    </button>

                    {isDropdownOpen && (
                      <ul className="absolute left-0 w-full mt-2 bg-[#1a1a1c] border border-white/10 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((year) => (
                          <li
                            key={year}
                            onClick={() => {
                              setSavingPeriod(year);
                              setIsDropdownOpen(false);
                            }}
                            className="px-4 pl-10 py-3 hover:bg-[#E67E4D]/20 cursor-pointer transition-colors"
                          >
                            {year} {year === 1 ? "year" : "years"}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Expected growth asset input */}
                <div className="space-y-1.5 pt-4">
                  <label className="block text-md text-gray-400 font-medium">
                    Expected asset growth(Annually)
                  </label>
                  <div className="w-full bg-[#1a1a1c] border border-white/10 rounded-xl py-3 px-4 flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      📈 Growth Rate
                    </span>
                    <span className="text-white font-semibold">
                      {btcGrowth.toFixed(2)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="120"
                    value={btcGrowth}
                    onChange={(e) => setBtcGrowth(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-700 rounded-lg cursor-pointer accent-[#9d174d]"
                  />
                  <div className="flex justify-between text-gray-400 text-xs">
                    <span>1%</span>
                    <span>120%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="relative w-full">
              <div className="bg-[#1a1a1c]/50 border border-white/5 rounded-2xl p-8 space-y-6 h-full">
                <h3 className="text-md text-gray-400">Results</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-pink-500/10 rounded-lg text-pink-500">
                      💰
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Total Investment</p>
                      <span className="text-2xl font-bold text-white">
                        $
                        {principal.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-white/10"></div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-500/10 rounded-lg text-[#E67E4D]">
                      📈
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">
                        Future Value (Est.)
                      </p>
                      <span className="text-2xl font-bold text-orange-300">
                        $
                        {fvResult.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-white/5"></div>

                  {/* Inflation Area */}
                  <div className="flex items-start flex-col space-y-2">
                    <div className="text-sm text-black bg-gradient-to-r from-[#f2a900] to-pink-500 px-2 py-0.5 rounded font-mono font-bold">
                      INFLATION DECAY
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      Monetary[M2] Expansion Depreciation 7.0% (Annually){" "}
                      <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded ml-1">
                        MACRO
                      </span>
                    </div>

                    <div className="flex flex-col items-center w-full pt-4">
                      <p className="text-sm text-gray-400 mb-1">
                        Inflation-Adjusted Purchasing Power
                      </p>
                      <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#f2a900] via-[#d879a8] to-[#ff1e67] bg-clip-text text-transparent">
                        $
                        {adjustedPurchasingPower.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inflation Comparison Section */}
      <section className="scroll-mt-24 py-16 px-6" id="inflation">
        <div className="big-result-card bg-[#0f0f11] max-w-7xl mx-auto p-8 rounded-[40px] border border-white/5 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-8">
              <div>
                <h2 className="text-3xl font-bold italic tracking-tight">
                  <span className="text-[#ec0065]">Inflation</span> Comparison
                </h2>
                <p className="text-gray-500 mt-2 text-md">
                  See how inflation reduces your purchasing power over time.
                </p>
                <div className="w-20 h-1 bg-gradient-to-r from-[#ec0065] to-orange-500 mt-4 rounded-full"></div>
              </div>

              <div className="bg-gradient-to-br from-white/5 to-transparent p-8 rounded-3xl border border-white/10 relative overflow-hidden">
                <div className="text-gray-400 text-lg">
                  In{" "}
                  <span className="text-pink-400 font-semibold">
                    {selectedInflationYear}
                  </span>
                </div>
                <p className="text-gray-500 mb-4">Your money could lose</p>
                <h3 className="text-6xl font-extrabold bg-gradient-to-r from-[#ec0065] to-orange-400 bg-clip-text text-transparent">
                  {totalPowerLossPercent.toFixed(1)}%
                </h3>
                <p className="text-gray-500 mt-4">
                  of today's purchasing power
                </p>
              </div>
            </div>

            {/* Inflation Chart Area */}
            <div className="lg:col-span-8 space-y-6">
              <h3 className="text-xl font-medium">
                Purchasing Power Over Time
              </h3>
              <div className="h-[260px] w-full">
                <Line
                  data={inflationChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                  }}
                />
              </div>

              {/* Interactive Table Grid */}
              <div className="bg-white/5 rounded-3xl overflow-hidden border border-white/5 p-6">
                <table className="w-full text-left text-sm">
                  <thead class="text-gray-500">
                    <tr>
                      <th className="pb-4">Year</th>
                      {[
                        "Now",
                        "2 Years",
                        "4 Years",
                        "6 Years",
                        "8 Years",
                        "10 Years",
                      ].map((y) => (
                        <th
                          key={y}
                          onClick={() =>
                            setSelectedInflationYear(
                              y === "Now" ? "0 years" : y.toLowerCase(),
                            )
                          }
                          className="pb-4 cursor-pointer hover:text-white text-gray-400 transition-colors"
                        >
                          {y}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-gray-300 border-t border-white/5">
                    <tr>
                      <td className="py-4">Purchasing Power</td>
                      <td>100%</td>
                      <td>87.3%</td>
                      <td>76.3%</td>
                      <td>66.6%</td>
                      <td>58.2%</td>
                      <td className="text-[#ec0065] font-bold">50.8%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Crypto Price Widget Section */}
      <section
        className="scroll-mt-24 max-w-7xl mx-auto py-12 px-6"
        id="price-widget"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_auto] gap-12 lg:gap-20 items-center">
          <div className="space-y-8 w-full max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Track the <br />
              <span className="bg-gradient-to-r from-[#ff3366] via-[#f75443] to-[#ff9933] bg-clip-text text-transparent">
                Crypto Market
              </span>{" "}
              <br /> with clarity
            </h1>
            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md">
              Stay updated with real-time crypto prices and market trends.
              Discover what moves the market today.
            </p>
          </div>

          {/* Live Crypto Card */}
          <div className="bg-[#0f0f11] w-full max-w-[440px] border border-white/5 rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl text-gray-200 font-semibold">BTCUSD</h3>
              <div className="flex items-center gap-1.5 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 text-green-500">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Live
                </span>
              </div>
            </div>

            <div className="space-y-1 mb-4">
              <span className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#ec0065] to-white bg-clip-text text-transparent">
                ${liveBtcPrice}
              </span>
              <div className="text-green-400 text-xs font-medium flex items-center">
                ▲ 1,265.34 (1.81%){" "}
                <span className="text-gray-500 ml-1">24h</span>
              </div>
            </div>

            {/* Neon Sparkline Chart */}
            <div className="h-[140px] w-full mb-4">
              <Line
                data={btcChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { x: { display: false }, y: { display: false } },
                }}
              />
            </div>

            <div className="flex bg-[#1a1a1c] border border-white/5 rounded-2xl p-1 justify-between text-xs text-gray-400 font-medium">
              {["1H", "24H", "7D", "1M", "1Y", "ALL"].map((tf) => (
                <button
                  key={tf}
                  className={`px-3 py-1.5 rounded-xl transition-all ${tf === "24H" ? "bg-[#ff1e67]/15 text-[#ff1e67] font-bold" : "hover:text-white"}`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Background Blobs Decorator */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-[#ec0065]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[5%] left-[5%] w-[500px] h-[500px] bg-[#f2a900]/5 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
}
