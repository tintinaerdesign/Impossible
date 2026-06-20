import { motion } from "framer-motion";
import Market from "../../assets/Market.png";

export default function Chapter2() {
  return (
    <section
      id="section-2"
      className="relative min-h-screen font-['Cinzel'] bg-black overflow-hidden"
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[700px]
          h-[700px]
          bg-orange-500/10
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
          <p className="text-pink-500 tracking-[0.5em] uppercase text-sm">
            Chapter 1 · Section 2
          </p>

          <h2
            className="
            mt-6
            font-serif
            text-5xl
            md:text-7xl
            text-white
          "
          >
            Prices Begin
            <br />
            To Change
          </h2>
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img
              src={Market}
              alt="Market"
              className="
                rounded-3xl
                shadow-[0_0_100px_rgba(255,100,0,0.15)]
              "
            />
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <p className="text-zinc-300 text-xl leading-relaxed">
              Weeks passed.
            </p>

            <p className="text-zinc-300 text-xl leading-relaxed">
              Life in Rome seemed normal.
            </p>

            <p className="text-zinc-300 text-xl leading-relaxed">
              The markets were crowded.
            </p>

            <p className="text-zinc-300 text-xl leading-relaxed">
              Merchants shouted.
            </p>

            <p className="text-zinc-300 text-xl leading-relaxed">
              Soldiers spent their wages.
            </p>

            <p className="text-zinc-300 text-xl leading-relaxed">
              But something felt different.
            </p>

            <div className="border-l-4 border-yellow-500 pl-6">
              <p className="text-yellow-400 text-3xl font-semibold">
                Bread cost more.
              </p>

              <p className="text-yellow-400 text-3xl font-semibold">
                Olive oil cost more.
              </p>

              <p className="text-yellow-400 text-3xl font-semibold">
                Even wine cost more.
              </p>
            </div>

            <p className="text-zinc-300 text-xl leading-relaxed">
              People complained.
            </p>

            <p className="text-zinc-300 text-xl leading-relaxed">
              Merchants blamed shortages.
            </p>

            <p className="text-zinc-300 text-xl leading-relaxed">
              Farmers blamed traders.
            </p>

            <p className="text-zinc-300 text-xl leading-relaxed">
              Traders blamed taxes.
            </p>

            <div className="pt-6 border-t border-zinc-800">
              <p className="text-pink-500 text-3xl font-serif">
                But nobody blamed the money.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Final Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto text-center mt-32"
        >
          <p
            className="
            text-4xl
            md:text-5xl
            font-serif
            leading-relaxed
            text-white
          "
          >
            The coins looked the same.
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
            But were they?
          </p>
        </motion.div>
      </div>
    </section>
  );
}
