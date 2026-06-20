import { motion } from "framer-motion";
import Mint from "../../assets/Mint.png";
import { Link } from "react-router-dom";

export default function Chapter3() {
  return (
    <section
      id="section-3"
      className="relative font-['Cinzel'] min-h-screen bg-black overflow-hidden"
    >
      {/* Glow */}
      <div
        className="
          absolute
          right-0
          top-0
          w-[600px]
          h-[600px]
          bg-yellow-500/10
          blur-[180px]
        "
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <p className="uppercase tracking-[0.5em] text-pink-500 text-sm">
            Chapter 1 · Section 3
          </p>

          <h2
            className="
              mt-6
              text-5xl
              md:text-7xl
              font-serif
              text-white
            "
          >
            The Secret
            <br />
            Of The Mint
          </h2>
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <p className="text-zinc-300 text-xl leading-relaxed">
              Far from the busy markets...
            </p>

            <p className="text-zinc-300 text-xl leading-relaxed">
              Inside Rome's imperial mint, workers were striking new coins.
            </p>

            <p className="text-zinc-300 text-xl leading-relaxed">
              Thousands every day.
            </p>

            <p className="text-zinc-300 text-xl leading-relaxed">
              Millions every year.
            </p>

            <div className="border-l-4 border-yellow-500 pl-6">
              <p className="text-yellow-400 text-3xl font-semibold">
                But something had changed.
              </p>
            </div>

            <p className="text-zinc-300 text-xl leading-relaxed">
              The new coins contained less silver than before.
            </p>

            <p className="text-zinc-300 text-xl leading-relaxed">
              To most people, they looked identical.
            </p>

            <p className="text-zinc-300 text-xl leading-relaxed">Same size.</p>

            <p className="text-zinc-300 text-xl leading-relaxed">
              Same emperor.
            </p>

            <p className="text-zinc-300 text-xl leading-relaxed">
              Same value stamped on the front.
            </p>

            <div className="pt-8 border-t border-zinc-800">
              <p className="text-pink-500 text-3xl font-serif">
                But the silver was disappearing.
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <img
              src={Mint}
              alt=""
              className="
                rounded-3xl
                shadow-[0_0_100px_rgba(255,200,0,0.15)]
              "
            />

            <div
              className="
                absolute
                inset-0
                rounded-3xl
                bg-gradient-to-t
                from-black/30
                to-transparent
              "
            />
          </motion.div>
        </div>

        {/* Reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center max-w-5xl mx-auto mt-32"
        >
          <p
            className="
              text-4xl
              md:text-5xl
              text-white
              font-serif
            "
          >
            More Coins.
          </p>

          <p
            className="
              mt-8
              text-5xl
              md:text-7xl
              text-yellow-400
              font-serif
            "
          >
            Less Silver.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
