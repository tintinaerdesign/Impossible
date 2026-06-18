import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.nav
      ref={dropdownRef}
      initial={{
        opacity: 0,
        y: -60,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        fixed
        left-1/2
        -translate-x-1/2
        z-[999]
        border border-[#ec0065]/30
        bg-black/50
        backdrop-blur-xl
        shadow-[0_0_40px_rgba(236,0,101,0.08)]
        transition-all duration-300

        ${isScrolled ? "top-4 w-11/12 rounded-[28px]" : "top-0 w-full"}
      `}
    >
      <div className="flex items-center justify-between px-6 md:px-8 h-20">
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl">
          <span className="bg-gradient-to-r from-[#ec0065] to-[#f2a900] bg-clip-text text-transparent">
            SaveSats
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-[15px]">
          <NavLink to="/" className="text-zinc-400 hover:text-white">
            Home
          </NavLink>

          <NavLink
            to="/BitcoinSecurity"
            className="text-zinc-400 hover:text-white"
          >
            Secure Bitcoin
          </NavLink>
        </div>

        {/* Desktop CTA */}
        <Link
          to="/BitcoinSecurity"
          className="
            hidden md:flex
            items-center justify-center
            px-6 py-3
            rounded-2xl
            text-sm
            bg-gradient-to-r
            from-[#ec0065]
            to-[#f2a900]
            hover:scale-105
            transition
          "
        >
          Protect Your Bitcoin
        </Link>

        {/* Mobile Hamburger */}
        <button
          ref={dropdownRef}
          onClick={() => setIsOpen(!isOpen)}
          className="
            md:hidden
            text-white
            flex items-center
            justify-center cursor-pointer
          "
        >
          <span className="material-symbols-outlined text-4xl">
            {isOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              md:hidden
              border-b rounded-3xl border-white/10
              bg-[#0f0f0f]/95 
              backdrop-blur-xl
            "
          >
            <ul className="flex flex-col p-6 space-y-6">
              <li>
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-300 hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/BitcoinSecurity"
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-300 hover:text-white"
                >
                  Secure Bitcoin
                </Link>
              </li>

              <li>
                <Link
                  to="/BitcoinSecurity"
                  onClick={() => setIsOpen(false)}
                  className="
                    inline-flex
                    px-5 py-3
                    rounded-xl
                    bg-gradient-to-r
                    from-[#ec0065]
                    to-[#f2a900]
                  "
                >
                  Protect Your Bitcoin
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
