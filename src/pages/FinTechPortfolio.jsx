import React, { useState, useEffect } from "react";
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

// ลงทะเบียนก้อนปลั๊กอินของ Chart.js สำหรับใช้งานใน React ครบถ้วน
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

export default function BitcoinCalc() {
  // --- 1. State ของระบบการจัดการข้อมูล ---
  const [monthlySaving, setMonthlySaving] = useState(200);
  const [savingPeriod, setSavingPeriod] = useState(4);
  const [btcGrowth, setBtcGrowth] = useState(8);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [liveBtcPrice, setLiveBtcPrice] = useState("0.00");
  const [selectedInflationYear, setSelectedInflationYear] =
    useState("the future");

  // ข้อมูลกราฟจำลองของ Bitcoin
  const btcDataValues = [
    65, 59, 80, 81, 56, 55, 40, 50, 60, 75, 90, 85, 95, 110,
  ];

  // --- 2. Logic การคำนวณทางคณิตศาสตร์ ---
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

  // --- 3. การเชื่อมต่อ Real-time Binance WebSocket ---
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

    return () => ws.close();
  }, []);

  // --- 4. การจัดการแผนภูมิ (Chart configurations + ปรับแต่งสี Dark Mode) ---
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "#a1a1aa" },
      },
      y: {
        type: "linear", // บังคับสเกลไอเทมหลักให้ทำงานชัดเจน
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "#a1a1aa" },
      },
    },
  };

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
        pointRadius: 4,
        tension: 0.3,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );
          gradient.addColorStop(0, "rgba(255, 94, 126, 0.3)");
          gradient.addColorStop(1, "rgba(255, 94, 126, 0.0)");
          return gradient;
        },
      },
    ],
  };

  // กราฟที่ 2: แผนภูมิความเรืองแสงนีออนของบิตคอยน์ (BTC Dashboard Sparkline)
  const btcChartData = {
    labels: btcDataValues.map((_, i) => i),
    datasets: [
      {
        data: btcDataValues,
        borderColor: "#ff1e67",
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );
          gradient.addColorStop(0, "rgba(255, 30, 103, 0.25)");
          gradient.addColorStop(1, "rgba(255, 30, 103, 0.0)");
          return gradient;
        },
      },
    ],
  };

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen font-sans antialiased selection:bg-[#ec0065]/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 grid grid-cols-3 border-b border-white/[0.05] w-full items-center px-10 z-50 bg-[#0f0f0f]/80 backdrop-blur-md h-20">
        <span
          className="logo whitespace-nowrap ml-3"
          style={{
            fontSize: "32px",
            fontWeight: "800",
            letterSpacing: "-1px",
            cursor: "pointer",
            background: "linear-gradient(135deg, #d879a8, #ec0065)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Start D
        </span>
        <div className="flex items-center justify-center gap-8 col-span-2 md:col-span-1 justify-self-end md:justify-self-center">
          <ul className="flex items-center gap-8 text-[15px] font-medium">
            <li>
              <a
                href="#calculator"
                className="hover:text-white text-gray-400 transition-colors"
              >
                Calculator
              </a>
            </li>
            <li>
              <a
                href="#inflation"
                className="hover:text-white text-gray-400 transition-colors"
              >
                Inflation
              </a>
            </li>
            <li>
              <a
                href="#price-widget"
                className="hover:text-white text-gray-400 transition-colors"
              >
                Price Widget
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col px-6 py-32 w-full min-h-[70vh] items-center justify-center text-center">
        <div className="max-w-2xl relative mt-12 z-10 space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-zinc-200">
            See what{" "}
            <span className="bg-gradient-to-r from-[#f2a900] to-[#ec398f] bg-clip-text text-transparent">
              inflation steals
            </span>{" "}
            from your future
          </h1>
          <p className="text-gray-400 text-md md:text-lg max-w-lg mx-auto leading-relaxed font-light">
            Build your purchasing power with clarity. Plan your savings and
            visualize the impact of inflation over a 10-year period.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="scroll-mt-24 pb-16 w-full px-6" id="calculator">
        <div className="max-w-5xl mx-auto w-full p-6 md:p-8 bg-[#121214] rounded-3xl border border-white/5 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">Assets saving calculator</h2>
            <p className="text-gray-400 text-xs">
              Plan your savings visualize your future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="border border-white/5 rounded-2xl p-5 space-y-6 bg-zinc-900/30">
              {/* Monthly Saving input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Monthly Saving (USD)
                </label>
                <div className="w-full bg-[#1a1a1c] border border-white/10 rounded-xl py-3 px-4 flex justify-between items-center">
                  <span className="text-gray-500">$</span>
                  <input
                    type="number"
                    value={monthlySaving}
                    onChange={(e) =>
                      setMonthlySaving(Number(e.target.value) || 0)
                    }
                    className="bg-transparent border-none outline-none focus:ring-0 w-full ml-4 text-white text-right font-mono"
                  />
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

              {/* Saving period Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Saving period
                </label>
                <div className="relative w-full">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    type="button"
                    className="w-full flex items-center justify-between bg-[#1a1a1c] border border-white/10 rounded-xl px-4 py-3 text-zinc-200"
                  >
                    <span>📅 {savingPeriod} years</span>
                    <span className="text-xs text-gray-500">▼</span>
                  </button>

                  {isDropdownOpen && (
                    <ul className="absolute left-0 w-full mt-2 bg-[#1a1a1c] border border-white/10 rounded-xl shadow-2xl z-50 max-h-48 overflow-y-auto">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((year) => (
                        <li
                          key={year}
                          onClick={() => {
                            setSavingPeriod(year);
                            setIsDropdownOpen(false);
                          }}
                          className="px-4 py-2.5 hover:bg-[#ec0065]/20 cursor-pointer transition-colors text-sm"
                        >
                          {year} {year === 1 ? "year" : "years"}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Expected growth input */}
              <div className="space-y-2">
                <label className="block text-sm text-gray-400 font-medium">
                  Expected asset growth (Annually)
                </label>
                <div className="w-full bg-[#1a1a1c] border border-white/10 rounded-xl py-2.5 px-4 flex justify-between items-center">
                  <span className="text-xs text-gray-400">📈 Growth Rate</span>
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
              </div>
            </div>

            {/* Results Display */}
            <div className="bg-[#1a1a1c]/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-pink-500/10 rounded-xl text-pink-500 text-lg">
                    💰
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">
                      Total Investment
                    </p>
                    <span className="text-xl font-bold font-mono text-white">
                      $
                      {principal.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-white/[0.05]"></div>

                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-orange-500/10 rounded-xl text-[#E67E4D] text-lg">
                    📈
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">
                      Future Value (Est.)
                    </p>
                    <span className="text-xl font-bold font-mono text-orange-400">
                      $
                      {fvResult.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/[0.05] pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] text-black bg-gradient-to-r from-[#f2a900] to-pink-500 px-2 py-0.5 rounded font-mono font-extrabold">
                    INFLATION DECAY
                  </div>
                  <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded font-medium">
                    M2 MACRO
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500">
                  Monetary Expansion Depreciation 7.0% (Annually)
                </p>
                <div className="text-center bg-zinc-900/50 rounded-xl py-3 border border-white/5">
                  <p className="text-xs text-gray-400 mb-0.5">
                    Inflation-Adjusted Purchasing Power
                  </p>
                  <span className="text-2xl font-extrabold font-mono tracking-tight bg-gradient-to-r from-[#f2a900] via-[#d879a8] to-[#ff1e67] bg-clip-text text-transparent">
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
      </section>

      {/* Inflation Comparison Section */}
      <section className="py-12 px-6" id="inflation">
        <div className="bg-[#121214] max-w-5xl mx-auto p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  <span className="text-[#ec0065]">Inflation</span> Comparison
                </h2>
                <p className="text-gray-400 mt-1 text-xs">
                  Visualizing purchasing power decay.
                </p>
              </div>

              <div className="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-2xl border border-white/10">
                <div className="text-zinc-400 text-sm">
                  In{" "}
                  <span className="text-pink-400 font-semibold uppercase">
                    {selectedInflationYear}
                  </span>
                </div>
                <p className="text-zinc-500 text-xs mt-0.5">
                  Your money could lose
                </p>
                <h3 className="text-4xl font-black font-mono bg-gradient-to-r from-[#ec0065] to-orange-400 bg-clip-text text-transparent my-2">
                  {Math.abs(totalPowerLossPercent).toFixed(1)}%
                </h3>
                <p className="text-zinc-500 text-xs">
                  of today's purchasing power
                </p>
              </div>
            </div>

            {/* Inflation Chart Area */}
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-sm font-medium text-zinc-400">
                Purchasing Power Over Time (%)
              </h3>
              <div className="h-[220px] w-full bg-zinc-900/20 p-2 rounded-xl border border-white/5">
                <Line data={inflationChartData} options={commonOptions} />
              </div>

              {/* Interactive Table Grid */}
              <div className="bg-zinc-900/40 rounded-xl overflow-x-auto border border-white/5 p-4">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="text-gray-500 border-b border-white/5">
                      <th className="pb-2 font-medium">Timeline</th>
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
                          className="pb-2 cursor-pointer hover:text-white text-zinc-400 transition-colors"
                        >
                          {y}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr>
                      <td className="py-3 text-zinc-500 font-sans">Power</td>
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
      <section className="max-w-5xl mx-auto py-12 px-6" id="price-widget">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
              Track the{" "}
              <span className="bg-gradient-to-r from-[#ff3366] to-[#ff9933] bg-clip-text text-transparent">
                Crypto Market
              </span>{" "}
              with clarity
            </h2>
            <p className="text-gray-400 text-sm font-light leading-relaxed max-w-sm">
              Stay updated with real-time crypto prices directly streamed via
              high-speed Binance WebSockets.
            </p>
          </div>

          {/* Live Crypto Card */}
          <div className="bg-[#121214] w-full max-w-[400px] border border-white/5 rounded-3xl p-6 shadow-2xl justify-self-center md:justify-self-end">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md text-gray-200 font-semibold font-mono">
                BTC/USDT
              </h3>
              <div className="flex items-center gap-1.5 bg-green-500/10 px-2.5 py-0.5 rounded-full border border-green-500/20 text-green-400">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[9px] font-bold uppercase tracking-wider font-mono">
                  Live
                </span>
              </div>
            </div>

            <div className="space-y-1 mb-4">
              <span className="text-3xl font-black font-mono tracking-tight bg-gradient-to-r from-[#ec0065] to-white bg-clip-text text-transparent">
                ${liveBtcPrice}
              </span>
              <div className="text-green-400 text-[11px] font-medium flex items-center gap-1">
                <span>▲ 1,265.34 (1.81%)</span>
                <span className="text-gray-600 font-normal">24h</span>
              </div>
            </div>

            {/* Neon Sparkline Chart */}
            <div className="h-[100px] w-full mb-4 bg-zinc-900/10 rounded-xl p-1">
              <Line
                data={btcChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { display: false },
                    y: { type: "linear", display: false }, // เติมสเกลเส้นตรงซ่อนแกนไว้
                  },
                }}
              />
            </div>

            <div className="flex bg-[#1a1a1c] border border-white/5 rounded-xl p-1 justify-between text-[10px] text-gray-400 font-medium font-mono">
              {["1H", "24H", "7D", "1M", "1Y", "ALL"].map((tf) => (
                <button
                  key={tf}
                  className={`px-2.5 py-1 rounded-lg transition-all ${tf === "24H" ? "bg-[#ff1e67]/15 text-[#ff1e67] font-bold" : "hover:text-white"}`}
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
        <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-[#ec0065]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[5%] left-[5%] w-[400px] h-[400px] bg-[#f2a900]/5 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
}
