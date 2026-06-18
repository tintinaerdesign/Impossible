import Navbar from "../components/FirstPage/Navbar";
import HeroSection from "../components/BitcoinSecurity/HeroSection";
import WhySelfCustody from "../components/BitcoinSecurity/WhySelfCustody";
import MtDown from "../components/BitcoinSecurity/MtDown";
import SecurityLevels from "../components/BitcoinSecurity/SecurityLevels";
import WalletComparison from "../components/BitcoinSecurity/WalletComparison";
import SetupGuide from "../components/BitcoinSecurity/SetupGuide";
import CommonMistakes from "../components/BitcoinSecurity/CommonMistakes";
import KnowledgeSection from "../components/BitcoinSecurity/KnowledgeSection";

import SecurityFooter from "../components/BitcoinSecurity/SecurityFooter";

export default function (BitcoinSecurity) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#09090b] to-[#440121] text-white">
      {/* Global Glow Effects */}
      <div className="pointer-events-none absolute top-[-200px] left-[-100px] h-[500px] w-[500px] rounded-full bg-[#ec0065]/10 blur-[140px]" />

      <div className="pointer-events-none absolute top-[30%] right-[-150px] h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute bottom-[-200px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-pink-500/10 blur-[180px]" />

      {/* Navbar */}
      <Navbar />

      {/* 1.Hero */}
      <HeroSection />

      {/* 2.Why Self Custody */}
      <section className="relative z-10 py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <WhySelfCustody />
        </div>
      </section>

      {/* 3.Common Mistakes */}
      <section className="relative z-10 py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <CommonMistakes />
        </div>
      </section>

      {/* 4.Security Levels */}
      <section className="relative z-10">
        <div className="min-h-screen">
          <SecurityLevels />
        </div>
      </section>

      {/* Wallet Comparison */}
      <section className="relative z-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <WalletComparison />
        </div>
      </section>

      {/* Knowledge Section */}
      <section className="relative z-10 py-4 px-4 md:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <KnowledgeSection />
        </div>
      </section>

      {/* Footer */}
      <SecurityFooter />
    </main>
  );
}
