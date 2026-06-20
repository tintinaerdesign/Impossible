import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import InflationCoin from "../../assets/InflationCoin.png";

export default function Chapter4() {
  return (
    <section
      id="section-4"
      className="relative font-['Cinzel'] bg-black text-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-32">
        {/* Heading */}

        <div className="text-center mb-32">
          <p className="uppercase tracking-[0.5em] text-pink-500">
            Chapter 1 · Section 4
          </p>

          <h2 className="font-serif text-6xl md:text-8xl mt-6">
            The Birth
            <br />
            Of Inflation
          </h2>
        </div>

        {/* Sticky Area */}

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Coin */}

          <div className="hidden lg:flex">
            <div className="sticky top-24">
              <img
                src={InflationCoin}
                alt=""
                className="
                  w-full rounded-4xl
                  max-w-lg
                  drop-shadow-[0_0_50px_rgba(255,200,0,0.3)]
                "
              />
            </div>
          </div>

          {/* Story */}

          <div className="space-y-22">
            <motion.div
              whileInView={{
                opacity: [0, 1],
                x: [-40, 0],
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-yellow-400 text-4xl">100% Silver</h3>

              <p className="mt-6 text-zinc-300 text-xl">
                One coin contained a full amount of silver.
              </p>
            </motion.div>

            <motion.div
              whileInView={{
                opacity: [0, 1],
                x: [40, 0],
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-yellow-400 text-4xl">Less Silver</h3>

              <p className="mt-6 text-zinc-300 text-xl">
                The government reduced the silver inside each coin.
              </p>
            </motion.div>

            <motion.div
              whileInView={{
                opacity: [0, 1],
                scale: [0.8, 1],
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-yellow-400 text-4xl">More Coins</h3>

              <p className="mt-6 text-zinc-300 text-xl">
                The same amount of silver could now create many more coins.
              </p>
            </motion.div>

            <motion.div
              whileInView={{
                opacity: [0, 1],
                rotate: [-2, 0],
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-yellow-400 text-4xl">Prices Rise</h3>

              <p className="mt-6 text-zinc-300 text-xl">
                More money chased the same goods.
              </p>
            </motion.div>

            <motion.div
              whileInView={{
                opacity: [0, 1],
                y: [80, 0],
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="
                border-l-4
                border-pink-500
                pl-8
              "
            >
              <h3
                className="
                  text-pink-500
                  text-5xl
                  font-serif
                "
              >
                Inflation
              </h3>

              <p className="mt-6 text-2xl text-zinc-300">
                Each coin bought less.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
