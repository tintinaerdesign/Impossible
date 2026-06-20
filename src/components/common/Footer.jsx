import { Link } from "react-router-dom";

export default function SecurityFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#0d060d] border-t border-white/10">
      {/* ambient glow */}
      <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-[#ec0065]/10 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#f2a900]/10 blur-[120px]" />

      <div className="relative z-20 max-w-7xl mx-auto px-8 py-24">
        {/* top */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div
                className="
                  h-12 w-12
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#ec0065]
                  to-[#f2a900]
                  flex items-center justify-center
                "
              >
                <span className="material-symbols-outlined text-white">
                  shield_lock
                </span>
              </div>

              <h3 className="text-2xl font-black font-['Orbitron']">
                Bitcoin Security
              </h3>
            </div>

            <p className="mt-6 text-zinc-400 leading-relaxed max-w-md">
              Helping people protect their Bitcoin through education,
              self-custody, and smarter long-term security decisions.
            </p>

            {/* trust badges */}
            <div className="flex flex-wrap gap-3 mt-8">
              {["Bitcoin Education", "Self-Custody", "Long-Term Security"].map(
                (item) => (
                  <div
                    key={item}
                    className="
                    rounded-full
                    border border-white/10
                    bg-white/5
                    px-4 py-2
                    text-sm text-zinc-300
                  "
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* learn */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-5">Learn</h4>

            <div className="space-y-4 text-zinc-400">
              <Link
                to="/learn/inflation"
                className="block hover:text-white transition"
              >
                What Is Inflation?
              </Link>

              <Link
                to="/learn/bitcoin"
                className="block hover:text-white transition"
              >
                Why Bitcoin Matters
              </Link>

              <Link
                to="/learn/self-custody"
                className="block hover:text-white transition"
              >
                Self-Custody Guide
              </Link>

              <Link
                to="/learn/security-basics"
                className="block hover:text-white transition"
              >
                Bitcoin Security Basics
              </Link>
            </div>
          </div>

          {/* tools */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-5">Security</h4>

            <div className="space-y-4 text-zinc-400">
              <Link
                to="/trezor-guide"
                className="block hover:text-white transition"
              >
                Trezor Guide
              </Link>

              <Link
                to="/ledger-guide"
                className="block hover:text-white transition"
              >
                Ledger Guide
              </Link>

              <Link
                to="/wallet-comparison"
                className="block hover:text-white transition"
              >
                Wallet Comparison
              </Link>

              <Link
                to="/calculator"
                className="block hover:text-white transition"
              >
                Bitcoin Calculator
              </Link>
            </div>
          </div>

          {/* legal */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-5">Legal</h4>

            <div className="space-y-4 text-zinc-400">
              <Link to="/privacy" className="block hover:text-white transition">
                Privacy Policy
              </Link>

              <Link to="/terms" className="block hover:text-white transition">
                Terms of Use
              </Link>

              <Link
                to="/disclaimer"
                className="block hover:text-white transition"
              >
                Disclaimer
              </Link>

              <Link to="/contact" className="block hover:text-white transition">
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="h-[1px] bg-white/10 my-12" />

        {/* bottom */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="text-zinc-500 text-sm text-center lg:text-left">
            © {new Date().getFullYear()} Bitcoin Security. All rights reserved.
          </p>

          <p className="text-zinc-500 text-sm max-w-xl text-center lg:text-right">
            Educational content only. This website may contain affiliate links.
            Always do your own research before making financial decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
