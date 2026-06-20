import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

import Navbar from "../components/common/Navbar";
import Header from "../components/FirstPage/Header";

import TypeCalculate from "../components/Calculator/TypeCalculate";
import { calculateInvestment } from "../components/FirstPage/Utility/calculateInvestment";
import { motion } from "framer-motion";

import Footer from "../components/common/Footer";

import RomeRoad from "../assets/RomeRoad.png";

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
      <section className="relative z-10 -mt-150 h-[280vh] md:-mt-190 md:h-[200vh]">
        {/* sticky */}
        <div className="sticky top-0 md:h-screen">
          <div className="absolute inset-0">
            <img
              src={RomeRoad}
              alt="whatIsInflation"
              className="sticky top-0 w-full h-full object-cover"
            />
          </div>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 min-h-screen flex items-center">
            <div className="max-w-2xl">
              {/* Chapter */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 mb-6"
              ></motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="
          font-['Cinzel']
          leading-[0.9]
          text-white
          text-6xl
          md:text-8xl
          mb-8
        "
              >
                The Rise
                <br />
                <span className="text-yellow-400">of Rome</span>
              </motion.h1>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-4 mb-10"
              >
                <p className="max-w-md text-gray-400 font-['Cinzel'] text-xl md:text-2xl">
                  Every great empire starts with strength, but not all of them
                  keep it. This is where our story begins...
                </p>

                <p className="text-pink-500 text-3xl font-['Cinzel']">
                  The money.
                </p>
              </motion.div>
              {/* CTA */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/LearnPage"
                  className="
      inline-flex
      items-center
      gap-3
      px-8 py-5
      rounded-2xl
      text-white
      font-['Cinzel']
      text-lg
      bg-gradient-to-r
      from-pink-600
      via-pink-500
      to-orange-400
      shadow-[0_0_40px_rgba(236,0,101,0.35)]
    "
                >
                  Start Learning
                  <ArrowRight size={22} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
