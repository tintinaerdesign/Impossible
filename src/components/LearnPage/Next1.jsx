import { motion } from "framer-motion";
import BeadGirl from "../../assets/BeadGirl.png";
import BeadMarket from "../../assets/BeadMarket.png";

import { Link } from "react-router-dom";

export default function Next1() {
  return (
    <section
      id="chapter2-section1"
      className="relative min-h-screen bg-black overflow-hidden"
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
          bg-cyan-500/10
          blur-[180px]
        "
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <p className="uppercase tracking-[0.5em] text-pink-500 text-sm">
            Chapter 2 · Section 1
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
            A Valuable
            <br />
            Treasure
          </h2>
        </motion.div>

        {/* Content */}

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image */}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img
              src={BeadGirl}
              alt=""
              className="
                rounded-3xl
                shadow-[0_0_80px_rgba(0,255,255,0.12)]
              "
            />
          </motion.div>

          {/* Story */}

          <div className="space-y-10">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-zinc-300 leading-relaxed"
            >
              Long before paper money...
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-zinc-300 leading-relaxed"
            >
              Long before banks...
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-300 leading-relaxed"
            >
              In parts of West Africa, colorful glass beads were treasured.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-zinc-300 leading-relaxed"
            >
              Families saved them.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-zinc-300 leading-relaxed"
            >
              Merchants traded with them.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-xl text-zinc-300 leading-relaxed"
            >
              Parents passed them to their children.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="
                border-l-4
                border-cyan-400
                pl-6
              "
            >
              <p
                className="
                  text-cyan-400
                  text-4xl
                  font-serif
                "
              >
                The rarer the bead,
              </p>

              <p
                className="
                  mt-4
                  text-white
                  text-4xl
                  font-serif
                "
              >
                the more valuable it became.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Quote */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="
            text-center
            max-w-4xl
            mx-auto
            mt-32
          "
        >
          <p
            className="
              text-4xl
              md:text-6xl
              font-serif
              text-white
            "
          >
            Scarcity
          </p>

          <p
            className="
              mt-8
              text-2xl
              text-zinc-400
            "
          >
            gives things value.
          </p>
        </motion.div>
        {/* Glow */}
        <div
          className="
          absolute
          right-0
          top-0
          w-[700px]
          h-[700px]
          bg-cyan-500/10
          blur-[180px]
        "
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          {/* Heading */}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <p className="uppercase tracking-[0.5em] text-pink-500 text-sm">
              Chapter 2 · Section 2
            </p>

            <h2
              className="
              mt-6
              text-5xl
              md:text-7xl
              font-serif
            "
            >
              Why People
              <br />
              Wanted Them
            </h2>
          </motion.div>

          {/* Content */}

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Story */}

            <div className="space-y-10">
              <motion.p
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-xl text-zinc-300 leading-relaxed"
              >
                These beads were not easy to make.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-zinc-300 leading-relaxed"
              >
                Some traveled hundreds of miles before reaching local markets.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-zinc-300 leading-relaxed"
              >
                Others required skilled craftsmen and many hours of work.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-xl text-zinc-300 leading-relaxed"
              >
                Not everyone could create them.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-xl text-zinc-300 leading-relaxed"
              >
                Not everyone could own them.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="
                border-l-4
                border-cyan-400
                pl-6
              "
              >
                <p className="text-cyan-400 text-3xl font-serif">
                  Scarcity created demand.
                </p>

                <p className="text-white text-3xl font-serif mt-4">
                  Demand created value.
                </p>
              </motion.div>
            </div>

            {/* Image */}

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <img
                src={BeadMarket}
                alt=""
                className="
                rounded-3xl
                shadow-[0_0_80px_rgba(0,255,255,0.15)]
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

          {/* Bottom Reveal */}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="
            text-center
            max-w-4xl
            mx-auto
            mt-32
          "
          >
            <p
              className="
              text-4xl
              md:text-6xl
              font-serif
              text-white
            "
            >
              Valuable things
            </p>

            <p
              className="
              mt-8
              text-4xl
              md:text-6xl
              font-serif
              text-cyan-400
            "
            >
              are usually hard to create.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
