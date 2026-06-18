import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";

import Navbar from "../components/FirstPage/Navbar";
import Header from "../components/FirstPage/Header";

import TypeCalculate from "../components/Calculator/TypeCalculate";
import { calculateInvestment } from "../components/FirstPage/Utility/calculateInvestment";
import { motion } from "framer-motion";

import RiseRome from "../assets/RiseRome.png";

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
              src={RiseRome}
              alt="whatIsInflation"
              className="sticky top-0 mt-12 w-full h-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
