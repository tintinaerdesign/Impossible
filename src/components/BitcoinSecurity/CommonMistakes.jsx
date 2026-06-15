import { motion } from "framer-motion";
import StolenBg from "../../assets/Warn.png";

export default function CommonMistakes() {
  const mistakes = [
    {
      icon: "photo_camera",
      title: "Saving Recovery Phrase Online",
      description:
        "Taking screenshots or storing your recovery phrase in cloud storage exposes it to hackers.",
      fix: "Write it down offline and keep it private.",
    },

    {
      icon: "account_balance",
      title: "Leaving Bitcoin on Exchanges",
      description:
        "Exchanges can freeze withdrawals, get hacked, or fail unexpectedly.",
      fix: "Move long-term savings to self-custody.",
    },

    {
      icon: "password",
      title: "Weak Password Security",
      description:
        "Simple passwords or reused credentials make accounts vulnerable.",
      fix: "Use strong passwords and 2FA.",
    },

    {
      icon: "warning",
      title: "Ignoring Backup Testing",
      description:
        "Many people never verify their recovery phrase until it's too late.",
      fix: "Test recovery safely before storing large amounts.",
    },
  ];

  return (
    <section className="relative">
      {/* glow */}
      <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-[#ec0065]/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#f2a900]/10 blur-[120px]" />

      <div className="relative z-20 max-w-7xl mx-auto px-8">
        {/* mistakes grid */}
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <img
            src={StolenBg}
            alt="StolenBackground"
            className="
    w-full
    rounded-[36px]
    object-cover
    border border-white/10
    shadow-2xl scale-115 mt-20
  "
          />

          <div className="grid grid-cols-1 gap-8">
            {/* heading */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <div
                className="
              inline-flex items-center gap-2
              rounded-full border border-red-500/20
              bg-red-500/10
              px-4 py-2
              text-sm text-red-300
            "
              >
                <span className="material-symbols-outlined text-red-400">
                  warning
                </span>
                Avoid Costly Mistakes
              </div>
            </motion.div>
            {mistakes.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                }}
                className="
                rounded-[36px]
                border border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-8
                hover:border-white/20
                transition duration-300
              "
              >
                <div className="p-2 text-g text-white">{item.title}</div>

                {/* title */}

                <div className="rounded-2xl border border-red-600/20 bg-red-600/10 p-3 mt-2">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-red-600">
                      verified_user
                    </span>
                    <div>
                      <p className="text-red-600 font-semibold">Do not</p>

                      <p className="text-zinc-300 mt-1">{item.title}</p>
                    </div>
                  </div>
                </div>

                {/* fix */}
                <div
                  className="
                  mt-2
                  rounded-2xl
                  border border-green-500/20
                  bg-green-500/10
                  p-3
                "
                >
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-400">
                      verified_user
                    </span>

                    <div>
                      <p className="text-green-300 font-semibold">Do</p>

                      <p className="text-zinc-300 mt-1">{item.fix}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-40">
          {/* Line 1 */}
          <motion.h3
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6 text-start text-6xl md:text-8xl font-black font-['Orbitron'] leading-[0.95]"
          >
            Security Isn&apos;t About{" "}
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.25,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-orange-400 inline-block"
            >
              Fear.
            </motion.span>
          </motion.h3>

          {/* Line 2 */}
          <motion.p
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2,
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-4 text-end text-4xl text-zinc-300 font-['Orbitron']"
          >
            It&apos;s About Reducing Risk.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
