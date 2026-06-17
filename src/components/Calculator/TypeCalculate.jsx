import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import { calculateInvestment } from "../FirstPage/Utility/calculateInvestment";

import StepIndicator from "../FirstPage/Utility/StepIndicator";

export default function TypeCalculate({
  monthlySaving,
  setMonthlySaving,
  savingPeriod,
  setSavingPeriod,
  btcGrowth,
  setBtcGrowth,
  onOpenDetails,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  // สูตรคำนวณ
  const { principal, fvResult } = calculateInvestment({
    monthlySaving,
    savingPeriod,
    btcGrowth,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNextStep = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      setIsTransitioning(false);
    }, 300);
  };
  //   ปิด scrollbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="lg:justify-end mt-20 flex justify-center items-center w-full">
      <div
        className={`w-full max-w-[460px] min-h-[580px] transition-all duration-140 ease-out ${
          isTransitioning
            ? "opacity-0 -translate-x-7 blur-sm scale-[0.98]"
            : "opacity-100 translate-x-0 blur-0 scale-100"
        }`}
      >
        {/* STEP 1 */}
        {currentStep === 1 && (
          <div className="bg-[#1a1a1c] rounded-3xl mb-10 shadow-2xl border border-white/5 p-6 space-y-5">
            <StepIndicator currentStep={currentStep} />

            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r whitespace-nowrap from-[#ec0065] to-[#f2a900] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                Step 1
              </div>

              <div>
                <h3 className="text-xl font-bold text-zinc-100">
                  Enter Monthly Savings
                </h3>

                <p className="text-sm text-zinc-500">
                  Set how much you can save monthly.
                </p>
              </div>
            </div>

            <div className="bg-[#151414] rounded-2xl border border-white/5 p-5">
              <div className="space-y-2 mb-8">
                <div className="text-lg text-white uppercase">
                  Monthly Saving (USD)
                </div>

                <div className="w-full bg-[#100f0f] border border-white/10 rounded-xl flex items-center h-17 px-4">
                  <span className="text-gray-500 text-2xl">$</span>

                  <input
                    type="number"
                    value={monthlySaving}
                    onChange={(e) =>
                      setMonthlySaving(Number(e.target.value) || 0)
                    }
                    className="[appearance:textfield]
    [&::-webkit-outer-spin-button]:appearance-none
    [&::-webkit-inner-spin-button]:appearance-none w-full text-2xl font-sans ml-4 bg-transparent outline-none text-white"
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

              <button
                onClick={handleNextStep}
                className="w-full cursor-pointer py-3 bg-gradient-to-r from-[#ec0065] to-[#f2a900] rounded-xl"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div className="bg-[#1a1a1c] rounded-3xl shadow-2xl border border-white/5 p-6">
            <StepIndicator currentStep={currentStep} />
            <div className="flex items-center mt-4 mb-4 gap-4">
              <div className="bg-gradient-to-r from-[#ec0065] to-[#f2a900] text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                STEP 2
              </div>
              <div>
                <p className="text-xl font-bold text-zinc-100 mt-4">
                  Choose Saving Period
                </p>
                <h3 className="text-sm text-zinc-500">
                  Time matters — consistency compounds over the long run.
                </h3>
              </div>
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between bg-[#151414] border border-white/10 rounded-xl px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400 items-start justify-start">
                    calendar_month
                  </span>
                  <span className="text-zinc-300 text-lg">
                    {savingPeriod} years
                  </span>
                </div>

                <span>▼</span>
              </button>

              {isDropdownOpen && (
                <ul className="absolute w-full mt-2 bg-[#1a1a1c] border border-white/10 rounded-xl z-50 max-h-60 overflow-auto scrollbar-hide">
                  {[...Array(40)].map((_, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setSavingPeriod(i + 1);
                        setIsDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-[#ec0065]/20 cursor-pointer"
                    >
                      {i + 1} years
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="h-[1px] bg-white/10 w-full mt-6"></div>

            <div className="flex items-center mt-4 gap-3">
              <span className="text-2xl text-amber-400 animate-pulse">✨</span>
              <p className="text-zinc-500">
                The longer timeline, the more inflation may impact your
                purchasing power.
              </p>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setCurrentStep(1)}
                className="w-full border border-white/10 rounded-2xl py-3"
              >
                Back
              </button>

              <button
                onClick={handleNextStep}
                className="w-full py-3 cursor-pointer bg-gradient-to-r from-[#ec0065] to-[#f2a900] rounded-xl"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <div className="bg-[#1a1a1c] rounded-3xl shadow-2xl border border-white/5 p-6">
            <StepIndicator currentStep={currentStep} />
            <div className="flex items-center gap-4 mt-3">
              <div className="bg-gradient-to-r from-[#ec0065] to-[#f2a900] text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                STEP 3
              </div>

              <div>
                <h3 className="text-xl font-bold text-zinc-100">
                  Expected Annual Growth
                </h3>

                <p className="text-sm text-zinc-500">
                  Estimate a realistic annual return to model future outcomes.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <span className="material-symbols-outlined text-xl text-pink-500">
                trending_up
              </span>
              <h3 className="text-xl text-zinc-100">Expected Annual Growth</h3>
            </div>
            <div className="text-right text-xl mb-2">
              {btcGrowth.toFixed(2)}%
            </div>

            <input
              type="range"
              min="1"
              max="120"
              value={btcGrowth}
              onChange={(e) => setBtcGrowth(Number(e.target.value))}
              className="w-full accent-[#ec0065]"
            />

            <div className="h-[1px] bg-white/10 w-full mt-6"></div>

            <div className="flex items-center mt-4 gap-3">
              <span className="text-2xl text-amber-400 animate-pulse">✨</span>
              <p className="text-zinc-500">
                Adjust your expected annual compound return using the slider
                above.
              </p>
            </div>
            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full border border-white/10 rounded-2xl py-3"
              >
                Back
              </button>

              <button
                onClick={handleNextStep}
                className="w-full cursor-pointer py-3 bg-gradient-to-r from-[#ec0065] to-[#f2a900] rounded-xl"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* RESULT */}
        {currentStep === 4 && (
          <div className="bg-[#1a1a1c] rounded-3xl shadow-2xl border border-white/5 p-6">
            <StepIndicator currentStep={currentStep} />

            <h3 className="text-xl text-zinc-100 mt-4">Future Value (Est.)</h3>

            <p className="text-5xl mt-6 animate-pulse text-center font-bold bg-gradient-to-r from-[#f2a900] to-[#ec398f] bg-clip-text text-transparent">
              $
              {fvResult.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>

            <div className="mt-6 space-y-2 text-zinc-400">
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined">savings</span>
                Total Investment: ${principal.toLocaleString()}
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined">
                  calendar_month
                </span>
                Saving Period: {savingPeriod} Years
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined">trending_up</span>
                Growth Rate: {btcGrowth}%
              </p>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setCurrentStep(3)}
                className="w-full border border-white/10 rounded-2xl py-3"
              >
                Back
              </button>

              <button
                onClick={onOpenDetails}
                className="
    w-full
    rounded-2xl
    py-5
    bg-gradient-to-r
    from-orange-500
    to-pink-500
    text-white
    
    hover:scale-[1.02]
    transition
  "
              >
                More Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
