export default function StepIndicator({ currentStep }) {
  const steps = ["Monthly Saving", "Time Horizon", "Growth Rate", "Results"];

  return (
    <div className="relative md:w-full border-b border-white/5 pb-6">
      {/* line */}
      <div className="absolute top-5 left-10 right-10 h-[1px] bg-white/10" />
      <div className="relative flex justify-between items-center">
        {steps.map((label, index) => {
          const step = index + 1;

          const isActive = currentStep === step;
          const isCompleted = currentStep > step;

          return (
            <div key={step} className="flex flex-col items-center z-10">
              {/* circle */}
              <div
                className={`
                  w-10 h-10 rounded-full
                  flex items-center justify-center
                  text-xl font-semibold
                  transition-all duration-300
                  border

                  ${
                    isActive
                      ? "bg-[#ec0065] border-transparent text-white shadow-[0_0_20px_rgba(236,0,101,0.25)] scale-110"
                      : isCompleted
                        ? "bg-[#ec0065] border-[#ec0065] text-white"
                        : "bg-[#0f1118] border-white/10 text-zinc-500"
                  }
                `}
              >
                {step}
              </div>

              {/* label */}
              <span
                className={`
    hidden md:block
    mt-2 text-[11px]
    whitespace-nowrap
    transition-all duration-300
    ${isActive ? "text-pink-400" : "text-zinc-500"}
  `}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
