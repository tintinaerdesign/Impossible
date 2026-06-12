import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";
import Navbar from "../components/common/Navbar";
import TypeCalculate from "../components/common/TypeCalculate";
import { calculateInvestment } from "../utils/calculateInvestment";
import { motion } from "framer-motion";
import heroBg from "../assets/kid-future.png";

export default function FirstPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [monthlySaving, setMonthlySaving] = useState(200);
  const [savingPeriod, setSavingPeriod] = useState(4);
  const [btcGrowth, setBtcGrowth] = useState(8);
  const { principal, fvResult } = calculateInvestment({
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
    <div className="min-h-screen relative bg-gradient-to-br from-black to-gray-900 text-white font-sans">
      <Navbar />

      {/* WRAPPER ที่สร้าง scroll space */}
      <div className="relative h-[200vh]">
        <section className="min-h-screen z-20 relative pt-28 lg:pt-0 flex items-center">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroBg}
              alt="Saving"
              className="w-full h-28/36 object-cover"
            />
          </div>

          {/* Content */}

          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 w-full">
            <div className="max-w-2xl flex flex-col z-20 md:pt-28">
              {/* O pulse */}
              <div className="z-20 w-fit flex items-center mb-6 space-x-2 bg-[#1a1a1c] border border-white/10 rounded-xl p-1.5 whitespace-nowrap">
                <div className="h-[8px] w-[8px] bg-pink-500 rounded-full animate-pulse"></div>
                <span className="text-gray-100 text-sm">
                  Bitcoin Saving Calculator
                </span>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 120 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-['Orbitron'] text-6xl font-bold bg-gradient-to-r from-[#f2a900] to-[#ec398f] bg-clip-text text-transparent"
              >
                Inflation Quietly
                <span className=" text-white"> Steals Your Future.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 120 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-2xl max-w-xl text-zinc-300 mt-6"
              >
                See how saving in Bitcoin instead of cash can shape your
                tomoorrow.
              </motion.p>
              <div className="mt-4 grid grid-cols-3">
                {/* Beat Inflation */}
                <motion.div
                  initial={{ opacity: 0, y: 120 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <div className="material-symbols-outlined text-white">
                    shield
                  </div>
                  <div className="text-md text-gray-400 font-['Orbitron']">
                    protect purchasing power
                  </div>
                </motion.div>
                {/* Trend */}
                <motion.div
                  initial={{ opacity: 0, y: 120 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <div className="material-symbols-outlined text-white">
                    trending_up
                  </div>
                  <div className="text-md text-gray-400 font-['Orbitron']">
                    Benefit in long-term growth
                  </div>
                </motion.div>
                {/* Build Wealth */}
                <motion.div
                  initial={{ opacity: 0, y: 120 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <div className="material-symbols-outlined text-white">
                    currency_bitcoin
                  </div>
                  <div className="text-md text-gray-400 font-['Orbitron']">
                    Engineered Scarcity
                  </div>
                </motion.div>

                <div></div>
              </div>
            </div>

            {/* ================= STEP CARD SYSTEM ================= */}
            <div className="items-center md:mt-20 sm:mb-20 flex justify-center w-full">
              {/* Calculator caard*/}
              <TypeCalculate />
            </div>

            {/* === ฝั่งซ้ายเดิม: เนื้อหาข้อความพาดหัว (กินพื้นที่ 5 ช่องหลังบนจอใหญ่) === */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <h1 className="font-['Orbitron'] text-4xl md:text-5xl font-black leading-[1.2] tracking-tight text-left">
                Navigate Inflation & Purchasing Power with Clarity
              </h1>

              <p className="text-zinc-400 text-lg leading-relaxed font-light">
                Explore real-time market data, inflation insights, and financial
                tools to better understand digital assets and macroeconomic
                trends.
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
        </section>
      </div>
    </div>
  );
}
