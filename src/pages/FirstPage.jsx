import { Link } from "react-router-dom";

export default function FirstPage() {
  return (
    <div className="min-h-screen bg-[#0b0a0f] text-white flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl md:text-7xl font-black mb-6">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-[#f2a900] to-[#ec0065] bg-clip-text text-transparent">
          Start D
        </span>
      </h1>

      <p className="text-zinc-400 max-w-xl text-lg mb-10">
        Explore crypto markets, inflation impact, and future purchasing power
        with interactive tools.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          to="/bitcoin-calculator"
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#ec0065] to-[#f2a900] font-semibold hover:scale-105 transition-transform"
        >
          Open Calculator
        </Link>

        <a
          href="#"
          className="px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/5 transition"
        >
          Explore Market
        </a>
      </div>
    </div>
  );
}
