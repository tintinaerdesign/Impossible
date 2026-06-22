import { useState, useRef } from "react";
import { motion } from "framer-motion";

import TypeCalculate from "../Calculator/TypeCalculate";
import { calculateInvestment } from "../FirstPage/Utility/calculateInvestment";

import heroBg from "../../assets/kid-future.png";

import MoreDetails from "../Calculator/MoreDetails";

export default function FirstPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [monthlySaving, setMonthlySaving] = useState(200);
  const [savingPeriod, setSavingPeriod] = useState(4);
  const [btcGrowth, setBtcGrowth] = useState(8);
  const [openDetails, setOpenDetails] = useState(false);
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

  const investmentData = {
    principal,
    fvResult,
    adjustedPurchasingPower,
    totalPowerLossPercent,
  };

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
    <div
      className="min-h-[120vh] z-20 relative 
      pt-28 lg:pt-0 flex items-center rounded-b-[48px] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="FirstBg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}

      <section className="relative z-20 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 w-full">
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
            transition={{ duration: 0.75 }}
            className="font-['Orbitron'] text-5xl font-bold bg-gradient-to-r from-[#f2a900] to-[#ec398f] bg-clip-text text-transparent"
          >
            Inflation Quietly
            <span className=" text-white"> Steals Your Future.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="text-2xl max-w-xl text-zinc-400 mt-6"
          >
            See how saving in Bitcoin instead of cash can shape your tomorrow.
          </motion.p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {/* Beat Inflation */}
            <motion.div
              initial={{ opacity: 0, y: 120 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.75 }}
              className="flex min-w-[150px] flex-1 gap-3"
            >
              <div className="material-symbols-outlined text-white">shield</div>
              <div className="text-md text-white font-['Orbitron']">
                protect purchasing power
              </div>
            </motion.div>
            {/* Trend */}
            <motion.div
              initial={{ opacity: 0, y: 120 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.75 }}
              className="flex min-w-[150px] flex-1 gap-3"
            >
              <div className="material-symbols-outlined text-gray-300">
                trending_up
              </div>
              <div className="text-md text-white font-['Orbitron']">
                Benefit in long-term growth
              </div>
            </motion.div>
            {/* Bank */}
            <motion.div
              initial={{ opacity: 0, y: 120 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.75 }}
              className="flex min-w-[150px] flex-1 gap-3"
            >
              <div className="material-symbols-outlined text-gray-300">
                wallet
              </div>
              <div className="text-md text-white font-['Orbitron']">
                Be Your Own Bank
              </div>
            </motion.div>

            {/* UnFragile */}
            <motion.div
              initial={{ opacity: 0, y: 120 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.75 }}
              className="flex min-w-[150px] flex-1 gap-3"
            >
              <div className="material-symbols-outlined text-gray-300">
                payments
              </div>
              <div className="text-md text-white font-['Orbitron']">
                Unfragiled
              </div>
            </motion.div>
          </div>
        </div>

        {/* ================= STEP CARD SYSTEM ================= */}
        <div className="flex justify-center items-center w-full">
          {/* Calculator caard*/}
          <TypeCalculate
            monthlySaving={monthlySaving}
            setMonthlySaving={setMonthlySaving}
            savingPeriod={savingPeriod}
            setSavingPeriod={setSavingPeriod}
            btcGrowth={btcGrowth}
            setBtcGrowth={setBtcGrowth}
            onOpenDetails={() => setOpenDetails(true)}
          />
        </div>
      </section>
      <MoreDetails
        isOpen={openDetails}
        onClose={() => setOpenDetails(false)}
        data={investmentData}
        monthlySaving={monthlySaving}
        savingPeriod={savingPeriod}
        btcGrowth={btcGrowth}
      />
    </div>
  );
}
