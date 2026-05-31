import { Link } from "react-router-dom";

export default function FirstPage() {
  return (
    <div className="min-h-screen bg-linear-60 from-black to-gray-500 text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-6">
        Welcome to
        <span
          style={{
            fontSize: "80px",
            fontWeight: "800",
            letterSpacing: "-2px",
            paddingInline: "8px",
            background: "linear-gradient(135deg, #d879a8, #ec0065)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Start D
        </span>
      </h1>

      <p className="text-zinc-400 mb-8">
        Explore crypto market and inflation tools
      </p>
      <div className="flex flex-cols-2 gap-8">
        <Link
          to="/Calculator"
          className="px-8 py-4 rounded-2xl text-xl font-semibold bg-white text-black hover:bg-pink-700 transition"
        >
          Open Inflation Calculator
        </Link>
        <Link
          to="/coinlist"
          className="px-8 py-4 rounded-2xl text-xl font-semibold text-shadow-emerald-400 bg-linear-to-r from-orange-400 to-purple-600 hover:scale-3d transition"
        >
          Open Coin market
        </Link>
      </div>
    </div>
  );
}
