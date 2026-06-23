import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Boycoin from "../../assets/Boycoin.png";
import Gold from "../../assets/Gold.png";
import {
  ArrowRight,
  Shield,
  Bitcoin,
  Landmark,
  AlertTriangle,
} from "lucide-react";

const MotionLink = motion(Link);
const lessons = [
  {
    title: "The Problem",
    description: "Why inflation is stealing your future.",
    icon: AlertTriangle,
    image: Boycoin,
    link: "/LearnPage",
  },
  {
    title: "Sound Money",
    description: "What is sound money and why it matters.",
    icon: Landmark,
    image: Gold,
  },
  {
    title: "Bitcoin",
    description: "The hardest money ever created.",
    icon: Bitcoin,
    image:
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200",
  },
  {
    title: "Self-Custody",
    description: "Secure your Bitcoin the right way.",
    icon: Shield,
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200",
  },
];

export default function LearnExplore() {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* TOP */}
        <div className="grid lg:grid-cols-[350px_1fr] gap-10">
          {/* LEFT */}
          <div>
            <span className="text-pink-500 text-lg font-semibold tracking-widest uppercase">
              Learn & Explore
            </span>

            <h2 className="text-5xl font-bold text-white leading-tight mt-4">
              Knowledge Is
              <br />
              Your Best Defense.
            </h2>

            <p className="text-zinc-400 mt-5 text-lg">
              Dive into the fundamentals of money, Bitcoin, and financial
              sovereignty.
            </p>
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {lessons.map((item, index) => (
              <MotionLink
                key={index}
                to={item.link}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                transition={{ duration: 0.3 }}
                className="
                relative
                rounded-3xl
                overflow-hidden
                border
                border-pink-500/20
                bg-zinc-950
                group
                h-[340px]
              "
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt=""
                  className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  opacity-50
                  group-hover:scale-110
                  duration-700
                "
                />

                {/* OVERLAY */}
                <div
                  className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black
                  via-black/80
                  to-transparent
                "
                />

                {/* CONTENT */}
                <div className="absolute bottom-0 p-6">
                  <h3 className="text-white text-2xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  <button className="mt-5 flex items-center gap-2 text-pink-400">
                    Read More
                    <ArrowRight size={16} />
                  </button>
                </div>
              </MotionLink>
            ))}
          </div>
        </div>

        {/* CTA BANNER */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
          className="
          mt-14
          rounded-3xl
          overflow-hidden
          border
          border-pink-500/20
          bg-gradient-to-r
          from-[#1a0511]
          via-[#29061a]
          to-[#0c0718]
          p-8
        "
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <div
                className="
                w-28 h-28
                rounded-3xl
                bg-gradient-to-br
                from-yellow-500
                to-orange-500
                flex
                items-center
                justify-center
                shadow-[0_0_50px_rgba(255,180,0,0.4)]
              "
              >
                <Bitcoin size={60} className="text-black" />
              </div>

              <div>
                <h3 className="text-4xl font-bold text-white">
                  Take Control of Your Future
                </h3>

                <p className="text-zinc-400 mt-3">
                  Learn. Plan. Save. Secure.
                  <br />
                  Start your journey to financial freedom today.
                </p>
              </div>
            </div>

            <MotionLink
              to="./BitcoinSecurity"
              className="
              px-10 py-5
              rounded-2xl
              text-white
              font-semibold
              bg-gradient-to-r
              from-pink-600
              to-orange-500
              hover:scale-105
              transition-all duration-400
            "
            >
              Protect Your Bitcoin
            </MotionLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
