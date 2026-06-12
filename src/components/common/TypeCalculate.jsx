import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { calculateInvestment } from "../../utils/calculateInvestment";

export default function TypeCalculate() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [monthlySaving, setMonthlySaving] = useState(200);
  const [savingPeriod, setSavingPeriod] = useState(4);
  const [btcGrowth, setBtcGrowth] = useState(8);

  const dropdownRef = useRef(null);

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

  return (
    <div className="lg:justify-end mt-20 flex justify-center items-center w-full">
      <div
        className={`w-full max-w-[460px] min-h-[580px] transition-all duration-700 ease-out ${
          isTransitioning
            ? "opacity-0 -translate-x-24 blur-sm scale-[0.98]"
            : "opacity-100 translate-x-0 blur-0 scale-100"
        }`}
      >
        {/* STEP 1 */}
        {currentStep === 1 && (
          <div className="bg-[#1a1a1c] rounded-3xl shadow-2xl border border-white/5 p-6 space-y-5">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-r from-[#ec0065] to-[#f2a900] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
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
              <div className="space-y-2 mb-20 mt-4">
                <label className="text-xs text-white uppercase">
                  Monthly Saving (USD)
                </label>

                <div className="w-full bg-[#100f0f] border border-white/10 rounded-xl flex items-center h-17 px-4">
                  <span className="text-gray-500 text-3xl">$</span>

                  <input
                    type="number"
                    value={monthlySaving}
                    onChange={(e) =>
                      setMonthlySaving(Number(e.target.value) || 0)
                    }
                    className="w-full text-3xl font-sans ml-4 bg-transparent outline-none text-white"
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
                className="w-full mt-10 py-3 bg-gradient-to-r from-[#ec0065] to-[#f2a900] rounded-2xl"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div className="bg-[#1a1a1c] rounded-3xl shadow-2xl border border-white/5 p-6">
            <h3 className="text-xl font-bold text-zinc-100 mb-4">
              Choose Saving Period
            </h3>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex justify-between bg-[#151414] border border-white/10 rounded-xl px-4 py-3"
              >
                <span>{savingPeriod} years</span>
                <span>▼</span>
              </button>

              {isDropdownOpen && (
                <ul className="absolute w-full mt-2 bg-[#1a1a1c] border border-white/10 rounded-xl z-50 max-h-60 overflow-auto">
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

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setCurrentStep(1)}
                className="w-full border border-white/10 rounded-2xl py-3"
              >
                Back
              </button>

              <button
                onClick={handleNextStep}
                className="w-full py-3 bg-gradient-to-r from-[#ec0065] to-[#f2a900] rounded-2xl"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <div className="bg-[#1a1a1c] rounded-3xl shadow-2xl border border-white/5 p-6">
            <h3 className="text-xl text-zinc-100 mb-4">
              Expected Annual Growth
            </h3>

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

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full border border-white/10 rounded-2xl py-3"
              >
                Back
              </button>

              <button
                onClick={handleNextStep}
                className="w-full py-3 bg-gradient-to-r from-[#ec0065] to-[#f2a900] rounded-2xl"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* RESULT */}
        {currentStep === 4 && (
          <div className="bg-[#1a1a1c] rounded-3xl shadow-2xl border border-white/5 p-6">
            <h3 className="text-xl text-zinc-100">Future Value (Est.)</h3>

            <p className="text-5xl mt-6 text-center font-bold bg-gradient-to-r from-[#f2a900] to-[#ec398f] bg-clip-text text-transparent">
              $
              {fvResult.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>

            <div className="mt-6 space-y-2 text-zinc-400">
              <p>Total Investment: ${principal.toLocaleString()}</p>
              <p>Saving Period: {savingPeriod} Years</p>
              <p>Growth Rate: {btcGrowth}%</p>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setCurrentStep(3)}
                className="w-full border border-white/10 rounded-2xl py-3"
              >
                Back
              </button>

              <Link
                to="/Calculator"
                state={{
                  monthlySaving,
                  savingPeriod,
                  btcGrowth,
                }}
                className="w-full flex justify-center items-center py-3 rounded-2xl bg-gradient-to-r from-[#4a183e] via-[#5f1c50] to-[#7a245d]"
              >
                More Details
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
