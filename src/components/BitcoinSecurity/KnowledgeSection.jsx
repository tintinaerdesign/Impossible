import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function KnowledgeSection() {
  const articles = [
    {
      icon: "trending_down",
      title: "What Is Inflation?",
      description:
        "Understand how inflation slowly reduces purchasing power over time.",

      link: "/learn/inflation",
      tag: "Macro",
    },

    {
      icon: "currency_bitcoin",
      title: "Why Bitcoin Matters",
      description:
        "Explore Bitcoin's fixed supply and why scarcity matters in a digital world.",

      link: "/learn/bitcoin",
      tag: "Bitcoin",
    },

    {
      icon: "shield_lock",
      title: "Hot Wallet vs Cold Wallet",
      description:
        "Learn the difference between convenience and long-term security.",

      link: "/learn/hot-vs-cold-wallet",
      tag: "Security",
    },

    {
      icon: "account_balance_wallet",
      title: "How Self-Custody Works",
      description:
        "Discover how to truly own your Bitcoin without relying on third parties.",

      link: "/learn/self-custody",
      tag: "Education",
    },

    {
      icon: "warning",
      title: "Risks of Leaving Bitcoin on Exchanges",
      description:
        "Understand exchange risks and why many long-term holders choose self-custody.",

      link: "/learn/exchange-risk",
      tag: "Risk",
    },

    {
      icon: "verified_user",
      title: "Bitcoin Security Basics",
      description: "Simple security habits every Bitcoin holder should know.",

      link: "/learn/security-basics",
      tag: "Guide",
    },
  ];

  return (
    <section className="relative bg-[#120712] py-10 rounded-[28px] overflow-hidden">
      {/* ambient glow */}
      <div className="absolute left-0 top-0 h-[320px] w-[320px] rounded-full bg-[#ec0065]/10 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-[320px] w-[320px] rounded-full bg-[#f2a900]/10 blur-[120px]" />

      <div className="relative z-20 max-w-7xl mx-auto px-8">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
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
            "
          >
            <span className="material-symbols-outlined text-[#ec398f]">
              auto_stories
            </span>
            Learn Before You Invest
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
            Build Your
            <br />
            <span className="bg-gradient-to-r from-[#ec0065] to-[#f2a900] bg-clip-text text-transparent">
              Bitcoin Knowledge
            </span>
          </h2>

          <p className="mt-6 text-zinc-400 text-lg md:text-xl">
            Learn the fundamentals of inflation, self-custody, and Bitcoin
            security — one concept at a time.
          </p>
        </motion.div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-24">
          {articles.map((article, index) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: index * 0.06,
                duration: 0.5,
              }}
            >
              <Link
                to={article.link}
                className="
                  group
                  relative
                  block
                  rounded-[32px]
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-xl
                  p-8
                  overflow-hidden
                  hover:border-white/20
                  hover:-translate-y-1
                  transition duration-300
                "
              >
                {/* tag */}
                <div className="flex justify-between items-center">
                  <span
                    className="
                      rounded-full
                      bg-white/5
                      border border-white/10
                      px-3 py-1
                      text-xs
                      text-zinc-400
                    "
                  >
                    {article.tag}
                  </span>

                  <span className="material-symbols-outlined text-zinc-500 group-hover:translate-x-1 transition">
                    arrow_forward
                  </span>
                </div>

                {/* icon */}
                <div
                  className="
                    mt-8
                    h-16 w-16
                    rounded-2xl
                    bg-gradient-to-r
                    from-[#ec0065]
                    to-[#f2a900]
                    flex items-center justify-center
                  "
                >
                  <span className="material-symbols-outlined text-white text-[30px]">
                    {article.icon}
                  </span>
                </div>

                {/* content */}
                <h3 className="mt-6 text-2xl font-bold text-white leading-snug">
                  {article.title}
                </h3>

                <p className="mt-4 text-zinc-400 leading-relaxed">
                  {article.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="
            mt-24
            text-center
          "
        >
          <p className="text-zinc-500 text-lg">
            Small knowledge today can prevent expensive mistakes tomorrow.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
