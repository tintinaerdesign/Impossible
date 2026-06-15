import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SecurityLevels() {
  const levels = [
    {
      title: "Exchange Wallet",
      level: "Basic",
      icon: "account_balance",
      color: "from-red-500 to-orange-500",
      border: "border-red-500/20",
      badge: "Higher Risk",
      description:
        "Your Bitcoin is stored by a third party. Convenient, but you don't control the private keys.",
      pros: ["Easy to buy & sell", "Simple for beginners"],
      cons: ["Counterparty risk", "Exchange hacks", "Withdrawals can freeze"],
    },

    {
      title: "Software Wallet",
      level: "Intermediate",
      icon: "smartphone",
      color: "from-yellow-500 to-orange-400",
      border: "border-yellow-500/20",
      badge: "Moderate Security",
      description:
        "You hold your keys yourself, but devices connected to the internet remain vulnerable.",
      pros: ["You own your keys", "Mobile accessibility"],
      cons: ["Phone malware risk", "Hot wallet exposure"],
    },

    {
      title: "Hardware Wallet",
      level: "Recommended",
      icon: "shield_lock",
      color: "from-[#ec0065] to-[#f2a900]",
      border: "border-[#ec0065]/30",
      badge: "Best Practice",
      featured: true,
      description:
        "Private keys stay offline, giving you maximum control and stronger protection for long-term savings.",
      pros: ["Offline cold storage", "Full self-custody", "Long-term security"],
      cons: ["Small upfront cost"],
    },
  ];

  return (
    <section className="relative py-20">
      {/* glow */}
      <div className="absolute left-20 top-20 h-[300px] w-[300px] rounded-full bg-[#ec0065]/10 blur-[120px]" />
      <div className="absolute right-20 bottom-20 h-[300px] w-[300px] rounded-full bg-[#f2a900]/10 blur-[120px]" />

      <div className="relative z-20 max-w-7xl mx-auto px-8">
        {/* cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-24">
          {levels.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className={`
                relative
                rounded-[36px]
                border
                ${item.border}
                backdrop-blur-xl
                p-8
                overflow-hidden
                transition duration-500
                hover:-translate-y-2
                ${
                  item.featured
                    ? "bg-white/[0.05] scale-[1.02]"
                    : "bg-white/[0.03]"
                }
              `}
            >
              {/* glow */}
              {item.featured && (
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-br
                    from-[#ec0065]/10
                    to-[#f2a900]/10
                  "
                />
              )}

              <div className="relative z-10">
                {/* top */}
                <div className="flex items-center justify-between">
                  <div
                    className={`
                      h-16 w-16 rounded-2xl
                      bg-gradient-to-r ${item.color}
                      flex items-center justify-center
                    `}
                  >
                    <span className="material-symbols-outlined text-white text-[30px]">
                      {item.icon}
                    </span>
                  </div>

                  <span
                    className="
                      rounded-full
                      border border-white/10
                      bg-white/5
                      px-4 py-2
                      text-xs text-zinc-300
                    "
                  >
                    {item.badge}
                  </span>
                </div>

                {/* content */}
                <div className="mt-8">
                  <p className="text-sm text-zinc-500 uppercase tracking-wider">
                    {item.level}
                  </p>

                  <h3 className="text-3xl font-bold text-white mt-2">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* pros */}
                <div className="mt-8">
                  <p className="text-white font-semibold mb-4">Advantages</p>

                  <div className="space-y-3">
                    {item.pros.map((pro, i) => (
                      <div key={i} className="flex gap-3 text-zinc-300">
                        <span className="material-symbols-outlined text-green-400 text-[18px]">
                          check_circle
                        </span>

                        {pro}
                      </div>
                    ))}
                  </div>
                </div>

                {/* cons */}
                <div className="mt-8">
                  <p className="text-white font-semibold mb-4">Tradeoffs</p>

                  <div className="space-y-3">
                    {item.cons.map((con, i) => (
                      <div key={i} className="flex gap-3 text-zinc-400">
                        <span className="material-symbols-outlined text-red-400 text-[18px]">
                          cancel
                        </span>

                        {con}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                {item.featured && (
                  <Link
                    to="/trezor-guide"
                    className="
                      mt-10
                      flex justify-center
                      rounded-2xl
                      py-4
                      font-semibold
                      bg-gradient-to-r
                      from-[#ec0065]
                      to-[#f2a900]
                      hover:scale-[1.02]
                      transition duration-300
                    "
                  >
                    Explore Hardware Wallets
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
