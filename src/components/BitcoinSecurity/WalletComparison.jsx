import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function WalletComparison() {
  const wallets = [
    {
      name: "Trezor",
      badge: "Beginner Friendly",
      icon: "shield_lock",
      gradient: "from-[#ec0065] to-[#f2a900]",
      description:
        "Simple, transparent, and open-source. Ideal for long-term Bitcoin holders who value security and simplicity.",

      pros: [
        "Open-source firmware",
        "Beginner friendly UX",
        "Bitcoin-focused",
        "Trusted security reputation",
      ],

      bestFor: "Long-term Bitcoin savers who want simplicity and security.",

      button: "Explore Trezor",
      link: "/trezor-guide",
    },

    {
      name: "Ledger",
      badge: "Advanced Features",
      icon: "memory",
      gradient: "from-[#7c3aed] to-[#ec398f]",
      description:
        "Supports a wide range of assets with advanced portfolio features for experienced users.",

      pros: [
        "Supports many assets",
        "Mobile integration",
        "Advanced ecosystem",
        "DeFi & staking support",
      ],

      bestFor: "Users managing multiple crypto assets beyond Bitcoin.",

      button: "Explore Ledger",
      link: "/ledger-guide",
    },
  ];

  const compareRows = [
    {
      label: "Security",
      trezor: "Excellent",
      ledger: "Excellent",
    },
    {
      label: "Ease of Use",
      trezor: "Very Easy",
      ledger: "Easy",
    },
    {
      label: "Open Source",
      trezor: "Yes",
      ledger: "Partial",
    },
    {
      label: "Best For",
      trezor: "Bitcoin Saving",
      ledger: "Multi Asset",
    },
    {
      label: "Mobile Support",
      trezor: "Limited",
      ledger: "Strong",
    },
  ];

  return (
    <section className="relative py-10 bg-[#120712] rounded-[28px] overflow-hidden">
      {/* glow */}
      <div className="absolute left-20 top-20 h-[300px] w-[300px] rounded-full bg-[#ec0065]/10 blur-[120px]" />
      <div className="absolute right-20 bottom-20 h-[300px] w-[300px] rounded-full bg-[#f2a900]/10 blur-[120px]" />

      <div className="relative z-20 max-w-7xl mx-auto px-8">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <div
            className="
              inline-flex
              items-center gap-2
              rounded-full
              border border-white/10
              bg-white/5
              px-4 py-2
              text-sm text-zinc-300
              backdrop-blur-md
            "
          >
            <span className="material-symbols-outlined text-[#ec398f]">
              compare_arrows
            </span>
            Wallet Comparison
          </div>

          <h2
            className="
              mt-8
              text-4xl md:text-6xl
              font-black
              font-['Orbitron']
              leading-tight
            "
          >
            Which Hardware Wallet
            <br />
            <span className="bg-gradient-to-r from-[#ec0065] to-[#f2a900] bg-clip-text text-transparent">
              Is Right For You?
            </span>
          </h2>

          <p className="mt-6 text-zinc-400 text-lg md:text-xl">
            Both are trusted by millions — choose based on your goals and
            security preferences.
          </p>
        </motion.div>

        {/* cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {wallets.map((wallet, index) => (
            <motion.div
              key={wallet.name}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              className="
                relative
                rounded-[36px]
                border border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-8
                overflow-hidden
              "
            >
              {/* glow */}
              <div
                className={`
                  absolute inset-0 opacity-10
                  bg-gradient-to-br
                  ${wallet.gradient}
                `}
              />

              <div className="relative z-10">
                {/* top */}
                <div className="flex items-center justify-between">
                  <div
                    className={`
                      h-16 w-16 rounded-2xl
                      bg-gradient-to-r
                      ${wallet.gradient}
                      flex items-center justify-center
                    `}
                  >
                    <span className="material-symbols-outlined text-white text-[30px]">
                      {wallet.icon}
                    </span>
                  </div>

                  <div className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-zinc-300">
                    {wallet.badge}
                  </div>
                </div>

                {/* content */}
                <h3 className="mt-8 text-4xl font-bold text-white">
                  {wallet.name}
                </h3>

                <p className="mt-4 text-zinc-400 leading-relaxed">
                  {wallet.description}
                </p>

                {/* pros */}
                <div className="mt-8 space-y-4">
                  {wallet.pros.map((pro, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="material-symbols-outlined text-green-400 text-[18px]">
                        check_circle
                      </span>

                      <span className="text-zinc-300">{pro}</span>
                    </div>
                  ))}
                </div>

                {/* best for */}
                <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 p-5">
                  <p className="text-sm text-zinc-500 uppercase">Best For</p>

                  <p className="text-zinc-200 mt-2">{wallet.bestFor}</p>
                </div>

                {/* CTA */}
                <Link
                  to={wallet.link}
                  className={`
                    mt-8 flex justify-center
                    rounded-2xl py-4
                    font-semibold
                    text-white
                    bg-gradient-to-r
                    ${wallet.gradient}
                    hover:scale-[1.02]
                    transition duration-300
                  `}
                >
                  {wallet.button}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* compare table */}
        <div className="mt-28 rounded-[36px] border border-white/10 overflow-hidden backdrop-blur-xl bg-white/[0.03]">
          <div className="grid grid-cols-3 bg-white/[0.04] text-center py-6 font-semibold text-zinc-200">
            <div>Feature</div>
            <div>Trezor</div>
            <div>Ledger</div>
          </div>

          {compareRows.map((row, index) => (
            <div
              key={index}
              className="
                grid grid-cols-3
                text-center
                border-t border-white/5
                py-5
              "
            >
              <div className="text-zinc-500">{row.label}</div>

              <div className="text-zinc-200">{row.trezor}</div>

              <div className="text-zinc-200">{row.ledger}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
