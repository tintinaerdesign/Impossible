import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Practice() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".mobile-menu-container") &&
        !event.target.closest("button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <nav
        className={`fixed px-6 z-50 left-1/2 -translate-x-1/2 flex items-center transition-all duration-500 ease-in-out ${
          isScrolled
            ? "top-4 h-14 w-11/12 rounded-2xl border border-white/10 bg-[#0f0f0f]/90 backdrop-blur-2xl shadow-lg"
            : "top-0 h-20 w-full border-b border-white/[0.05] bg-[#0f0f0f]/80 backdrop-blur-md"
        }`}
      >
        <div className="grid md:grid-cols-3 sm:grid-cols-2 w-full text-xl">
          {/* startD content */}
          <div className="flex justify-start gap-2">Start D</div>
          {/* middle chosen */}
          <ul className="hidden md:flex items-center justify-between gap-6 list-none">
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Calculator
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Coin List
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                BTC Page
              </a>
            </li>
          </ul>
          {/*Div Hamburger button*/}
          <div className="flex md:hidden justify-end items-center gap-2">
            <button
              onClick={(e) => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              type="button"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
        {/* ==================== DROPDOWN MENU สำหรับ MOBILE ==================== */}
        <div
          className={`absolute justify-end right-0 w-full mobile-menu-container bg-[#1a1a1c]/95 backdrop-blur-2xl border-b border-white/[0.05] md:hidden transition-all duration-300 ease-in-out 
            ${isScrolled ? "top-14 rounded-b-2xl" : "top-20"} ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
        >
          <ul className="flex flex-col p-6 items-end justify-end gap-6 list-none">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Calculator
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Coin List
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                BTC Page
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className="absolute
       max-w-8xl border border-white/10 bg-pink-500 rounded-xl"
      >
        <span className="text-white text-5xl">
          fontWeight: "800", letterSpacing: "-1.5px", cursor: "pointer",
          background: "linear-gradient(135deg, #d879a8, #ec0065)",
          WebkitBackgroundClip: "text", backgroundClip: "text",
          WebkitTextFillColor: "Space
        </span>
        <span className="text-white text-5xl">
          fontWeight: "800", letterSpacing: "-1.5px", cursor: "pointer",
          background: "linear-gradient(135deg, #d879a8, #ec0065)",
          WebkitBackgroundClip: "text", backgroundClip: "text",
          WebkitTextFillColor: "Space
        </span>
        <span className="text-white text-5xl">
          fontWeight: "800", letterSpacing: "-1.5px", cursor: "pointer",
          background: "linear-gradient(135deg, #d879a8, #ec0065)",
          WebkitBackgroundClip: "text", backgroundClip: "text",
          WebkitTextFillColor: "Space
        </span>
        <span className="text-white text-5xl">
          fontWeight: "800", letterSpacing: "-1.5px", cursor: "pointer",
          background: "linear-gradient(135deg, #d879a8, #ec0065)",
          WebkitBackgroundClip: "text", backgroundClip: "text",
          WebkitTextFillColor: "Space
        </span>
        <span className="text-white text-5xl">
          fontWeight: "800", letterSpacing: "-1.5px", cursor: "pointer",
          background: "linear-gradient(135deg, #d879a8, #ec0065)",
          WebkitBackgroundClip: "text", backgroundClip: "text",
          WebkitTextFillColor: "Space
        </span>
        <span className="text-white text-5xl">
          fontWeight: "800", letterSpacing: "-1.5px", cursor: "pointer",
          background: "linear-gradient(135deg, #d879a8, #ec0065)",
          WebkitBackgroundClip: "text", backgroundClip: "text",
          WebkitTextFillColor: "Space
        </span>
        <span className="text-white text-5xl">
          fontWeight: "800", letterSpacing: "-1.5px", cursor: "pointer",
          background: "linear-gradient(135deg, #d879a8, #ec0065)",
          WebkitBackgroundClip: "text", backgroundClip: "text",
          WebkitTextFillColor: "Space
        </span>
      </div>
    </div>
  );
}
