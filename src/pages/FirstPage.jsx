export default function FirstPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-4">Welcome to Start D</h1>

      <p className="text-zinc-400 mb-8">
        Explore Crypto Market & Inflation Calculator
      </p>

      <a
        href="/bitcoin-calculator"
        className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-xl"
      >
        Open Bitcoin Calculator
      </a>
    </div>
  );
}
