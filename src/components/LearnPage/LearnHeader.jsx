import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

import Rome from "../../assets/Rome.png";
export default function Hero() {
  const scrollToSection = () => {
    document.getElementById("section-1")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <img
        className="absolute inset-0 bg-cover bg-center"
        src={Rome}
        alt="RomeBackground"
      />

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
              Every great empire starts with strength, but not all of them keep
              it. This is where our story begins...
            </p>

            <p className="text-pink-500 text-3xl font-['Cinzel']">The money.</p>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-18 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="text-xs tracking-[0.4em] text-zinc-500 mb-3">
          SCROLL TO BEGIN
        </span>

        <div className="absolute top-7 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <button
            onClick={scrollToSection}
            className="group flex flex-col items-center gap-3"
          >
            <div
              className="
      w-14 h-14
      rounded-full
      border border-pink-500/40
      flex items-center justify-center
      group-hover:border-pink-400
      group-hover:shadow-[0_0_30px_rgba(255,0,128,0.4)]
      transition-all
    "
            >
              <ChevronDown size={22} className="text-pink-400 animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
