import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { ArrowDownIcon, ArrowBigDownIcon, ChevronDown } from "lucide-react";
export default function Chapter5() {
  return (
    <section
      id="section-5"
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* Glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[700px]
          h-[700px]
          bg-pink-500/10
          blur-[180px]
        "
      />

      <div className="max-w-7xl mx-auto px-6 py-32">
        {/* Header */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <p className="uppercase tracking-[0.5em] text-pink-500">
            Chapter 1 · Section 5
          </p>

          <h2
            className="
              mt-6
              text-5xl
              md:text-8xl
              font-serif
            "
          >
            The Cost Of
            <br />
            Inflation
          </h2>
        </motion.div>

        {/* Before After */}

        <div className="grid md:grid-cols-2 gap-12">
          {/* Before */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="
              rounded-3xl
              border
              border-green-500/20
              bg-zinc-900/50
              p-10
            "
          >
            <p className="text-green-400 uppercase tracking-widest">Before</p>

            <h3 className="text-4xl mt-6 font-serif">One Coin</h3>

            <div className="mt-12 space-y-6">
              <p className="text-2xl">🍞 Bread</p>
              <p className="text-2xl">🍷 Wine</p>
              <p className="text-2xl">🫒 Olive Oil</p>
            </div>

            <p className="mt-12 text-zinc-400">
              A single silver coin could buy several everyday necessities.
            </p>
          </motion.div>

          {/* After */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="
              rounded-3xl
              border
              border-red-500/20
              bg-zinc-900/50
              p-10
            "
          >
            <p className="text-red-400 uppercase tracking-widest">After</p>

            <div className="text-4xl mt-6 font-serif flex items-center">
              One Coin
              <ArrowBigDownIcon
                size={36}
                className="ml-3 text-red-400 animate-bounce"
              />
            </div>

            <div className="mt-12 space-y-6">
              <p className="text-2xl opacity-50">🍞 Bread</p>
            </div>

            <p className="mt-12 text-zinc-400">
              The coin looked the same, but its purchasing power was gone.
            </p>
          </motion.div>
        </div>

        {/* Divider */}

        <div className="my-32 flex justify-center">
          <div className="w-40 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
        </div>

        {/* Big Reveal */}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <p
            className="
              text-3xl
              md:text-5xl
              text-zinc-300
              font-serif
            "
          >
            Inflation doesn't make things more expensive.
          </p>

          <p
            className="
              mt-12
              text-5xl
              md:text-7xl
              font-serif
              text-yellow-400
            "
          >
            It makes money less valuable.
          </p>
        </motion.div>

        {/* Final Hook */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-40"
        >
          <p
            className="
              text-pink-500
              text-4xl
              md:text-6xl
              font-serif
            "
          >
            And Rome wasn't the last.
          </p>

          <p className="mt-8 text-zinc-500 text-xl">
            This story is still happening today.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
