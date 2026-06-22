import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="
     relative
     overflow-hidden
     border-t
     border-white/10
     bg-gradient-to-br
     from-black
     via-[#0d060d]
     to-[#1a0900]
   "
    >
      {/* Ambient Glow */}{" "}
      <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-[#ec0065]/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#f2a900]/10 blur-[140px]" />
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-24">
        {/* Main Grid */}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Brand */}

          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <div
                className="
              h-14
              w-14
              rounded-2xl
              bg-gradient-to-r
              from-[#ec0065]
              to-[#f2a900]
              flex
              items-center
              justify-center
            "
              >
                <span className="material-symbols-outlined text-white">
                  savings
                </span>
              </div>

              <div>
                <h3
                  className="
                text-3xl
                font-black
                font-['Orbitron']
              "
                >
                  Start D
                </h3>

                <p className="text-zinc-500 text-sm mt-1">
                  Learn Money • Save Better
                </p>
              </div>
            </div>

            <p
              className="
            mt-6
            text-zinc-400
            leading-relaxed
            max-w-md
          "
            >
              Learn how money works through interactive stories about inflation,
              scarcity, Bitcoin, and long-term wealth preservation.
            </p>

            {/* Tags */}

            <div className="flex flex-wrap gap-3 mt-8">
              {["Inflation", "Bitcoin", "Scarcity", "Self-Custody"].map(
                (item) => (
                  <div
                    key={item}
                    className="
                rounded-full
                border
                border-white/10
                bg-white/5
                px-4
                py-2
                text-sm
                text-zinc-300
              "
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Learn */}

          <div>
            <h4 className="text-white font-semibold text-lg mb-5">Learn</h4>

            <div className="space-y-4 text-zinc-400">
              <Link
                to="/LearnPage"
                className="block hover:text-white transition"
              >
                The Rise of Rome
              </Link>

              <Link
                to="/NextChapter"
                className="block hover:text-white transition"
              >
                The Fall of Glass Beads
              </Link>

              <Link
                to="/learn/gold"
                className="block hover:text-white transition"
              >
                Gold Standard
              </Link>

              <Link
                to="/learn/bitcoin-standard"
                className="block hover:text-white transition"
              >
                Bitcoin Standard
              </Link>
            </div>
          </div>

          {/* Tools */}

          <div>
            <h4 className="text-white font-semibold text-lg mb-5">Tools</h4>

            <div className="space-y-4 text-zinc-400">
              <Link
                to="/calculator"
                className="block hover:text-white transition"
              >
                Inflation Calculator
              </Link>

              <Link to="/dca" className="block hover:text-white transition">
                Bitcoin DCA Calculator
              </Link>

              <Link to="/tracker" className="block hover:text-white transition">
                Bitcoin Tracker
              </Link>

              <Link
                to="/wallet-comparison"
                className="block hover:text-white transition"
              >
                Wallet Comparison
              </Link>
            </div>
          </div>

          {/* Resources */}

          <div>
            <h4 className="text-white font-semibold text-lg mb-5">Resources</h4>

            <div className="space-y-4 text-zinc-400">
              <Link
                to="/BitcoinSecurity"
                className="block hover:text-white transition"
              >
                Self-Custody Guide
              </Link>

              <Link
                to="/BitcoinSecurity"
                className="block hover:text-white transition"
              >
                Bitcoin Security
              </Link>

              <Link to="/privacy" className="block hover:text-white transition">
                Privacy Policy
              </Link>

              <Link to="/contact" className="block hover:text-white transition">
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}

        <div className="h-px bg-white/10 my-12" />

        {/* Bottom */}

        <div
          className="
        flex
        flex-col
        lg:flex-row
        items-center
        justify-between
        gap-6
      "
        >
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Start D. All rights reserved.
          </p>

          <p
            className="
          text-zinc-500
          text-sm
          text-center
          lg:text-right
          max-w-xl
        "
          >
            Educational content only. Nothing on this website should be
            considered financial advice. Always do your own research before
            making financial decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
