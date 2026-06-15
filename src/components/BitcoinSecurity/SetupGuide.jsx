import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SetupGuide() {
  const steps = [
    {
      number: "01",
      icon: "inventory_2",
      title: "Get Your Hardware Wallet",
      description:
        "Choose a trusted hardware wallet like Trezor or Ledger from the official store.",
    },
    {
      number: "02",
      icon: "vpn_key",
      title: "Write Down Recovery Phrase",
      description:
        "Safely store your recovery phrase offline. Never screenshot or save it online.",
    },
    {
      number: "03",
      icon: "currency_bitcoin",
      title: "Transfer Your Bitcoin",
      description:
        "Move your Bitcoin from an exchange into your hardware wallet securely.",
    },
    {
      number: "04",
      icon: "lock",
      title: "Relax & Stay Secure",
      description:
        "You now fully control your Bitcoin — protected from hacks, exchange failures, and third-party risks.",
    },
  ];

  return (
    <section className="relative py-36 bg-[#120712] overflow-hidden">
      {/* glow background */}
      <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-[#ec0065]/10 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-[#f2a900]/10 blur-[120px]" />

      <div className="relative z-20 max-w-7xl mx-auto px-8">
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
              rounded-full border border-white/10
              bg-white/5
              px-4 py-2
              text-sm text-zinc-300
              backdrop-blur-md
            "
          >
            <span className="material-symbols-outlined text-[#ec398f]">
              auto_awesome
            </span>
            Beginner Friendly
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
            Setting Up Your Wallet
            <br />
            <span className="bg-gradient-to-r from-[#ec0065] to-[#f2a900] bg-clip-text text-transparent">
              Is Easier Than You Think
            </span>
          </h2>

          <p className="mt-6 text-zinc-400 text-lg md:text-xl">
            No technical experience required. Most people finish setup in under{" "}
            <span className="text-white font-semibold">15 minutes</span>.
          </p>
        </motion.div>

        {/* steps */}
        <div className="mt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
                duration: 0.5,
              }}
              className="
                relative
                rounded-[32px]
                border border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-8
                overflow-hidden
                hover:border-white/20
                transition duration-300
              "
            >
              {/* number */}
              <div className="text-zinc-700 text-5xl font-black">
                {step.number}
              </div>

              {/* icon */}
              <div
                className="
                  mt-6
                  h-16 w-16
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#ec0065]
                  to-[#f2a900]
                  flex items-center justify-center
                "
              >
                <span className="material-symbols-outlined text-white text-[30px]">
                  {step.icon}
                </span>
              </div>

              {/* content */}
              <h3 className="mt-6 text-2xl font-bold text-white">
                {step.title}
              </h3>

              <p className="mt-4 text-zinc-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* bottom card */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            mt-24
            rounded-[40px]
            border border-white/10
            bg-gradient-to-br
            from-[#1b0c17]
            to-[#27131f]
            p-10 md:p-16
            text-center
          "
        >
          <h3 className="text-3xl md:text-5xl font-black font-['Orbitron']">
            Take Control of
            <span className="bg-gradient-to-r from-[#ec0065] to-[#f2a900] bg-clip-text text-transparent">
              {" "}
              Your Bitcoin
            </span>
          </h3>

          <p className="mt-6 text-zinc-400 text-lg max-w-2xl mx-auto">
            Don’t leave your future savings in someone else’s hands. Start
            protecting your Bitcoin today.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/trezor-guide"
              className="
                px-8 py-4 rounded-2xl
                bg-gradient-to-r
                from-[#ec0065]
                to-[#f2a900]
                text-white font-semibold
                hover:scale-105
                transition duration-300
              "
            >
              Get Started with Trezor
            </Link>

            <Link
              to="/ledger-guide"
              className="
                px-8 py-4 rounded-2xl
                border border-white/20
                text-white
                hover:bg-white
                hover:text-black
                transition duration-300
              "
            >
              Explore Ledger
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
