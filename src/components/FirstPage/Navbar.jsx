import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 💡 [แก้ไขสำเร็จ]: ดึงระบบตรวจจับการคลิกด้านนอกพื้นที่เพื่อหุบเมนูของเวอร์ชันมือถือ
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
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      className={`
        fixed left-1/2 -translate-x-1/2
        z-[50] cursor-pointer
        duration-600 transition-all border border-[#ec0065]/30
        bg-black/50
        backdrop-blur-xl
        shadow-[0_0_40px_rgba(236,0,101,0.08)]
    ${isScrolled ? "top-4 h-20 w-11/12 rounded-[28px]" : "top-0 h-20 w-full"}`}
    >
      <div className="flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-2xl tracking-tight"
        >
          <span className="bg-gradient-to-r from-[#ec0065] to-[#f2a900] bg-clip-text text-transparent">
            SaveSats
          </span>
        </Link>

        {/* Nav */}
        <div className="hidden md:flex items-center gap-8 text-[15px]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition duration-300 ${
                isActive ? "text-white" : "text-zinc-400 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to=""
            className={({ isActive }) =>
              `transition duration-300 ${
                isActive ? "text-white" : "text-zinc-400 hover:text-white"
              }`
            }
          >
            --
          </NavLink>

          <NavLink
            to=""
            className={({ isActive }) =>
              `transition duration-300 ${
                isActive ? "text-white" : "text-zinc-400 hover:text-white"
              }`
            }
          >
            --
          </NavLink>

          <NavLink
            to="/BitcoinSecurity"
            className={({ isActive }) =>
              `transition duration-300 ${
                isActive ? "text-white" : "text-zinc-400 hover:text-white"
              }`
            }
          >
            Secure Bitcoin
          </NavLink>
        </div>

        {/* CTA */}
        <Link
          to="/secure-bitcoin"
          className="
            hidden md:flex
            items-center justify-center
            px-6 py-3
            rounded-2xl
            text-sm font-medium
            bg-gradient-to-r
            from-[#ec0065]
            to-[#f2a900]
            hover:scale-105
            transition duration-300
            shadow-[0_0_30px_rgba(236,0,101,0.25)]
          "
        >
          Protect Your Bitcoin
        </Link>

        {/* Mobile */}
        <button className="md:hidden flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-3xl">
            {isOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* ==================== DROPDOWN MENU สำหรับ MOBILE ==================== */}
      <div
        className={`absolute right-0 w-full mobile-menu-container bg-[#0f0f0f]/95 backdrop-blur-lg border-b border-white/[0.05] md:hidden transition-all duration-300 ease-in-out 
          ${isScrolled ? "top-20 rounded-[28px]" : "top-20"}
          ${
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
      >
        <ul className="flex flex-col p-6 space-y-4 text-base font-medium">
          <li>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-white text-gray-400 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/BitcoinSecurity"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-white text-gray-400 transition-colors"
            >
              Secure Bitcoin
            </Link>
          </li>
          <li>
            <Link
              to=""
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-white text-gray-400 transition-colors"
            >
              --
            </Link>
          </li>
          <li>
            <Link
              to=""
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-white text-gray-400 transition-colors"
            >
              --
            </Link>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
}
