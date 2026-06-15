import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HW from "../../assets/HW.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden rounded-b-[48px]">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={HW} alt="hardwareBg" className="w-full h-full object-cover" />

        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* gradient blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#120712]/30 to-black" />
      </div>

      {/* floating glow */}
      <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-[#ec0065]/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-[#f2a900]/10 blur-[120px]" />

      {/* content */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 pt-40 pb-20 min-h-screen flex items-center">
        <div className="max-w-3xl">
          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="
              w-fit
              flex items-center gap-2
              rounded-full
              border border-white/10
              bg-white/5
              backdrop-blur-md
              px-4 py-2
              mb-8
            "
          >
            <span className="material-symbols-outlined text-[#ec398f] text-[18px]">
              shield_lock
            </span>

            <span className="text-sm text-zinc-200">
              Bitcoin Self-Custody Guide
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="
              text-5xl
              md:text-7xl
              font-black
              leading-[1]
              tracking-tight
              font-['Orbitron']
            "
          >
            <span className="text-white">Secure Your Bitcoin</span>

            <br />

            <span className="bg-gradient-to-r from-[#ec0065] to-[#f2a900] bg-clip-text text-transparent">
              Before It's Too Late.
            </span>
          </motion.h1>

          {/* subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="
              mt-8
              text-xl
              md:text-2xl
              text-zinc-300
              max-w-2xl
              leading-relaxed
            "
          >
            Learn how to protect your Bitcoin from exchange risk, hacks, and
            custody failures using trusted hardware wallets.
          </motion.p>

          {/* trust points */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 flex flex-wrap gap-5 text-zinc-300"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ec398f]">
                verified_user
              </span>
              Self-Custody
            </div>

            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ec398f]">
                lock
              </span>
              Hardware Wallets
            </div>

            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ec398f]">
                security
              </span>
              Security Best Practices
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 whitespace-nowrap">
              <Link
                to="/trezor-guide"
                className="w-full
                px-8 py-4 rounded-2xl
                bg-gradient-to-r
                from-[#ec0065]
                to-[#f2a900]
                text-white
                font-semibold
                hover:scale-105
                transition duration-300
              "
              >
                Explore Cold Wallets
              </Link>

              <Link
                to="/ledger-guide"
                className="w-full
                px-8 py-4 rounded-2xl
                border border-white/10
                bg-white/5
                hover:bg-white/10
                transition duration-300
              "
              >
                Compare Wallets
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
