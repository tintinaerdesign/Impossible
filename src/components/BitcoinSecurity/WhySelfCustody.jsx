import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function WhySelfCustody() {
  const risks = [
    {
      icon: "account_balance",
      title: "Exchange Risk",
      description:
        "When your Bitcoin stays on an exchange, you depend on a third party to protect your assets.",
    },
    {
      icon: "warning",
      title: "Hacks & Bankruptcy",
      description:
        "History has shown that exchanges can be hacked, frozen, or even collapse unexpectedly.",
    },
    {
      icon: "vpn_key",
      title: "True Ownership",
      description:
        "Self-custody gives you full control of your Bitcoin — no permission required.",
    },
  ];

  return (
    <section className="relative py-32 bg-[#120712] rounded-2xl shadow-[0_0_20px_rgba(236,57,143,0.18)] overflow-hidden">
      {/* glow */}
      <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-[#ec0065]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-[#f2a900]/10 blur-[120px] rounded-full" />

      <div className="relative z-20 max-w-7xl mx-auto px-8">
        {/* top label */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex justify-center"
        >
          <div
            className="
              px-4 py-2 rounded-full
              border border-white/10
              bg-white/5
              backdrop-blur-md
              text-zinc-300 text-sm
            "
          >
            Why Self-Custody Matters
          </div>
        </motion.div>

        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-8"
        >
          <h2
            className="
              text-4xl md:text-6xl
              font-black
              font-['Orbitron']
              leading-tight
            "
          >
            <span className="text-white">Not Your Keys.</span>

            <br />

            <span className="bg-gradient-to-r from-[#ec0065] to-[#f2a900] bg-clip-text text-transparent">
              Not Your Bitcoin.
            </span>
          </h2>

          <p className="mt-6 text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Bitcoin gives you financial sovereignty — but only if you control
            your private keys.
          </p>
        </motion.div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {risks.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="
                relative
                rounded-[32px]
                border border-white/10
                bg-white/[0.03]
                backdrop-blur-md
                p-8
                overflow-hidden
                hover:-translate-y-2
                transition duration-500
              "
            >
              {/* gradient border glow */}
              <div
                className="
                  absolute inset-0 opacity-0
                  hover:opacity-100
                  transition duration-500
                  bg-gradient-to-br
                  from-[#ec0065]/10
                  to-[#f2a900]/10
                "
              />

              <div className="relative z-10">
                <div
                  className="
                    h-16 w-16 rounded-2xl
                    flex items-center justify-center
                    bg-gradient-to-r
                    from-[#ec0065]
                    to-[#f2a900]
                  "
                >
                  <span className="material-symbols-outlined text-white text-[30px]">
                    {item.icon}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mt-8 text-white">
                  {item.title}
                </h3>

                <p className="text-zinc-400 mt-4 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
