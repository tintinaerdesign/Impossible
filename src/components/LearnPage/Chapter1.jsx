import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BoyCoin from "../../assets/Boycoin.png";

export default function Chapter1() {
  return (
    <section
      id="section-1"
      className="relative font-['Cinzel'] bg-black min-h-screen"
    >
      {/* Top Fade */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent z-10" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="uppercase tracking-[0.5em] font-['Cinzel'] text-pink-500 text-sm">
            Chapter 1 · Section 1
          </p>

          <h2
            className="
            font-['Cinzel']
            text-5xl
            md:text-7xl
            mt-6
            text-white
          "
          >
            A Boy Notices
            <br />
            Something Strange
          </h2>
        </motion.div>
      </div>

      {/* Content */}
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        lg:px-12
        py-20
        grid
        lg:grid-cols-2
        gap-16
        items-center
      "
      >
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <p className="text-zinc-300 text-xl leading-relaxed">
            A boy lived in Rome.
          </p>

          <p className="text-zinc-300 text-xl leading-relaxed">
            Every day, silver coins passed through his hands.
          </p>

          <p className="text-zinc-300 text-xl leading-relaxed">
            They all looked the same.
          </p>

          <p className="text-zinc-300 text-xl leading-relaxed">
            Until one day...
          </p>

          <p className="text-zinc-300 text-xl leading-relaxed">
            He tapped a coin on the table.
          </p>

          <p className="text-yellow-400 text-3xl font-semibold">
            The sound was different.
          </p>

          <div className="pt-10 border-t border-zinc-800">
            <p
              className="
              text-pink-500
              text-3xl
              md:text-4xl
              font-serif
            "
            >
              He had no idea...
            </p>

            <p
              className="
              mt-6
              text-zinc-300
              text-xl
              leading-relaxed
            "
            >
              This tiny change was happening across the entire Roman Empire.
            </p>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <img
            src={BoyCoin}
            alt="Boy"
            className="
              w-full
              rounded-3xl
              object-cover
              shadow-[0_0_80px_rgba(255,120,0,0.15)]
            "
          />

          <div
            className="
            absolute
            inset-0
            rounded-3xl
            bg-gradient-to-t
            from-black/40
            to-transparent
          "
          />
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <div className="pb-20 flex justify-center">
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="text-center"
        >
          <p className="uppercase tracking-[0.4em] text-zinc-500 text-xs">
            Continue Reading
          </p>

          <span className="material-symbols-outlined text-pink-500 mt-4 text-4xl">
            keyboard_arrow_down
          </span>
        </motion.div>
      </div>
    </section>
  );
}
