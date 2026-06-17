import { motion, AnimatePresence } from "framer-motion";
import InvestmentGrowthChart from "./Charts/InChart";
import { calculateInvestment } from "../FirstPage/Utility/calculateInvestment";

export default function MoreDetails({
  isOpen,
  onClose,
  data,
  monthlySaving,
  savingPeriod,
  btcGrowth,
}) {
  if (!isOpen) return null;

  const {
    principal,
    fvResult,
    adjustedPurchasingPower,
    totalPowerLossPercent,
  } = data;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              fixed
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-[92%]
              
              max-w-4xl
            
              rounded-[36px]
              border
              border-white/10
              bg-[#121214]
              shadow-[0_0_80px_rgba(236,57,143,0.15)]
              z-[9999]
              overflow-hidden
            "
          >
            {/* Header */}
            <div className="flex mt-16 items-center justify-between p-8 border-b border-white/10">
              <div>
                <h2 className="text-3xl font-bold font-['Orbitron']">
                  Financial Projection
                </h2>

                <p className="text-zinc-400 mt-1">
                  Growth & purchasing power analysis
                </p>
              </div>

              <button
                onClick={onClose}
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-white/5
                  hover:bg-white/10
                  transition
                  text-zinc-400
                "
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-8 space-y-8">
              {/* Fake graph placeholder */}
              <InvestmentGrowthChart
                monthlySaving={monthlySaving}
                savingPeriod={savingPeriod}
                btcGrowth={btcGrowth}
              />

              {/* Stats */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="rounded-3xl p-6 bg-white/5 border border-white/5">
                  <p className="text-zinc-500 text-sm">Future Value</p>

                  <h2 className="text-3xl font-bold text-[#F97316] mt-2">
                    ${Math.round(fvResult)?.toLocaleString(undefined)}
                  </h2>
                </div>
                <div className="rounded-3xl p-6 bg-white/5 border border-white/5">
                  <p className="text-zinc-500 text-sm">Total Invested</p>

                  <h2 className="text-3xl font-bold mt-2">
                    ${Math.round(principal)?.toLocaleString(undefined)}
                  </h2>
                </div>

                <div className="rounded-3xl p-6 bg-white/5 border border-white/5">
                  <p className="text-zinc-500 text-sm">Purchasing Power</p>

                  <h2 className="text-3xl font-bold mt-2 text-[#EC4899]">
                    ${Math.round(adjustedPurchasingPower)?.toLocaleString()}
                  </h2>
                </div>

                <div className="rounded-3xl p-6 bg-white/5 border border-white/5">
                  <p className="text-zinc-500 text-sm">
                    Inflation Loss ({savingPeriod} years)
                  </p>

                  <h2 className="text-3xl font-bold mt-2 text-red-600">
                    -{Math.abs(totalPowerLossPercent).toFixed(1)}%
                  </h2>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
