import { motion } from "framer-motion";
import { section } from "framer-motion/client";
import { Link } from "react-router-dom";

export default function Continue() {
  return (
    <section>
      <div
        className="
        
        p-10
        md:p-14
        text-center
      "
      >
        <h2
          className="
          text-4xl
          md:text-6xl
          font-black
          font-['Orbitron']
        "
        >
          Understand Money.
        </h2>

        <p
          className="
          mt-6
          text-zinc-400
          max-w-2xl
          mx-auto
          text-lg
        "
        >
          Learn how inflation affects your savings, why scarcity matters, and
          how Bitcoin changes the game.
        </p>

        <Link
          to="/NextChapter"
          className="
          inline-flex
          items-center
          gap-2
          mt-8
          px-8
          py-4
          rounded-xl
          bg-gradient-to-r
          from-blue-900
          to-pink-500
          text-white
          font-semibold
          shadow-lg
          hover:scale-105
          transition
        "
        >
          Continue Learning →
        </Link>
      </div>
    </section>
  );
}
