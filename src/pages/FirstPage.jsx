import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";

import Navbar from "../components/FirstPage/Navbar";
import Header from "../components/FirstPage/Header";

import TypeCalculate from "../components/Calculator/TypeCalculate";
import { calculateInvestment } from "../components/FirstPage/Utility/calculateInvestment";
import { motion } from "framer-motion";
import heroBg from "../assets/kid-future.png";
import sec2Bg from "../assets/algor-dot.png";

export default function FirstPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [monthlySaving, setMonthlySaving] = useState(200);
  const [savingPeriod, setSavingPeriod] = useState(4);
  const [btcGrowth, setBtcGrowth] = useState(8);
  const {
    principal,
    fvResult,
    adjustedPurchasingPower,
    totalPowerLossPercent,
  } = calculateInvestment({
    monthlySaving,
    savingPeriod,
    btcGrowth,
  });

  const dropdownRef = useRef(null);

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

  return (
    <div className="min-h-[screen] relative bg-gradient-to-brbg-[#0b0b0d] bg-linear-to-br from-black to-[#441141] text-white font-sans">
      <Navbar />

      {/* WRAPPER ที่สร้าง scroll space */}

      <Header />

      {/* SECTION 2 */}
      <section className="relative z-10 -mt-150 h-[280vh] md:-mt-180 md:h-[190vh]">
        {/* sticky */}
        <div className="sticky top-0 md:h-screen">
          <div className="absolute inset-0">
            <img
              src={sec2Bg}
              alt="SecondBg"
              className="sticky top-0 w-full h-full object-cover opacity-20"
            />
          </div>
          {/* div ครอบ ซ้ายขวา */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto px-8 min-h-screen items-center">
            {/* Inflation */}
            <div className="bg-[#121214] mt-40 md:mt-0 relative mx-auto p-5 md:p-8 rounded-3xl border border-white/5 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="md:col-span-12 flex flex-col space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                      <span className="text-[#ec0065]">Inflation</span>{" "}
                      Comparison
                    </h2>
                    <p className="text-gray-400 mt-1 text-lg">
                      Visualizing purchasing power decay.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-white/5 to-transparent p-5 md:p-6 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-pink-500/30 transition-all duration-300">
                    <div className="text-zinc-400 text-2xl">
                      In {""}
                      <span className="text-zinc-400 text-2xl">
                        {savingPeriod} {savingPeriod === 1 ? "Year" : "Years"}
                      </span>
                    </div>
                    <p className="text-zinc-500 text-lg mt-0.5">
                      Your money could lose
                    </p>
                    <h3 className="text-3xl md:text-4xl font-black font-mono bg-gradient-to-r from-[#ec0065] to-orange-400 bg-clip-text text-transparent my-2">
                      {Math.abs(totalPowerLossPercent).toFixed(1)}%
                    </h3>
                    <p className="text-zinc-500 text-lg">
                      of today's purchasing power
                    </p>
                  </div>

                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-[#ec0065]/20 flex items-center justify-center border border-[#ec0065]/30 text-[#ec0065]">
                      <span className="material-symbols-outlined text-sm">
                        trending_down
                      </span>
                    </div>
                    <div>
                      <div className="text-[12px] text-zinc-500 uppercase">
                        Monetary Expansion Depreciation (Annually)
                        <h1 className="text-[11px] w-fit bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded font-medium whitespace-nowrap">
                          M2 MACRO
                        </h1>
                      </div>
                      <p className="text-lg font-bold text-orange-400 font-mono">
                        7.00%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* content */}
            <div className="relative">
              <div className="max-w-7xl mx-auto px-8 min-h-screen flex items-center">
                <div className="max-w-2xl space-y-6">
                  <h1 className="font-['Orbitron'] text-4xl md:text-5xl font-black leading-[1.2] tracking-tight">
                    Navigate Inflation & Purchasing Power with Clarity
                  </h1>

                  <p className="text-zinc-300 text-lg leading-relaxed">
                    Explore real-time market data, inflation insights, and
                    financial tools to better understand digital assets and
                    macroeconomic trends.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                      to=""
                      className="px-8 py-4 rounded-2xl border border-white/20 text-center text-lg bg-transparent text-white hover:text-black hover:bg-white transition duration-300"
                    >
                      Full-details Calculator
                    </Link>

                    <Link
                      to=""
                      className="px-8 py-4 rounded-2xl text-center text-white text-lg bg-gradient-to-r from-orange-400 to-pink-500 hover:scale-105 transition duration-300 shadow-md"
                    >
                      Explore Coin Market
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
