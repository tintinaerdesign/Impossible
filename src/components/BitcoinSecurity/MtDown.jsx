import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import sec2Bg from "../../assets/kid-future.png";

export default function MtDown() {
  return (
    <div className="sticky top-0 md:h-screen">
      <div className="absolute inset-0">
        <img
          src={sec2Bg}
          alt="SecondBg"
          className="sticky top-0 w-full h-full object-cover opacity-20"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="
            mt-24
            rounded-[40px]
            border border-white/10
            
            p-10 md:p-16
            text-center
          "
      >
        <h3 className="text-3xl md:text-5xl font-black font-['Orbitron']">
          Take Control of
          <span className="bg-gradient-to-r from-[#ec0065] to-[#f2a900] bg-clip-text text-transparent">
            {" "}
            Your Bitcoin
          </span>
        </h3>

        <p className="mt-6 text-zinc-400 text-lg max-w-2xl mx-auto">
          Don't leave your future savings in someone else's hands. Start
          protecting your Bitcoin today.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/trezor-guide"
            className="
                px-8 py-4 rounded-2xl
                bg-gradient-to-r
                from-[#ec0065]
                to-[#f2a900]
                text-white font-semibold
                hover:scale-105
                transition duration-300
              "
          >
            Get Started with Trezor
          </Link>

          <Link
            to="/ledger-guide"
            className="
                px-8 py-4 rounded-2xl
                border border-white/20
                text-white
                hover:bg-white
                hover:text-black
                transition duration-300
              "
          >
            Explore Ledger
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
