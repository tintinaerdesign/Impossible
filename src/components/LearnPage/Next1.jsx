import { motion } from "framer-motion";
import BeadGirl from "../../assets/BeadGirl.png";
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
      </div>
    </section>
  );
}
